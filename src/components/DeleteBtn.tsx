'use client';

import { useMainStore } from "@/app/Context/MainStoreProvider";
import { observer } from "mobx-react-lite";
import { useRouter } from 'next/navigation'
import { Toast } from "./Toast/Toast";


export const DeleteBtn = observer(({ id }: { id: string }) => {
  const S = useMainStore();
  const Ui = useMainStore()!.ui;

  const history = useRouter();

  const deleteHandle = () => {
    S?.editor.deletePost(id);
    setTimeout(() => {
      history.push('/')
    }, 600);
  }
  return (
    <>
      <Toast isShown={Ui.shouldToastShow} message={Ui.message} type={Ui.type} />
      <button onClick={deleteHandle} className="btn btn-danger" style={{ marginTop: 20, marginBottom: 20, marginLeft: 16 }}>Delete</button>
    </>
  );
});
