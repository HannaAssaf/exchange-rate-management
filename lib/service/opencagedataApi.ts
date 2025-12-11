import axios from 'axios';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type OpencageCurrency = {
  iso_code: string;
  name: string;
  symbol: string;
};
type OpencageResault = {
  annotations: {
    currency: OpencageCurrency;
  };
};

type OpencageResponse = {
  results: OpencageResault[];
};

export const getUserInfo = async ({
  latitude,
  longitude,
}: Coordinates): Promise<OpencageResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get<OpencageResponse>(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
