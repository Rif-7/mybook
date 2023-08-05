import {
  Box,
  Button,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  Image,
  Input,
  DrawerHeader,
  DrawerOverlay,
  Alert,
  AlertIcon,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { submitPost } from '../../api';

export default function NewPostDrawer() {
  const fileInputRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleImageChange = e => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleFileInputButton = () => {
    fileInputRef.current.click();
  };

  const handleCaptionChange = e => {
    setCaption(e.target.value);
  };

  const customOnClose = () => {
    setCaption('');
    setSelectedImage(null);
    setPreviewImage(null);
    setError('');
    onClose();
  };

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (!caption) return;
    const formData = new FormData();

    formData.append('text', caption);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    const res = await submitPost(formData);
    if (res.error) {
      setIsLoading(false);
      return setError(res.error);
    }

    setIsLoading(false);
    customOnClose();
    toast({
      title: 'Post created.',
      description: 'Post submitted successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
        placement="right"
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
              <Stack spacing={4} alignItems={'center'}>
                {error ? (
                  <Alert status="error" borderRadius={'md'}>
                    <AlertIcon />
                    {error}
                  </Alert>
                ) : null}
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
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
                <Button
                  fontFamily={'heading'}
                  alignSelf={'start'}
                  bg={'gray.200'}
                  color={'gray.800'}
                  onClick={handleFileInputButton}
                >
                  Choose Image
                </Button>
                {selectedImage ? (
                  <Image
                    fallback={
                      <Alert status="error">
                        <AlertIcon />
                        There was an error while displaying the image. The image
                        will not be submitted.
                      </Alert>
                    }
                    src={previewImage}
                    alt="selected image"
                  />
                ) : null}
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
                isLoading={isLoading}
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
