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

export type PlaceProps = {
  title: string;
  items?: string[];
  onPlace?: (e?: any) => void;
  onAffordance?: () => void;
  onAdd?: () => void;
};

type PlaceStackProps = StackProps & PlaceProps;

export const PlaceStack = ({
  title,
  items,
  onPlace: handlePlace = () => {
    console.log("place click");
  },
  onAffordance = () => {
    console.log("Affordance click");
  },
  onAdd = () => {
    console.log("add new");
  },
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
      <PlaceItem onClick={handlePlace}>
        {title}
        {activeAffordance && ` + ${activeAffordance}`}
      </PlaceItem>
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
              console.log("edit me");
              // Set active affordance
              setActiveAffordance(i);
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
