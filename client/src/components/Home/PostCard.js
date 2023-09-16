import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  HStack,
  Button,
  Collapse,
  Avatar,
  useToast,
  Text,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toggleLike } from '../../api';
import CommentContainer from '../Comment/CommentContainer';

export default function PostCard({ post, signedUser }) {
  const { _id, text, image, timestamp_formatted, likes, userId } = post;
  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(likes.includes(signedUser));
  const [likeCount, setLikeCount] = useState(likes.length);
  const toast = useToast();

  const handleLike = async () => {
    setIsLiked(!isLiked);
    const res = await toggleLike(_id);
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
    if (res.success === 'Post liked successfully') {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW={'lg'}
      minW={'380px'}
      borderWidth="1px"
      rounded={'lg'}
      shadow="lg"
      position="relative"
    >
      <HStack
        roundedTop={'lg'}
        p={'5px'}
        bg={'#F7FAFC'}
        color={'black'}
        shadow="lg"
        fontSize={'md'}
        fontWeight={'semibold'}
      >
        <Avatar
          key={`${userId.firstName} ${userId.lastName}`}
          size={'sm'}
          color="white"
          name={`${userId.firstName} ${userId.lastName}`}
          src={userId.profilePicUrl}
        />
        <Link
          to={`/facebook-clone/users/${userId._id}`}
        >{`${userId.firstName} ${userId.lastName}`}</Link>
      </HStack>

      {image ? (
        <Image
          maxW={'100%'}
          src={image}
          fallback={
            <Center w="100%" h="250px" bgColor="gray.100">
              Image not available
            </Center>
          }
          alt={`Post image`}
        />
      ) : null}

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
            {timestamp_formatted}
          </Badge>
        </Box>

        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box fontSize="2xl" fontWeight="semibold" as="h4">
            <Collapse startingHeight={32} in={showFullText}>
              {text}
            </Collapse>
            <Button
              variant={'link'}
              color={'gray'}
              size={'sm'}
              onClick={() => setShowFullText(!showFullText)}
              mt={'2px'}
            >
              See {showFullText ? 'Less' : 'More'}
            </Button>
          </Box>
        </Flex>
        <Collapse in={showComments} animateOpacity>
          <CommentContainer postId={_id} user={signedUser} />
        </Collapse>
        <HStack color="black" justify={'space-between'}>
          <Button
            mr={2}
            rightIcon={<BsArrowUpRight />}
            variant={'ghost'}
            onClick={() => setShowComments(!showComments)}
          >
            View Comments
          </Button>
          <Flex p={4} alignItems="center" roundedBottom={'sm'} cursor="pointer">
            {isLiked ? (
              <BsHeartFill fill="red" fontSize={'24px'} onClick={handleLike} />
            ) : (
              <BsHeart fontSize={'24px'} onClick={handleLike} />
            )}
            <Text ml={'3px'} fontSize={'18px'} fontFamily={'monospace'}>
              {likeCount}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
}
