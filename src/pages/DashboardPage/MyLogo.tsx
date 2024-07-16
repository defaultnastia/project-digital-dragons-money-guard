import { MyIcon } from "./MyIcon";

interface Props {
  sizeLogo?: number;
  sizeText?: number;
}

const MyLogo = ({ sizeLogo, sizeText }: Props) => {
  const paramsText = `text-[${sizeText}px]`;

  return (
    <div className="flex flex-col items-center ">
      <MyIcon name="logo" size={sizeLogo} />
      <p className={paramsText}>Money Guard</p>
    </div>
  );
};

export default MyLogo;
