import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom/dist/index.js";
import MainContent from "./components/MainContent.jsx";
import UploadForm from "./components/UploadForm.jsx";
import RetrieveDetails from "./components/RetrieveDetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainContent />}></Route>
      <Route path="/upload" element={<UploadForm />}></Route>
      <Route path="/retrieve" element={<RetrieveDetails />}></Route>
      <Route path="*" element={<MainContent />}></Route>
    </Routes>

    {/* <App /> */}
  </BrowserRouter>
);
