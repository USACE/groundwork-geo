import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useConnect } from "redux-bundler-hook";

const Globe = styled(
  ({
    onMount,
    options = {},
    layers = [],
    initialPosition = null,
    ...props
  }) => {
    const elRef = useRef(null);
    const {
      globeViewer: globe,
      doGlobeInitialize,
      doLayersInitialize,
    } = useConnect(
      "selectGlobeViewer",
      "doGlobeInitialize",
      "doLayersInitialize"
    );

    useEffect(() => {
      if (!elRef.current) return;
      if (globe) return;
      doGlobeInitialize({
        el: elRef.current,
        options: options,
        onMount: onMount,
        initialPosition: initialPosition,
      });
    }, [elRef.current, globe]);

    useEffect(() => {
      if (!globe) return;
      doLayersInitialize(layers);
    }, [globe, layers]);

    return <div ref={elRef} {...props}></div>;
  }
)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Globe;
export { Globe };
