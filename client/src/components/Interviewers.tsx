import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";
import InterviewerCard from "./InterviewerCard";

const Interviewers = () => {
  let [searchParams, _] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [intrvs, setIntrvs] = useState<any>([]);
  const date = searchParams.get("date");
  const fetchIntrvs = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:4000/api/intvr/${date}`);
    const data = await res.json();
    setIntrvs(data.intrvs);
    setLoading(false);
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
      <div className="flex flex-wrap">
        {loading && <Spinner />}
        {intrvs.length > 0 &&
          intrvs.map((intrvr: any, idx: any) => {
            return (
              <InterviewerCard
                key={idx}
                data={intrvr}
                _id={intrvr._id}
                date={date!}
              ></InterviewerCard>
            );
          })}
      </div>
    </>
  );
};

export default Interviewers;
