import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Marketing from "../components/ViewMarketing";
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

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const supabase = useSupabaseClient();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt="0" pb="8">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const LoginSlice = ({
  isOpen,
  onClose,
  ...boxProps
}: LoginModalProps & BoxProps) => {
  const supabase = useSupabaseClient();
  return (
    <Box {...boxProps} height={isOpen ? "400px" : "0"} overflow="hidden">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    </Box>
  );
};

const rootStyles = {
  bg: "tomato",
  px: 4,
  py: 2,
  display: "flex",
  justifyContent: "space-between"
};

const Root = ({ children, ...props }: BoxProps) => (
  <Box {...rootStyles} {...props}>
    {children}
  </Box>
);

const HeaderBarStyles = {
  // bg: "tomato",
  px: 4,
  py: 2,
  display: "flex",
  justifyContent: "space-between"
};

const HeaderBar = ({ onToggle, isOpen }) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const onHeadbarAction = session
    ? () => supabase.auth.signOut()
    : () => {
        onToggle();
      };
  const headbarActionText = session ? "Logout" : "Login";

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
        <Button colorScheme="white" variant="link" onClick={onHeadbarAction}>
          {isOpen && !session && "Close "}
          {headbarActionText}
        </Button>
      </Container>
    </Box>
  );
};

const Home = () => {
  const session = useSession();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const supabase = useSupabaseClient();

  const onHeadbarAction = session
    ? () => supabase.auth.signOut()
    : () => {
        onToggle();
      };
  const headbarActionText = session ? "Logout" : "Login";

  return (
    <>
      <HeaderBar onToggle={onToggle} isOpen={isOpen} />
      {!session ? (
        // Not Logged In
        <Container maxW="container.sm">
          <>
            {isOpen ? (
              <LoginSlice isOpen={isOpen} onClose={onClose} />
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
              <Box bg="" flex="1 1 200px">
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
