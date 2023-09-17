import {
  Alert,
  AlertIcon,
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { setUserDetails, updateUserProfile } from '../../api';

export default function EditProfile({ isOpen, onClose, user, setUser }) {
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(user.profilePicUrl);
  const [firstName, setFirstName] = useState(user.firstName);
  const [isLoading, setIsLoading] = useState(false);
  const [lastName, setLastName] = useState(user.lastName);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleImageChange = e => {
    const image = e.target.files[0];
    setImageFile(image);
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleFileInputButton = () => {
    fileInputRef.current.click();
  };

  const customOnClose = () => {
    setSelectedImage(user.profilePicUrl);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setImageFile(null);
    setError(null);
    onClose();
  };

  const handleProfileUpdate = async e => {
    e.preventDefault();
    if (
      firstName === user.firstName &&
      lastName === user.lastName &&
      !selectedImage
    ) {
      toast({
        title: 'No Change',
        description: 'No changes were made',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await updateUserProfile(formData);
    setIsLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setUserDetails(setUser);
    customOnClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={customOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {error ? (
            <Alert status="error" borderRadius={'md'}>
              <AlertIcon />
              {error}
            </Alert>
          ) : null}
          <Flex
            direction={'column'}
            gap={'4px'}
            align={'center'}
            justify={'center'}
          >
            <Avatar
              m={'5px'}
              size={'2xl'}
              bg="blue.500"
              color="white"
              name={`${user.firstName} ${user.lastName}`}
              src={selectedImage}
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
              bg={'gray.200'}
              color={'gray.800'}
              onClick={handleFileInputButton}
            >
              Choose Image
            </Button>
          </Flex>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Last name:</FormLabel>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
            onClick={handleProfileUpdate}
          >
            Save
          </Button>
          <Button onClick={customOnClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
