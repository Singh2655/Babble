import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findFirst({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId,
    },
  });
  if (!channel || !member) redirect("/");
  return (
    <div className="bg-while dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        type="channel"
        name={channel.name}
      />

      <ChatMessages
        name={channel.name}
        member={member}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
        chatId={channel.id}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default page;
