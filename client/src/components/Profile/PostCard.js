import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  HStack,
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';

export default function PostCard({ post }) {
  const { text, image, timestamp_formatted } = post;
  return (
    <Flex>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
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
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {text}
            </Box>
          </Flex>
          <HStack color="black" justify={'space-between'}>
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              cursor={'pointer'}
              maxW={'sm'}
            >
              <Text mr={2} fontSize={'md'} fontWeight={'semibold'}>
                View Comments
              </Text>
              <BsArrowUpRight />
            </Flex>
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
