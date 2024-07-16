import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import expenseIcon from "../../../public/AddTransactionForm/expense.svg";
import incomeIcon from "../../../public/AddTransactionForm/income.svg";
import sprite from "../../images/icons.svg";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 2,
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(40px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#fff",
        opacity: 1,
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 36,
    height: 36,
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    backgroundColor: "#fff",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SwitcherComponent = ({ isChecked, handleChange }) => {
  const incomeColor = isChecked ? "rgba(255, 255, 255, 0.60)" : "#FFB627";
  const expenseColor = isChecked ? "#FF868D" : "rgba(255, 255, 255, 0.60)";

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography
        variant="body1"
        style={{
          marginRight: 8,
          color: incomeColor,
          fontFamily: "Poppins",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Income
      </Typography>
      <CustomSwitch
        checked={isChecked}
        onChange={handleChange}
        color="primary"
        icon={
          <svg width="44" height="44" style={{ fill: "#FFB627" }}>
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
        }
        checkedIcon={
          <svg width="44" height="44" style={{ fill: "#FF868D" }}>
            <use xlinkHref={`${sprite}#icon-minus_btn`}></use>
          </svg>
        }
      />
      <Typography
        variant="body1"
        style={{
          marginLeft: 8,
          color: expenseColor,
          fontFamily: "Poppins",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        Expense
      </Typography>
    </Box>
  );
};

export default SwitcherComponent;
