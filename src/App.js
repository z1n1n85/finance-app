import React, { useState } from 'react';
import './styles/App.css'
import PostList from './components/PostList';
import CreatePostForm from './components/CreatePostForm';
import Modal from './components/UI/Modal/Modal'
import Button from './components/UI/Button/Button'

function App() {

  const [posts, setPosts] = useState([
    {id: '1234567890', title: 'Death Stranding', content: 'Lorem Inpus'},
    {id: '0987654321', title: 'Metal Gear Solid', content: 'Lorem Inpus'},
    {id: '6789012345', title: 'Ghost Reacon', content: 'Lorem Inpus'}
  ]);

  const addPost = (post) => {
    setPosts([...posts, post])
  }
  
  return (
    <div className="App">
      <Button onClick={() => {}}>
        Создать новый пост
      </Button>
      <Modal>
        <CreatePostForm addPost={addPost}/>
      </Modal>
      <PostList posts={posts} title='Игры'/>
    </div>
  );
}

export default App;
