import axios from "axios";

//const PEXELS_KEY = import.meta.env.VITE_API_KEY;
const PEXELS_KEY = "sE0yFL3pGimBe5AnItmUAgWNYaW6b0AabfTAlzy9z44YnYKPEVeUjYNt";
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = PEXELS_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string) => {
  const response = await axios.get(`search?query=${query}`);

  return response.data.photos;
};
