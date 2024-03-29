import { Menu } from 'lucide-react'
import { FC } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './sheet'
import { Button } from './button'
import NavigationSidebar from '../navigation/NavigationSidebar'
import ServerSidebar from '../server/ServerSidebar'

interface MobileToggleProps {
  serverId:string
}

const MobileToggle: FC<MobileToggleProps> = ({serverId}) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <Menu/>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex gap-0">
            <div className="w-[72px]">
                <NavigationSidebar/>
            </div>
            <ServerSidebar serverId={serverId}/>
        </SheetContent>
    </Sheet>
  )
}

export default MobileToggle