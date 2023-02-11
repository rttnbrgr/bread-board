import { ItemRow, ItemRowProps } from "../Item";
import { AffordanceItemText } from "./AffordanceItemText";

export const AffordanceRow = ({ children, ...props }: ItemRowProps) => (
  <ItemRow {...props}>
    <AffordanceItemText>{children}</AffordanceItemText>
  </ItemRow>
);
