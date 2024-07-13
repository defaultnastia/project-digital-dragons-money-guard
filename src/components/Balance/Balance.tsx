import React from "react";

const Balance: React.FC = () => {
  return (
    <div className="flex-col gap-[12px] w-[336px] xl:w-[100%] h-[80px] bg-[#523B7E] bg-opacity-[60%] rounded-[8px] shadow-[0px_4px_60px_0px_rgba(0,0,0,0.25)] backdrop-blur-[50px] pl-[32px] md:pl-[40px] xl:pl-[56px] pt-[8px]">
      <p className="text-[12px] text-[rgba(255,255,255,0.40)] uppercase">
        Your balance
      </p>
      <div className="flex gap-[8px]">
        <p className="text-[30px]">&#8372;</p>
        <p className="text-[30px] font-bold">24 000.00</p>
      </div>
    </div>
  );
};

export default Balance;
