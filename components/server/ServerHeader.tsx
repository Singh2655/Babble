"use client"

import { ServerWithMemberWithProfile } from '@/type';
import { MemberRole } from '@prisma/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, TrashIcon, User, UserPlus } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';

interface ServerHeaderProps{
    server:ServerWithMemberWithProfile;
    role?:MemberRole;
}

const ServerHeader = ({server,role}:ServerHeaderProps) => {

    const {onOpen}=useModal()

    const isAdmin=role===MemberRole.ADMIN
    const isModerator=isAdmin||role===MemberRole.MODERATOR
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:outline-none">
            <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 hover:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition'>
                {server.name}
                <ChevronDown className="h-5 w-5 ml-auto"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-neutral-800 hover:text-neutral-400 space-y-[2px]">
            {isModerator && (
                <DropdownMenuItem className='text-indigo-600 dark:text-indigo-400 px-3 py-2 cursor-pointer text-sm' onClick={()=>onOpen("invite",{server})}>
                    Invite People
                    <UserPlus className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className='px-3 py-2 cursor-pointer text-sm' onClick={()=>onOpen("editServer",{server})}>
                    Server Settings
                    <Settings className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className='px-3 py-2 cursor-pointer text-sm' 
                onClick={()=>onOpen("members",{server})}
                >
                    Manage Users
                    <User className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem className='px-3 py-2 cursor-pointer text-sm'>
                    Create Channel
                    <PlusCircle className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator/>
            )}
            {isAdmin && (
                <DropdownMenuItem className='text-rose-500 px-3 py-2 cursor-pointer text-sm'>
                    Delete Server
                    <Trash className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
            {!isAdmin && (
                <DropdownMenuItem className='text-rose-500 px-3 py-2 cursor-pointer text-sm'>
                    Leave Server
                    <LogOut className='h-4 w-4 ml-auto'/>
                    </DropdownMenuItem>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader