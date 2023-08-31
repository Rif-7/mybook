import { Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { getUserFriendDetails } from '../../api';
import { useEffect, useState } from 'react';

export default function FriendContainer({ setFriendCount }) {
  const [friends, setFriends] = useState([]);
  const [friendReqRecieved, setFriendReqRecieved] = useState([]);
  const [friendReqSent, setFriendReqSent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFriends();
  }, []);

  const handleFriends = async () => {
    const res = await getUserFriendDetails();
    if (res.error) {
      setError(res.error);
      return;
    }
    setFriends(res.friends);
    setFriendReqRecieved(res.requestRecieved);
    setFriendReqSent(res.requestSent);
    setFriendCount(res.friends.length);
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
    <Flex gap={12} align={'flex-start'} justify={'center'} flexWrap={'wrap'}>
      TODO
    </Flex>
  );
}
