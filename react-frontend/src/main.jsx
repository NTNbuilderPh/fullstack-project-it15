import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
<<<<<<< HEAD
import "../styles/App.css";
=======
import "./styles/app.css";
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
<<<<<<< HEAD
);
=======
);
>>>>>>> 5459ae8ba1721fc4b8a402ad82c6f3f154a225d7
