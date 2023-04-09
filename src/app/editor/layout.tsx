export const metadata = {
  title: 'Editor Page',
}

const EditorLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  return (
    <section>{children}</section>
  )
}

export default EditorLayout;
