import { Link } from "react-router-dom";
import css from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={css.pageNotFound}>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="bg-notFound bg-[size:100%] bg-clip-text bg-center text-[180px] font-black max-w-[700px]">
          Oops!
        </p>
        <h2>404 - Page not found</h2>
        <p className={css.helpText}>
          The page you are looking for might have been removed, or had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          className="btn btn-sm uppercase text-white w-fit my-1 bg-[#180243]"
          to="/"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
