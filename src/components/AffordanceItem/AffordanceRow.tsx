import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps,
  IconButton,
  Input,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton as IconButtonNew } from "../chakra";
import { PlaceItem } from "../PlaceItem";
import { AffordanceItem } from "./AffordanceItem";

type ViewState = "new" | "edit" | "read";

export type PlaceProps = {
  initialView?: ViewState;
  initialValue?: string;
  title?: string;
  onAdd?: (x: string) => void;
  onConfirm?: (pv: string, x: string) => void;
  onCancel?: () => void;
  onEdit?: (x: string) => void;
  onRemove?: (x: string) => void;
};

type AffordanceProps = StackProps & PlaceProps;

export const Affordance = ({
  initialView = "read",
  initialValue,
  title,
  onAdd = () => {
    console.log("add new");
  },
  onConfirm = () => {},
  onCancel = () => {},
  onEdit = () => {},
  onRemove = () => {},
  children,
  ...props
}: AffordanceProps) => {
  // edit row
  // read row
  // new row
  //
  // Verified
  const [showAffordanceInput, setShowAffordanceInput] =
    useState<Boolean>(false);

  // State of the Row

  const [viewState, setViewState] = useState<ViewState>(initialView);

  type LogicMode = "new" | "existing";
  const [logicMode, setLogicMode] = useState<LogicMode>("new");

  // Input
  const [affordanceInput, setAffordanceInput] = useState(
    initialValue ? initialValue : ""
  );

  const handleUpdateInput = (event: React.SyntheticEvent) => {
    const { target } = event;
    if (target) {
      setAffordanceInput((target as HTMLInputElement).value); // why?!?!
    }
  };

  const resetInput = () => setAffordanceInput("");

  // Hanlders
  const handleConfirm = () => {
    console.log("affordance: confirm");
    if (logicMode === "new") {
      console.log("logic mode: new");
      onAdd(affordanceInput);
      resetInput();
      setViewState("new");
    }
    if (logicMode === "existing") {
      console.log("logic mode: existing");
      const initialValueRef = initialValue ? initialValue : "";
      onConfirm(initialValueRef, affordanceInput);
      // resetInput();
      setViewState("read");
    }
    // log if invalid
    //   console.log("there is no affordance to add");
  };

  const handleCancel = () => {
    console.log("affordance: cancel");
    if (logicMode === "new") {
      console.log("logic mode: new");
      onCancel();
      resetInput();
      setViewState("new");
    }
    if (logicMode === "existing") {
      console.log("logic mode: existing");
      // onConfirm(affordanceInput);
      // resetInput();
      setViewState("read");
    }
  };

  const handleEdit = () => {
    setLogicMode("existing");
    setViewState("edit");
  };

  const handleRemove = () => {
    onRemove(affordanceInput);
  };

  return (
    <Box>
      {viewState === "new" && (
        <Button size="xs" onClick={() => setViewState("edit")}>
          Add New +
        </Button>
      )}
      {viewState === "edit" && (
        <HStack>
          {/* Show potential new one */}
          <AffordanceItem>{affordanceInput}</AffordanceItem>
          {/* Input */}
          <Input
            // variant="outline"
            onChange={handleUpdateInput}
            flexBasis="100px"
            size="sm"
            variant="flushed"
            colorScheme="teal"
            value={affordanceInput}
          />
          {/* disabled if empty */}
          <IconButtonNew
            aria-label="Confirm"
            onClick={handleConfirm}
            icon={<CheckIcon />}
          />
          <IconButtonNew
            aria-label="Cancel"
            // this could be either new or read
            onClick={handleCancel}
            icon={<CloseIcon />}
          />
        </HStack>
      )}
      {/*  */}
      {viewState === "read" && (
        <HStack>
          {/* Show potential new one */}
          <AffordanceItem>{children}</AffordanceItem>
          {/* Should hide until hover */}
          <IconButtonNew
            aria-label="Edit"
            onClick={handleEdit}
            icon={<EditIcon />}
          />
          <IconButtonNew
            aria-label="Remove"
            onClick={handleRemove}
            icon={<DeleteIcon />}
          />
        </HStack>
      )}
    </Box>
  );
};
