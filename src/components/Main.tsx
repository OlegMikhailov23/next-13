"use client";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useMainStore } from "@/app/Context/MainStoreProvider";
import { PostList } from "./PostList";

export const Main = observer(() => {
  const S = useMainStore();

  return (
    <div className="container">
      <h1 className='header'>Next 13 Blog</h1>
      <div>Today is {S?.date}</div>
      <Link href={'/editor'} className="btn btn-primary" style={{position: 'fixed', top: '4rem', right: '2rem', borderRadius: '50%'}} title="add post">+</Link>
      <h3 className="header">Posts:</h3>
      <PostList />
    </div>
  );
});
