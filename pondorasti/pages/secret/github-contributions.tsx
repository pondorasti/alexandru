import dynamic from 'next/dynamic'

const DynamicGithubCalendar = dynamic(() => import('react-ts-github-calendar'), {
  ssr: false,
});

export default function githubContributions() {
  return (
    <div>
      <body>
        <DynamicGithubCalendar userName="togami2864" responsive summary_text="hello" global_stats />
      </body>
    </div>
  )
}