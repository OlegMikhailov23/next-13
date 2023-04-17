'use client';

import { useMainStore } from '@/stores';
import { useEditorStore } from '@/stores/editor';
import { useUiStore } from '@/stores/ui';
import { useRouter } from 'next/navigation'
import { Toast } from "./Toast/Toast";


export const DeleteBtn = ({ id }: { id: string }) => {
  const Ui = useUiStore();
  const E = useEditorStore();

  const history = useRouter();

  const deleteHandle = () => {
    E.deletePost(id);
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
};
