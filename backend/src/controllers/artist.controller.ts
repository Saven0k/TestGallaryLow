import { Request, Response } from 'express';
import { ArtistService } from "../services/artist.service";
import { CreateArtistData } from "../types";
import { AuthenticatedRequest } from '../middleware/auth';

export class ArtistController {

    static async createArtist(req: Request, res: Response) {
        try {
            const artistData: CreateArtistData = req.body;
            if (!artistData.email || !artistData.email.includes('@')) {
                return res.status(400).json({
                    error: "Email is not valid"
                });
            }

            const artist = await ArtistService.createArtist(artistData);
            res.status(201).json({ artist });
        } catch (e) {

            console.error('Ошибка сервера:', e);
            res.status(500).json({
                error: "Ошибка сервера"
            });
        }
    }

    static async getAllArtists(req: Request, res: Response) {
        try {
            const artists = await ArtistService.getAllArtists();
            res.json(artists)
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера на получение художников",
            })
        }
    }

    static async getArtistById(req: Request, res: Response) {
        try {
            const artist = await ArtistService.getArtistById(req.params.id)

            if (!artist) {
                return res.status(404).json({
                    error: "Артист не найден"
                })
            }
            res.json(artist)
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера на получения художника по id"
            })
        }
    }

    static async updateArtist(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const artistData = await ArtistService.updateArtist(id, updateData);

            res.json(artistData)
        } catch (e) {
            res.status(400).json({
                error: "Ошибка сервера на обновление информации о художнике"
            })
        }
    }

    static async deleteArtist(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ArtistService.deleteArtist(id);

            res.status(204).send();
        } catch (e) {
            res.status(400).json({
                error: "Ошибка сервера на удаление информации о художники"
            })
        }
    }

    static async getPaintingsByCurrentArtist(req: AuthenticatedRequest, res: Response) {
        try {
            const artistId = req.user!.userId;
            const paintings = await ArtistService.getPaintingsByArtist(artistId);
            res.json(paintings);
        } catch (error) {
            res.status(500).json({
                error: 'Ошибка сервера при получении картин',
            });
        }
    }
}