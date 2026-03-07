//file to memorize variables between all frontend
import { createContext } from 'react'
import { useState } from 'react';

interface AuthProviderProps {
    children: React.ReactNode
}

//creating the context of the thing
export const AuthContext = createContext<{
    accessToken: string;
    setAccessToken: (value: string) => void;
    UpdateToken: (newAccessToken: string) => void
} | null>(null);


//creating the element which we will pass the token (a wrapper currently), so it can be memorized
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