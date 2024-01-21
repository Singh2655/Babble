import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, VideoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import ServerHeader from "./ServerHeader";
import ServerSearch from "./ServerSearch";
import { Separator } from "../ui/separator";
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel";
import ServerMember from "./ServerMember";

interface ServerSidebarProps {
  serverId: string;
}
const IconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <VideoIcon className="mr-2 h-4 w-4" />,
};
const RoleIcon = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const server = await db.server.findFirst({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  if (!server) return redirect("/");
  const textChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannel = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader role={role} server={server} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channel",
                type: "channel",
                data: textChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Voice Channel",
                type: "channel",
                data: audioChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Video Channel",
                type: "channel",
                data: videoChannel?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: IconMap[channel.type],
                })),
              },
              {
                label: "Member",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: RoleIcon[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannel?.length && (
          <div className="mb-2">
            <ServerSection
              channelType={ChannelType.TEXT}
              sectionType="channel"
              label="Text Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {textChannel.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannel?.length && (
          <div className="mb-2">
            <ServerSection
              channelType={ChannelType.AUDIO}
              sectionType="channel"
              label="Voice Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {audioChannel.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannel?.length && (
          <div className="mb-2">
            <ServerSection
              channelType={ChannelType.VIDEO}
              sectionType="channel"
              label="Video Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {videoChannel.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="member"
              label="Members"
              role={role}
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
