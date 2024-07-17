import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Icon } from "../Icon/Icon";

interface SwitcherComponentProps {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
        backgroundColor: "#FFF",
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
    backgroundColor: "#FFF",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SwitcherComponent: React.FC<SwitcherComponentProps> = ({
  isChecked,
  handleChange,
}) => {
  const incomeColor = isChecked ? "rgba(255, 255, 255, 0.60)" : "#FFB627";
  const expenseColor = isChecked ? "#FF868D" : "rgba(255, 255, 255, 0.60)";

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap="20px">
      <Typography
        variant="body1"
        style={{
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
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFB627",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <Icon
              name="plus"
              size={16}
              className="hover:stroke-[var(--dashboard-text-color)]"
              stroke="var(--white-color)"
            />
          </Box>
        }
        checkedIcon={
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FF868D",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <Icon
              name="minus"
              size={16}
              className="hover:stroke-[var(--dashboard-text-color)]"
              stroke="var(--white-color)"
            />
          </Box>
        }
      />
      <Typography
        variant="body1"
        style={{
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
