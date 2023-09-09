import { Center, Icon, Text } from '@chakra-ui/react';
import { BiBookAlt } from 'react-icons/bi';
export default function Logo() {
  return (
    <Center h={'45px'} w={'120px'} rounded={'md'} bg={'#4ecca3'}>
      <Icon as={BiBookAlt} color={'white'} boxSize={'30px'} />
      <Text
        mt={'-5px'}
        h="30px"
        fontFamily={'mono'}
        fontSize={'22px'}
        color={'white'}
        fontWeight={'bold'}
        borderBottom={'3px solid black'}
      >
        MYBOOK
      </Text>
    </Center>
  );
}
