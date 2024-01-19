import { FC } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

interface ActionTooltipProps {
  label:string
  children:React.ReactNode
  side?:"top"|"right"|"bottom"|"left"
  align?:"start"|"center"|"end"
}

const ActionTooltip: FC<ActionTooltipProps> = ({label,children,side,align}) => {
  return <TooltipProvider>
    <Tooltip delayDuration={50}>
    <TooltipTrigger asChild>
        {children}
    </TooltipTrigger>
    <TooltipContent side={side} align={align} >
        {label}
    </TooltipContent>
    </Tooltip>
  </TooltipProvider>
}

export default ActionTooltip