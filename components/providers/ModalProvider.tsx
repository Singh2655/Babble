"use client"

import { useEffect, useState } from "react"
import CreateServerModal from "../modals/CreateServerModal"
import InviteModal from "../modals/InviteModal"
import { EditServerModal } from "../modals/EditServerModal"
import MembersModal from "../modals/MembersModal"

type Props = {}

const ModalProvider = (props: Props) => {

    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(()=>{
        setIsMounted(true)
    },[])
    if(!isMounted)return null

  return (
    <>
    <CreateServerModal/>
    <InviteModal/>
    <EditServerModal/>
    <MembersModal/>
    </>
  )
}

export default ModalProvider