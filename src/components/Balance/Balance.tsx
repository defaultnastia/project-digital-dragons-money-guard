import React from "react";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/user/selectors";
import FormattedBalance from "../FormattedBalance/FormattedBalance";

const Balance: React.FC = () => {
  const userData = useAppSelector(selectUserData);
  const userBalance = userData.balance;

  return (
    <div className="flex-col gap-[12px] w-full h-[80px] bg-[#523B7E] bg-opacity-[60%] rounded-[8px] xl:rounded-none shadow-[0px_4px_60px_0px_rgba(0,0,0,0.25)] backdrop-blur-[50px] pl-[32px] md:pl-[40px] xl:pl-[56px] pt-[8px]">
      <p className="text-[12px] text-[rgba(255,255,255,0.40)] uppercase text-left">Your balance</p>
      <div className="flex gap-[8px]">
        <p className="text-[30px]">₴</p>
        <span className="text-[30px] font-bold">
          <FormattedBalance balance={userBalance} />
        </span>
      </div>
    </div>
  );
};

export default Balance;
