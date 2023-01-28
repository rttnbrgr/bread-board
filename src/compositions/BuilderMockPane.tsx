import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Input } from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";
import { PlaceStack, PlaceProps } from "../components";

export const MockPane = () => {
  const [data, setData] = useState<PlaceProps[]>([]);

  // Input
  const [showPlaceInput, setShowPlaceInput] = useState<Boolean>(false);
  const [newPlace, setNewPlace] = useState("");

  const handleNewPlaceInput = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setNewPlace(event.target.value); // why?!?!
  };

  function loadInitialData(initialData = mockPlaceArray) {
    setData(initialData);
  }

  useEffect(() => {
    console.log("load primary pane");
    loadInitialData();
    // load in the data
  }, []);

  const handleAddAffordance = () => {
    console.log("add affordance");
  };

  //   const handleAddPlace2 = (val: string) => {
  //     console.log("handleAddPlace");
  //     if (val) {
  //       setData(prevData => {
  //         /**
  //          * If the array exists...
  //          * spread the old data + push a new entry
  //          * otherwise, return a new array with this value
  //          */
  //         return prevData ? [...prevData, val] : [val];
  //       });
  //     }
  //   };

  const handleAddPlace = () => {
    console.log("add place");
    // if theres a place
    if (!!newPlace) {
      // setup the new entry
      const newEntry = {
        title: newPlace,
        items: [],
      };
      // then add it
      setData(prevData => {
        console.log("prevData", prevData);

        // take the old data
        // push a new entry
        let newData = [...prevData, newEntry];

        // return it
        return newData;
      });

      // Reset the form state
      setNewPlace("");

      // setData(prevData => {
      //   return [{ title: "onlye one", items: [] }];
      // });
    } else {
      console.log("there is no place to add");
    }
  };

  const removePlace = (i: number) => {
    console.log("remove place", i);
    setData(prevData => {
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

  const removePlaceNew = (val: string) => {
    console.log(`remove place: ${val} in Place component`);
    console.log("val: ", val);

    setData(prevData => {
      if (!prevData) {
        return prevData;
      }

      console.log("prevData", prevData);
      console.log("~~~~~~~~~~~~~");

      /**
       * Remove logic
       * Find the index; copy the data; remove the index + return copied data
       */
      const removeIndex = prevData.findIndex(x => x.title === val);
      const stateCopy = [...prevData];
      stateCopy.splice(removeIndex, 1);

      // console.log("removeIndex", removeIndex);
      // console.log("stateCopy", stateCopy);
      return stateCopy;
    });
  };

  return (
    <Box width="fill-available">
      <Box>newPlace: {newPlace}</Box>
      {/* Test */}
      <Stack direction="row" spacing="8">
        {data &&
          data.map((place, i) => (
            <PlaceStack
              key={i}
              {...place}
              onPlace={() => removePlace(i)}
              onClick={handleAddAffordance}
              //
              onRemove={removePlaceNew}
            />
          ))}
        {/* Add New Place */}
        {showPlaceInput ? (
          <>
            <Input
              variant="outline"
              onChange={handleNewPlaceInput}
              onBlur={() => {
                // setShowPlaceInput(false);
              }}
              flexBasis="100px"
              value={newPlace}
            />
            <Button onClick={handleAddPlace}>Add</Button>
            <Button onClick={() => setShowPlaceInput(false)}>Close</Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              borderRadius="0"
              onClick={() => setShowPlaceInput(true)}
            >
              Add New Place
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};
