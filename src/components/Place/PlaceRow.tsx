import { useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  Box,
  Button,
  StackProps,
  Input,
  HStack,
  BoxProps,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "../chakra";
import { PlaceItem } from "./PlaceItem";
import { useKeyPress } from "../../hooks";

type PlaceOnlyProps = {
  initialValue?: string;
  isNew: boolean;
  onAdd?: (x: string) => void;
  onConfirm?: (pv: string, x: string) => void;
  onCancel?: () => void;
  onEdit?: (x?: number) => void;
  onRemove?: (x: string) => void;
};

type PlaceRowProps = BoxProps & PlaceOnlyProps;

export const PlaceRow = ({
  initialValue = "",
  isNew = false,
  onAdd = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  onEdit = () => {},
  onRemove = () => {},
  children,
  ...props
}: PlaceRowProps) => {
  // State of the Row
  const [isEditing, setIsEditing] = useState<Boolean>(isNew); // only is editing by default on new
  const inputRef = useRef<HTMLInputElement>(null);
  const escPress: boolean = useKeyPress("Escape");
  const returnPress: boolean = useKeyPress("Enter");

  // Input
  const [placeInput, setPlaceInput] = useState(
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
      setPlaceInput((target as HTMLInputElement).value); // why?!?!
    }
  };

  const resetInput = () => setPlaceInput(initialValue);

  // Hanlders
  const handleEdit = () => {
    console.log("PLACEROW - handledit");
    setIsEditing(true);
    onEdit();
  };

  const handleConfirm = () => {
    console.log("PLACEROW - handleConfirm");

    if (isNew) {
      // Confirm a new add
      onAdd(placeInput);
      resetInput();
      return;
    }

    // Confirm an existing edit
    // console.log("handleconfirm after is new");
    const initialValueRef = initialValue ? initialValue : "";
    onConfirm(initialValueRef, placeInput);
    setIsEditing(false);
  };

  const handleCancel = () => {
    onCancel();
    resetInput();
    setIsEditing(false);
  };

  const handleRemove = () => {
    onRemove(placeInput);
  };

  const [showActions, setShowActions] = useState(false);

  function handleKeyPress(e) {
    const key = e.key;
    const code = e.code;
    // console.log(`key: ${key}, code: ${code}`, states);
    console.log(`key: ${key}, code: ${code}`);
    // var key = e.key;
    // var regex = /[0-9]|\./;
    // if (!regex.test(key)) {
    //   e.preventDefault();
    // } else {
    //   console.log("You pressed a key: " + key);
    // }

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
            value={placeInput}
          />
          <HStack spacing="0">
            <IconButton
              aria-label="Confirm"
              onClick={handleConfirm}
              icon={<CheckIcon />}
              disabled={placeInput === ""}
            />
            <IconButton
              aria-label="Cancel"
              onClick={handleCancel}
              icon={<CloseIcon />}
            />
          </HStack>
        </HStack>
      )}
      {/*  */}
      {!isEditing && (
        <HStack
          justifyContent="space-between"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <PlaceItem>{children}</PlaceItem>
          {/* Should hide until hover */}
          <HStack spacing="0" opacity={showActions ? "100%" : "10%"}>
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
