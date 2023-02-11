import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Box,
  BoxProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = ({ isOpen, onClose }: Props) => {
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

export const LoginSlice = ({
  isOpen,
  onClose,
  ...boxProps
}: Props & BoxProps) => {
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

export const Login = LoginSlice;
