import {
  HorizontalToolbar,
  FlexRow,
  ZoomInButton,
  ZoomOutButton,
  ZoomPreviousButton,
  ZoomNextButton,
  ZoomHomeButton,
  OrientationButton,
} from "../lib";
import Geocoder from "./Geocoder";

export default function TopToolbar() {
  return (
    <FlexRow bgFilled>
      <HorizontalToolbar>
        <ZoomHomeButton />
      </HorizontalToolbar>
      <Geocoder />
      <HorizontalToolbar justifyContent="end">
        <OrientationButton />
        <ZoomPreviousButton />
        <ZoomNextButton />
        <ZoomOutButton />
        <ZoomInButton />
      </HorizontalToolbar>
    </FlexRow>
  );
}
