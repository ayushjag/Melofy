import express from "express"
import { addToPlaylist,removeFromPlaylist,getPlaylist } from "../controllers/playlistController.js";
import authMiddleware from "../middleware/auth.js";

const playlistRouter = express.Router();

playlistRouter.post("/add",authMiddleware,addToPlaylist)
playlistRouter.post("/remove",authMiddleware,removeFromPlaylist)
playlistRouter.post("/get",authMiddleware,getPlaylist)

export default playlistRouter 