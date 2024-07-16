import { CustomButton } from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";

interface LogoutFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const LogoutForm: React.FC<LogoutFormProps> = ({ onSubmit, onClose }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-[20px]">
        <Logo sizeLogo={36} sizeText={26} icon="logo" />
        <h2 className="mx-auto mt-[52px] mb-[52px] text-[18px] w-[300px]">
          Are you sure you want to log out?
        </h2>
        <CustomButton
          elementLike={{ btnType: "submit" }}
          btnStyle="colorful"
          children="Logout"
        />
        <CustomButton
          elementLike={{ btnType: "button", onClick: onClose }}
          btnStyle="mono"
          children="cancel"
        />
      </div>
    </form>
  );
};

export default LogoutForm;
