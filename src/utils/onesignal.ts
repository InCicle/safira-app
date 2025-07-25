import axios from 'axios';

const onesignal_api_key = import.meta.env.VITE_APP_ONE_SIGNAL_API_KEY;
const onesignal_app_id = import.meta.env.VITE_APP_ONE_SIGNAL_APP_ID;

export const updateOneSignalUser = (
  onesignal_id: string,
  incicle_userId: string,
) => {
  const api_url = `https://onesignal.com/api/v1/players/${onesignal_id}`;

  const data = {
    app_id: onesignal_app_id,
    external_user_id: incicle_userId,
  };

  const response = axios.put(api_url, data, {
    headers: {
      accept: '@/application/json',
      'content-type': '@/application/json',
      Authorization: onesignal_api_key,
    },
  });

  return response;
};
