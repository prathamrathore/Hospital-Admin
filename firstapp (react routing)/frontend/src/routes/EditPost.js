import classes from "./EditPost.module.css";
import { Link, Form, useLoaderData } from "react-router-dom";
import Modal from "../component/Modal";

function EditPost() {
  const post = useLoaderData();
  // console.log(post.body);
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Role</label>
          <textarea id="body" required rows={2} name="body" defaultValue={post.body}/>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" required name="author" defaultValue={post.author}/>
          <label htmlFor="name">Email</label>
          <input type="email" id="name" required name="email" defaultValue={post.email}/>
          <label htmlFor="name">Mobile No.</label>
          <input type="text" id="name" required name="number" defaultValue={post.number}/>
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default EditPost;

export async function loader({params}){
  const response = await fetch(
    "http://localhost:9090/posts/" + params.id
  );
  const resData = await response.json();
  return resData.post;
}