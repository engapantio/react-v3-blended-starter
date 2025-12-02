import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
export const getUserInfo = async (latitude: number, longitude: number): Promise<string> => {
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=en`;

  const { data } = await axios.get(urlPosition);

  return data.results[0].annotations.currency.iso_code;
};
