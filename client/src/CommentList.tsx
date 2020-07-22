import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Styles
import { Button, TextField, Box } from '@material-ui/core';

type CommentProps = {
  postId: string;
};

const CommentList: React.FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`,
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderedComments = comments.map((comment: any) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
