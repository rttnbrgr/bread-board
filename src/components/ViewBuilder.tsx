import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps
} from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";

const PlaceItem = ({ children }: TextProps) => {
  return (
    <Text bg="black" color="white" py="2" px="2">
      {children}
    </Text>
  );
};

const AffordanceItem = ({ children }: TextProps) => {
  return (
    <Text borderLeft="2px solid black" px="2" py="2">
      {children}
    </Text>
  );
};

type PlaceProps = {
  title: string;
  items: string[] | null;
};

type PlaceStackProps = StackProps &
  PlaceProps & {
    onClick?: () => void;
  };

const PlaceStack = ({ title, items, onClick, ...props }: PlaceStackProps) => {
  return (
    <Stack spacing="0" alignItems={"flex-start"}>
      <PlaceItem>{title}</PlaceItem>
      {items &&
        items.map((item, i) => <AffordanceItem key={i}>{item}</AffordanceItem>)}
      {/* Add new affordance */}
      <Box pl="2">
        <Button size="xs" onClick={onClick}>
          Add
        </Button>
      </Box>
    </Stack>
  );
};

const PrimaryPane = () => {
  const [data, setData] = useState<PlaceProps[]>(mockPlaceArray);

  const handleAddAffordance = () => {
    console.log("add affordance");
  };

  const handleAddPlace = () => {
    console.log("add place");
    setData(prevData => {
      console.log("prevData", prevData);
      let newData = prevData;
      newData.push({ title: `New Place X`, items: [] });
      return newData;
    });
    // setData(prevData => {
    //   return [{ title: "onlye one", items: [] }];
    // });
  };

  return (
    <Box bg="teal" width="fit-content">
      hey
      <Stack direction="row" spacing="8">
        {data &&
          data.map((place, i) => (
            <PlaceStack {...place} onClick={handleAddAffordance} key={i} />
          ))}
        <Button onClick={handleAddPlace}>Add New Place</Button>
      </Stack>
    </Box>
  );
};

export default PrimaryPane;
