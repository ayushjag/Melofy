import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js'

const addSong = async (req,res)=>{
    try {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        const { title, artist } = req.body;
        if (!req.files || !req.files.image || !req.files.audio) {
            return res.status(400).json({ success: false, message: "Missing files" });
        }






        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        console.log("Uploading to Cloudinary...");
        const audioUpload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"})
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`

        // console.log(name,desc,album,audioUpload,imageUpload)
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();
        
        res.json({success:true,message:"Song Added"})
    } catch (error) {
        console.error("Error adding song:", error);
        res.status(500).json({ success: false, message: error.message || "Internal Server Error" })

        // res.json({success:false});
    }
}

const listSong = async (req,res)=>{
    try {
        const allSongs = await songModel.find({});
        res.json({success:true,songs:allSongs});
    } catch (error) {
        res.json({success:false});
    }
}

const removeSong = async (req,res)=>{
    try {
        await songModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Song Removed"})
    } catch (error) {
        res.json({success:false});
    }
}

export {addSong,listSong,removeSong}