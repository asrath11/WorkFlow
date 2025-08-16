import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signIn = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/signin`, formData);
    return response.data?.user;
  } catch (error) {
    console.error(error);
  }
};
export const signUp = async (formData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/signup`, formData);
    return response.data?.user;
  } catch (error) {
    console.error(error);
  }
};
