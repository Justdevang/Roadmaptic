import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const searchYouTubeVideo = async (query) => {
  if (!YOUTUBE_API_KEY) {
    console.warn("YouTube API Key not found, returning generic search link");
    return {
      title: `Search: ${query}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    };
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' tutorial')}&type=video&key=${YOUTUBE_API_KEY}&maxResults=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        title: video.snippet.title,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`
      };
    } else {
      return {
        title: `Search: ${query}`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      };
    }
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return {
      title: `Search: ${query}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    };
  }
};
