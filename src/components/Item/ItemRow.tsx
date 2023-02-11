import { KeyboardEventHandler, useLayoutEffect, useRef, useState } from "react";
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
import { PlaceItemText } from "../Place/PlaceItemText";
import { useKeyPress } from "../../hooks";
import { AffordanceItemText } from "../Affordance";
import { ReadItemWrapper } from "./ReadItem";

// type UpdateItemProps = {
//   children: React.ReactNode;
//   onEdit?: () => void;
//   onRemove?: () => void;
//   inputRef: any;
// };

// const UpdateItemWrapper = ({
//   children,
//   onEdit,
//   onRemove,
//   inputRef,
//   onChange,
// }: UpdateItemProps) => {
//   const [showActions, setShowActions] = useState(false);

//   return (
//     <HStack justifyContent="space-between">
//       <Input
//         ref={inputRef}
//         onChange={handleUpdateInput}
//         // onKeyDown={(e: KeyboardEventHandler<HTMLInputElement>) => handleKeyPress(e)}
//         onKeyDown={e => handleKeyPress(e)}
//         size="sm"
//         variant="flushed"
//         colorScheme="teal"
//         px="2"
//         value={placeInput}
//       />
//       <HStack spacing="0">
//         <IconButton
//           aria-label="Confirm"
//           onClick={handleConfirm}
//           icon={<CheckIcon />}
//           disabled={placeInput === ""}
//         />
//         <IconButton
//           aria-label="Cancel"
//           onClick={handleCancel}
//           icon={<CloseIcon />}
//         />
//       </HStack>
//     </HStack>
//   );
// };

export type ItemRowOnlyProps = {
  initialValue?: string;
  isNew?: boolean;
  onAdd?: (x: string) => void;
  onConfirm?: (pv: string, x: string) => void;
  onCancel?: () => void;
  onEdit?: (x?: number) => void;
  onRemove?: (x: string) => void;
  optIn?: boolean;
};

export type ItemRowProps = BoxProps & ItemRowOnlyProps;

export const ItemRow = ({
  initialValue = "",
  isNew = false,
  onAdd = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  onEdit = () => {},
  onRemove = () => {},
  children,
  optIn,
  ...props
}: ItemRowProps) => {
  // State of the Row
  const [isEditing, setIsEditing] = useState<Boolean>(isNew); // only is editing by default on new
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Input Relevant Logic
   *
   * Focus | Update | Reset
   *
   */
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

  /**
   * CRUD Handlers
   * ---
   *
   * edit | confirm | cancel | remove
   *
   */
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

  /**
   * for read item
   */
  const handleRemove = () => {
    onRemove(placeInput);
  };

  return (
    <Box>
      {isEditing && (
        <HStack justifyContent="space-between">
          <Input
            ref={inputRef}
            onChange={handleUpdateInput}
            // onKeyDown={(e: KeyboardEventHandler<HTMLInputElement>) => handleKeyPress(e)}
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
      {!isEditing && (
        <ReadItemWrapper onEdit={handleEdit} onRemove={handleRemove}>
          {children}
        </ReadItemWrapper>
      )}
    </Box>
  );
};
