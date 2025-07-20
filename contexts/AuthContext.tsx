import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthContextType, ExchangePreferences, RoomLocation } from '../types';
import { api } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load authentication state from localStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Optionally verify token with backend
          try {
            const currentUser = await api.get<User>('/user/me');
            setUser(currentUser);
          } catch (error) {
            console.log("Token invalid, clearing stored data");
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await api.get<User>('/user/me');
      setUser(userData);
      // Update localStorage with fresh user data
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log("No authenticated user found or session expired.");
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.post<{ user: User; token: string }>('/auth/login', { email, password });
      
      // Extract token and user from response
      const { token, user: userData } = response;
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to be caught by the form
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithUserData = useCallback((user: User, token?: string) => {
    setUser(user);
    // If token is provided, store it
    if (token) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string, gender: User['gender'], whatsappNumber: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.post<{ user: User; autoLogin: boolean; token?: string }>('/auth/register', { email, password, fullName, gender, whatsappNumber });
      
      // If autoLogin is true and token is provided, set the user immediately
      if (response.autoLogin && response.user && response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      }
      // Registration successful
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.log("Logout request failed, but proceeding with client-side logout.");
    } finally {
      // Clear all authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);
  
  const updateUserPreferences = useCallback(async (prefs: ExchangePreferences) => {
    const updatedUser = await api.patch<User>('/user/preferences', prefs);
    setUser(updatedUser);
    // Update localStorage with fresh user data
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);

  const updateUserDetails = useCallback(async (detailsToUpdate: Partial<Pick<User, 'fullName' | 'rollNumber' | 'phoneNumber' | 'whatsappNumber' | 'gender'>>) => {
    const updatedUser = await api.patch<User>('/user/details', detailsToUpdate);
    setUser(updatedUser);
    // Update localStorage with fresh user data
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }, []);
  
  const refreshUser = useCallback(async () => {
    setLoading(true);
    await fetchUser();
  }, [fetchUser]);

  const setUserHasActiveListing = useCallback(async (status: boolean) => {
    // This is now derived from the user object fetched from the backend.
    console.log('Setting user has active listing:', status);
    await refreshUser();
  }, [refreshUser]);

  const updateUserRoom = useCallback(async (room: RoomLocation) => {
    // This logic is now handled by the backend when a listing is created/updated.
    // The user object is refreshed to get the latest state.
    console.log('Updating user room:', room);
    await refreshUser();
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithUserData, register, logout, updateUserRoom, updateUserPreferences, updateUserDetails, setUserHasActiveListing, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
