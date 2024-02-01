import { ThemeProvider } from "styled-components";
import cobalt from "../themes/cobalt";

const TP = ({ theme = cobalt, children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default TP;
