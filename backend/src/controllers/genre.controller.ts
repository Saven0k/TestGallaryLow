import { Response, Request } from "express";
import { GenreService } from "../services/genre.service";

export class GenreController {
    static async createGenre(req: Request, res: Response) {
        try {
            const title = req.body;
            const genre = await GenreService.createGenre(title);
            res.status(201).json({
                genre,
            })
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера при создании жанра"
            })
        }
    }

    static async updateGenre(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const genre = await GenreService.updateGenre(id, title);

            res.json(genre)
        } catch (e) {
            res.status(400).json({
                error: "Ошибка сервера при обновлении жанра"
            })
        }
    }
    static async getAllGenres(req: Request, res:Response){
        try {
            const genres = await GenreService.getAllGenres();
            res.status(201).json({
                genres
            })
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера при получении всех жанров"
            })            
        }
    }

    static async getGenreById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const genre = await GenreService.getGenreById(id);
            if (!genre) {
                res.status(404).json({
                    error: "Запись о жанре не найдена",
                })
            }
            res.status(201).json({
                genre
            })
        } catch (e) {
            res.status(500).json({
                error: "Ошибка сервера при получении жанра по ID"
            })
        }
    }
    static async deleteGenre(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await GenreService.deleteGenre(id);
            res.status(204).send();
        } catch (e) {
            res.status(400).json({
                error: "Ошибка сервера при удалении жанра"
            })
        }
    }
}