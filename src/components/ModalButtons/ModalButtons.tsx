type ModalButtonsPropsType = {
  btnStyles: {
    upStyle: string;
    bottomStyle: string;
  };
  btnText: {
    upText: string;
    bottomText: string;
  };
};

export const ModalButtons = ({
  btnStyles: { upStyle, bottomStyle },
  btnText: { upText, bottomText },
}: ModalButtonsPropsType) => {
  return (
    <div>
      <button className={upStyle}>{upText}</button>
      <button className={bottomStyle}>{bottomText}</button>
    </div>
  );
};
