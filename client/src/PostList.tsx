import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post: any) => (
    <Card key={post.id}>
      <CardContent>
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </CardContent>
    </Card>
  ));

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      {renderedPosts}
    </Grid>
  );
};

export default PostList;
