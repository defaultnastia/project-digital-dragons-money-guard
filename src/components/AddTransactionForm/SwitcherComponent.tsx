import * as React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "../Icon/Icon";

interface SwitcherComponentProps {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSwitch = styled(Switch)(() => ({
  width: 80,
  height: 50,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      transform: "translateX(35px)",
      "& .MuiSwitch-thumb:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#FBFBFB",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 44,
    height: 44,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FBFBFB",
    borderRadius: 30,
    width: 80,
    height: 30,
  },
}));

const SwitcherComponent: React.FC<SwitcherComponentProps> = ({
  isChecked,
  handleChange,
}) => {
  const incomeColor = isChecked ? "rgba(255, 255, 255, 0.60)" : "#FFB627";
  const expenseColor = isChecked ? "#FF868D" : "rgba(255, 255, 255, 0.60)";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="20px"
      sx={{ padding: "10px", borderRadius: "10px" }}
    >
      <Typography
        variant="body1"
        sx={{
          color: incomeColor,
          fontFamily: "Poppins",
          fontWeight: 600,
        }}
      >
        Income
      </Typography>
      <CustomSwitch
        checked={isChecked}
        onChange={handleChange}
        color="primary"
        icon={
          <Box
            sx={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFB627",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              boxShadow: "1px 2px 5px rgba(255, 182, 39, 0.6)",
            }}
          >
            <Icon name="plus" size={16} stroke="var(--white-color)" />
          </Box>
        }
        checkedIcon={
          <Box
            sx={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FF868D",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
              boxShadow: "-1px 2px 5px rgba(255, 134, 141, 0.6)",
            }}
          >
            <Icon name="minus" size={16} stroke="var(--white-color)" />
          </Box>
        }
      />
      <Typography
        variant="body1"
        sx={{
          color: expenseColor,
          fontFamily: "Poppins",
          fontWeight: 600,
        }}
      >
        Expense
      </Typography>
    </Box>
  );
};

export default SwitcherComponent;
