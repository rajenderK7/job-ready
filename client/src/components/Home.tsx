import { Link } from "react-router-dom";
import Calender from "./CustomCalendar";
import { useState } from "react";
import moment from "moment";

const Home = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col items-center justify-center md:mt-6">
      <h1 className="font-extrabold text-3xl md:text-5xl text-pink-600">
        Get Job Ready
      </h1>
      <section className="text-xl md:text-2xl text-slate-600 my-4 text-center font-medium">
        <h2>
          Book <span className="text-pink-600 font-bold">1-1</span> mock
          interview with working professionals
        </h2>
        <h2>Start now by choosing a date</h2>
      </section>
      <section className="max-w-xl flex flex-col items-center">
        <Calender date={date} setDate={setDate} />
        <p className="my-3 font-medium text-center">
          Click on Continue to find available professionals on{" "}
          <strong>{date.toDateString()}</strong>
        </p>
        <Link
          to={`/interviewers?date=${moment(date).format("YYYY-MM-DD")}`}
          className="w-xl  text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Continue
        </Link>
      </section>
    </div>
  );
};

export default Home;
