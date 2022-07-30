import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text
} from '@chakra-ui/react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';

export default function InviteTeamMemberModal({
  isOpen,
  onOpen,
  onClose,
  overlay
}) {
  const [playSuccessAnimation, setPlaySuccessAnimation] = useState(false);

  const handleModalClose = () => {
    if (playSuccessAnimation) {
      setPlaySuccessAnimation(false);
    }
    onClose();
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => handleModalClose()}
      size="xl"
    >
      {overlay}
      <ModalContent>
        {playSuccessAnimation ? (
          <Box height={280}>
            <ModalCloseButton />
            <Box
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box>
                <Player
                  autoplay
                  speed={0.8}
                  loop={true}
                  src={require('/public/animations/success.json')}
                  style={{ height: '100px', width: '100px' }}
                />
                <Text textAlign="center" marginTop={4}>
                  Invite Sent
                </Text>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <ModalHeader>Invite Team Member</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Enter your team members email below to send an invite.
              </Text>
              <Box padding={4}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Close
              </Button>
              <Button
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)'
                }}
                onClick={() => setPlaySuccessAnimation(true)}
              >
                Send Invite
              </Button>
            </ModalFooter>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
}
