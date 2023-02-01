import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Input,
  AlertTitleProps,
  VStack,
} from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";
import { PlaceStack, PlaceProps } from "../components";
import { PlaceRow } from "../components/PlaceItem/PlaceRow";
import { useLocalStorage } from "../hooks";

type PlaceData = Pick<PlaceProps, "title" | "items">;

export const MockPane = () => {
  const [placesData, setPlacesData] = useLocalStorage<PlaceData[]>(
    "placesLocalData",
    []
  );

  // Input
  const [showPlaceInput, setShowPlaceInput] = useState<Boolean>(false);

  function loadInitialData(initialData = mockPlaceArray) {
    setPlacesData(initialData);
  }

  useEffect(() => {
    console.log("load primary pane");
    // loadInitialData();
  }, []);

  const handleEditPlace = (i?: number) => {
    console.log("BUILDERMOCKPANE - handleEditPlace");
  };

  const handleUpdatePlace = (prevVal: string, val: string) => {
    console.log("BUILDERMOCKPANE - handleUpdatePlace");
    console.log(`${val} for ${prevVal}`);

    setPlacesData(prevData => {
      // do i need to safety check?
      if (!prevData) {
        return prevData;
      }

      /**
       * Confirm/update logic
       * Find the index;
       * copy the data;
       * update the object at the index;
       * return new data
       */

      const updateIndex = prevData.findIndex(x => x.title === prevVal);
      const stateCopy = [...prevData];
      const updatePlaceObject = {
        ...prevData[updateIndex],
        title: val,
      };
      stateCopy.splice(updateIndex, 1, updatePlaceObject);

      // Debug
      // console.group("setPlacesData");
      // console.log("prevData", prevData);
      // console.log("removeIndex", updateIndex);
      // console.log("updatePlaceObject", updatePlaceObject);
      // console.log("stateCopy", stateCopy);
      // console.groupEnd();

      return stateCopy;
    });
  };

  const handleAddPlaceNew = (val: string) => {
    console.log("BUILDERMOCKPANE - handleAddPlaceNew", val);
    if (val) {
      setPlacesData(prevData => {
        /**
         * If the array exists...
         * spread the old data + push a new entry
         * otherwise, return a new array with this value
         */
        const newPlace: PlaceData = {
          title: val,
          items: [],
        };
        return prevData ? [...prevData, newPlace] : [newPlace];
      });
      // Local to this file;
      setShowPlaceInput(false);
    }
  };

  const handleCancelPlace = () => {
    console.log("BUILDERMOCKPANE - handleCancelPlace");
    if (showPlaceInput) {
      setShowPlaceInput(false);
    }
  };

  const removePlace = (val: string) => {
    setPlacesData(prevData => {
      if (!prevData) {
        return prevData;
      }

      /**
       * Remove logic
       * Find the index; copy the data; remove the index + return copied data
       */

      const removeIndex = prevData.findIndex(x => x.title === val);
      const stateCopy = [...prevData];
      stateCopy.splice(removeIndex, 1);
      return stateCopy;
    });
  };

  return (
    <Box width="fill-available" position="relative">
      <Box
        p="4"
        bg="teal.300"
        borderRadius="base"
        display="inline-flex"
        right="calc(100% + 1em)"
        top="4"
        mb="4"
      >
        <VStack spacing="2">
          <Button variant="solid" size="sm" onClick={() => loadInitialData()}>
            Reload data
          </Button>
        </VStack>
      </Box>
      {/* Test */}
      <Stack direction="row" spacing="8">
        {placesData &&
          placesData.map((place, i) => (
            <PlaceStack
              key={i}
              {...place}
              onEditPlace={handleEditPlace}
              onConfirmPlace={handleUpdatePlace}
              onRemovePlace={removePlace}
              onCancelPlace={handleCancelPlace}
            />
          ))}
        {/* Add New Place */}
        {showPlaceInput ? (
          <PlaceRow
            initialView="edit"
            onAdd={handleAddPlaceNew}
            onCancel={handleCancelPlace}
          />
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
