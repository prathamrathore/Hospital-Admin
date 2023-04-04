import classes from "./NewPost.module.css";
import { Link, Form, redirect } from "react-router-dom";
import Modal from "../component/Modal";

function NewPost() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="body">Role</label>
          {/* <textarea id="body" required rows={2} name="body" /> */}
          <select name="body" id="body" className={classes.dropDown}>
            <option value="Doctor">Doctor</option>
            <option value="Front-Desk">Front-Desk</option>
          </select>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" required name="author" />
          <label htmlFor="name">Email</label>
          <input type="email" id="name" required name="email" />
          <label htmlFor="name">Mobile No.</label>
          <input type="text" id="name" required name="number" />
        </p>
        <p className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action(data) {
  const formData = await data.request.formData(); //this will return a object which is not usual object type
  const postData = Object.fromEntries(formData); //this will generate the usual object(key value pair)
  await fetch("http://localhost:9090/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect("/");
}
