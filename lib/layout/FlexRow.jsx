import styled from "styled-components";

const FlexRow = styled(({ children, bgFilled, ...props }) => {
  return <div {...props}>{children}</div>;
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  ${(props) => {
    if (props.bgFilled) {
      return `
        background-color: ${props.theme.colors.toolbar.background};
        color: ${props.theme.colors.toolbar.foreground};
      `;
    }
  }}
`;

export default FlexRow;
export { FlexRow };
