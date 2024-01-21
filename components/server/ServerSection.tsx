"use client"

import { ServerWithMemberWithProfile } from '@/type';
import { ChannelType, MemberRole } from '@prisma/client';
import { FC } from 'react'
import ActionTooltip from '../ui/action-tooltip';
import { Cog, Plus, Settings } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';

interface ServerSectionProps {
  label:string;
  role?:MemberRole;
  sectionType:"channel"|"member";
  channelType?:ChannelType;
  server?:ServerWithMemberWithProfile;
}

const ServerSection: FC<ServerSectionProps> = ({label,role,sectionType,channelType,server}) => {
    const {onOpen}=useModal()
  return <div className="flex items-center justify-between py-2">
    <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>{label}</p>
    {role!==MemberRole.GUEST && sectionType==="channel" && (
        <ActionTooltip label='Create Channel' side='top'>
            <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" onClick={()=>onOpen("createChannel",{channelType})}>
                <Plus className="h-4 w-4 "/>
            </button>
        </ActionTooltip>
    )}
    {role===MemberRole.ADMIN && sectionType==="member" && (
        <ActionTooltip label='Manage Members' side='top'>
            <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" onClick={()=>onOpen("members",{server})}>
                <Settings className="h-4 w-4 "/>
            </button>
        </ActionTooltip>
    )}
  </div>
}

export default ServerSection