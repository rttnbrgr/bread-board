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
  } = useDisclosure({ defaultIsOpen: true });

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
        <Box bg="grey.100">
          <Container maxW="container.xl">
            <Flex>
              <Box bg="orange" flex="3 1 200px">
                <PrimaryPane />
              </Box>
              <Box
                bg=""
                flex="1 1 200px"
                display={accountIsOpen ? "block" : "none"}
                // TODO: fix animation
                // sx={{
                //   flexGrow: 1,
                //   flexShrink: 1,
                //   flexBasis: accountIsOpen ? "200px" : 0,
                //   width: accountIsOpen ? "200px" : 0
                // }}
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
