import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getBalance,
  refreshUser,
  signIn,
  signOut,
  signUp,
} from "../../redux/user/operations";
import {
  Transaction,
  UserCredentials,
  UserTransaction,
} from "../../redux/data.types";
import {
  selectErrorCode,
  selectLoadingState,
  selectUserData,
} from "../../redux/user/selectors";
import {
  addTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction,
} from "../../redux/transactions/operations";
import {
  selectCategories,
  selectLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";

const PageNotFound = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const loading = useAppSelector(selectLoadingState);
  const error = useAppSelector(selectErrorCode);

  const transactions = useAppSelector(selectTransactions);
  const categories = useAppSelector(selectCategories);
  const loadingTrans = useAppSelector(selectLoading);
  const errorTrans = useAppSelector(selectErrorCode);

  // #region USER and AUTH server interactions

  const userToSignUp: UserCredentials = {
    username: "Postman21",
    email: "Postman21@post.com",
    password: "&jf7jm!jeo",
  };

  const userToSignIn: Omit<UserCredentials, "username"> = {
    email: "Postman15@post.com",
    password: "&jf7jm!jeo",
  };

  const handleLogin = (): void => {
    dispatch(signIn(userToSignIn));
  };

  const handleRegister = (): void => {
    dispatch(signUp(userToSignUp));
  };

  const handleRefresh = (): void => {
    dispatch(refreshUser());
  };

  const handleLogout = (): void => {
    dispatch(signOut());
  };

  const handleBalance = (): void => {
    dispatch(getBalance());
  };

  // #endregion USER and AUTH server interactions

  // #region TRANSACTIONS server interactions
  const handleAddTrans = () => {
    const transactionToAdd: UserTransaction = {
      transactionDate: "2023-09-09",
      type: "INCOME",
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      comment: "Salary new",
      amount: 10,
    };
    dispatch(addTransaction(transactionToAdd));
  };
  const handleUpdateTrans = () => {
    const updTransaction: Omit<Transaction, "id"> = {
      transactionDate: transactions[0].transactionDate,
      type: transactions[0].type,
      categoryId: transactions[0].categoryId,
      comment: "Salary updated 1",
      amount: 155,
    };
    const transId = transactions[0].id;
    const patchData = { updTransaction, transId };
    dispatch(updateTransaction(patchData));
  };
  const handleDeleteTrans = () => {
    // const transId = transactions[-1].id;
    // dispatch(deleteTransaction(transId));
    console.log(transactions[-1].id);
  };
  const handleGetAllTrans = () => {
    dispatch(getAllTransactions());
  };

  const beautifyArr = (array: Transaction[]) => {
    const newArr = array.map((trans: object) => {
      return JSON.stringify(trans, null, 1);
    });
    return newArr.join("\r\n");
  };

  // #endregion TRANSACTIONS server interactions

  return (
    <div className="flex text-center p-5 w-full">
      <div className="p-5 w-1/2">
        <p>MOCKS:</p>
        <p>.</p>
        <p>.</p>
        <p>{loading ? "loading" : "loading finished"}</p>
        <p>.</p>
        <button className="border p-1" onClick={handleRegister}>
          Register
        </button>
        <p>.</p>
        <button className="border p-1" onClick={handleLogout}>
          Logout
        </button>
        <p>.</p>
        <button className="border p-1" onClick={handleLogin}>
          Login
        </button>
        <p>.</p>
        <p>
          {userData.username
            ? "User is logged in"
            : "User is logged out (but try refresh)"}
        </p>
        <p className="text-left">{JSON.stringify(userData, null, 1)}</p>
        <p>.</p>
        <button className="border p-1" onClick={handleRefresh}>
          Refresh
        </button>
        <p>.</p>
        <button className="border p-1" onClick={handleBalance}>
          Get Balance
        </button>
        <p>
          {userData.balance === null
            ? "Login to show balance"
            : `Balance is ${userData.balance}`}
        </p>
        <p>.</p>
        <p>{error ? `Error is ${error}` : "No errors happened"}</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>
          All buttons are working. <br /> For the register you have to change
          "userToSignUp" data to unique email
        </p>
      </div>
      <div className="p-5 w-1/2">
        {" "}
        <p>MOCKS:</p>
        <p>.</p>
        <p>.</p>
        <p>{loadingTrans ? "loading" : "loading finished"}</p>
        <p>.</p>
        <button className="border p-1" onClick={handleGetAllTrans}>
          Get Transactions
        </button>
        <pre>
          {transactions[0]
            ? beautifyArr(transactions)
            : "User has no transactions or not logged in"}
        </pre>
        <p>.</p>
        <button className="border p-1" onClick={handleAddTrans}>
          Add Transaction
        </button>
        <p>.</p>
        <button className="border p-1" onClick={handleDeleteTrans}>
          Delete Transaction
        </button>
        <p>.</p>
        <p>{error ? `Error is ${error}` : "No errors happened"}</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>
          All buttons are working. <br /> For the register you have to change
          "userToSignUp" data to unique email
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
