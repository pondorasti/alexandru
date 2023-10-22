import Description from "@components/Description"
import Three from "@components/Experiments/threed"
import TransitionPage from "@components/TransitionPage"

const title = "Book Gallery"
const description = "Skeuomorphic bookshelf"

export default function TimeMachine(): JSX.Element {
  return (
    <TransitionPage title={title} description={description}>
      <Description title={title} description={description} />
      <Three />
    </TransitionPage>
  )
}
