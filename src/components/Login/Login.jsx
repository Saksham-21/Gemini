import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { auth, provider, db } from "../../config/config";
import { signInWithPopup } from "firebase/auth";
import { Context } from "../../context/context";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setpicURL, setEmail, setPrevPrompt, email } = useContext(Context);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { email, photoURL, displayName } = result.user;
        setEmail(email);
        setpicURL(photoURL);
        setUser(displayName);
        checkUserExists(email);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const checkUserExists = async (email) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userExists = false;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data["emailId"] === email) {
        userExists = true;
        // data["prePrompt"] = prePrompt;
        const promptt = data["prePrompt"];
        setPrevPrompt(promptt);
        console.log("User already exists");
        navigate("main");
      }
    });

    if (!userExists) {
      await addDoc(collection(db, "users"), {
        emailId: email,
        prePrompt: [],
      });
      console.log("New user added");
      navigate("main");
    }
  };

  return (
    <div className="mainn">
      <div className="navv">
        <p className="p">Gemini</p>
        <button className="button" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
      <div className="center-content">
        <div className="left-content">
          <img src={assets.gemini_logo_main} alt="" className="img1" />
          <div className="l-content">
            <div className="p1">
              Supercharge your creativity and productivity
            </div>
            <div className="p2">
              Chat to start writing, planning, learning and more with Google AI
            </div>
          </div>
          <div className="button-main">
            <button className="button2" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
        </div>
        <div className="right-content">
          <img src={assets.reading_book} alt="" className="read_book" />
          <div className="read_p">
            <p>
              Give me a list of 5 well-known sci-fi books and show the results
              in a table with descriptions
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <span className="span1">Google</span>
        <span className="span2">Privacy and Terms</span>
      </div>
    </div>
  );
};

export default Login;
