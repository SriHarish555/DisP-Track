import "./App.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";
import { Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import { StateProvider } from "./context/StateContext";
import reducer, { initialState } from "./context/StateReducer";
import RetrieveDetails from "./components/RetrieveDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="mainApp">
        <StateProvider initialState={initialState} reducer={reducer}>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<MainContent />}></Route>
            <Route path="/upload" element={<UploadForm />}></Route>
            <Route path="/retrieve" element={<RetrieveDetails />}></Route>
            <Route path="*" element={<MainContent />}></Route>
          </Routes>
        </StateProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;
