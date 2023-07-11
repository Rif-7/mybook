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
  useDisclosure,
  Drawer,
  DrawerBody,
  Input,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { AtSignIcon, AddIcon } from '@chakra-ui/icons';

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

function NewPostDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = e => {
    e.preventDefault();
    console.log('submited');
  };

  return (
    <>
      <Button
        onClick={onOpen}
        size={'sm'}
        rightIcon={<AddIcon />}
        colorScheme="green"
        variant="solid"
      >
        New Post
      </Button>
      <Drawer placement="left" size={'md'} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create A New Post</DrawerHeader>

          <DrawerBody overflowY={'auto'}>
            <Box as={'form'} mt={10} onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Caption"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  type="file"
                  fontFamily={'heading'}
                  bg={'gray.200'}
                  color={'gray.800'}
                />
              </Stack>
              <Button
                fontFamily={'heading'}
                type="submit"
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
              >
                Submit
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
