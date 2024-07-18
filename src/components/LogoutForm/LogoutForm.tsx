import { useMediaQuery } from "react-responsive";
import { CustomButton } from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";
import clsx from "clsx";

interface LogoutFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const LogoutForm: React.FC<LogoutFormProps> = ({ onSubmit, onClose }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-[20px]">
        {(isTablet || isDesktop) && (
          <Logo
            sizeLogo={36}
            sizeText={26}
            icon="logo"
            className="text-[26px]"
          />
        )}
        <h2
          className={clsx("mx-auto mt-[52px] mb-[52px] text-[18px] w-[300px]", {
            "w-[214px] text-center": isMobile,
          })}
        >
          Are you sure you want to log out?
        </h2>
        <CustomButton elementLike={{ btnType: "submit" }} btnStyle="colorful">
          Logout
        </CustomButton>
        <CustomButton
          elementLike={{ btnType: "button", onClick: onClose }}
          btnStyle="mono"
        >
          Cancel
        </CustomButton>
      </div>
    </form>
  );
};

export default LogoutForm;
