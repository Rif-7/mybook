import {
  Box,
  Button,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  Input,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function NewPostDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = e => {
    setSelectedImage(e.target.files[0]);
  };

  const handleCaptionChange = e => {
    setCaption(e.target.value);
  };

  const customOnClose = () => {
    setCaption('');
    setSelectedImage(null);
    onClose();
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(selectedImage);
    console.log(caption);
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
      <Drawer
        placement="left"
        size={'md'}
        isOpen={isOpen}
        onClose={customOnClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create A New Post</DrawerHeader>

          <DrawerBody overflowY={'auto'}>
            <Box as={'form'} mt={10} onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Caption"
                  onChange={handleCaptionChange}
                  value={caption}
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg"
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
