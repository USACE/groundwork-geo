import React from "react";
import { Grid, GridColumn, GridColumnWrapper, CornerSnap } from "../layout";
import { ReduxBundlerProvider } from "redux-bundler-hook";
import createStore from "../store";
import ThemeProvider from "./theme-provider";

const store = createStore();
window.store = store;

const MapLayout = ({
    topToolbar = null,
    bottomToolbar = null,
    rightToolbar = null,
    leftSidebar = null,
    theme = undefined,
    children,
}) => {
    return (
        <ReduxBundlerProvider store={store}>
            <ThemeProvider theme={theme}>
                <Grid>
                    <GridColumnWrapper>{leftSidebar}</GridColumnWrapper>

                    <GridColumnWrapper>
                        <GridColumn>
                            {children}
                            {topToolbar}
                            <CornerSnap corner="top-right">{rightToolbar}</CornerSnap>
                            <CornerSnap corner="bottom-right">{bottomToolbar}</CornerSnap>
                        </GridColumn>
                    </GridColumnWrapper>

                    <GridColumnWrapper width={1}>
                        <GridColumn>
                            <CornerSnap corner="bottom-right">{bottomToolbar}</CornerSnap>
                        </GridColumn>
                    </GridColumnWrapper>
                </Grid>
            </ThemeProvider>
        </ReduxBundlerProvider>
    );
};

export default MapLayout;
export { MapLayout };
