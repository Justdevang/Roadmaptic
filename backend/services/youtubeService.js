import dotenv from 'dotenv';
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const searchCache = new Map();

export const searchYouTubeVideo = async (query) => {
  if (searchCache.has(query)) {
    return searchCache.get(query);
  }

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
      const result = {
        title: video.snippet.title,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`
      };
      searchCache.set(query, result);
      return result;
    } else {
      const result = {
        title: `Search: ${query}`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
      };
      searchCache.set(query, result);
      return result;
    }
  } catch (error) {
    console.error("Error searching YouTube:", error);
    const result = {
      title: `Search: ${query}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    };
    searchCache.set(query, result);
    return result;
  }
};
