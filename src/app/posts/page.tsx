
import { PostList } from "@/components/PostList";
import { observer } from "mobx-react-lite";
import { useMainStore } from "../Context/MainStoreProvider";
import { MainStore } from "@/stores";

export const metadata = {
  title: 'Posts'
};

export const Posts = () => {
  return(
    <div className="container">
      <h1 className="header">Posts</h1>
      <PostList />
    </div>
  )
}

export default Posts;