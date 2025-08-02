import UserSession from '../models/userSession.model.js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// import crypto from 'crypto'; // Ensure this is imported

export const createUserSession = async (req, res) => {
    try {
        const alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 16;
        const randomBytes = crypto.randomBytes(length / 2).toString('hex');
        const randomString = Array.from({ length }, () => alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)]).join('');

        const token = randomBytes + randomString;

        console.log('Generated session ID:', token);

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        const domain = ["asksaurabh.xyz", "bigtimer.site","voidmail.fun","voidmail.info","voidmail.online","voidmail.shop"];
        const randomDomain = domain[Math.floor(Math.random() * domain.length)];
        console.log('Random domain selected:', randomDomain);

        const emailPrefixAlpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let emailPrefix = '';
        for (let i = 0; i < 8; i++) {
            emailPrefix += emailPrefixAlpha[Math.floor(Math.random() * emailPrefixAlpha.length)];
        }

        const email = `${emailPrefix}@${randomDomain}`;

        const session = await UserSession.create({
            sessionId: token,
            expiresAt,
            email
        });

        console.log('Session created in database:', session);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        console.log('Cookie set with sessionId:', token);

        return res.status(201).json({
            success: true,
            message: 'Session created successfully',
            data: {
                token,
                expiresAt,
                email
            }
        });

    } catch (error) {
        console.error('Error in createUserSession:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};




export const createEmail = async (req, res) => {
    try {
        // Get session ID from cookie or request body
        const token = req.cookies?.token || req.body?.token;

        console.log("I am token",token)

        console.log('Request cookies:', req.cookies);
        console.log('Request body:', req.body);
        console.log('Session ID from request:', token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No session found. Please create a session first.'
            });
        }

        // Find the user session
        const userSession = await UserSession.findOne({ sessionId: token });
        console.log('Found user session:', userSession);

        if (!userSession) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session. Please create a new session.'
            });
        }

        // // If user already has an email, return it
        // if (userSession.email) {
        //     return res.status(200).json({
        //         success: true,
        //         message: 'Email already exists for this session',
        //         data: {
        //             email: userSession.email
        //         }
        //     });
        // }

        // Define domains
        const domains = ["asksaurabh.xyz", "bigtimer.site","voidmail.fun","voidmail.info","voidmail.online","voidmail.shop"];
        const domain = domains[Math.floor(Math.random() * domains.length)];

        // Generate email prefix
        const prefix = crypto.randomBytes(4).toString('hex');
        console.log("I am prefix",prefix)
        const email = `${prefix}@${domain}`;

        // Update user session with email
        userSession.email = email;
        await userSession.save();

        return res.status(201).json({
            success: true,
            message: 'Email created successfully',
            data: {
                email
            }
        });
    } catch (error) {
        console.error('Error in createEmail:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};






