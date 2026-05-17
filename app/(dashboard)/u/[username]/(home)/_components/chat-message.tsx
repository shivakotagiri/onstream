import { ReceivedChatMessage } from "@livekit/components-react"
import { format } from "date-fns";
import { stringToHexColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatMessagesProps {
  message: ReceivedChatMessage,
  hostName: string,
}

export function ChatMessage({
  message,
  hostName
}: ChatMessagesProps) {
  const color = stringToHexColor(hostName);
  return (
    <div className="flex gap-2" key={message.timestamp}>
      <div className="flex gap-1">
        <span className="text-muted-foreground">{format(message.timestamp, "HH:MM")}</span>
        <span style={{ color }}>{ hostName }: </span>
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