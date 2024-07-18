import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  return (
    <div className="w-screen h-screen bg-[var(--white-color)] text-center text-[#180243] flex items-center justify-center">
      <div
        className={clsx(
          "flex flex-col gap-2 justify-center items-center",
          { "max-w-[300px]": isMobile },
          { "max-w-[600px]": isTablet },
          { "max-w-[700px]": isDesktop }
        )}
      >
        <p
          className={clsx(
            "bg-notFound bg-[size:100%] bg-clip-text text-transparent bg-center font-black",
            { "text-[90px]": isMobile },
            { "text-[120px]": isTablet },
            { "text-[160px]": isDesktop }
          )}
        >
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
