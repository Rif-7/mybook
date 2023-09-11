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
} from '@chakra-ui/react';

import { FaUserPlus } from 'react-icons/fa';
import FriendContainer from './FriendContainer';
import PostContainer from './PostContainer';
import { getUserInfo } from '../../api';
import NotFound from '../Error/NotFound';

export default function UserPage({ user }) {
  const { userId } = useParams();
  const [friendCount, setFriendCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  if (userId === user.id) {
    return <Navigate replace to="/facebook-clone/profile" />;
  }

  if (!isLoading && !firstName) {
    return <NotFound />;
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
            <Button
              colorScheme={'green'}
              variant={'solid'}
              size={'sm'}
              rightIcon={<FaUserPlus />}
            >
              Sent Request
            </Button>
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
            <FriendContainer userId={userId} setFriendCount={setFriendCount} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
