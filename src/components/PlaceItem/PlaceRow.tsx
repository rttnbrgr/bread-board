import { useState } from "react";
import { Box, Button, StackProps, Input, HStack } from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "../chakra";
import { PlaceItem } from "./PlaceItem";

type ViewState = "new" | "edit" | "read";

type PlaceOnlyProps = {
  initialView?: ViewState;
  initialValue?: string;
  title?: string;
  onAdd?: (x: string) => void;
  onConfirm?: (pv: string, x: string) => void;
  onCancel?: () => void;
  onEdit?: (x: string) => void;
  onRemove?: (x: string) => void;
};

type PlaceRowProps = StackProps & PlaceOnlyProps;

export const PlaceRow = ({
  initialView = "read",
  initialValue = "",
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
}: PlaceRowProps) => {
  // State of the Row
  const [viewState, setViewState] = useState<ViewState>(initialView);

  // View fork
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

  const resetInput = () => setAffordanceInput(initialValue);

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
      resetInput(); // need to get this figured out
      setViewState("read");
    }
  };

  const handleEdit = () => {
    setLogicMode("existing");
    onEdit("foo");
    setViewState("edit");
  };

  const handleRemove = () => {
    onRemove(affordanceInput);
  };

  // compute disabled
  // compute hover
  const [isShown, setIsShown] = useState(false);

  return (
    <Box>
      {viewState === "new" && (
        // Fix this styles
        <Box p="2">
          <Button
            variant="outline"
            borderRadius="0"
            size="sm"
            onClick={() => setViewState("edit")}
          >
            Add New Place
          </Button>
        </Box>
      )}
      {viewState === "edit" && (
        <>
          <HStack justifyContent="space-between">
            <Input
              onChange={handleUpdateInput}
              size="sm"
              variant="flushed"
              colorScheme="teal"
              px="2"
              value={affordanceInput}
            />
            <HStack spacing="0">
              <IconButton
                aria-label="Confirm"
                onClick={handleConfirm}
                icon={<CheckIcon />}
                disabled={affordanceInput === ""}
              />
              <IconButton
                aria-label="Cancel"
                onClick={handleCancel}
                icon={<CloseIcon />}
              />
            </HStack>
          </HStack>
        </>
      )}
      {/*  */}
      {viewState === "read" && (
        <HStack
          justifyContent="space-between"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {/* Show potential new one */}
          <PlaceItem>{children}</PlaceItem>
          {/* Should hide until hover */}
          <HStack spacing="0" opacity={isShown ? "100%" : "10%"}>
            <IconButton
              aria-label="Edit"
              onClick={handleEdit}
              icon={<EditIcon />}
            />
            <IconButton
              aria-label="Remove"
              onClick={handleRemove}
              icon={<DeleteIcon />}
            />
          </HStack>
        </HStack>
      )}
    </Box>
  );
};
