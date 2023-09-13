import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  HStack,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';

export default function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const { text, image, timestamp_formatted } = post;

  return (
    <Flex>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        w="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="2xl"
        position="relative"
      >
        {image ? (
          <Image
            maxW={'100%'}
            maxH={'400px'}
            src={image}
            alt={`Post image`}
            roundedTop="lg"
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
    </Flex>
  );
}
