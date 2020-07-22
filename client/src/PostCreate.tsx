//Libraries
import React, { useState } from 'react';
import axios from 'axios';

//Styles
import { Button, TextField, Box } from '@material-ui/core';

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (title) {
      await axios.post('http://localhost:4000/posts', {
        title,
      });
    }

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Box>
          <TextField
            name="title"
            id="title"
            variant="outlined"
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
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

export default PostCreate;
