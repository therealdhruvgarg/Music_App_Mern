import axios from 'axios';

export async function getItems(Name, limit) {
  const URL = `https://itunes.apple.com/search?term=${Name}&limit=${15}`;
  try {
    const response = await axios.get(URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}
