import { transition } from "@components/Experiments/BrowserFrame"
import clsx from "clsx"

const blobStyle = "h-16 w-16 rounded-full bg-black dark:bg-white transition-all"
const animateOnHoverStyle = "running group-hover:running sm:paused"

interface trthree {
  animateOnHover?: boolean
}

export default function three({ animateOnHover }: trthree): JSX.Element {
  return (
    <div className={clsx("flex items-center justify-center space-x-16 [filter:url(#blob)]", transition)}>
      <div className={clsx(blobStyle, "animate-blob-right", animateOnHover && animateOnHoverStyle)} />
      <div className={clsx(blobStyle, "animate-blob-left", animateOnHover && animateOnHoverStyle)} />
      <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.486/build/spline-viewer.js"></script>
      <spline-viewer
        hint
        loading-anim
        url="https://prod.spline.design/LokC8duZspZU5n5e/scene.splinecode"
      ></spline-viewer>
    </div>
  )
}
