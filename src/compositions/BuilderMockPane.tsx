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
import { PlaceRow, PlaceStack, PlaceProps } from "../components";
import { useKeyDebug, useKeyPress, useLocalStorage } from "../hooks";

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

  const handleEditPlace = (i?: number) => {};

  const handleUpdatePlace = (prevVal: string, val: string) => {
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

      return stateCopy;
    });
  };

  const handleAddPlace = (val: string) => {
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

  // useKeyDebug();
  const showDebugBox = false;

  return (
    <Box width="fill-available" position="relative" pt="4">
      {showDebugBox && (
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
      )}
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
        <Box minW="300px">
          {showPlaceInput ? (
            <PlaceRow
              isNew
              onAdd={handleAddPlace}
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
        </Box>
      </Stack>
    </Box>
  );
};
