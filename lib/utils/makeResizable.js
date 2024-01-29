import debounce from "./debounce";

function makeResizable(el, dragTarget, initialWidth, onChange) {
  if (!el) return {};

  // set initial width
  el.style.setProperty("--resizable-width", `${initialWidth}px`);

  // get debounced version of onChange
  const debouncedOnChange = debounce(onChange, 200);

  const startDragging = (e) => {
    const startX = e.pageX;
    const pxWidth = window
      .getComputedStyle(el)
      .getPropertyValue("--resizable-width");
    const width = parseInt(pxWidth);
    const xOffset = startX - width;
    const moveHandler = (e) => {
      const newWidth = e.pageX - xOffset;
      el.style.setProperty("--resizable-width", `${newWidth}px`);
      if (onChange && typeof onChange === "function")
        debouncedOnChange(newWidth);
    };
    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  };

  // remove redundant listener before adding just in case
  dragTarget.removeEventListener("mousedown", startDragging);
  dragTarget.addEventListener("mousedown", startDragging);
}

export default makeResizable;
export { makeResizable };
