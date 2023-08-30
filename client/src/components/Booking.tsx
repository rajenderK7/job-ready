import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useRecoilValue } from "recoil";
import bookingSlotsAtom from "../state/bookings";
import toast from "react-hot-toast";
import { authAtom } from "../state/auth";

interface SlotButtonProps {
  time: string;
  available: boolean;
}

interface LegendProps {
  cls: string;
}

const Legend = ({ cls }: LegendProps) => {
  return <span className={`${cls}`}></span>;
};

const Booking = () => {
  const { intvrId, date } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const bookingSlots = useRecoilValue(bookingSlotsAtom);
  const [slots, setSlots] = useState<any>([]);
  const [intvr, setIntvr] = useState<any>(null);
  const [halfHour, setHalfHour] = useState(false);
  const [choosenIdx, setChoosenIdx] = useState(-1);
  const user = useRecoilValue(authAtom);

  const DImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg/330px-John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg";

  const bookSlotHandler = async () => {
    if (choosenIdx < 0) {
      toast.error("Invalid slot selection");
      return;
    }
    const res = await fetch(`http://localhost:4000/api/booking`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        intvrId: intvr._id,
        date: date,
        timeFrom: bookingSlots[choosenIdx],
        timeUntil: bookingSlots[choosenIdx],
        halfHour: halfHour,
      }),
    });
    const data = await res.json();
    if (data.message !== "success") {
      toast.custom("Something went wrong!", {
        icon: "🥲",
      });
      return;
    }
    toast.success("Interview booked successfully");
    navigate("/my-interviews", {
      replace: true,
    });
    return;
  };

  const slotHandler = (idx: number, available: boolean) => {
    if (!available) return;
    setChoosenIdx(idx);
  };

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:4000/api/booking/interviewer/${intvrId}/${date}`
    );
    const intrvr = await res.json();
    if (intrvr.message !== "success") {
      navigate("/interviewers");
      return;
    }
    const t = bookingSlots.map((slot) => {
      return {
        time: slot,
        available:
          intrvr.bookings.findIndex(
            (b: any) => b.timeFrom === slot || b.timeUntil === slot
          ) === -1,
      };
    });
    setSlots(t);
    setLoading(false);
  };

  const fetchIntvr = async () => {
    const res = await fetch(`http://localhost:4000/api/intvr/one/${intvrId}/`);
    const data = await res.json();
    setIntvr(data.intvr);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
      return;
    }
    fetchBookings();
    fetchIntvr();
  }, []);
  return (
    <div>
      {loading && <Spinner />}
      {slots.length > 0 && intvr && (
        <>
          <div className="flex md:h-40 p-2 rounded-md shadow-md my-3 lg:mr-4 border border-pink-200 lg:max-w-2xl">
            <img
              className="w-24 md:w-28 h-full mr-2 rounded-md"
              src={DImage}
              alt={"SOMETHING"}
            />
            {/* Interviewer Info */}
            <div className="flex flex-col justify-between">
              <h1 className="text-pink-600 font-bold text-xl">
                {intvr.firstName} {intvr.lastName}
              </h1>
              <div className="font-medium text-sm md:text-base">
                <p className="text-gray-600">
                  {intvr.role}, {intvr.company}
                </p>
                <p className="text-gray-600">
                  Experience: {intvr.experience} years
                </p>
                <p className="text-gray-600">
                  Available from: {new Date(intvr.availFromDate).toDateString()}
                </p>
                <p className="text-gray-600">
                  Experience: {new Date(intvr.availUntilDate).toDateString()}
                </p>
              </div>
            </div>
          </div>
          {/* Available slots */}
          <p className="text-sm font-medium">Choose from the below slots</p>
          <div className="flex flex-wrap justify-between lg:justify-normal lg:max-w-2xl">
            {slots.map((slot: SlotButtonProps, idx: any) => {
              return (
                <button
                  key={idx}
                  onClick={() => slotHandler(idx, slot.available)}
                  type="button"
                  disabled={!slot.available}
                  className={`p-2 text-sm my-2 lg:mr-2 rounded-md 
                  ${
                    slot.available
                      ? choosenIdx == idx
                        ? "border bg-pink-500 text-white hover:bg-pink-300"
                        : "border border-gray-600 bg-green-400 hover:bg-pink-300"
                      : "bg-slate-300"
                  }
                  `}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
          <div className="flex my-2 text-sm font-medium">
            <span className="flex items-center">
              Available
              <Legend cls="w-3 h-3 rounded-sm ml-1 flex justify-center items-center bg-yellow-300 empty:bg-green-400 border border-green-400" />
            </span>
            <span className="flex items-center ml-3">
              Selected
              <Legend cls="w-3 h-3 rounded-sm ml-1 flex justify-center items-center bg-yellow-300 empty:bg-pink-500" />
            </span>
            <span className="flex items-center ml-3">
              Unavaiable
              <Legend cls="w-3 h-3 rounded-sm ml-1 flex justify-center items-center bg-yellow-300 empty:bg-slate-300" />
            </span>
          </div>
          <button
            onClick={() => setChoosenIdx(-1)}
            className="py-1 px-2 mb-5 rounded-md text-sm bg-black text-white"
          >
            Clear
          </button>
          <div className="flex items-center mb-4">
            <input
              id="halfHour-checkbox"
              type="checkbox"
              value="halfHour"
              onChange={(e: any) => setHalfHour(e.target.checked)}
              className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:text-pink-600"
            />
            <label
              htmlFor="halfHour-checkbox"
              className="ml-2 text-sm font-medium"
            >
              Half hour interview? (Not checking this defaults to 1 hour
              interview)
            </label>
          </div>
          <div>
            {choosenIdx !== -1 && (
              <div className="border border-pink-300 shadow-md w-fit p-3 rounded-md font-semibold ">
                <p className="">
                  Selected slot:{" "}
                  <span className="text-pink-600">
                    {new Date(date!).toDateString()}, {bookingSlots[choosenIdx]}{" "}
                    Hrs
                  </span>
                </p>
                <p>
                  Duration:{" "}
                  <span className="text-pink-600">
                    {halfHour ? "30 Minutes" : "1 Hour"}
                  </span>
                </p>
                <button
                  onClick={bookSlotHandler}
                  className="mt-3 text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={loading}
                >
                  Book slot
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
