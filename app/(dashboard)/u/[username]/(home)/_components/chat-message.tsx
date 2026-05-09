import { ReceivedChatMessage } from "@livekit/components-react"
import { format } from "date-fns";
import { stringToHexColor } from "@/lib/utils";

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
        <span className="text-muted-foreground">{format(message.timestamp, "HH:MM")}:</span>
        <span className={`text-[${color}]`}>{ hostName } </span>
      </div>
      <span>{message.message}</span>
    </div>
  )
}