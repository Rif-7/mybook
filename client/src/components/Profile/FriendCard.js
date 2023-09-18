import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Avatar, HStack, IconButton, Text, useToast } from '@chakra-ui/react';
import { handleFriendRequest } from '../../api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FriendCard({
  id,
  firstname,
  lastname,
  profilePicUrl,
  cardType,
  handleFriends,
}) {
  const toast = useToast();

  const handleAction = async action => {
    const res = await handleFriendRequest(id, action);
    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    await handleFriends();
  };

  return (
    <HStack
      bg={'white'}
      paddingX={4}
      paddingY={2}
      borderWidth="1px"
      rounded="lg"
      shadow="2xl"
    >
      <Avatar
        key={`${firstname} ${lastname}`}
        size="md"
        name={`${firstname} ${lastname}`}
        src={profilePicUrl}
      />
      <Text
        flexGrow={1}
        w="max-content"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        <Link to={`/mybook/users/${id}`}>
          {firstname} {lastname}
        </Link>
      </Text>
      <ButtonList cardType={cardType} handleAction={handleAction} />
    </HStack>
  );
}

function ButtonList({ cardType, handleAction }) {
  const [isLoading, setIsLoading] = useState(false);

  const onButtonClick = action => {
    return async () => {
      setIsLoading(true);
      await handleAction(action);
      setIsLoading(false);
    };
  };

  return (
    <HStack>
      {cardType === 'sent' ? (
        <>
          <IconButton
            isLoading={isLoading}
            onClick={onButtonClick('cancel')}
            size={'sm'}
            icon={<CloseIcon />}
            variant={'outline'}
            colorScheme="red"
          />
        </>
      ) : cardType === 'received' ? (
        <>
          <IconButton
            isLoading={isLoading}
            onClick={onButtonClick('accept')}
            size={'sm'}
            icon={<CheckIcon />}
            variant={'outline'}
            colorScheme="green"
          />
          <IconButton
            isLoading={isLoading}
            onClick={onButtonClick('decline')}
            size={'sm'}
            icon={<CloseIcon />}
            variant={'outline'}
            colorScheme="red"
          />
        </>
      ) : (
        <>
          <IconButton
            isLoading={isLoading}
            onClick={onButtonClick('remove')}
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
