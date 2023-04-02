"use client";
import { useMainStore } from "@/app/Context/MainStoreProvider";
import { observer } from "mobx-react";
import Link from "next/link";

export const PostList = observer(() => {
  const S = useMainStore();

  return(
    <div className="container">
      <Link href={'/'} className="btn-primary">Back</Link>
      <h3>List</h3>
      {!S?.posts.length && <b>There is no posts</b>}
      <ul>
        {S?.posts.map(p => {
          return(
            <li key={p.id}>{p.title}</li>
          )
        })}
      </ul>
    </div>
  )
})
