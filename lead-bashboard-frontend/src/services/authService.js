import api from './api';

const login = async (username, password) => {
  // Create the Basic Auth Token (Base64 encode username:password)
  const authdata = window.btoa(`${username}:${password}`);
  
  // Try to hit a protected endpoint to verify credentials
  try {
    const response = await api.get('/leads/analytics', {
        headers: { Authorization: `Basic ${authdata}` }
    });
    
    if (response.status === 200) {
        const user = { username, authdata };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};