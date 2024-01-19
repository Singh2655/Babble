import { FC } from 'react'

interface ServerIdPageProps {
  params:{serverId:string}
}

const ServerIdPage: FC<ServerIdPageProps> = ({params}:ServerIdPageProps) => {
  return <div>{params.serverId}</div>
}

export default ServerIdPage