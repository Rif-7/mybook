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
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const { text, image, timestamp_formatted, userId } = post;
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW={'lg'}
      borderWidth="1px"
      roundedBottom="lg"
      shadow="lg"
      position="relative"
    >
      <HStack
        roundedTop={'lg'}
        p={'5px'}
        bg={'gray.400'}
        color={'white'}
        shadow="lg"
        fontSize={'large'}
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

      {image ? <Image maxW={'100%'} src={image} alt={`Post image`} /> : null}

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
              size={'sm'}
              onClick={() => setShowFullText(!showFullText)}
              mt={'2px'}
            >
              Show {showFullText ? 'Less' : 'More'}
            </Button>
          </Box>
        </Flex>
        <Collapse in={showComments} animateOpacity>
          <Box height={'400px'} bg={'red.400'} m={'4px'}></Box>
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
            {true ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
}
