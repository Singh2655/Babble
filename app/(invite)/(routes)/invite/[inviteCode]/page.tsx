import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react'

interface pageProps {
  params:{
    inviteCode:string;
  }
}

const page: FC<pageProps> = async ({params}) => {
  const profile=await currentProfile()
  if(!profile)return redirectToSignIn()
  if(!params.inviteCode)redirect("/")
  const existingServer=await db.server.findFirst({
        where:{
          invitecode:params.inviteCode,
          members:{
            some:{
              profileId:profile.id,
            }
          }
        }
  })
  if(existingServer)return redirect(`/servers/${existingServer.id}`)

  const server=await db.server.update({
    where:{
      invitecode:params.inviteCode,
    },
     data:{
      members:{
        create:[
          {profileId:profile.id}
        ]
      }
    }
  })
  if(server)return redirect(`servers/${server.id}`)
  return null
}

export default page