import { Router } from "express";
import { ArtistController } from "../controllers/artist.controller";
import { authenticateToken, requireArtist } from "../middleware/auth";

const artistRouter = Router()


// Публичные маршруты
artistRouter.get('/', ArtistController.getAllArtists);
artistRouter.get('/:id', ArtistController.getArtistById);

// Защищенные маршруты (только для авторизованных художников)
artistRouter.post('/', ArtistController.createArtist);
artistRouter.put('/:id', authenticateToken, requireArtist, ArtistController.updateArtist);
artistRouter.delete('/:id', authenticateToken, requireArtist, ArtistController.deleteArtist);

// Специальный маршрут для получения картин текущего художника
artistRouter.get('/me/paintings', authenticateToken, requireArtist, ArtistController.getPaintingsByCurrentArtist);
export default artistRouter;