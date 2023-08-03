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
import { Outlet } from 'react-router-dom';

import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import NewPostDrawer from './NewPostDrawer';

function Navbar({ user }) {
  return (
    <>
      <Box bg={'#F7FAFC'} px={4}>
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
                    bg="blue.500"
                    color="white"
                    name={`${user.firstName} ${user.lastName}`}
                    src={user.profilePicUrl}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      bg="blue.500"
                      color="white"
                      name={`${user.firstName} ${user.lastName}`}
                      src={user.profilePicUrl}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
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

export default function NavOutlet({ user }) {
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
}
