import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const accessSecret: string = process.env.ACCESS_TOKEN_SECRET!
const refreshSecret: string = process.env.REFRESH_TOKEN_SECRET!

//extending the original request type with an interface, adding the user with all its properties
export interface AuthRequest extends Request {
    user?: {
        _id: string,
        username: string,
        email: string,
        password: string,
        created_at: Date
    }
}

export async function AuthenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] //getting the authorization header

    //splitting the header from the bearer, to the actual token and getting the token
    const token = authHeader && authHeader.split(' ')[1]; 
    console.log(`token: ${token}`)
    if (token == null) return res.status(401).json({ message: "No token found" });

    //verifying the token -> getting the user if its valid
    jwt.verify(token, accessSecret, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user as any
        next()
    })
}