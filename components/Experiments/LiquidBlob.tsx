import { transition } from "@components/Experiments/BrowserFrame"
import classNames from "@lib/classNames"

const blobStyle = "h-16 w-16 rounded-full bg-black dark:bg-white transition-all"

interface ILiquidBlob {
  animateOnHover?: boolean
}

export default function LiquidBlob({ animateOnHover }: ILiquidBlob): JSX.Element {
  return (
    <div className={classNames("flex items-center justify-center space-x-16 [filter:url(#blob)]", transition)}>
      <div
        className={classNames(blobStyle, "animate-blob-right", animateOnHover ? "paused group-hover:running" : "")}
      />
      <div className={classNames(blobStyle, "animate-blob-left", animateOnHover ? "paused group-hover:running" : "")} />
      <svg className="invisible absolute inset-0">
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="gaussian-blur" />
            <feColorMatrix
              in="gaussian-blur"
              mode="matrix"
              values={`
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 18 -8
              `}
              result="alpha-threshold"
            />
            <feBlend in="SourceGraphic" in2="alpha-threshold" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
