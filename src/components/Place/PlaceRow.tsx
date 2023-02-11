import { PlaceItemText } from "../Place/PlaceItemText";
import { ItemRow, ItemRowProps } from "../Item";

export const PlaceRow = ({ children, ...props }: ItemRowProps) => (
  <ItemRow {...props}>
    <PlaceItemText>{children}</PlaceItemText>
  </ItemRow>
);
