import { useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps
} from "@chakra-ui/react";
import {
  useUser,
  useSupabaseClient,
  Session
} from "@supabase/auth-helpers-react";
import { mockPlaceArray } from "../mock";
import { Database } from "../utils/database.types";
import {
  PlaceItem,
  AffordanceItem,
  PlaceStack,
  PlaceProps
} from "../components/Place";

export const PrimaryPane = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState<PlaceProps[]>(mockPlaceArray);
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
      hey + {loading && "Loading ..."}
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
