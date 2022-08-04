import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
import useSWRMutation from 'swr/mutation';
import { sendPostRequest } from '../../lib/sendPostRequest';
import { emailIsValid } from '../../utils/helper';

export default function InviteTeamMemberModal({
  isOpen,
  onOpen,
  onClose,
  overlay,
  organizationId
}) {
  const { trigger } = useSWRMutation('/api/organization/team', sendPostRequest);
  const [playSuccessAnimation, setPlaySuccessAnimation] = useState(false);
  const [email, setEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);

  const handleModalClose = () => {
    if (playSuccessAnimation) {
      setPlaySuccessAnimation(false);
    }
    onClose();
  };

  const handleInvite = async () => {
    if (emailIsValid(email)) {
      setInvalidEmail(false);

      try {
        await trigger({
          email,
          organizationId
        });
        setPlaySuccessAnimation(true);
        setTimeout(() => {
          setPlaySuccessAnimation(false);
          onClose();
        }, 2300);
      } catch (error) {
        setInvalidEmail(true);
        console.log(error.message);
      }
    } else {
      setInvalidEmail(true);
    }
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
                  speed={0.6}
                  loop={false}
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
                <FormControl isInvalid={invalidEmail}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormErrorMessage>
                    Please enter a valid email
                  </FormErrorMessage>
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
                type="button"
                onClick={() => handleInvite()}
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
