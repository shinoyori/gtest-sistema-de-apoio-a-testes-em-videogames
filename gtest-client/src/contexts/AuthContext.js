import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth.service'; 

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = AuthService.getCurrentUser();
        if (storedUser && storedUser.jwt){
            setUser(storedUser);
            setIsAuthenticated(true);
            // Implementar timeout do login no futuro
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        try{
            const userData = await AuthService.login(username, password);
            setUser(UserData);
            setIsAuthenticated(true);
            return true;
        }
        catch (error){
            setUser(null);
            setIsAuthenticated(false);
            throw error;
        }
    }

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}