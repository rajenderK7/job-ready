import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Interviewers from "./components/Interviewers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-2 md:p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/interviewers/" element={<Interviewers />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
