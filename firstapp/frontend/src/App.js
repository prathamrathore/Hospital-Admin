import MainHeader from "./component/MainHeader";
import PostList from "./component/PostList";
import { useState } from "react";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  function hideModalHandler() {
    setModalVisible(false);
  }
  function showModalHandler() {
    setModalVisible(true);
  }
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostList isPosting={modalVisible} onStopPosting={hideModalHandler} />
      </main>
    </>
  );
}

export default App;
