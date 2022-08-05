import { ModalOverlay } from '@chakra-ui/react';

const BlurryOverlay: React.FC = () => {
  return (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
};

export default BlurryOverlay;
