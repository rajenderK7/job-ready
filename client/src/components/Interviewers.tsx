import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Interviewers = () => {
  let [searchParams, _] = useSearchParams();
  const [intrvs, setIntrvs] = useState([]);
  const date = searchParams.get("date");
  const fetchIntrvs = async () => {
    const res = await fetch(`http://localhost:4000/intvr/${date}`);
    const data = await res.json();
    setIntrvs(data.intrvs);
  };
  useEffect(() => {
    fetchIntrvs();
  }, []);
  return (
    <>
      <h1 className="text-pink-600 font-medium text-xl text-center md:text-start">
        Interviewers available on {date}
      </h1>
      <hr className="mt-3" />
      <div className="flex flex-col items-center"></div>
    </>
  );
};

export default Interviewers;
