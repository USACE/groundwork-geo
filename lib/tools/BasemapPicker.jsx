import { ActivityItem } from "../components/ActivityBar";
import { Panel } from "../components/Panel";
import { SiOpenstreetmap } from "react-icons/si";
import { TbMap2 } from "react-icons/tb";
import { useConnect } from "redux-bundler-hook";
import styled from "styled-components";

const BasemapPickerButton = ({ ...props }) => {
  return (
    <ActivityItem {...props}>
      <TbMap2 size={32} />
    </ActivityItem>
  );
};

const BasemapListItem = styled(({ basemap, selected, ...props }) => {
  const { doBasemapsSwitch } = useConnect("doBasemapsSwitch");
  const previewTileUrl = basemap.url
    .replace("{z}", "12")
    .replace("{x}", "1206")
    .replace("{y}", "1539")
    .replace("{s}", "a");
  const handleClick = () => {
    doBasemapsSwitch(basemap);
  };
  return (
    <div onClick={handleClick} selected={selected} {...props}>
      <img src={previewTileUrl} alt={basemap.name} height={16} width={16} />
      {basemap.name}
    </div>
  );
})`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 0.2rem;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    height: 1.3rem;
    width: 100%;
    clear: both;
    z-index: -1;
    background-color: ${(props) => {
      return props.selected
        ? props.theme.colors.treeview.backgroundHover
        : "transparent";
    }};
  }

  &:hover {
    color: #fff;
  }

  &:hover:before {
    background-color: ${(props) => props.theme.colors.treeview.backgroundHover};
  }
`;

const BasemapList = styled(({ ...props }) => {
  const { basemapsList: basemaps, basemapsActive } = useConnect(
    "selectBasemapsList",
    "selectBasemapsActive"
  );
  return (
    <div {...props}>
      {basemaps.map((basemap) => {
        return (
          <BasemapListItem
            key={basemap.id}
            basemap={basemap}
            selected={basemap === basemapsActive}
          />
        );
      })}
    </div>
  );
})`
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;

const BasemapPickerPanel = ({ children, ...props }) => {
  return (
    <Panel {...props}>
      <BasemapList />
    </Panel>
  );
};

const BasemapPicker = {
  id: "basemap-picker",
  Button: BasemapPickerButton,
  Panel: BasemapPickerPanel,
};

export { BasemapPickerButton, BasemapPickerPanel, BasemapPicker };
export default BasemapPicker;
