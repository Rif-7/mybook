import { useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';
import {
  VStack,
  Flex,
  Text,
  Button,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Avatar,
  Box,
  SkeletonCircle,
  SkeletonText,
  useToast,
} from '@chakra-ui/react';

import { FaUserPlus, FaUserMinus } from 'react-icons/fa';
import FriendContainer from './FriendContainer';
import PostContainer from './PostContainer';
import { getUserInfo, handleFriendRequest } from '../../api';
import NotFound from '../Error/NotFound';

export default function UserPage({ user }) {
  const { userId } = useParams();
  const [friendCount, setFriendCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isFriends, setIsFriends] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const toast = useToast();

  const handleUserData = async () => {
    const res = await getUserInfo(userId);
    if (!res.error) {
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setProfilePicUrl(res.profilePicUrl);
    }
    setIsLoading(false);
  };

  useState(() => {
    handleUserData();
  }, [userId]);

  const handleFriendAction = async action => {
    setIsButtonLoading(true);
    const res = await handleFriendRequest(userId, action);
    setIsButtonLoading(false);
    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    if (action === 'remove') {
      setIsFriends(false);
    }
  };

  if (userId === user.id) {
    return <Navigate replace to="/facebook-clone/profile" />;
  }

  if (!isLoading && !firstName) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <Box padding="6" bg="white" maxW={'700px'} mx={'auto'}>
        <SkeletonCircle size="40" mx={{ base: 'auto', md: '0px' }} />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="4" />
      </Box>
    );
  }

  return (
    <VStack pt={10} gap={10}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={8}
        alignItems={'center'}
      >
        <Avatar
          size={'2xl'}
          bg="blue.500"
          color="white"
          name={`${firstName} ${lastName}`}
          src={profilePicUrl}
        />

        <Flex direction={'column'} gap={2}>
          <HStack>
            <Text fontSize={'20px'}>
              {firstName} {lastName}
            </Text>
            {isFriends ? (
              <Button
                onClick={() => handleFriendAction('remove')}
                isLoading={isButtonLoading}
                colorScheme={'red'}
                variant={'solid'}
                size={'sm'}
                rightIcon={<FaUserMinus />}
              >
                Remove Friend
              </Button>
            ) : (
              <Button
                onClick={() => handleFriendAction('sent')}
                isLoading={isButtonLoading}
                colorScheme={'green'}
                variant={'solid'}
                size={'sm'}
                rightIcon={<FaUserPlus />}
              >
                Sent Request
              </Button>
            )}
          </HStack>
          <Flex direction={'column'} gap={2}>
            <Text fontFamily={'monospace'} fontSize={'18px'}>
              Posts: {postCount} | Friends: {friendCount}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Tabs variant="unstyled" w="full">
        <TabList justifyContent={'center'}>
          <Tab>Posts</Tab>
          <Tab>Friends</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <PostContainer userId={userId} setPostCount={setPostCount} />
          </TabPanel>
          <TabPanel>
            <FriendContainer
              signedUser={user.id}
              userId={userId}
              setFriendCount={setFriendCount}
              setIsFriends={setIsFriends}
              // to re-render the friend container after an action that changes the friend status
              isFriends={isFriends}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
