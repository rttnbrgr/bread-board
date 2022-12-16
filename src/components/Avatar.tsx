import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import { Box, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

type AvatarProps = {
  uid: string;
  url: Profiles["avatar_url"];
  size: number;
  onUpload: (url: string) => void;
};

export default function Avatar({ uid, url, size, onUpload }: AvatarProps) {
  const supabase = useSupabaseClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          borderRadius="base"
          boxSize={size}
          maxWidth="100%"
          sx={{
            overflow: "hidden",
            objectFit: "cover"
          }}
        />
      ) : (
        <Box
          boxSize={size}
          background="gray.700"
          borderRadius="base"
          border="1px"
          borderColor="gray.300"
        />
      )}
      <Box width={size}>
        <FormControl>
          <FormLabel>{uploading ? "Uploading ..." : "Upload"}</FormLabel>
          <Input
            style={{
              visibility: "hidden",
              position: "absolute"
            }}
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
