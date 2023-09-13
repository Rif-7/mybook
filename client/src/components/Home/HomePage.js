import {
  Alert,
  AlertIcon,
  Center,
  Flex,
  Portal,
  Skeleton,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { getPosts } from '../../api';

export default function HomePage({ user }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handlePosts();
  }, []);

  const handlePosts = async () => {
    setIsLoading(true);
    const res = await getPosts();
    setIsLoading(false);
    if (res.error) {
      return;
    }
    setPosts(res.posts);
  };

  if (!user.firstName) {
    return <Navigate replace to="/facebook-clone/login" />;
  }

  return (
    <Center>
      <Portal>
        <Alert
          status="info"
          fontFamily={'monospace'}
          fontSize={'lg'}
          w={'fit-content'}
          mx={'auto'}
          rounded={'lg'}
          mb={'10px'}
        >
          <AlertIcon />
          Be friends with more users to view their posts.&nbsp;
        </Alert>
      </Portal>
      <Flex m={'10px'} gap={'25px'} direction={'column'}>
        {isLoading ? (
          <>
            <Skeleton h={'500px'} w={{ base: 'sm', md: 'lg' }} />
            <Skeleton h={'500px'} w={{ base: 'sm', md: 'lg' }} />
          </>
        ) : null}

        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </Flex>
    </Center>
  );
}
