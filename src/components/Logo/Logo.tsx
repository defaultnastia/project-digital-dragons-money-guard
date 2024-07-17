import { Icon, NameIcon } from "../Icon/Icon";

interface Props {
  sizeLogo?: number;
  sizeText?: number;
  icon: NameIcon;
  className?: string;
}

const Logo = ({ sizeLogo, sizeText, icon }: Props) => {
  const paramsText = `text-[${sizeText}px]`;

  return (
    <div className="flex flex-col items-center ">
      <Icon name={icon} size={sizeLogo} />
      <p className={paramsText}>Money Guard</p>
    </div>
  );
};

export default Logo;
