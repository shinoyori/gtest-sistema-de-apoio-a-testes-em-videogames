import axios from 'axios';

// URL para a API
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + 'login', {
        login: username, 
        senha: password,
      });

      if (response.data.jwt) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();