
export const metadata = {
  title: 'New Post | Bloggify',
  description:
    'NextJS template with TypeScript, TailwindCSS, and MongoDB, created by @clipper.',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>{children}</>
  )
}

export default layout;
