import { Socket } from 'socket.io-client'

export type TWebSocketContext = {
  ref: React.MutableRefObject<Socket | null>
}

export type TSeenSocketPayload = {
  chat: string
  user: string
  seenDate: string
}
