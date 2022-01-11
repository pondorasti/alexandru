interface IDescription {
  title: string
  description: string
  hideBreak?: boolean
}

export default function Description({ title, description, hideBreak = false }: IDescription): JSX.Element {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight text-center mb-3">{title}</h1>
      <p className="text-base text-gray-500 text-center mb-10">{description}</p>
      {!hideBreak && <hr />}
    </>
  )
}
