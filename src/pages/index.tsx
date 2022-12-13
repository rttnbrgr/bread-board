import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Marketing from "../components/ViewMarketing";
import HeaderBar from "../components/HeaderBar";
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

const Home = () => {
  const session = useSession();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: accountIsOpen,
    onOpen: accountOnOpen,
    onClose: accountOnClose,
    onToggle: accountOnToggle
  } = useDisclosure();
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
                {accountIsOpen ? "account is open" : "account is closed"}
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
