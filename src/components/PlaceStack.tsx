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
import { IconButton as IconButtonNew } from "./chakra";
import { PlaceItem } from "./PlaceItem";
import { Affordance, AffordanceItem } from "./AffordanceItem";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { PlaceRow } from "./PlaceItem/PlaceRow";

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
    }
  };

  const handleUpdateAffordance = (prevVal: string, val: string) => {
    console.log(`update affordance: ${val} for ${prevVal} in Place component`);

    setData(prevData => {
      // do i need to safety check?
      if (!prevData) {
        return prevData;
      }

      console.log("prevData", prevData);

      // Find the val
      const updateIndex = prevData.findIndex(x => x === prevVal);
      console.log("removeIndex", updateIndex);

      // Copy
      const stateCopy = [...prevData];

      // Remove the item at i
      stateCopy.splice(updateIndex, 1, val);
      // log stuff

      console.log("stateCopy", stateCopy);
      return stateCopy;
    });
  };

  const handleEditAffordance = (i: number) => {
    // Set active affordance
    setActiveAffordance(i);
  };

  const removeAffordance = (val: string) => {
    console.log(`remove affordance: ${val} in Place component`);
    console.log("val: ", val);

    setData(prevData => {
      // do i need to safety check?
      if (!prevData) {
        return prevData;
      }

      console.log("prevData", prevData);

      // Find the val
      const removeIndex = prevData.findIndex(x => x === val);
      console.log("removeIndex", removeIndex);

      // Copy
      const stateCopy = [...prevData];

      // Remove the item at i
      stateCopy.splice(removeIndex, 1);
      // log stuff

      console.log("stateCopy", stateCopy);
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
      <PlaceRow
        initialValue={title}
        initialView="read"
        onEdit={onEditPlace}
        onConfirm={onConfirmPlace}
        onRemove={onRemovePlace}
        onCancel={onCancelPlace}
      >
        {title}
        {activeAffordance && ` + ${activeAffordance}`}
      </PlaceRow>
      {/* Affordances */}
      {data &&
        data.map((item, i) => (
          <Affordance
            key={i}
            onRemove={removeAffordance}
            onConfirm={handleUpdateAffordance}
            initialValue={item}
            initialView={activeAffordance === i ? "edit" : "read"}
            onEdit={() => {
              handleEditAffordance(i);
            }}
          >
            {item}
          </Affordance>
        ))}

      {/* Add new affordance */}
      <Affordance onAdd={handleAddAffordance} initialView="new" />
    </Stack>
  );
};

export default PlaceStack;
