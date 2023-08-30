import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Interviewers from "./components/Interviewers";
import { Toaster } from "react-hot-toast";
import Booking from "./components/Booking";
import MyInterviews from "./components/MyInterviews";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-2 md:p-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/interviewers/" element={<Interviewers />} />
          <Route path="/interviewers/:intvrId/:date" element={<Booking />} />
          <Route path="/my-interviews" element={<MyInterviews />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
