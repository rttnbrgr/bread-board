import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Box, useDisclosure, Container, Flex } from "@chakra-ui/react";
import { Account, HeaderBar, Login } from "../components";
import { PrimaryPane, Marketing } from "../compositions";

const Home = () => {
  const session = useSession();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: accountIsOpen,
    onOpen: accountOnOpen,
    onClose: accountOnClose,
    onToggle: accountOnToggle
  } = useDisclosure({ defaultIsOpen: false });

  const accountDisclosure = {
    accountIsOpen,
    accountOnOpen,
    accountOnClose,
    accountOnToggle
  };
  const supabase = useSupabaseClient();

  const onHeadbarAction = session
    ? () => supabase.auth.signOut()
    : () => {
        onToggle();
      };
  const headbarActionText = session ? "Logout" : "Login";

  return (
    <>
      <HeaderBar onToggle={onToggle} isOpen={isOpen} {...accountDisclosure} />
      {!session ? (
        // Not Logged In
        <Container maxW="container.sm">
          <>
            {isOpen ? (
              <Login isOpen={isOpen} onClose={onClose} />
            ) : (
              <Marketing isOpen={isOpen} onOpen={onOpen} />
            )}
          </>
        </Container>
      ) : (
        // Logged In
        <Box>
          <Container maxW="container.xl">
            <Flex>
              <Box flex="3 1 200px">
                <PrimaryPane />
              </Box>
              <Box
                bg=""
                flex="1 1 200px"
                display={accountIsOpen ? "block" : "none"}
              >
                <Account session={session} />
              </Box>
            </Flex>
          </Container>
        </Box>
      )}
      {/* <LoginModal isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};

export default Home;
