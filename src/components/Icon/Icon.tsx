import Icons from "../../img/icons.svg";

export type NameIcon = string;

interface Props {
  name: NameIcon;
  size?: number;
  className?: string;
  stroke?: string;
  fill?: string;
}

export const Icon = ({ name, size = 24, className, fill, stroke }: Props) => {
  return (
    <svg
      className={` ${className}`}
      width={size}
      height={size}
      fill={fill}
      stroke={stroke}
    >
      <use href={`${Icons}#icon-${name}`} />
    </svg>
  );
};
