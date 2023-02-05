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
import { IconButton as IconButtonNew } from "../chakra";
import { PlaceItem, ItemRow } from ".";
import { Affordance, AffordanceItem } from "../AffordanceItem";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { PlaceRow, PlaceRowNew } from "./PlaceRow";

export type PlaceProps = {
  title: string;
  items?: string[];
  onAffordance?: () => void;
  onAdd?: () => void;
  // Place
  onEditPlace?: (x?: number) => void;
  onConfirmPlace?: (pv: string, x: string) => void;
  onRemovePlace?: (x: string) => void;
  onCancelPlace?: () => void;
};

type PlaceStackProps = StackProps & PlaceProps;

export const PlaceStack = ({
  title,
  items,
  onAffordance = () => {
    console.log("Affordance click");
  },
  onAdd = () => {
    console.log("add new");
  },
  onEditPlace,
  onConfirmPlace,
  onRemovePlace,
  onCancelPlace,
  ...props
}: PlaceStackProps) => {
  // Affordance Data
  const [data, setData] = useState(items && [...items]);
  const [showAffordanceInput, setShowAffordanceInput] =
    useState<Boolean>(false);
  const [activeAffordance, setActiveAffordance] =
    useState<Number | undefined>(undefined);

  const handleAddAffordance = (val: string) => {
    if (val) {
      setData(prevData => {
        /**
         * If the array exists...
         * spread the old data + push a new entry
         * otherwise, return a new array with this value
         */
        return prevData ? [...prevData, val] : [val];
      });

      setShowAffordanceInput(false);
    }
  };

  const handleUpdateAffordance = (prevVal: string, val: string) => {
    setData(prevData => {
      // do i need to safety check?
      if (!prevData) {
        return prevData;
      }

      const updateIndex = prevData.findIndex(x => x === prevVal);
      const stateCopy = [...prevData];
      stateCopy.splice(updateIndex, 1, val);

      return stateCopy;
    });
  };

  const handleEditAffordance = (i: number) => {
    // Set active affordance
    setActiveAffordance(i);
  };

  const handleCancelAffordance = () => {
    if (showAffordanceInput) {
      setShowAffordanceInput(false);
    }
  };

  const removeAffordance = (val: string) => {
    setData(prevData => {
      if (!prevData) {
        return prevData;
      }

      const removeIndex = prevData.findIndex(x => x === val);
      const stateCopy = [...prevData];
      stateCopy.splice(removeIndex, 1);
      return stateCopy;
    });
  };

  return (
    <Stack
      spacing="0"
      alignItems={"stretch"}
      borderLeft="2px solid black"
      minW="300px"
    >
      <PlaceRowNew
        initialValue={title}
        onEdit={onEditPlace}
        onConfirm={onConfirmPlace}
        onRemove={onRemovePlace}
        onCancel={onCancelPlace}
        optIn
      >
        {title}
        {activeAffordance && ` + ${activeAffordance}`}
      </PlaceRowNew>
      {/* Affordances */}
      {data &&
        data.map((item, i) => (
          <ItemRow
            key={i}
            initialValue={item}
            onRemove={removeAffordance}
            onConfirm={handleUpdateAffordance}
            onCancel={handleCancelAffordance}
            onEdit={() => {
              handleEditAffordance(i);
            }}
          >
            <AffordanceItem>{item}</AffordanceItem>
          </ItemRow>
        ))}

      {/* Add new affordance */}
      <Box p="2">
        {showAffordanceInput ? (
          <Affordance
            isNew
            onAdd={handleAddAffordance}
            onCancel={handleCancelAffordance}
          />
        ) : (
          <Button
            variant="outline"
            borderRadius="0"
            size="sm"
            onClick={() => {
              setShowAffordanceInput(true);
            }}
          >
            Add New Item
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default PlaceStack;
