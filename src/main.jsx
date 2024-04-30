import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/context.jsx";
// import { Auth0Provider } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBKYwfrtFZ0G90r0JBzHZLF4Qe9HUZPtQI",
  authDomain: "gemini-ba5ab.firebaseapp.com",
  projectId: "gemini-ba5ab",
  storageBucket: "gemini-ba5ab.appspot.com",
  messagingSenderId: "625419369559",
  appId: "1:625419369559:web:dc0911565d5c429a0c7712",
  measurementId: "G-2B2PY619FT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
ReactDOM.createRoot(document.getElementById("root")).render(
  // <Auth0Provider
  //   domain="dev-rs368k5fp261f7yj.us.auth0.com"
  //   clientId="morI5HaTu5ac8XZg5J0aOzb0PKYj9RkV"
  //   authorizationParams={{
  //     redirect_uri: "http://localhost:5173/main",
  //   }}
  // >
    <ContextProvider>
      <App />
    </ContextProvider>
  // </Auth0Provider>
);

export { auth, provider };
