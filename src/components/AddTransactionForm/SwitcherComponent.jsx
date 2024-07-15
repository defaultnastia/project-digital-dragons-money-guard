import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import expenseIcon from "../../../public/AddTransactionForm/expense.svg";
import incomeIcon from "../../../public/AddTransactionForm/income.svg";

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
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="body1" style={{ marginRight: 8 }}>
        Income
      </Typography>
      <CustomSwitch
        checked={isChecked}
        onChange={handleChange}
        color="primary"
        icon={
          <img
            src={incomeIcon}
            alt="Income Icon"
            style={{ width: 40, height: 40 }}
          />
        }
        checkedIcon={
          <img
            src={expenseIcon}
            alt="Expense Icon"
            style={{ width: 40, height: 40 }}
          />
        }
      />
      <Typography variant="body1" style={{ marginLeft: 8 }}>
        Expense
      </Typography>
    </Box>
  );
};

export default SwitcherComponent;
