import { useParams } from 'react-router-dom';
import { Progress, Box, Heading } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

export default function FacebookToken(props) {
  const { tokenId } = useParams();
  const { setUser } = props;

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
