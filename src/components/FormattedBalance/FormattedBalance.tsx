import numeral from "numeral";

const FormattedBalance = ({balance}: {balance: number | null | undefined}) => {
  const balanceNum =
    balance !== null && balance !== undefined
      ? numeral(balance).format("0,0.00").replaceAll(",", " ")
      : "0.00";
  return <div>{numeral(balanceNum).format("0,0.00").replaceAll(",", " ")}</div>;
};

export default FormattedBalance;
