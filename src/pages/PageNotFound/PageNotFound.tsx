/* For testing only (remove before deployment) */
import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomModal from "../../components/CustomModal/CustomModal";
/* End of removal */

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
  selectStatistics,
  selectTransactions,
} from "../../redux/transactions/selectors";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import Logo from "../../components/Logo/Logo";

const PageNotFound = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const loading = useAppSelector(selectLoadingState);
  const error = useAppSelector(selectErrorCode);

  const transactions = useAppSelector(selectTransactions);

  const categories = useAppSelector(selectCategories);
  const statistics = useAppSelector(selectStatistics);

  const beautifyArr = (array: Transaction[] | Category[]) => {
    const newArr = array.map((trans: object) => {
      return JSON.stringify(trans, null, 1);
    });
    return newArr.join("\r\n");
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const openModal = (): void => {
    setIsOpenModal(true);
  };

  const closeModal = (): void => {
    setIsOpenModal(false);
  };

  const onSubmit = (obj: object): void => {
    // console.log(obj);
    // console.log("The form has been submitted");
  };

  // #region USER and AUTH server interactions

  const userToSignUp: UserCredentials = {
    username: "Postman23",
    email: "Postman23@post.com",
    password: "&jf7jm!jeo",
  };

  const userToSignIn: Omit<UserCredentials, "username"> = {
    email: "Postman15@post.com",
    // password: "&jf7jm!jeodd", //incorrect password
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
      transactionDate: new Date(),
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
        <p>Logo Component:</p>
        <Logo icon="user" />
      </div>
      <div className="p-5 border-b-2">
        {/* For testing only (remove before deployment) */}
        <p>Test modal for everything (MOCKS)</p>
        <p>.</p>
        <button
          onClick={openModal}
          className="py-[6px] px-[12px] border-solid border-[1px] border-[var(--white-color)] rounded-[8px] mt-[10px]"
        >
          Open modal
        </button>
        <CustomModal
          isOpen={isOpenModal}
          onClose={closeModal}
          type="transaction"
        >
          <h2 className="block text-[30px] text-center mb-[40px]">
            Add transaction
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
            <div className="overflow-y-auto">
              <input
                type="text"
                {...register("test1")}
                placeholder="Enter your text ..."
                className="w-[100%] p-[8px] text-[var(--white-color)] placeholder:text-[var(--white-60-color)] bg-[transparent] border-solid border-b-[1px] border-[var(--white-40-color)]"
              />
              <select
                {...register("test-select")}
                id="test-select"
                defaultValue="Select value"
                className="mt-[10px] w-[100%] text-[var(--text-button-color)]"
              >
                <option value="Select value" disabled hidden>
                  Select value
                </option>
                <option value="car">Car</option>
                <option value="toy">Toy</option>
                <option value="furniture">Furniture</option>
                <option value="food">Food</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="w-[100%] mt-[40px]">
              <CustomButton
                elementLike={{ btnType: "submit" }}
                btnStyle="colorful"
              >
                Add
              </CustomButton>
              <CustomButton
                elementLike={{ btnType: "button", onClick: closeModal }}
                btnStyle="mono"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </CustomModal>
        {/* End of removal */}

        <p>.</p>
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
        <p>{loading ? "loading" : "loading finished"}</p>
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
        <p>{error ? `Error is ${error}` : "No errors happened"}</p>
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
        <div className="flex justify-center gap-10 flex-wrap">
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
