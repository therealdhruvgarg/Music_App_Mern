import axios from 'axios';

export async function getItems(Name, limit) {
  const URL = `https://itunes.apple.com/search?term=${Name}&limit=${limit}`;
  try {
    const response = await axios.get(URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
}
  export const apiClient={
    get(){

    },
    async post(url,data){
      try{
        const response = await axios.post(url,data);
        return response;
      }catch(err){
        throw err;
      }
    },
    put(){

    },
  }