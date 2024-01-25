"use client"

import { createContext,useContext,useState,useEffect } from "react"
import { Socket } from "socket.io"
import {io as ClientIO} from "socket.io-client"

type SocketContextType={
    socket:any|null,
    isConnected:boolean
}

interface SocketProvidersProps{

}

const SocketContext=createContext<SocketContextType>({
    socket: null,
    isConnected:false
})

export const useSocket=()=>{
    return useContext(SocketContext)
}

export const SocketProvider=({children}:{children:React.ReactNode})=>{
    const [socket,setSocket]=useState(null)
    const [isConnected, setIsConnected] = useState(false)
    useEffect(()=>{
        const socketInstance=new (ClientIO as any)(process.env.NEXT_PUBLI_SITE_URL!,{
            path:'/api/socket/io',
            addTrailingSlash:false
        })
        socketInstance.on("connect",()=>{
            setIsConnected(true)
        })
        socketInstance.on("disConnect",()=>{
            setIsConnected(false)
        })
        setSocket(socketInstance)
        return ()=>{
            socketInstance.disconnect()
        }
    },[])

    return (
        <SocketContext.Provider value={{socket,isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}