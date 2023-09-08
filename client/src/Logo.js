import { Center, Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Center h={'45px'} w={'100px'} rounded={'md'} bg={'#4ecca3'}>
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
