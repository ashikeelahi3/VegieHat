import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check if a user session exists
    const loadUser = async () => {
      const savedUser = await SecureStore.getItemAsync("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    loadUser();
  }, []);

  const login = async (email: string) => {
    setUser({ email });
    await SecureStore.setItemAsync("user", JSON.stringify({ email }));
  };

  const logout = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
