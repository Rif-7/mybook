import { useState, useEffect } from 'react';
import { getUserList } from '../../api';
import { Alert, AlertIcon, Flex, Skeleton, useToast } from '@chakra-ui/react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    handleUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toast = useToast();

  const handleUsers = async () => {
    const res = await getUserList();
    if (res.error) {
      return toast({
        title: 'An error occured',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setUsers(res.users);
    setIsLoaded(true);
  };

  if (isLoaded && users.length === 0) {
    return (
      <Alert status="info" fontSize={'24px'}>
        <AlertIcon />
        No users left!
      </Alert>
    );
  }

  return (
    <Flex wrap={'wrap'} gap={'8'} justifyContent={'center'}>
      {users.length > 0 ? (
        users.map((user, index) => {
          return <UserCard key={index} user={user} />;
        })
      ) : (
        <Loading />
      )}
    </Flex>
  );
}

const Loading = () => {
  return (
    <>
      <Skeleton height="250px" w={'320px'} my={6} />
      <Skeleton height="250px" w={'320px'} my={6} />
      <Skeleton height="250px" w={'320px'} my={6} />
      <Skeleton height="250px" w={'320px'} my={6} />
    </>
  );
};

export default UserList;
