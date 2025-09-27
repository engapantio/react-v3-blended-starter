import style from "./GridItem.module.css";

interface GridItemProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function GridItem({ children }: GridItemProps) {
  return <li className={style.item}>{children}</li>;
}
