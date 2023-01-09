import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  Button,
  Stack,
  Container,
  UseDisclosureProps
} from "@chakra-ui/react";

const HeaderBarStyles = {
  // bg: "tomato",
  px: 4,
  py: 2,
  display: "flex",
  justifyContent: "space-between"
};

type Props = {
  onToggle: () => void;
  isOpen: boolean;
  accountOnToggle: () => void;
  accountIsOpen: boolean;
};

export const HeaderBar = ({
  onToggle,
  isOpen,
  accountIsOpen,
  accountOnToggle
}: Props) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const onHeadbarAction = session
    ? () => supabase.auth.signOut()
    : () => {
        onToggle();
      };
  const headbarActionText = session ? "Logout" : "Login";

  const onAccount = () => {
    console.log("account");
    accountOnToggle();
  };

  return (
    <Box bg="#11998e" bgGradient="linear(to-r, #38ef7d, #11998e)">
      <Container maxW="container.xl" {...HeaderBarStyles}>
        <Box
          p="1"
          px="2"
          bg="white"
          color="black"
          fontWeight="bold"
          lineHeight="2"
        >
          PATH
        </Box>
        <Stack direction="row">
          {session && (
            <Button colorScheme="white" variant="link" onClick={onAccount}>
              Account
            </Button>
          )}
          <Button colorScheme="white" variant="link" onClick={onHeadbarAction}>
            {isOpen && !session && "Close "}
            {headbarActionText}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
