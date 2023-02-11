import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, Button, Stack, Container, BoxProps } from "@chakra-ui/react";

const Logo = (props: BoxProps) => {
  return (
    <Box
      p="1"
      px="2"
      bg="white"
      color="black"
      fontWeight="bold"
      lineHeight="2"
      {...props}
    >
      PATH
    </Box>
  );
};

const HeaderBarWrapperStyles = {
  // bg: "#11998e",
  // bgGradient: "linear(to-r, #38ef7d, #11998e)",
  // Convert these to theme
  bg: "black",
  color: "white",
};

const HeaderBarContainerStyles = {
  px: 4,
  py: 2,
  display: "flex",
  justifyContent: "space-between",
  maxW: "container.xl",
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
  accountOnToggle,
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
    <Box {...HeaderBarWrapperStyles}>
      <Container {...HeaderBarContainerStyles}>
        <Logo />
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
