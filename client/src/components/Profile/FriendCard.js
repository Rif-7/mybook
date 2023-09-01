import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';

export default function FriendCard({ id, firstname, lastname, profilePicUrl }) {
  return (
    <HStack
      bg={'white'}
      paddingX={4}
      paddingY={2}
      borderWidth="1px"
      rounded="lg"
      shadow="2xl"
    >
      <Avatar size="md" name={`${firstname} ${lastname}`} src="" />
      <Text flexGrow={1} w="max-content">
        {firstname} {lastname}
      </Text>
      <IconButton
        size={'sm'}
        icon={<CloseIcon />}
        variant={'outline'}
        colorScheme="red"
      />
    </HStack>
  );
}
