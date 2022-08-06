import { useMediaQuery } from '@chakra-ui/media-query';
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { MY_APP } from '../../utils/constants';
import ThemeToggle from '../ThemeToggle';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={[0, 0, 64]}
      right={0}
      align="center"
      h={16}
      px={[4, 6, 8]}
      bg={bgColor}
      zIndex="docked"
    >
      <Flex w="full" align="center" justify="center">
        <Flex w="full" align="center" justify="space-between">
          <Flex align="center">
            <NextLink href="/dashboard" passHref>
              <Button as="a" variant="ghost" px={0} fontWeight="bold">
                {MY_APP}
              </Button>
            </NextLink>
          </Flex>

          <Flex alignItems="center">
            <Stack direction="row" spacing={8}>
              <ThemeToggle mr={`-${3}`} />

              {isSmallScreen ? (
                <MobileNav />
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar
                      size="sm"
                      src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    />
                  </MenuButton>
                  <MenuList
                    alignItems="center"
                    minWidth={200}
                    justifyContent="center"
                  >
                    <MenuItem as="a" href="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem as="a" href="/dashboard/settings">
                      Settings
                    </MenuItem>
                    <MenuDivider />

                    <MenuItem
                      color="red.500"
                      onClick={() => {
                        signOut({ callbackUrl: `${window.location.origin}` });
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
