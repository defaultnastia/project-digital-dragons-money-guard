import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <p>The requested page is not found</p>
      <Link to="/">Return to known area</Link>
    </div>
  );
};

export default PageNotFound;
