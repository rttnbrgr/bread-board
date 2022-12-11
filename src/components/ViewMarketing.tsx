import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  BoxProps,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  UseDisclosureProps,
  Text
} from "@chakra-ui/react";

const Marketing = ({ isOpen, onOpen }: UseDisclosureProps) => {
  const supabase = useSupabaseClient();

  return (
    <Box py="4">
      <Stack
        direction="column"
        opacity={isOpen ? "0%" : "100%"}
        fontSize="2xl"
        spacing="6"
        mb="4"
      >
        <Text>👋 Hey.</Text>
        <Text>
          {`Whats up? If you're reading this, it means I think you're pretty swell.
        And I've asked for your help to build something that I can't make on my
        own.`}
        </Text>
        <Text>
          {`I'm not exactly sure what this is going to be, but I hope you come along
        for the ride.`}
        </Text>
      </Stack>

      <Stack direction="column" opacity={isOpen ? "0%" : "100%"}>
        <Button onClick={onOpen} variant="solid" colorScheme="gray">
          {`Let's Do It!`}
        </Button>
        <Button onClick={onOpen} variant="outline" colorScheme="gray">
          The same thing, but a secondary btn
        </Button>
      </Stack>
    </Box>
  );
};

export default Marketing;
