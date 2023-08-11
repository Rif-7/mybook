import { useState, useEffect } from 'react';
import { getUserList } from '../../api';
import { Flex, Skeleton, useToast } from '@chakra-ui/react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toast = useToast();

  const handleUsers = async () => {
    const res = await getUserList();
    console.log(res);
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
  };
  return (
    <Flex wrap={'wrap'} gap={'4'} justifyContent={'space-around'}>
      {users.length > 0 ? (
        users.map(user => {
          return <UserCard user={user} />;
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
    </>
  );
};

export default UserList;
