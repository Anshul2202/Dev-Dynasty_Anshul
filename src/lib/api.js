import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getApiErrorMessage(error, fallbackMessage = 'Something went wrong.') {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === 'ECONNABORTED') {
    return 'The request took too long. Please try again.';
  }

  if (error.message === 'Network Error') {
    return 'Cannot reach the backend server. Make sure the API is running on port 5000.';
  }

  return error.message || fallbackMessage;
}

export default api;
