import { useLoaderData, Link } from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Modal from "../component/Modal";
import classes from "./PostDetails.module.css";

function PostDetails() {
  const post = useLoaderData();

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <div>
      <Modal>
        <main className={classes.details} style={{order:2}}>
          <p className={classes.author}>{post.author}</p>
          <br />
          <p className={classes.text}>{post.body}</p>
          <p className={classes.text}>{post.email}</p>
          <p className={classes.text}>{post.number}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>
              <Link to="edit-post" className={classes.button}>
                <MdModeEdit size={18} />
                Edit Employee
              </Link>
            </p>
            <p>
              <Link to="/create-post" className={classes.button}>
                <MdDelete size={18} />
                Delete Employee
              </Link>
            </p>
          </div>
        </main>
      </Modal>
      <Outlet style={{order:1}}/>
    </div>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const response = await fetch("http://localhost:9090/posts/" + params.id);
  const resData = await response.json();
  return resData.post;
}
