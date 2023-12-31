import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "../state/auth";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { Link, useNavigate } from "react-router-dom";

const MyInterviews = () => {
  const user = useRecoilValue(authAtom);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [currDate, setCurrDate] = useState("");
  const navigate = useNavigate();

  const withdrawInterviewHandler = async (id: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/booking/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    const data = await res.json();
    if (data.message !== "success") {
      toast.error("Something went wrong");
      return;
    }
    setBookings((prev) => {
      return prev.filter((data: any) => data._id !== id);
    });
    toast.success("Interview withdrawn successfully");
    return;
  };

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/booking/user/${user._id}`
    );
    const data = await res.json();
    if (data.message !== "success") {
      toast.error("Could not fetch bookings");
      return;
    }
    setBookings(data.bookings);
    setLoading(false);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/", {
        replace: true,
      });
    }
    fetchBookings();
    setCurrDate(Date.now().toString());
  }, []);

  return (
    <div>
      <h1 className="font-bold text-pink-600 text-xl">My interviews</h1>
      {loading && (
        <p className="text-center">
          <Spinner />
        </p>
      )}
      <hr className="my-3" />
      {!loading && bookings.length === 0 && (
        <div className="text-sm lg:text-base font-medium">
          <p>No active interviews. Please visit home page and schedule one.</p>
          <Link to="/" className="text-blue-600 underline">
            Home
          </Link>
        </div>
      )}
      {bookings.length > 0 &&
        bookings.map((booking: any) => {
          const date = new Date(booking.date);
          const expired = date.toDateString() < currDate;
          return (
            <div
              key={booking._id}
              className="p-2 flex justify-between rounded-md shadow-md my-3 lg:mr-4 border border-pink-300 w-full lg:w-3xl"
            >
              <div>
                <h1 className="text-lg font-semibold">
                  Interviewer:{" "}
                  <span className="text-pink-600">
                    {booking.intvrId.firstName} {booking.intvrId.lastName}
                  </span>
                </h1>
                <div className="font-medium text-sm">
                  <p>Date: {new Date(booking.date).toDateString()}</p>
                  <p>Time (from): {booking.timeFrom} Hrs</p>
                  <p>Duration: {booking.halfHour ? "30 minutes" : "1 hour"}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => withdrawInterviewHandler(booking._id)}
                  className="mr-3 text-white disabled:bg-gray-400  bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={loading || expired}
                >
                  {expired ? "Expired" : "Cancel interview"}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyInterviews;
