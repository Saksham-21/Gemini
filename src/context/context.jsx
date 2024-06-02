import { createContext, useState } from "react";
import runChat from "../config/gemini";
import { db } from "../config/config";
import { collection, getDocs, updateDoc ,arrayUnion} from "firebase/firestore";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [user_N, setUser] = useState();
  const [picURL, setpicURL] = useState();
  const [email, setEmail] = useState();
  const [extended, setExtended] = useState(false);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  async function addPrompt(prompt) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data["emailId"] === email) {
        await updateDoc(doc.ref, {
          prePrompt: arrayUnion(prompt), 
        });
        console.log("Added!!");
      }
    });
  }
  const onSent = async (prompt) => {
    console.log("Prompt: ", prompt);
    
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
      addPrompt(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      addPrompt(input);  
      response = await runChat(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br/>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setResultData(newResponse2);
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    user_N,
    setUser,
    picURL,
    setpicURL,
    email,
    setEmail,
    extended,
    setExtended,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export const setttUser = (value) => {
  setUser(value);
};

export const setttEmail = (value) => {
  setEmail(value);
};
export const setttPrevPrompt = (value) => {
  setPrevPrompt(value);
};

export const setttpicURL = (value) => {
  setpicURL(value);
};
export default ContextProvider;
