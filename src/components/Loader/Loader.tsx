import { MagicSpinner } from "react-spinners-kit";

export const Loader = () => {
  return (
    <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute">
      <MagicSpinner size={100} color="#693bbd" />
    </div>
  );
};
