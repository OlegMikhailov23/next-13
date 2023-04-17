"use client";
import { Toast } from "@/components/Toast/Toast";
import { observer } from "mobx-react-lite";
import { useMainStore } from "../Context/MainStoreProvider";
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect } from "react";

type EditorParams = {
  searchParams: {
    post: string;
  };
}

const Editor = observer(({ searchParams }: EditorParams) => {
  const { post } = searchParams;
  const S = useMainStore()!.editor;
  const Ui = useMainStore()!.ui;
  const history = useRouter();
  const isDisabled = !!S.content && !!S.title

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    S.sendPost(searchParams.post);
    S.clear();
    setTimeout(() => {
      history.push('/')
    }, 600);
  }

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent && searchParams.post) {
      S.loadPost(searchParams.post);
    }
    return () => {
      isCurrent = false
    }
  }, [post]);

  return (
    <div className="container">
      <h1>Editor</h1>
      <form onSubmit={onSubmitHandle} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Title*</label>
        <input onChange={(e) => {
          S.setTitle(e.target.value)
        }} value={S.title} type="text" />
        <label>Your Post *</label>
        <textarea onChange={(e) => {
          S.setContent(e.target.value)
        }} value={S.content} rows={10} cols={45} style={{ resize: 'none' }} />

        <button
          disabled={!isDisabled}
          style={{ marginTop: '1rem', width: '200px' }}
          className="btn btn-primary"
          type="submit">
          {post ? 'Save Post' : 'Create Post'}
        </button>
      </form>
      <Toast isShown={Ui.shouldToastShow} message={Ui.message} type={Ui.type} />
    </div>
  )
})

export default Editor;
