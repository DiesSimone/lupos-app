//file to memorize variables between all frontend
import { createContext } from 'react'
import { useState } from 'react';

interface AuthProviderProps {
    children: React.ReactNode
}

//creating the context which will contain all the data needed across the entire app
export const AuthContext = createContext<{
    accessToken: string;
    setAccessToken: (value: string) => void;
    UpdateToken: (newAccessToken: string) => void
} | null>(null);


//creating the element which will wrap the entire APP, so data can be retrieved across all application
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState("")

    function UpdateToken(newAccessToken: string): void {
        setAccessToken(newAccessToken)
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, UpdateToken }}>
            {children}
        </AuthContext.Provider>
    )
}