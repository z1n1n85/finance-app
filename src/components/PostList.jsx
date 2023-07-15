import React from 'react'
import PostItem from './PostItem'

function PostList({posts, title, ...props}) {
  return (
    <div>
      <h1 className='PostListHeader'>{title}</h1>
      {posts.map((post, index) => 
        <PostItem key={post.id} post={post} number={index+1}/>
      )}
    </div>
  )
}

export default PostList