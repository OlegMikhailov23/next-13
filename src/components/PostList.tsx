"use client";
import { useMainStore } from "@/app/Context/MainStoreProvider";
import { observer } from "mobx-react";
import Link from "next/link";

export const PostList = observer(() => {
  const S = useMainStore();

  return(
    <div className="container-fluid">
      {!S?.posts.length && <b>There is no posts</b>}
      <div className="row" style={{ display: 'flex', gap: "1rem" }}>
        {S?.posts?.map(p => {
          return(
            <div key={p.id} className="card col-12 col-sm-12 col-md-4 col-lg-3" style={{width: '18rem'}}>
              <div className="card-body">
                <h5 className="card-title">{p.title }</h5>
                <p className="card-text">{p.preview}...</p>
                <Link href={`/${p.id}`} className="btn btn-primary">Read more</Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
