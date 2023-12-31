import { Link } from "react-router-dom";

export interface UserI {
  firstName: String;
  lastName?: String;
  email: String;
}

interface InterviewerI extends UserI {
  image: string;
  company: string;
  role: string;
  experience: number;
  duration?: string;
  availFromDate: Date;
  availUntilDate: Date;
}

interface InterviewerCardProps {
  data: InterviewerI;
  date: string;
  _id: string;
}

const InterviewerCard = ({ data, date, _id }: InterviewerCardProps) => {
  const DImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg/330px-John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg";

  return (
    <Link
      to={`/interviewers/${_id}/${date}`}
      className="flex h-40 p-2 rounded-md shadow-md my-3 lg:mr-4 border border-pink-200 w-full  lg:w-1/3"
    >
      {/* Image - C1 */}
      <img
        className="w-28 h-full mr-2 rounded-md"
        src={DImage}
        alt={"SOMETHING"}
      />
      {/* Info - C2 */}
      <div className="flex flex-col">
        <h1 className="text-pink-600 font-semibold text-lg">
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-gray-600 text-sm">
          {data.role}, {data.company}
        </p>
        <p className="text-gray-600 text-sm">
          Experience: {data.experience} years
        </p>
        <p className="text-gray-600 text-sm">
          Available from: {new Date(data.availFromDate).toDateString()}
        </p>
        <p className="text-gray-600 text-sm">
          Available until: {new Date(data.availUntilDate).toDateString()}
        </p>
      </div>
    </Link>
  );
};

export default InterviewerCard;
