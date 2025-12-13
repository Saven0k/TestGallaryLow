import { Request, Response } from 'express';
import { ExhibitionService } from '../services/exhibition.service';
export class ExhibitionController {
    static async getAllExhibition(req: Request, res: Response) {
        try {
            const exhibitions = await ExhibitionService.getAllExhibitions();
            res.json(exhibitions);
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера при получении всех выставок"
            })
        }
    }

    static async getExhibitionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exhibition = await ExhibitionService.getExhibitionById(id)

            if (!exhibition) {
                res.status(404).json({
                    error: "Ошибка на сервере, не найдена выставка"
                })
            }

            res.json({
                exhibition
            })
        } catch (e) {
            res.status(500).json({
                error: 'Ошибка при получении выставки по id'
            })
        }
    }

    static async createExhibition(req: Request, res: Response) {
        try {
            const exhibitionData = req.body;
            const exhibition = await ExhibitionService.createExhibition(exhibitionData);
            res.status(201).json({ exhibition })
        } catch (e) {
            res.status(500).json({
                error: "Ошибка на сервере, при создании выставки"
            })
        }
    }

    static async updateExhibition(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const exhibition = await ExhibitionService.updateExhibition(id, updateData);
            res.status(201).json({
                exhibition
            })
        } catch (e) {
            res.status(400).json({
                error: "Ошибка на сервере, при обновлении выставки"
            })
        }
    }

    static async deleteExhibition(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ExhibitionService.deleteExhibition(id)
            res.json(204).send();
        } catch (e) {
            res.status(400).json({ error: "Ошибка на сервере при удалении выставки" })
        }
    }
    static async addPaintingToExhibition(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { paintingId } = req.body;

            await ExhibitionService.addPaintingToExhibition(id, paintingId);
            res.status(200).json({ message: 'Картина добавлена на выставку' });
        } catch (error) {
            res.status(400).json({
                error: 'Ошибка на сервере при добавлении картины на выставку',
            });
        }
    }

    static async addGuestToExhibition(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { guestId } = req.body;

            await ExhibitionService.addGuestToExhibition(id, guestId);
            res.status(200).json({ message: 'Гость был добавлен на выставку' });
        } catch (error) {
            res.status(400).json({
                error: 'Ошибка сервера при добавлении гостя на выставку',
            });
        }
    }
}