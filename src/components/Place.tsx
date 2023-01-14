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
  Input
} from "@chakra-ui/react";
import { PlaceItem } from "./PlaceItem";
import { AffordanceItem } from "./AffordanceItem";
// import { SmallCloseIcon } from "@chakra-ui/icons";

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

  // Input
  const [showAffordanceInput, setShowAffordanceInput] =
    useState<Boolean>(false);
  const [newAffordance, setNewAffordance] = useState("");

  const handleNewAffordanceInput = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setNewAffordance(event.target.value); // why?!?!
  };

  const handleAddAffordance = () => {
    console.log("add affordance");
    if (!!newAffordance) {
      // then add it
      setData(prevData => {
        console.log("prevData", prevData);
        if (prevData) {
          console.log("data exists");
          // take the old data
          // push a new entry
          let newData = [...prevData, newAffordance];
          console.log("newData", newData);
          // return it
          return newData;
        } else {
          return [newAffordance];
        }
      });

      // Reset the form state
      setNewAffordance("");
    } else {
      console.log("there is no affordance to add");
    }
  };

  const removeAffordance = (i: number) => {
    console.log("remove place", i);

    setData(prevData => {
      if (!prevData) {
        return prevData;
      }
      // Copy
      const stateCopy = [...prevData];
      // Remove the item at i
      stateCopy.splice(i, 1);
      // log stuff
      console.log("prevData", prevData);
      console.log("stateCopy", stateCopy);
      return stateCopy;
    });
  };

  return (
    <Stack spacing="0" alignItems={"flex-start"}>
      <PlaceItem onClick={handlePlace}>{title}</PlaceItem>
      {data &&
        data.map((item, i) => (
          <AffordanceItem key={i} onClick={() => removeAffordance(i)}>
            {item}
          </AffordanceItem>
        ))}
      {/* Add new affordance */}
      <Box pl="2">
        {showAffordanceInput ? (
          <>
            <Input
              variant="outline"
              onChange={handleNewAffordanceInput}
              flexBasis="100px"
              value={newAffordance}
            />
            <Button size="xs" onClick={handleAddAffordance}>
              Add
            </Button>
            <Button size="xs" onClick={() => setShowAffordanceInput(false)}>
              Close
            </Button>
          </>
        ) : (
          <Button size="xs" onClick={() => setShowAffordanceInput(true)}>
            Add New
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default PlaceStack;
