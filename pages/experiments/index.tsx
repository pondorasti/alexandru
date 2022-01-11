import Description from "@components/Description"
import classNames from "@lib/classNames"

export default function Experiments(): JSX.Element {
  const circleStyle = "h-3 w-3 rounded-full bg-gray-200"
  const transition = "transition-colors duration-300 ease-linear"
  return (
    <>
      <Description title="Experiments" description="A playground to try out new ideas" />
      <div className="flex flex-col w-full border border-divider rounded-lg overflow-hidden group">
        <div className="relative bg-gray-100 dark:bg-gray-800 h-12 px-4 w-full flex flex-row items-center space-x-2 text-gray-500 group-hover:text-gray-700">
          <div className={classNames(circleStyle, "group-hover:bg-systemRed", transition)}></div>
          <div className={classNames(circleStyle, "group-hover:bg-systemYellow", transition)}></div>
          <div className={classNames(circleStyle, "group-hover:bg-systemGreen", transition)}></div>
          <span className="flex-grow" />
          <div className="absolute left-0 !ml-0 w-full">
            <div className={classNames("bg-gray-200 rounded-md mx-auto max-w-xs py-1 text-sm text-center", transition)}>
              Github Contributions
            </div>
          </div>
          <span className={transition}>→</span>
        </div>
        <div className="h-64"></div>
      </div>
    </>
  )
}
