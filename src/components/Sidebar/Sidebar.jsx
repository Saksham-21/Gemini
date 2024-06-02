import React, { useState,useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const Sidebar = () => {
  // const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt,newChat,extended,setExtended} = useContext(Context);

  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
          className="menu imgg"
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" className="imgg"/>
          {extended && <p>New Chat</p>}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => {
              return (
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" className="imgg"/>
                  <p key={index}>{item.slice(0,18)}..</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" className="imgg"/>
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" className="imgg"/>
          {extended && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" className="imgg"/>
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
