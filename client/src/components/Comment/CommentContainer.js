import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Input,
  InputGroup,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getComments, submitComment } from '../../api';
import Comment from './Comment';
export default function CommentContainer({ postId }) {
  const [comments, setCommnents] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    handleComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleComments = async () => {
    const res = await getComments(postId);
    if (res.error) {
      setError(res.error);
      return;
    }
    setError(null);
    setCommnents(res.comments);
  };

  const onCommentSubmit = async () => {
    setIsButtonLoading(true);
    const res = await submitComment(postId, commentText);
    setIsButtonLoading(false);
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
    setCommentText('');
    handleComments();
    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack padding={'10px'} bg={'gray.200'} rounded={'md'}>
      <InputGroup bg={'white'} rounded={'md'}>
        <Input
          type="text"
          roundedRight={'none'}
          placeholder="Your comment"
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <Button
          roundedLeft={'none'}
          size={'md'}
          variant={'solid'}
          onClick={onCommentSubmit}
          isLoading={isButtonLoading}
        >
          Post
        </Button>
      </InputGroup>
      <Container maxW="xl" mt={8} maxH={'400px'} overflowY={'scroll'}>
        {error ? (
          <Alert status="error" borderRadius={'md'}>
            <AlertIcon />
            {error}
          </Alert>
        ) : null}

        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </Container>
    </VStack>
  );
}
