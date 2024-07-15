import Icons from "../../img/icons/icons.svg";

type NameIcon = "lock" | "logo" | "email";

interface Props {
  name: NameIcon;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, className }: Props) => {
  return (
    <svg className={` ${className}`} width={size} height={size}>
      <use href={`${Icons}#icon-${name}`} />
    </svg>
  );
};
