import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { searchYouTubeVideo } from './youtubeService.js';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRoadmap = async (currentSkills, targetRole, hoursPerWeek, resourcePreference = "mixed", includeYouTube = false, language = "English") => {
  
  let languageInstruction = `The resources provided MUST be highly relevant and understandable in ${language}.`;
  
  let resourceInstruction = `- PRIORITIZE highly-rated YouTube tutorials and official documentation. ${languageInstruction}`;
  if (includeYouTube || resourcePreference === 'video') {
    resourceInstruction = `- MANDATORY: You MUST provide a highly-rated YouTube video tutorial (e.g., freeCodeCamp, Traversy Media, Fireship, Bro Code) for EVERY topic. Do NOT provide written documentation. ${languageInstruction}`;
  } else if (resourcePreference === 'docs') {
    resourceInstruction = `- MANDATORY: You MUST provide official written documentation or high-quality text tutorials (e.g., MDN, official React docs) for EVERY topic. Do NOT provide video links. ${languageInstruction}`;
  }

  const prompt = `You are an expert technical career coach and curriculum designer. 
A user wants to become a "${targetRole}".
Their current skills are: ${currentSkills}.
They have ${hoursPerWeek} hours per week available.
Preferred Content Language: ${language}

Generate a highly specific, week-by-week learning roadmap. For each week, provide a focus area, 2-3 specific topics to learn, and the best free resource link for each topic. The linked resources MUST be heavily biased towards ${language}.

CRITICAL RESOURCE QUALITY GUIDELINES:
- The resources MUST be top-tier learning materials that help the user learn deeply and effectively.
${resourceInstruction}
- DO NOT suggest generic, low-quality, or SEO-spam blog posts. If it's not official docs or a top-tier video, do not include it.

Output the response AS PURE JSON in the following format (no markdown formatting, no thinking tags, just the JSON array of objects):
[
  {
    "week": 1,
    "focus": "Topic name",
    "topics": [
      {
        "name": "Subtopic",
        "resourceName": "Name of free resource (e.g. 'Traversy Media React Crash Course')",
        "resourceUrl": "https://link-to-resource"
      }
    ]
  }
]
`;

  try {
    const modelNames = ["models/gemini-3.1-flash-live-preview", "models/gemini-3-flash-preview", "models/gemini-flash-latest", "models/gemini-1.5-flash", "models/gemini-pro-latest"];
    let result;
    let lastError;

    for (const modelName of modelNames) {
      try {
        console.log(`Attempting roadmap generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
          },
          systemInstruction: "You are a professional technical curriculum designer generating structured JSON outputs.",
        });
        result = await model.generateContent(prompt);
        if (result) break;
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err.message);
        lastError = err;
      }
    }

    if (!result) {
      throw lastError || new Error("All models failed to generate content");
    }

    const responseText = result.response.text();
    console.log("Raw Response from Gemini:", responseText); // DEBUG
    
    // Clean up potential markdown formatting from the response
    let cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    
    // Sometimes the model adds extra text before/after JSON
    if (cleanedText.indexOf('[') !== -1) {
      cleanedText = cleanedText.substring(cleanedText.indexOf('['));
      const lastIndex = cleanedText.lastIndexOf(']');
      if (lastIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastIndex + 1);
      }
    } else if (cleanedText.indexOf('{') !== -1) {
      // If it returns an object instead of an array
      cleanedText = cleanedText.substring(cleanedText.indexOf('{'));
      const lastIndex = cleanedText.lastIndexOf('}');
      if (lastIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastIndex + 1);
      }
    }

    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parsing Error. Cleaned text:", cleanedText);
      throw new Error("Invalid response format from AI");
    }

    // If it's an object with a roadmap key, extract it
    if (!Array.isArray(parsedData) && parsedData.roadmap && Array.isArray(parsedData.roadmap)) {
      parsedData = parsedData.roadmap;
    }

    if (!Array.isArray(parsedData)) {
      console.error("Parsed data is not an array:", parsedData);
      throw new Error("Roadmap data format is invalid");
    }

    // If includeYouTube is true, let's fetch real YouTube links in parallel
    if (includeYouTube) {
      console.log("Fetching YouTube links for topics...");
      const searchPromises = [];
      
      for (const week of parsedData) {
        if (week.topics && Array.isArray(week.topics)) {
          for (const topic of week.topics) {
            searchPromises.push((async () => {
              try {
                const query = `${targetRole} ${week.focus || ''} ${topic.name} roadmap tutorial in ${language}`;
                const ytVideo = await searchYouTubeVideo(query);
                topic.resourceName = `[YouTube] ${ytVideo.title}`;
                topic.resourceUrl = ytVideo.url;
              } catch (ytErr) {
                console.warn(`Failed to fetch YouTube link for ${topic.name}:`, ytErr);
              }
            })());
          }
        }
      }
      
      if (searchPromises.length > 0) {
        await Promise.all(searchPromises);
      }
    }

    return parsedData;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};
