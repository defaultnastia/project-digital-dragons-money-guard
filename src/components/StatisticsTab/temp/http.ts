import axios from "axios";

axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI4Zjc2NzFkOC0xYWE4LTQ0YTYtODVmNy1jZWE4Njg5MDZmOTUiLCJpYXQiOjE3MjA3Njk2NTMsImV4cCI6MTAwMDAwMDE3MjA3Njk2NTJ9.DcxjXao2jgoEBRsQqzWP-jruVgXH03PeZHxkYfYpeM8";

export const transactionType = async () => {
  const {data} = await axios.get("https://wallet.b.goit.study/api/transaction-categories");
  return data;
};

export const transactionValue = async () => {
  const {data} = await axios.get("https://wallet.b.goit.study/api/transactions-summary");
  return data;
};
