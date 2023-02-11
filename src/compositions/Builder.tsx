import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Input } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { mockPlaceArray } from "../mock";
import { Database } from "../utils/database.types";
import { PlaceStack, PlaceProps } from "../components";
import { setEnvironmentData } from "worker_threads";
import { MockPane } from "./BuilderMockPane";

export const SupabasePane = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState<PlaceProps[]>(mockPlaceArray);
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("load primary pane");
    // getPlaces();
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
        // setPlacesData(data); // TODO fix this
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
        {/* {placesData &&
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
          })} */}
        <Button onClick={handleAddPlace}>Add New Place</Button>
      </Stack>
    </Box>
  );
};

type PrimaryPaneProps = {
  useLocal?: boolean;
};

export const PrimaryPane = ({ useLocal = true }: PrimaryPaneProps) => {
  return useLocal ? <MockPane /> : <SupabasePane />;
};

export default PrimaryPane;
