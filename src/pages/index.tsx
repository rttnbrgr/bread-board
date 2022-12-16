import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Marketing from "../components/ViewMarketing";
import HeaderBar from "../components/HeaderBar";
import Login from "../components/Login";
import {
  Box,
  BoxProps,
  Button,
  useDisclosure,
  UseDisclosureProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Container,
  Flex
} from "@chakra-ui/react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

// const AcccountPane = ({}) => {

// }

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
        <Box bg="grey.100">
          <Container maxW="container.xl">
            <Flex>
              <Box bg="orange" flex="3 1 200px">
                Other
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
