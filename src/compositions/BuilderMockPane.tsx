import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Input, AlertTitleProps } from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";
import { PlaceStack, PlaceProps } from "../components";
import { PlaceRow } from "../components/PlaceItem/PlaceRow";

type PlaceData = Pick<PlaceProps, "title" | "items">;

export const MockPane = () => {
  const [placesData, setPlacesData] = useState<PlaceData[]>([]);

  // Input
  const [showPlaceInput, setShowPlaceInput] = useState<Boolean>(false);
  const [newPlace, setNewPlace] = useState("");

  const handleNewPlaceInput = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setNewPlace(event.target.value); // why?!?!
  };

  function loadInitialData(initialData = mockPlaceArray) {
    setPlacesData(initialData);
  }

  useEffect(() => {
    console.log("load primary pane");
    loadInitialData();
    // load in the data
  }, []);

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
      setPlacesData(prevData => {
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

  /**
   * All new below here
   */

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
    <Box width="fill-available">
      <Box>newPlace: {newPlace}</Box>
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
