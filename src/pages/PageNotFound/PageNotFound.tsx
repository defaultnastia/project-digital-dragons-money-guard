import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen bg-[var(--white-color)] text-center text-[#180243] flex justify-center">
      <div className="flex flex-col gap-2 justify-center items-center max-w-[700px]">
        <p className="bg-notFound bg-[size:100%] bg-clip-text text-transparent bg-center text-[160px] font-black">
          Oops!
        </p>
        <h2 className="uppercase font-semibold">404 - Page not found</h2>
        <p>
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
