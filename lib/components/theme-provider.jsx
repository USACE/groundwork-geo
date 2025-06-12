import { ThemeProvider as TP } from "styled-components";
import cobalt from "../themes/cobalt"

const ThemeProvider = ({ theme, children }) => {
    return <TP theme={theme = cobalt}>{children}</TP>;
};

export default ThemeProvider;
