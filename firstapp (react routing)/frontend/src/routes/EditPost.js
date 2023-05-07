import classes from "./EditPost.module.css";
import { Link, Form, useLoaderData,redirect } from "react-router-dom";
import Modal from "../component/Modal";

function EditPost() {
  const post = useLoaderData();
  // console.log(post.body);
  return (
    <Modal>
      <Form method="put" className={classes.form}>
        <p>
          <label htmlFor="body">Role</label>
          <textarea id="body" required rows={2} name="role" defaultValue={post.role}/>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" required name="name" defaultValue={post.name}/>
          <label htmlFor="name">Email</label>
          <input type="email" id="name" required name="email" defaultValue={post.email}/>
          <label htmlFor="name">Mobile No.</label>
          <input type="text" id="name" required name="mobile" defaultValue={post.mobile}/>
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
  return resData.posts;
}

export async function action(data) {
  const formData = await data.request.formData(); //this will return a object which is not usual object type
  const postData = Object.fromEntries(formData); //this will generate the usual object(key value pair)
  console.log(postData);

  await fetch("http://localhost:9090/posts/" + data.params.id, {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/Admin");
}