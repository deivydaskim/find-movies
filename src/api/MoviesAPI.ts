const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getMedia = async (page = 1, resource: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${resource}?language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: MediaResult<Movie | TV> = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching:', error);
    throw error;
  }
};

const getMediaDetails = async (resource: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${resource}?language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching:', error);
    throw error;
  }
};

const getMediaCrew = async (resource: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${resource}/credits?language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching:', error);
    throw error;
  }
};

export { getMedia, getMediaDetails, getMediaCrew };
