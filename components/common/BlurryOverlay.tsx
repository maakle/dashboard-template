import { ModalOverlay } from '@chakra-ui/react';

export default function BlurryOverlay(): JSX.Element {
  return (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
}
