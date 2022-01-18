import { LiveblocksProvider, RoomProvider, useOthers, useMyPresence } from "@liveblocks/react"
import client from "@lib/liveblocksClient"

export default function CursorMultiplayer(): JSX.Element {
  return (
    <LiveblocksProvider client={client}>
      <RoomProvider id="test-room" defaultPresence={() => ({ cursor: null })}>
        <Cursors />
      </RoomProvider>
    </LiveblocksProvider>
  )
}

function Cursors(): JSX.Element {
  const [{ cursor }, updateMyPresence] = useMyPresence()
  const others = useOthers()

  return (
    <div
      className="relative h-screen w-full"
      onPointerMove={event =>
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        })
      }
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      <div className="text-center">
        {cursor ? `${cursor.x},${cursor.y}` : "Move your cursor to broadcast its position to other people in the room."}
      </div>

      {others.map(({ connectionId, presence }) => {
        if (presence == null || presence.cursor == null) return null

        return (
          <Cursor
            key={`cursor-${connectionId}`}
            // connectionId is an integer that is incremented at every new connections
            // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
            color={COLORS[connectionId % COLORS.length]}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        )
      })}
    </div>
  )
}

function Cursor({ color, x, y }: { color: string; x: number; y: number }): JSX.Element {
  return (
    <svg
      className="absolute left-0 top-0"
      style={{
        transition: "transform 0.5s cubic-bezier(.17,.93,.38,1)",
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  )
}

const COLORS = ["#E57373", "#9575CD", "#4FC3F7", "#81C784", "#FFF176", "#FF8A65", "#F06292", "#7986CB"]
