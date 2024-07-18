import css from "./NotificationStatistic.module.css";

const NotificationStatistic = ({text}: {text: string}) => {
  return <div className={`${css.notice} text-center`}>{text}</div>;
};

export default NotificationStatistic;
