import React from 'react';
import Button from './UI/Button/Button';

function PostItem({post, number}) {
  return(
    <div className='PostItem'>
      <h2>{number}. {post.title}</h2>
      <p>{post.content}</p>
      <Button>
        Удалить
      </Button>
    </div>
  )
}

export default PostItem;