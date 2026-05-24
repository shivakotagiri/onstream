import { ReceivedChatMessage } from "@livekit/components-react"
import { format } from "date-fns";
import { stringToHexColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps {
  message: ReceivedChatMessage,
  viewerName: string,
  hostName: string
}

export function ChatMessage({
  message,
  viewerName,
}: ChatMessagesProps) {
  const color = stringToHexColor(message.from?.name || viewerName);
  return (
    <div className="flex gap-2" key={message.timestamp}>
      <div className="flex gap-1">
        <span className="text-muted-foreground">{format(message.timestamp, "HH:MM")}</span>
        <span style={{ color }}>{ message.from?.name }: </span>
      </div>
      <span>{message.message}</span>
    </div>
  )
}

export function ChatMessageSkeleton() {
  return (
    <div className="flex justify-center items-center w-full h-full gap-1.5">
      <Skeleton className="h-10 w-10 rounded-full"/>
      <Skeleton className="h-10 w-full rounded-2xl" />
    </div>
  )
}