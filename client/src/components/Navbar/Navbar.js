import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Icon,
} from '@chakra-ui/react';

import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { AtSignIcon } from '@chakra-ui/icons';
import NewPostDrawer from './NewPostDrawer';

export default function Nav() {
  return (
    <>
      <Box bg={'gray.100'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <NewPostDrawer />
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <AtSignIcon />
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <Icon as={AiOutlineUser} mr={'5px'} />
                    Profile
                  </MenuItem>
                  <MenuItem>
                    <Icon as={AiOutlineLogout} mr={'5px'} />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
