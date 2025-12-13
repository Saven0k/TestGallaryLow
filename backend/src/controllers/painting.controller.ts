import { Response, Request } from 'express';
import { PaintingService } from '../services/painting.service';
export class PaintingController {
    static async createPainting(req: Request, res: Response) {
        try {
            const data = req.body
            const painting = await PaintingService.createPainting(data);

            res.status(201).json(painting);
        } catch (e) {
            res.status(400).json({
                error: 'Ошибка сервера при создании картины'
            })
        }
    }

    static async getAllPaintings(req: Request, res: Response) {
        try {
            const paintings = await PaintingService.getAllPaintings();
            res.status(201).json(paintings)
        } catch (e) {
            res.status(404).json({
                error: "Ошибка сервера при получении всех картин"
            })
        }
    }
    static async getPaintingById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const painting = await PaintingService.getPaintingById(id);
            if(!painting) {
                res.status(404).json({
                    error:" Ошибка сервера,  не найдена картина по id"
                })
            }
            res.status(201).json({
                painting
            })
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера в получении картины по id"
            })
        }
    }
    static async deletePainting(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await PaintingService.deletePainting(id);

            res.status(204).send()
        } catch (e) {
            res.status(400).json({
                error: 'Ошибка сервера в удалении картины'
            })
        }
    }
    static async updatePainting(req:Request, res:Response) {
        try {
            const {id} = req.params;
            const updateData = req.body;
            const patintingData = await PaintingService.updatePainting(id, updateData);

            res.status(201).json({
                patintingData
            })
        } catch (e) {
            res.status(400).json({
                error: "Ошибка сервера при обновлении картины"
            })           
        }
    }
}