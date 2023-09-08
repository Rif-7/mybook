import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';

// friends, recieved, sent
export default function FriendCard({
  id,
  firstname,
  lastname,
  profilePicUrl,
  cardType,
}) {
  return (
    <HStack
      bg={'white'}
      paddingX={4}
      paddingY={2}
      borderWidth="1px"
      rounded="lg"
      shadow="2xl"
    >
      <Avatar size="md" name={`${firstname} ${lastname}`} src={profilePicUrl} />
      <Text flexGrow={1} w="max-content">
        {firstname} {lastname}
      </Text>
      <ButtonList cardType={cardType} />
    </HStack>
  );
}

function ButtonList({ cardType }) {
  return (
    <HStack>
      {cardType === 'sent' ? (
        <>
          <IconButton
            size={'sm'}
            icon={<CloseIcon />}
            variant={'outline'}
            colorScheme="red"
          />
        </>
      ) : cardType === 'recieved' ? (
        <>
          <IconButton
            size={'sm'}
            icon={<CheckIcon />}
            variant={'outline'}
            colorScheme="green"
          />
          <IconButton
            size={'sm'}
            icon={<CloseIcon />}
            variant={'outline'}
            colorScheme="red"
          />
        </>
      ) : (
        <>
          <IconButton
            size={'sm'}
            icon={<CheckIcon />}
            variant={'outline'}
            colorScheme="green"
          />
          <IconButton
            size={'sm'}
            icon={<CloseIcon />}
            variant={'outline'}
            colorScheme="red"
          />
        </>
      )}
    </HStack>
  );
}
