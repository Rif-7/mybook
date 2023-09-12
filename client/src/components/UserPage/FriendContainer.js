import {
  Alert,
  AlertIcon,
  Flex,
  Grid,
  Avatar,
  HStack,
  Text,
} from '@chakra-ui/react';

import { getUserFriends } from '../../api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FriendContainer({
  signedUser,
  userId,
  setFriendCount,
  setIsFriends,
  isFriends,
}) {
  const [friends, setFriends] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    handleFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFriends]);

  const handleFriends = async () => {
    const res = await getUserFriends(userId);
    if (res.error) {
      setError(res.error);
      return;
    }
    setFriends(res.friends);
    setFriendCount(res.friends.length);
    for (const friend of res.friends) {
      if (friend._id === signedUser) {
        setIsFriends(true);
        break;
      }
    }
  };

  if (error) {
    return (
      <Alert status="error" borderRadius={'md'}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Flex gap={4} direction={'column'}>
      <Grid
        gap={12}
        justifyContent={'center'}
        templateColumns="repeat(auto-fill, minmax(250px, 400px))"
      >
        {friends.map(({ _id, firstName, lastName, profilePicUrl }, index) => (
          <FriendCard
            key={index}
            id={_id}
            firstname={firstName}
            lastname={lastName}
            profilePicUrl={profilePicUrl}
          />
        ))}
      </Grid>
    </Flex>
  );
}

function FriendCard({ id, firstname, lastname, profilePicUrl }) {
  return (
    <HStack
      bg={'white'}
      paddingX={4}
      paddingY={2}
      borderWidth="1px"
      rounded="lg"
      shadow="2xl"
    >
      <Avatar
        key={`${firstname} ${lastname}`}
        size="md"
        name={`${firstname} ${lastname}`}
        src={profilePicUrl}
      />
      <Text
        flexGrow={1}
        w="max-content"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        <Link to={`/facebook-clone/users/${id}`}>
          {firstname} {lastname}
        </Link>
      </Text>
    </HStack>
  );
}
