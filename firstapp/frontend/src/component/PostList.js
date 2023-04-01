import classes from "./PostList.module.css";
import Post from "./Post";
import Modal from "./Modal.js";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
function PostList({ isPosting, onStopPosting }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
     const response = await fetch("http://localhost:9090/posts");
     const resData = await response.json();
     setPosts(resData.posts);
    }
    fetchPosts();
  }, []);

  function newPostHandler(postData) {
    fetch("http://localhost:9090/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  let modalContent;
  if (isPosting) {
    modalContent = (
      <Modal onClick={onStopPosting}>
        <NewPost OnClick={onStopPosting} onAddPosts={newPostHandler} />
      </Modal>
    );
  }
  let postContent;
  if (posts.length !== 0) {
    postContent = (
      <ul className={classes.posts}>
        {posts.map((post) => (
          <Post author={post.author} Body={post.body} />
        ))}
      </ul>
    );
  } else {
    postContent = (
      <div style={{ textAlign: "center", color: "white" }}>
        <h2>There are no Doctors yet.</h2>
        <p>Start adding Doctors!</p>
      </div>
    );
  }

  return (
    <>
      {modalContent}
      {postContent}
    </>
  );
}

export default PostList;
