export default function AuthLayout({
  children,
}:Readonly<{
  children: React.ReactNode
}>){
  return (
    <section>
      AUth Layout
      {children}
    </section>
  )
}