import classes from "./PostList.module.css";
import Post from "./Post";
import { useLoaderData } from "react-router-dom";

function PostList() {

  const posts = useLoaderData();

  let modalContent;
  let postContent;
  // console.log(posts.length);
  if (posts.length !== 0) {
    postContent = (
      <ul className={classes.posts}>
        {posts.posts.map((posts) => (
          <Post key={posts._id} id={posts._id} author={posts.name} Body={posts.role} />
        ))}
      </ul>
    );
  } else {
    postContent = (
      <div style={{ textAlign: "center", color: "white" }}>
        <h2>There are no Posts yet.</h2>
        <p>Start adding some!</p>
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
