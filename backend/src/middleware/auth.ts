import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
        userType: 'artist' | 'guest';
    };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Не доступно'
        });
    }

    try {
        const decoded = AuthService.verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Не валидный токен'
        });
    }
};

// Middleware для проверки роли
export const requireArtist = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.userType !== 'artist') {
        return res.status(403).json({
            success: false,
            message: 'Доступ только для художника'
        });
    }
    next();
};

export const requireGuest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.userType !== 'guest') {
        return res.status(403).json({
            success: false,
            message: 'Доступ для художника гостя'
        });
    }
    next();
};