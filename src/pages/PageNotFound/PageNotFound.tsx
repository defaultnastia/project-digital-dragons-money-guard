import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getBalance,
  refreshUser,
  signIn,
  signOut,
  signUp,
} from "../../redux/user/operations";
import {
  Category,
  RangeType,
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
  getTransactionsCategories,
  getTransactionsSummary,
  updateTransaction,
} from "../../redux/transactions/operations";
import {
  selectCategories,
  selectLoading,
  selectStatistics,
  selectTransactions,
} from "../../redux/transactions/selectors";

const PageNotFound = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const loading = useAppSelector(selectLoadingState);
  const error = useAppSelector(selectErrorCode);

  const transactions = useAppSelector(selectTransactions);
  const loadingTrans = useAppSelector(selectLoading);
  const errorTrans = useAppSelector(selectErrorCode);

  const categories = useAppSelector(selectCategories);
  const statistics = useAppSelector(selectStatistics);

  const beautifyArr = (array: Transaction[] | Category[]) => {
    const newArr = array.map((trans: object) => {
      return JSON.stringify(trans, null, 1);
    });
    return newArr.join("\r\n");
  };

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
  const handleGetAllTrans = () => {
    dispatch(getAllTransactions());
  };
  const handleAddTrans = () => {
    const transactionToAdd: UserTransaction = {
      transactionDate: "2023-09-09",
      type: "INCOME",
      categoryId: "063f1132-ba5d-42b4-951d-44011ca46262",
      comment: "Salary new",
      amount: 100,
    };
    dispatch(addTransaction(transactionToAdd));
    setTimeout(handleGetAllTrans, 1000);
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
    setTimeout(handleGetAllTrans, 1000);
  };
  const handleDeleteTrans = () => {
    const transId = transactions[0].id;
    dispatch(deleteTransaction(transId));
    setTimeout(handleGetAllTrans, 1000);
  };

  // #endregion TRANSACTIONS server interactions

  // #region CATEGORIES AND CURRENCIES server interactions
  const handleGetCategories = () => {
    dispatch(getTransactionsCategories());
  };
  const handleGetStatistics = (range?: RangeType) => {
    if (range) {
      dispatch(getTransactionsSummary(range));
    }
    if (!range) {
      dispatch(getTransactionsSummary());
    }
  };
  // #endregion CATEGORIES AND CURRENCIES server interactions

  return (
    <div className="text-center p-5 w-full flex-col">
      <div className="p-5 border-b-2">
        <p>USER AND AUTH MOCKS:</p>
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
        <p>{JSON.stringify(userData, null, 1)}</p>
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
      <div className="p-5 border-b-2">
        {" "}
        <p>TRANSACTIONS MOCKS:</p>
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
        <button className="border p-1" onClick={handleUpdateTrans}>
          Update Transaction
        </button>
        <p>.</p>
        <button className="border p-1" onClick={handleDeleteTrans}>
          Delete Transaction
        </button>
        <p>.</p>
        <p>{errorTrans ? `Error is ${errorTrans}` : "No errors happened"}</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>
          All buttons are working. <br /> First, login and get all transactions
        </p>
      </div>
      <div className="p-5 border-b-2">
        <p>CATEGORIES AND STATS MOCKS:</p>
        <p>.</p>
        <p>.</p>
        <button className="border p-1" onClick={handleGetCategories}>
          Get Categories
        </button>
        <pre>{beautifyArr(categories)}</pre>
        <p>.</p>
        <p>Please select range</p>
        <div className="flex justify-center gap-10">
          <button
            className="border p-1"
            onClick={() => {
              handleGetStatistics();
            }}
          >
            All transactions
          </button>
          <button
            className="border p-1"
            onClick={() => {
              handleGetStatistics({ year: 2023, month: 9 });
            }}
          >
            Transactions for month
          </button>
          <button
            className="border p-1"
            onClick={() => {
              handleGetStatistics({ year: 2023 });
            }}
          >
            Transactions for year
          </button>
        </div>
        <p>{JSON.stringify(statistics, null, 1)}</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>
          All buttons are working. <br /> First, login and make add transactions
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
