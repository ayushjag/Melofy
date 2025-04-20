import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        desc:{type:String,required:true},
        image:{type:String, required:true},
        duration:{type:String, required:true}
    }
)

const playlistModel = mongoose.models.playlist || mongoose.model("playlist",playlistSchema);

export default playlistModel;