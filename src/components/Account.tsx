import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session
} from "@supabase/auth-helpers-react";
import {
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Box
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import { Database } from "../utils/database.types";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [website, setWebsite] = useState<Profiles["website"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    console.log("get Profile?");
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log("if data!", data);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url
  }: {
    username: Profiles["username"];
    website: Profiles["website"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString()
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user!.id}
        url={avatar_url}
        size={150}
        onUpload={url => {
          setAvatarUrl(url);
          updateProfile({ username, website, avatar_url: url });
        }}
      />

      <Box bg="gray.200">
        <Text fontSize="2xl" lineHeight="2" display="block">
          Account
        </Text>
      </Box>

      <Stack spacing="4" my="16">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={session.user.email} disabled />
        </FormControl>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username || ""}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Website</FormLabel>
          <Input
            type="text"
            value={website || ""}
            onChange={e => setWebsite(e.target.value)}
          />
        </FormControl>

        <Button
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
          colorScheme="green"
          // display="flex"
          w="100%"
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </Stack>
    </div>
  );
}
