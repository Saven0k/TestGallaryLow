import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { jwtConfig } from '../config/jwt';
import { RegisterArtistData, RegisterGuestData, LoginData, AuthResponse, JwtPayload } from '../types/auth';
import { Prisma } from '@prisma/client';

export class AuthService {
    private static async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

    private static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    private static generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn as number
        });
    }

    static verifyToken(token: string): JwtPayload {
        return jwt.verify(token, jwtConfig.secret) as JwtPayload;
    }

    static async registerArtist(data: RegisterArtistData): Promise<AuthResponse> {
        try {
            const existingArtist = await prisma.artist.findUnique({
                where: { email: data.email }
            });

            if (existingArtist) {
                return {
                    success: false,
                    message: 'Художник с таким email уже есть'
                };
            }

            const hashedPassword = await this.hashPassword(data.password);

            const artist = await prisma.artist.create({
                data: {
                    ...data,
                    password: hashedPassword,
                    date_birthday: new Date(data.date_birthday),
                }
            });

            const token = this.generateToken({
                userId: artist.id,
                email: artist.email,
                userType: 'artist'
            });

            return {
                success: true,
                message: 'Художник успешно зарегистрирован',
                user: {
                    id: artist.id,
                    email: artist.email,
                    name: `${artist.name} ${artist.surname}`,
                    userType: 'artist'
                },
                token
            };
        } catch (error) {
            console.error('Ошибка регистрации художника:', error);
            return {
                success: false,
                message: 'Не получилось зарегестрировать художника'
            };
        }
    }

    static async registerGuest(data: RegisterGuestData): Promise<AuthResponse> {
        try {
            const existingGuest = await prisma.guest.findFirst({
                where: { email: data.email }
            });

            if (existingGuest) {
                return {
                    success: false,
                    message: 'Гость с таким email уже существует'
                };
            }

            const hashedPassword = await this.hashPassword(data.password);

            const guest = await prisma.guest.create({
                data: {
                    ...data,
                    password: hashedPassword,
                } as Prisma.GuestCreateInput
            });

            const token = this.generateToken({
                userId: guest.id,
                email: guest.email,
                userType: 'guest'
            });

            return {
                success: true,
                message: 'Гость успешно зарегестрирован',
                user: {
                    id: guest.id,
                    email: guest.email,
                    name: `${guest.name} ${guest.second_name}`,
                    userType: 'guest'
                },
                token
            };
        } catch (error) {
            console.error('Регистрация гостя не произошла:', error);
            return {
                success: false,
                message: 'Ошибка регистрации гостя'
            };
        }
    }

    static async login(data: LoginData): Promise<AuthResponse> {
        try {
            let user: any = null;
            let userType: 'artist' | 'guest' = data.userType;

            if (data.userType === 'artist') {
                user = await prisma.artist.findUnique({
                    where: { email: data.email }
                });
            } else {
                user = await prisma.guest.findFirst({
                    where: { email: data.email }
                });
            }

            if (!user) {
                return {
                    success: false,
                    message: 'Пользователь не найден'
                };
            }
            const isPasswordValid = await this.comparePassword(data.password, user.password);

            if (!isPasswordValid) {
                return {
                    success: false,
                    message: 'Проверьте данные'
                };
            }

            const token = this.generateToken({
                userId: user.id,
                email: user.email,
                userType
            });

            return {
                success: true,
                message: 'Авторизация прошла успешно',
                user: {
                    id: user.id,
                    email: user.email,
                    name: userType === 'artist' ? `${user.name} ${user.surname}` : `${user.name} ${user.second_name}`,
                    userType
                },
                token
            };
        } catch (error) {
            console.error('Ошибка в авторизации:', error);
            return {
                success: false,
                message: 'Не прошла авторизация'
            };
        }
    }

    static async logout(): Promise<AuthResponse> {
        return {
            success: true,
            message: 'Выход из акаунта прошел успешно'
        };
    }

    static async getCurrentUser(token: string): Promise<AuthResponse> {
        try {
            const decoded = this.verifyToken(token);

            let user: any = null;

            if (decoded.userType === 'artist') {
                user = await prisma.artist.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        surname: true,
                        avatar_path: true
                    }
                });
            } else {
                user = await prisma.guest.findUnique({
                    where: { id: decoded.userId },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        second_name: true
                    }
                });
            }

            if (!user) {
                return {
                    success: false,
                    message: 'Пользователь не найден'
                };
            }

            return {
                success: true,
                message: 'Пользователь найден',
                user: {
                    id: user.id,
                    email: user.email,
                    name: decoded.userType === 'artist' ? `${user.name} ${user.surname}` : `${user.name} ${user.second_name}`,
                    userType: decoded.userType
                }
            };
        } catch (error) {
            return {
                success: false,
                message: 'Невалидный токен'
            };
        }
    }
}