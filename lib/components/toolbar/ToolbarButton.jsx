import styled from "styled-components";

const ToolbarButton = styled(({ children, ...props }) => {
  return <button {...props}>{children}</button>;
})`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  /* height: 30px; */
  background: ${(props) => props.theme.colors.toolbar.background};
  border: 0px solid #ddd;
  border-radius: 0px;
  padding: 8px 8px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.toolbar.foreground};
  cursor: pointer;
  transition: 0.1s ease;

  &:after {
    content: "";
    opacity: 0.5;
    margin-left: -6px;
    position: relative;
    left: 9px;
  }

  &:last-child:after {
    content: "";
  }

  &:hover {
    background: ${(props) => props.theme.colors.toolbar.backgroundHover};
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: ${(props) => props.theme.colors.toolbar.backgroundActive};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.toolbar.foregroundDisabled};
    background: ${(props) => props.theme.colors.toolbar.backgroundDisabled};
    cursor: not-allowed;
  }
`;

export default ToolbarButton;
export { ToolbarButton };
