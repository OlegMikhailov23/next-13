"use client";
import { Toast } from "@/components/Toast/Toast";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useMainStore } from "../Context/MainStoreProvider";

const Editor = observer(() => {
  const S = useMainStore()!.editor;
  const Ui = useMainStore()!.ui;
  const isDisabled = !!S.content && !!S.title
  return <div className="container">
    <h1>Editor</h1>
    <form onSubmit={(e) => {
      e.preventDefault();
      S.sendPost();
      S.clear();
    }} style={{ display: 'flex', flexDirection: 'column' }}>
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
        Create Post
      </button>
    </form>
    <Toast isShown={Ui.shouldToastShow} message={Ui.message} type={Ui.type}   />
  </div>
})

export default Editor;
