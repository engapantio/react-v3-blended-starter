import axios from 'axios';

export interface Credentials {
  amount: number;
  from: string;
  to: string;
}

interface ConvertResponse extends Credentials {
  rate: number;
  result: number;
}

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;
const baseURL = 'https://api.apilayer.com/exchangerates_data';

export const convertCurrency = async (credentials: Credentials): Promise<ConvertResponse> => {
  const {
    data: { query, info, result },
  } = await axios.get(`${baseURL}/convert`, {
    params: credentials,
    headers: { apikey: apiKey! },
  });

  return { ...query, rate: info.rate, result };
};

export const getLatestRates = async (baseCurrency: string): Promise<[string, number][]> => {
  const { data } = await axios.get(`${baseURL}/latest`, {
    params: { base: baseCurrency },
    headers: { apikey: apiKey! },
  });

  return Object.entries(data.rates);
};
