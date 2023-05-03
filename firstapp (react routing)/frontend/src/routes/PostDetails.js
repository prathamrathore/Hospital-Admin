import { useLoaderData, Link, Form } from "react-router-dom";
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
  return resData.post;
}

export async function action(data) {
  console.log(data.params.id);
  const formData = await data.request.formData(); //this will return a object which is not usual object type
  const postData = Object.fromEntries(formData); //this will generate the usual object(key value pair)
  console.log(postData);

  await fetch("https://71e9-119-161-98-68.ngrok-free.app/employee/" + data.params.id, {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/Admin");
}
