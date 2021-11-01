function GuestBookEntry(): JSX.Element {
  return (
    <div className="flex flex-col space-y-2">
      <div className="prose w-full">Hello</div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-500">Pondorasti</p>
        <span className="text-gray-200 dark:text-gray-800">/</span>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          {/* {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")} */}
          30 Oct 2021 at 8:47 PM
        </p>
        <span className="text-gray-200 dark:text-gray-800">/</span>
        <button className="text-sm text-red-600 dark:text-red-400">Delete</button>
        {/* {user && entry.created_by === user.name && (
          
        )} */}
      </div>
    </div>
  )
}

export default function Guestbook(): JSX.Element {
  return (
    <main>
      <h3 className="title1">Guestbook</h3>
      <p className="subtitle">
        Leave a comment below. It could be anything – appreciation, information, wisdom, or even humor. Surprise me!
      </p>
      <GuestBookEntry />
    </main>
  )
}
