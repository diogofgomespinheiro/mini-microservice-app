//Libraries
import React from 'react';

//Components
import PostCreate from './PostCreate';
import PostList from './PostList';

//Styles
import { Container } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Container>
      <h1>Create Post</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </Container>
  );
};

export default App;
