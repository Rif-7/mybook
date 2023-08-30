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

const data = {
  isNew: true,
  imageURL:
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  name: 'This is a test comment to test stuff haha lol this is boringThis is a test comment to test stuff haha lol this is boring This is a test comment to test stuff haha lol this is boring This is a test comment to test stuff haha lol this is boring',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

export default function PostCard({ show }) {
  return (
    <Flex>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {show ? (
          <Image
            w={'100%'}
            maxH={'400px'}
            src={data.imageURL}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
          />
        ) : null}

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                Oct 14, 1983, 9:30 AM
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
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
