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
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
      systemInstruction: "You are a professional technical curriculum designer generating structured JSON outputs.",
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting from the response
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    
    let parsedData = JSON.parse(cleanedText);

    // If includeYouTube is true, let's fetch real YouTube links
    if (includeYouTube) {
      for (const week of parsedData) {
        for (const topic of week.topics) {
          const query = `${targetRole} ${week.focus} ${topic.name} in ${language} language`;
          const ytVideo = await searchYouTubeVideo(query);
          topic.resourceName = `[YouTube] ${ytVideo.title}`;
          topic.resourceUrl = ytVideo.url;
        }
      }
    }

    return parsedData;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate roadmap from Gemini API");
  }
};
