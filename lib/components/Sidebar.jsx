import styled from "styled-components";
import { useState } from "react";
import { ActivityBar } from "./ActivityBar";

/**
 * Sidebar which renders the Activity Bar and any active Panel
 * associated with the selected Activity Item.
 */
const Sidebar = styled(({ tools, ...props }) => {
  const [activeTool, setActiveTool] = useState(null);
  const ActiveToolPanel = activeTool?.Panel;

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
      {!!activeTool && <ActiveToolPanel />}
    </div>
  );
})`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
  min-width: 60px;
`;

export { Sidebar };
