import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Posts, { loader as postLoader } from "./routes/Posts";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewPost, { action as newPostAction } from "./routes/NewPost";
import RootLayout from "./routes/RootLayout";
import PostDetails, { loader as postDeatilsLoader } from "./routes/PostDetails";
import EditPost, {loader as postEditLoader} from "./routes/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postLoader,
        children: [
          { path: "/create-post", element: <NewPost />, action: newPostAction },
          {
            path: ":id",
            element: <PostDetails />,
            loader: postDeatilsLoader,
            children: [
              {
                path: "edit-post",
                element: <EditPost />,
                loader: postEditLoader
              }
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
