import { useState, useEffect, useRef } from "react";
import { VscSearch } from "react-icons/vsc";
import styled from "styled-components";
import throttle from "../utils/throttle";

const SearchButton = styled(({ ...props }) => {
  return (
    <button {...props}>
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
      >
        <VscSearch />
        Search...
      </span>
    </button>
  );
})`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  gap: 6px;
  width: 60%;
  background: ${(props) => props.theme.colors.toolbar.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.toolbar.inputBorder};
  border-radius: 0.4rem;
  padding: 2px 8px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.toolbar.inputForeground};
  cursor: pointer;
`;

const SearchInput = styled(({ children, onChange, focus, ...props }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [focus]);
  const handleChange = throttle((e) => {
    if (onChange && typeof onChange === "function") onChange(e.target.value);
  }, 300);
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search..."
      onChange={handleChange}
      {...props}
    />
  );
})`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  gap: 6px;
  width: 100%;
  background: ${(props) => props.theme.colors.toolbar.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.toolbar.inputBorder};
  border-radius: 0.4rem;
  padding: 4px 8px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.toolbar.inputForeground};

  &::placeholder {
    color: ${(props) => props.theme.colors.toolbar.inputForeground};
  }

  &:focus {
    outline: none;
    border: 1px solid
      ${(props) => props.theme.colors.toolbar.inputBorderFocused};
  }
`;

const SearchResultsListItem = styled(
  ({ children, onSelect, result, active, ...props }) => {
    const itemRef = useRef(null);
    useEffect(() => {
      if (active && itemRef.current) {
        itemRef.current.focus();
      }
    }, [active]);

    const handleSelect = () => {
      onSelect(result);
    };

    return (
      <li onClick={handleSelect} ref={itemRef} {...props}>
        {children}
      </li>
    );
  }
)`
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: calc(100%);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    height: 1.3rem;
    width: 100%;
    clear: both;
    z-index: -1;
    background: ${(props) =>
      props.active
        ? props.theme.colors.toolbar.searchItemBackgroundHover
        : "transparent"};
  }
`;

const SearchResultsList = styled(({ children, ...props }) => {
  return <ul {...props}>{children}</ul>;
})`
  position: absolute;
  top: 0.7rem;
  width: calc(100%);
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  gap: 6px;
  font-size: 0.8rem;
  background: ${(props) => props.theme.colors.toolbar.searchItemBackground};
  border: 4px solid ${(props) => props.theme.colors.toolbar.background};
  border-radius: 0 0 0.1rem 0.1rem;
  z-index: 1;
`;

const SearchTool = styled(
  ({ children, results = [], onChange, onClear, onSelect, ...props }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleSelect = (value) => {
      if (onSelect && typeof onSelect === "function") onSelect(value);
      if (onClear && typeof onClear === "function") onClear();
    };

    // clear active index when results change
    useEffect(() => {
      setActiveIndex(null);
    }, [results]);

    // handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (activeIndex === null) {
            setActiveIndex(0);
          } else if (activeIndex < results.length - 1) {
            setActiveIndex(activeIndex + 1);
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
          }
          if (activeIndex === 0) {
            setActiveIndex(null);
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex !== null) {
            handleSelect(results[activeIndex]);
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, results, onSelect]);

    // need to figure out the best way to clear when clicking outside of the search tool
    return (
      <div {...props}>
        <SearchInput
          onChange={onChange}
          onKeyUp={(e) => {
            if (e.key === "Escape") onClear();
          }}
          onFocus={() => setActiveIndex(null)}
          focus={activeIndex === null}
          {...props}
        />
        {results.length > 0 ? (
          <SearchResultsList>
            {results.map((result, i) => (
              <SearchResultsListItem
                key={result.id}
                active={activeIndex === i}
                onSelect={handleSelect}
                result={result}
              >
                {result._text || result.place_name}
              </SearchResultsListItem>
            ))}
          </SearchResultsList>
        ) : null}
      </div>
    );
  }
)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Search = ({
  children,
  onChange,
  onClear,
  onSelect,
  value,
  results,
  ...props
}) => {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <SearchTool
        {...props}
        onChange={onChange}
        onSelect={onSelect}
        value={value}
        results={results}
        onClear={() => {
          setActive(false);
          if (onClear && typeof onClear === "function") onClear();
        }}
      />
    );
  } else {
    return <SearchButton {...props} onClick={() => setActive(true)} />;
  }
};

export default Search;
export { Search };
