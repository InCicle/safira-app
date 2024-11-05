import Timeago from "react-timeago";
import ptBR from "react-timeago/lib/language-strings/pt-br";
import en from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Cookies from "js-cookie";

interface ITimeAgoWithFormatter {
  date: Date | string;
  styles?: React.CSSProperties;
}

export const TimeAgoWithFormatter = ({ date, styles }: ITimeAgoWithFormatter) => {
  const default_language = Cookies.get("default_language");
const formatter = buildFormatter(default_language === "pt-BR" ? ptBR : en);

return <Timeago date={date} formatter={formatter} styles={styles} />;
}