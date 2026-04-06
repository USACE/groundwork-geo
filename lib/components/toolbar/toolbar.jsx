import styled from "styled-components";
import { useState } from "react";
import { ActivityBar } from "./activity-bar";

/**
 * Sidebar which renders the Activity Bar and any active Panel
 * associated with the selected Activity Item.
 */
const Toolbar = styled(({ tools, ...props }) => {
    const [activeTool, setActiveTool] = useState(null);
    return (
        <div {...props}>
            <ActivityBar>
                {tools.map((tool) => {
                    const Button = tool.Button;
                    const selected = tool === activeTool;
                    return (
                        <Button
                            key={tool.id}
                            selected={selected}
                            onClick={() => {
                                if (selected) setActiveTool(null);
                                else setActiveTool(tool);
                            }}
                        />
                    );
                })}
            </ActivityBar>
            {!!activeTool && <activeTool.Panel />}
        </div>
    );
})`
  width: 100%;
`;
export default Toolbar;
export { Toolbar };
// display: grid;
// grid-template-columns: auto 1fr;
