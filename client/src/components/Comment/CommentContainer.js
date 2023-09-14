import {
  Button,
  Container,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
} from '@chakra-ui/react';
export default function CommentContainer() {
  return (
    <VStack padding={'10px'} bg={'gray.200'} rounded={'md'}>
      <InputGroup bg={'white'}>
        <Input type="text" placeholder="Your comment" />
        <InputRightAddon pointerEvents="none">
          <Button size={'sm'} variant={'solid'}>
            Post
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Container maxW="xl" mt={8} h={'400px'} overflowY={'scroll'}></Container>
    </VStack>
  );
}
