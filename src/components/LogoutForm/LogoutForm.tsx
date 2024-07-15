import clsx from "clsx";

const LogoutForm = ({ onSubmit, onClose }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img src="logo" alt="logo_money_guard" />
        <h2>Are you sure you want to log out?</h2>
        <button type="submit">Log out</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LogoutForm;
