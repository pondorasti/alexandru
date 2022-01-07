interface IDescription {
  title: string
  description: string
}

export default function Description({ title, description }: IDescription): JSX.Element {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-900 tracking-tight sm:text-3xl text-center mb-3">{title}</h1>
      <p className="text-gray-500 text-center mb-10">{description}</p>
    </>
  )
}
