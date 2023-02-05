import { useLayoutEffect, useRef, useState } from "react";
import { Box, Button, StackProps, Input, HStack } from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "../chakra";
import { AffordanceItem } from "./AffordanceItem";

type ViewState = "new" | "edit" | "read";

export type ItemHandlers = {
  onAdd?: (x: string) => void;
  onConfirm?: (pv: string, x: string) => void;
  onCancel?: () => void;
  onEdit?: ((x: string) => void) | ((x?: string) => void);
  onRemove?: (x: string) => void;
};

type AffordanceOnlyProps = ItemHandlers & {
  initialValue?: string;
  // bew
  isNew?: boolean;
};

type AffordanceProps = StackProps & AffordanceOnlyProps;

export const Affordance = ({
  initialValue = "",
  isNew = false,
  onAdd = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  onEdit = () => {},
  onRemove = () => {},
  children,
  ...props
}: AffordanceProps) => {
  // State of the Row
  const [isEditing, setIsEditing] = useState<Boolean>(isNew);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Input Relevant Logic
   *
   * Focus | Update | Reset
   *
   */
  const [affordanceInput, setAffordanceInput] = useState(
    initialValue ? initialValue : ""
  );

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdateInput = (event: React.SyntheticEvent) => {
    const { target } = event;
    if (target) {
      setAffordanceInput((target as HTMLInputElement).value); // why?!?!
    }
  };

  const resetInput = () => setAffordanceInput(initialValue);

  /**
   * CRUD Handlers
   * ---
   *
   * edit | confirm | cancel | remove
   *
   */

  const handleEdit = () => {
    console.log("AFFORDANCE - ROW - handleEdit");
    setIsEditing(true);
    onEdit("foo");
  };

  const handleConfirm = () => {
    console.log("AFFORDANCE - ROW - handleConfirm");

    if (isNew) {
      onAdd(affordanceInput);
      resetInput();
      return;
    }

    const initialValueRef = initialValue ? initialValue : "";
    onConfirm(initialValueRef, affordanceInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    console.log("AFFORDANCE - ROW - handleCancel");
    onCancel();
    resetInput();
    setIsEditing(false);
  };

  const handleRemove = () => {
    onRemove(affordanceInput);
  };

  const [showActions, setShowActions] = useState(false);

  function handleKeyPress(e: KeyboardEvent) {
    const key = e.key;
    const code = e.code;

    switch (code) {
      case "Enter":
        handleConfirm();
        break;
      case "Escape":
        handleCancel();
        break;
      default:
        break;
    }
  }

  return (
    <Box>
      {isEditing && (
        <HStack justifyContent="space-between">
          <Input
            ref={inputRef}
            onChange={handleUpdateInput}
            onKeyDown={e => handleKeyPress(e)}
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
      )}
      {!isEditing && (
        <HStack
          justifyContent="space-between"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <AffordanceItem>{children}</AffordanceItem>
          <HStack spacing="0" opacity={showActions ? "100%" : "0%"}>
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
