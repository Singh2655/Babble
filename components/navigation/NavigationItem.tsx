"use client"

import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../ui/action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavigationItemProps{
    id:string;
    imageUrl:string;
    name:string;
}

const NavigationItem = ({id,imageUrl,name}: NavigationItemProps) => {
    const params=useParams()
    const router=useRouter()

    const handleClick=()=>{
        router.push(`/servers/${id}`)
    }
  return (
    <ActionTooltip align="center" side="right" label={name}>
        <button className="group relative flex items-center "
        onClick={handleClick}
        >
            <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId!==id && "group-hover:h-[20px]",
            params?.serverId===id?"h-[36px]":"h-[8px]"
            )}/>
            <div className={cn('relative mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            params?.serverId===id && "rounded-[16px] bg-primary/10 text-primary"
            )}>
                <Image 
                fill
                alt="Channel"
                src={imageUrl}

                />
            </div>
        </button>
    </ActionTooltip>
  )
}

export default NavigationItem