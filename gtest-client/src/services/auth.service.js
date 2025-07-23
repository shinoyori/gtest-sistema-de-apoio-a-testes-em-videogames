import axios from 'axios';

// Base URL for your Spring Boot backend API
// Ensure this matches your backend's application.properties or configuration
const API_URL = 'http://localhost:8080/api/auth/'; // Default Spring Boot port is 8080

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + 'login', {
        login: username, // 'login' matches the field in AuthenticationRequest.java
        senha: password, // 'senha' matches the field in AuthenticationRequest.java
      });

      if (response.data.jwt) {
        // Store the JWT in local storage upon successful login
        localStorage.setItem('user', JSON.stringify(response.data));
        // You might also want to set an Authorization header for future requests here or in an Axios interceptor
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error; // Re-throw to be handled by the component
    }
  }

  logout() {
    // Remove the user from local storage
    localStorage.removeItem('user');
    // Optionally, clear any axios default headers for authorization
  }

  getCurrentUser() {
    // Retrieve the user (with JWT) from local storage
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();