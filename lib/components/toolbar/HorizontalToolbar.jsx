import styled from "styled-components";

const HorizontalToolbar = styled(
  ({ children, justifyContent = "start", ...props }) => {
    return <div {...props}>{children}</div>;
  }
)`
  display: flex;
  padding: 0rem;
  justify-content: ${(props) => props.justifyContent};
  width: 100%;
  gap: 0rem;
  flex-direction: row;
  align-items: center;
  color: ${(props) => props.theme.colors.toolbar.foreground};
  background-color: ${(props) => props.theme.colors.toolbar.background};
`;

export default HorizontalToolbar;
export { HorizontalToolbar };
