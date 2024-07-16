import Icons from "../../images/icons.svg";

type NameIcon =
  | "icon-home"
  | "logo"
  | "icon-timeline"
  | "icon-ate_range"
  | "icon-exit";

interface Props {
  name: NameIcon;
  size?: number;
  className?: string;
}

export const MyIcon = ({ name, size = 24, className }: Props) => {
  return (
    <svg className={` ${className}`} width={size} height={size}>
      <use href={`${Icons}#icon-${name}`} />
    </svg>
  );
};
