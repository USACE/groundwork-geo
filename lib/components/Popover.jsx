import {
  createContext,
  useContext,
  cloneElement,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";

const defaultRect = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

const PopoverContext = createContext({
  isShow: false,
  setIsShow: () => {
    throw new Error("PopoverContext setIsShow should be used under provider");
  },
  preferredPosition: "bottom-center",
  delay: 0,
  targetRect: defaultRect,
  setTargetRect: () => {
    throw new Error(
      "PopoverContext setTargetRect should be used under provider"
    );
  },
});

export default function Popover({ children, preferredPosition, delay }) {
  const [isShow, setIsShow] = useState(false);
  const [targetRect, setTargetRect] = useState(defaultRect);

  return (
    <PopoverContext.Provider
      value={{
        isShow,
        setIsShow,
        preferredPosition,
        delay,
        targetRect,
        setTargetRect,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

function Target({ children }) {
  const { setIsShow, setTargetRect, delay } = useContext(PopoverContext);
  const ref = useRef(null);

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setTargetRect(rect);
  }, [setTargetRect]);

  const show = () => {
    setIsShow(true);
  };

  const hide = () => {
    setIsShow(false);
  };

  const clonedTarget = cloneElement(children, {
    onMouseEnter: show,
    onMouseLeave: hide,
    ref,
  });

  return clonedTarget;
}

function Content({ children, ...props }) {
  const { isShow, targetRect, preferredPosition } = useContext(PopoverContext);
  const ref = useRef(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const coords = getPopoverCoords(targetRect, rect, preferredPosition);
    setPosition(coords);
  }, [targetRect]);

  const clonedContent = cloneElement(children, {
    ...props,
    ...{
      ref,
      style: {
        zIndex: 1000,
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        color: "#fff",
        backgroundColor: "#000",
        border: "1px solid #fff",
        visibility: isShow ? "visible" : "hidden",
      },
    },
  });

  return clonedContent;
}

Popover.Target = Target;
Popover.Content = Content;

function getPopoverCoords(targetRect, popoverRect, position) {
  switch (position) {
    case "right-center":
      return {
        top: targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
        left: targetRect.left + targetRect.width + 10,
      };
    case "top-center":
      return {
        top: targetRect.top - popoverRect.height - 10,
        left: targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
      };
    case "left-center":
      return {
        top: targetRect.top + targetRect.height / 2 - popoverRect.height / 2,
        left: targetRect.left - popoverRect.width - 10,
      };
    case "bottom-center":
    default:
      return {
        top: targetRect.top + targetRect.height + 10,
        left: targetRect.left + targetRect.width / 2 - popoverRect.width / 2,
      };
  }
}
