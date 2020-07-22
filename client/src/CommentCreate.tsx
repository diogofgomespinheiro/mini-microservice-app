import React, { useState } from 'react';
import axios from 'axios';

//Styles
import { Button, TextField, Box } from '@material-ui/core';

type CommentProps = {
  postId: string;
};

const CommentCreate: React.FC<CommentProps> = ({ postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (content) {
      await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
    }

    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            name="comment"
            id="comment"
            variant="outlined"
            label="New Comment"
            value={content}
            onChange={e => setContent(e.target.value)}
            fullWidth
            inputProps={{ minLength: 5 }}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CommentCreate;
