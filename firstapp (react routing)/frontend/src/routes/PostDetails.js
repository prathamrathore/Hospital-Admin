import { useLoaderData, Link, Form, redirect} from "react-router-dom";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Outlet } from "react-router-dom";
import Modal from "../component/Modal";
import classes from "./PostDetails.module.css";

function PostDetails() {
  const posts = useLoaderData();
  console.log(posts);
  const post = posts;

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
          <p className={classes.author}>{post.registrationNumber}</p>
          <p className={classes.author}>{post.name}</p>
          <br />
          <p className={classes.text}>{post.role}</p>
          <p className={classes.text}>{post.email}</p>
          <p className={classes.text}>{post.mobile}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>
              <Link to="edit-post" className={classes.button}>
                <MdModeEdit size={23} />
                <button className={classes.btn}>Edit</button>
              </Link>
            </p>
            <p>
              <Form method="delete">
                <MdDelete size={23} />
                <button className={classes.btn}>Delete</button>
              </Form>
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
  return resData.posts;
}


export async function action(data) {
  await fetch("http://localhost:9090/posts/" + data.params.id, {
    method: "delete"
  });
  return redirect("/Admin");
}
