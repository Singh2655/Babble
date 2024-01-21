import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const {name,type}=await req.json();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.channelId)
      return new NextResponse("Server ID is missing", { status: 400 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID is missing", { status: 400 });

      if(name==="general")return new NextResponse("Name cannot be 'general'",{status:400})
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels:{
          update:{
            where:{
              id:params?.channelId,
              name:{
                not:"general",
              }
            },
            data:{
              name,
              type
            }
          }
        }
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_PATCH_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    if (!params.channelId)
      return new NextResponse("Server ID is missing", { status: 400 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID is missing", { status: 400 });
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("CHANNEL_DELETE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
