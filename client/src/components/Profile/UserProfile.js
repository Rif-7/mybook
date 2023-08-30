import { Navigate } from 'react-router-dom';
import {
  VStack,
  Flex,
  Image,
  Text,
  Button,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';
import PostContainer from './PostContainer';
export default function UserProfile(props) {
  const { firstName, lastName, profilePicUrl, email } = props.user;
  if (!firstName) {
    return <Navigate replace to="/facebook-clone/login" />;
  }
  return (
    <VStack pt={10} gap={10}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={8}
        alignItems={'center'}
      >
        <Image borderRadius="full" boxSize="s" src={profilePicUrl} />

        <Flex direction={'column'} gap={2}>
          <HStack>
            <Text fontSize={'20px'}>
              {firstName} {lastName}
            </Text>
            <Button
              colorScheme={'green'}
              variant={'outline'}
              size={'sm'}
              rightIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </HStack>
          <Flex direction={'column'} gap={2}>
            <Text fontSize={'18px'} as="em">
              {email}
            </Text>
            <Text fontFamily={'monospace'} fontSize={'18px'}>
              Posts: {0} | Friends: {0}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Tabs variant="unstyled">
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
            <PostContainer />
          </TabPanel>
          <TabPanel>
            <p>Friends TODO </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
