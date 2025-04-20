import playlistModel from "../models/playlistModel.js";
import userModel from "../models/userModel.js";
import songModel from "../models/songModel.js";

const addToPlaylist = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let playlistData = await userData.playlistData;
        if(!playlistData[req.body.itemId])
        {
            playlistData[req.body.itemId] = 1
        }else{
            playlistData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{playlistData})
        res.json({success:true,message:"Added to Playlist"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const removeFromPlaylist = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let playlistData = await userData.playlistData;
        if(playlistData[req.body.itemId]>0){
            playlistData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{playlistData})
        res.json({success:true,message:"Removed from Playlist"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const getPlaylist = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let playlistData = await userData.playlistData
        let songIds = Object.keys(playlistData).map(id => new mongoose.Types.ObjectId(id));;
        // let songs = await songModel.find({ _id: { $in: songIds } });
        res.json({success:true,playlistData,songIds})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addToPlaylist,removeFromPlaylist,getPlaylist}