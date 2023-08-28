import { InterviewerI } from "../../../server/src/models/Interviewer";

const InterviewerCard = (data: InterviewerI) => {
  const DImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg/330px-John_Carmack_at_GDCA_2017_--_1_March_2017_%28cropped%29.jpeg";

  return (
    <div className="flex h-40 p-2 rounded-md shadow-md my-3 lg:mr-4 border border-pink-200 w-full  lg:w-1/3">
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
          Experience: {new Date(data.availUntilDate).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default InterviewerCard;
