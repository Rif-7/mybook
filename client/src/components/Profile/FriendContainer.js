import { Alert, AlertIcon, Flex, Grid, Select } from '@chakra-ui/react';
import { getUserFriendDetails } from '../../api';
import { useEffect, useState } from 'react';
import FriendCard from './FriendCard';

export default function FriendContainer({ setFriendCount }) {
  const [friends, setFriends] = useState([]);
  const [friendReqRecieved, setFriendReqRecieved] = useState([]);
  const [friendReqSent, setFriendReqSent] = useState([]);
  const [currDisplay, setCurrDisplay] = useState([]);
  const [selection, setSelection] = useState('friends');
  const [error, setError] = useState(null);

  useEffect(() => {
    handleFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (selection) {
      case 'friends':
        setCurrDisplay(friends);
        break;
      case 'sent':
        setCurrDisplay(friendReqSent);
        break;
      case 'received':
        setCurrDisplay(friendReqRecieved);
        break;
      default:
        setCurrDisplay(friends);
    }
  }, [selection, friends, friendReqSent, friendReqRecieved]);

  const handleFriends = async () => {
    const res = await getUserFriendDetails();
    if (res.error) {
      setError(res.error);
      return;
    }
    setFriends(res.friends);
    setCurrDisplay(res.friends);
    setFriendReqRecieved(res.requestRecieved);
    setFriendReqSent(res.requestSent);
    setFriendCount(res.friends.length);
  };

  const onSelectionChange = e => {
    setSelection(e.target.value);
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
      <Select
        variant="filled"
        w={'200px'}
        alignSelf={'center'}
        value={selection}
        onChange={onSelectionChange}
      >
        <option value="friends">Friends</option>
        <option value="sent">Requests Sent</option>
        <option value="received">Request Received</option>
      </Select>

      <Grid
        gap={12}
        justifyContent={'center'}
        templateColumns="repeat(auto-fill, minmax(250px, 400px))"
      >
        {currDisplay.map(
          ({ _id, firstName, lastName, profilePicUrl }, index) => (
            <FriendCard
              key={index}
              id={_id}
              firstname={firstName}
              lastname={lastName}
              profilePicUrl={profilePicUrl}
              cardType={selection}
            />
          )
        )}
      </Grid>
    </Flex>
  );
}
