import React, {useState} from 'react'
import Input from './UI/Input/Input'
import Textarea from './UI/Textarea/Textarea'
import Button from './UI/Button/Button';


function CreatePostForm({addPost}) {
  const [post, setPost] = useState({id: '', title: '', content: ''});

  const createPost = (e) => {
    e.preventDefault ();
    setPost({...post, id: Date.now()});
    addPost(post);
    setPost({id: '', title: '', content: ''});
  }

  return (
    <div >
      <h1>
        Создайте новый пост
      </h1>
      <form className='CreatePostForm' onSubmit={(e) => {createPost(e)}}>
        <Input
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          type='text'
          placeholder='Название поста' 
          style={{width: '50%'}}
          />
        <Textarea
          value={post.content}
          onChange={e => setPost({...post, content: e.target.value})}
          placeholder='Содержание поста'
        />
        <Button type='submit'>
          Опубликовать
        </Button>
      </form>
    </div>
  )
}

export default CreatePostForm