import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/signin`, formData, {
      withCredentials: true,
    });
    return response.data?.user;
  } catch (error: any) {
    console.error(error.response?.data?.message || 'signIn failed');
  }
};
export const signUp = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/signup`, formData, {
      withCredentials: true,
    });
    return response.data?.user;
  } catch (error: any) {
    console.error(error.response?.data?.message || 'signUp failed');
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/auth/fetchCurrentUser`, {
      withCredentials: true,
    });
    return response.data?.user || null;
  } catch (error: any) {
    console.error(error.response?.data?.message || 'fetchCurrentUser failed');
    return null;
  }
};
