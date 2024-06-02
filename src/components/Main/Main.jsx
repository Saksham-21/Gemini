import React, { useContext,useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { useAuth0 } from "@auth0/auth0-react";
import { isMobile } from 'react-device-detect';
import Sidebar from "../Sidebar/Sidebar";
// import {setExtended} from "../Sidebar/Sidebar";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    user_N,
    picURL,
    setExtended,
  } = useContext(Context);
  const [phone,isPhone]=useState(false);
  // setExtended(false);
  const { user, isAuthenticated } = useAuth0();
  const handleClick=()=>{
    console.log("trueeee");
    setExtended((prev) => !prev)
  }
  return (
    <div className="main">
      <div className="nav">
        {isMobile ? <p onClick={handleClick}>Gemini</p> : <p>Gemini</p>}
        {/* {isAuthenticated ? <img src={picURL} alt="" />:<img src={assets.user_icon} alt="" />} */}
        <img src={picURL} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                {/* {isAuthenticated ? <span>Hello, {JSON.stringify(user.name)}</span>:<span>Hello, Dev</span>} */}
                <span>Hello, {JSON.stringify(user_N)}</span>
                {/* {isAuthenticated ? <span>Hello, {JSON.stringify(user_N)}</span>:<span>Hello, Dev</span>} */}
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={picURL} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
