import {
  Flex,
  Box,
  Image,
  Badge,
  HStack,
  Button,
  Collapse,
  useToast,
  Text,
  Center,
  Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { deletePost, toggleLike } from '../../api';
import CommentContainer from '../Comment/CommentContainer';

export default function PostCard({ post, signedUser, handlePosts }) {
  const { _id, text, image, timestamp_formatted, likes } = post;

  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [isLiked, setIsLiked] = useState(likes.includes(signedUser));
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    const res = await deletePost(_id);
    setIsDeleteLoading(false);
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
    await handlePosts();
  };

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
    <Flex>
      <Box
        bg={'white'}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="2xl"
        position="relative"
      >
        {image ? (
          <Image
            mx={'auto'}
            maxW={'100%'}
            maxH={'400px'}
            src={image}
            fallback={
              <Center w="100%" h="250px" bgColor="gray.100">
                Image not available
              </Center>
            }
            alt={`Post image`}
            roundedTop="lg"
          />
        ) : null}

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
              {timestamp_formatted}
            </Badge>
            <Spacer />
            <Button
              size={'xs'}
              colorScheme="red"
              isLoading={isDeleteLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
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
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              cursor="pointer"
            >
              {isLiked ? (
                <BsHeartFill
                  fill="red"
                  fontSize={'24px'}
                  onClick={handleLike}
                />
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
    </Flex>
  );
}
