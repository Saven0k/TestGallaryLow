import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterArtistData, RegisterGuestData, LoginData } from '../types/auth';

export class AuthController {
    static async registerArtist(req: Request, res: Response) {
        try {
            const artistData: RegisterArtistData = req.body;

            if (!artistData.email || !artistData.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Електронная почта и пароль  обязательны'
                });
            }

            if (artistData.password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Пароль должен быть больше 6 символов'
                });
            }

            const result = await AuthService.registerArtist(artistData);

            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка от сервера при регистрации'
            });
        }
    }

    static async registerGuest(req: Request, res: Response) {
        try {
            const guestData: RegisterGuestData = req.body;

            if (!guestData.email || !guestData.password) {
                return res.status(400).json({
                    success: false,
                    message: 'Электронная почта и пароль обязательны'
                });
            }

            if (guestData.password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: 'Пароль должен быть больше 6 символов'
                });
            }

            const result = await AuthService.registerGuest(guestData);

            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error('Гость не смог зарегестрироватся:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка от сервера при регистрации'
            });
        }
    }

    // Авторизация
    static async login(req: Request, res: Response) {
        try {
            const loginData: LoginData = req.body;

            // Валидация
            if (!loginData.email || !loginData.password || !loginData.userType) {
                return res.status(400).json({
                    success: false,
                    message: 'Электронная почта и пароль обязательны'
                });
            }

            if (!['artist', 'guest'].includes(loginData.userType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Войти может или художник или гость'
                });
            }

            const result = await AuthService.login(loginData);

            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(401).json(result);
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка от сервера при авторизации'
            });
        }
    }


    static async logout(req: Request, res: Response) {
        try {
            const result = await AuthService.logout();
            res.status(200).json(result);
        } catch (error) {
            console.error('Ошибка выхода:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка от сервера, не прошел выход'
            });
        }
    }

    static async getCurrentUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Нету токена'
                });
            }

            const result = await AuthService.getCurrentUser(token);

            if (result.success) {   
                res.status(200).json(result);
            } else {
                res.status(401).json(result);
            }
        } catch (error) {
            console.error('Ошибка получения пользователя:', error);
            res.status(500).json({
                success: false,
                message: 'Ошибка сервера получения'
            });
        }
    }
}