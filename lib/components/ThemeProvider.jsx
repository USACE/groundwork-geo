import { ThemeProvider } from "styled-components";
import cobalt from "../themes/cobalt";

const TP = ({ children }) => {
  return <ThemeProvider theme={cobalt}>{children}</ThemeProvider>;
};

export default TP;
