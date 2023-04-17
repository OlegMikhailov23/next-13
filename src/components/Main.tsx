import { useMainStore } from "@/stores";
import Link from "next/link";
import { PostList } from "./PostList";

export const Main = () => {

  return (
    <div className="container">
      <h1 className='header'>Next 13 Blog</h1>
      <div>Today is {useMainStore.getState().date}</div>
      <Link href={'/editor'} className="btn btn-primary" style={{position: 'fixed', top: '4rem', right: '2rem', borderRadius: '50%'}} title="add post">+</Link>
      <h3 className="header">Posts:</h3>
      <PostList />
    </div>
  );
};
