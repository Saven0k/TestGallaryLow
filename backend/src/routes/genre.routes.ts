import { Router } from "express";
import { GenreController } from "../controllers/genre.controller";

const genreRouter = Router();

genreRouter.get("/", GenreController.getAllGenres)
genreRouter.get("/:id", GenreController.getGenreById)
genreRouter.post("/", GenreController.createGenre)
genreRouter.put("/:id", GenreController.updateGenre)
genreRouter.delete("/:id", GenreController.deleteGenre)


export default genreRouter;