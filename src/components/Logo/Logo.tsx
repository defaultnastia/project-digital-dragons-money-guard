import { Icon } from "../Icon/Icon";

interface Props {
  sizeLogo?: number;
  sizeText?: number;
}

const Logo = ({ sizeLogo, sizeText }: Props) => {
  const paramsText = `text-[${sizeText}px]`;

  return (
    <div className="flex flex-col items-center ">
      <Icon name="logo" size={sizeLogo} />
      <p className={paramsText}>Money Guard</p>
    </div>
  );
};

export default Logo;
