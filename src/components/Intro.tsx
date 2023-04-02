"use client";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useMainStore } from "@/app/Context/MainStoreProvider";

export const Intro = observer(() => {
  const S = useMainStore();

  return (
    <div className="container">
      <h1 className='header'>Next 13 Blog</h1>
      <span>Today is {S?.date}</span>
      <Link className="link" href={"/posts"}>Finout posts</Link>
    </div>
  );
});
