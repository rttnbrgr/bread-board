import React, { useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps,
  Input,
} from "@chakra-ui/react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { mockPlaceArray } from "../mock";
import { Database } from "../utils/database.types";
import {
  PlaceItem,
  AffordanceItem,
  PlaceStack,
  PlaceProps,
} from "../components";
import { setEnvironmentData } from "worker_threads";

export const SupabasePane = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState<PlaceProps[]>(mockPlaceArray);
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("load primary pane");
    getPlaces();
  }, []);

  async function getPlaces() {
    console.log("get places?");
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error } = await supabase.from("places").select("*");

      if (error) {
        throw error;
      }

      if (data) {
        console.log("if places data!", data);
        setPlacesData(data);
      }
    } catch (error) {
      alert("Error loading places data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getCountries() {
    console.log("getCountries?");
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error } = await supabase.from("countries").select();

      if (error) {
        throw error;
      }

      if (data) {
        console.log("if countries data!", data);
      }
    } catch (error) {
      alert("Error loading places data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddAffordance = () => {
    console.log("add affordance");
  };

  const handleAddPlace = () => {
    console.log("add place");
    setData(prevData => {
      console.log("prevData", prevData);
      // let newData = prevData;
      // newData.push({ title: `New Place X`, items: [] });
      let newData = [...prevData, { title: `New Place X`, items: [] }];
      // newData.push({ title: `New Place X`, items: [] });
      return newData;
    });
    // setData(prevData => {
    //   return [{ title: "onlye one", items: [] }];
    // });
  };

  return (
    <Box bg="teal" width="fit-content">
      hey + {loading && "Loading ..."}
      {/* Real */}
      <Stack direction="row" spacing="8">
        {placesData &&
          placesData.map((place, i) => {
            console.log("PLACE! ", place);
            return (
              <PlaceStack
                title={place.name}
                items={[]}
                onClick={() => {
                  console.log("add a new place to Supabase");
                }}
                key={place.id_new}
              />
            );
          })}
        <Button onClick={handleAddPlace}>Add New Place</Button>
      </Stack>
    </Box>
  );
};

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

  return (
    <Box width="fill-available">
      <Box>newPlace: {newPlace}</Box>
      {/* Test */}
      <Stack direction="row" spacing="8">
        {data &&
          data.map((place, i) => (
            <PlaceStack
              {...place}
              onPlace={() => removePlace(i)}
              onClick={handleAddAffordance}
              key={i}
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

export const PrimaryPane = (useLocal = true) => {
  return useLocal ? <MockPane /> : <SupabasePane />;
};

export default PrimaryPane;
