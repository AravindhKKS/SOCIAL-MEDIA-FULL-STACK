import { useContext, useRef, useState } from "react";
import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
  const {user} = useContext(AuthContext)
  const [file,setFile] = useState(null)
  const desc = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const BASE_URL = process.env.REACT_APP_BASE_URL


  const handleSubmit =async (e) => {
    e.preventDefault()
    const newPost = {
    userId:user._id,
    desc:desc.current.value
    }
    if(file){
      const datas = new FormData()
      const fileName = file.name
      datas.append("file",file)
      datas.append("name",fileName)
      try{
       const res =  await axios.post(BASE_URL +'/upload',datas)
       newPost.img = res.data.fileName
      }catch(err){
        console.log(err + '.')
      }
    }
    try{
      await axios.post(BASE_URL + '/posts', newPost)
      window.location.reload()
    }catch(err){
      console.log(err + '.')
    } }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "noavatar.jpg"} alt="" />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
             <img src={URL.createObjectURL(file)} className="shareImg" alt="" style={{opacity:9}} />   {/* */}
            <Cancel  className="cancelShareImg" onClick={() => setFile(null)}/> 
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input type="file" style={{display:'none'}} id="file" accept=".png, .jpeg, .jpg" onChange={(e) =>setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
      </form>
        </div>
    </div>
  );
}
