import Icons from "../../img/icons/icons.svg";

type NameIcon = "lock" | "logo" | "user";

interface Props {
  name: NameIcon;
  size?: number;
}

export const Icon = ({ name, size = 24 }: Props) => {
  return (
    <svg width={size} height={size}>
      <use href={`${Icons}#icon-${name}`} />
    </svg>
  );
};
