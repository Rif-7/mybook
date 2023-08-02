import { useParams, Navigate } from 'react-router-dom';
import { Progress, Box, Heading } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { setUserDetails } from '../../api';

export default function FacebookToken(props) {
  const { tokenId } = useParams();
  const { setUser, user } = props;

  useEffect(() => {
    localStorage.setItem('token', tokenId);
    setUserDetails(setUser);
    return;
  }, [setUser, tokenId]);

  if (user.firstName) {
    return <Navigate replace to="/facebook-clone" />;
  }

  return (
    <>
      <Progress size="sm" isIndeterminate />
      <Box textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2} fontFamily={'monospace'}>
          You Are Being Authenticated
        </Heading>
      </Box>
    </>
  );
}
