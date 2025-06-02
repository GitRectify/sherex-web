import { Link } from "react-router-dom";
import { HOME } from "../../routes/routes";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center w-full h-full absolute right-0 bottom-0 left-0">
      <div className="flex flex-col w-full items-center justify-center gap-6">
        <div className="flex flex-col  font-semibold text-center">
          <span className="text-4xl font-normal text-white">👨‍🦯 This you? </span>
          <span className="text-xl text-[#7b7b7b]">
            Because there isn't anything over here
          </span>
        </div>
        <Link
          to={HOME}
          className="bg-gradient-to-r from-yellow-200 to-yellow-400 text-sm font-medium rounded-xl px-8 py-2 cursor-pointer"
        >
          Take Me Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
