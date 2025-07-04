"use server"

import { currentUser } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/clerk-sdk-node"
import { db } from "./db"
import { redirect } from "next/navigation"
import { User } from "@prisma/client"

export const getAuthUserDetails = async ()=>{
    const user = await currentUser(       
    )
    if(!user){
        return
    }

    const userData = await db.user.findUnique({
        where:{
            email:user.emailAddresses[0].emailAddress
        },
        include:{
            Agency:{
                include:{
                    SidebarOption:true,
                    SubAccount:{
                        include:{
                            SidebarOption:true,
                        }
                    }
                }
            }
        }
    })
    return userData
}

export const saveActivityLogsNotification = async ({agencyId,description,subaccountId}:{
    agencyId?:string,
    description:string,
    subaccountId?:string,
})=>{

    const authUser = await currentUser()
    let userData:User | null=null;
    if(!authUser){
        const response = await db.user.findFirst({
            where:{
                Agency:{
                    SubAccount:{
                        some:{ id: subaccountId}
            }}}
        })
        if (response){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            userData = response
        }
    }else{
        userData = await db.user.findUnique({
            where :{email:authUser?.emailAddresses[0].emailAddress},
        })
    }

    if(!userData){
        console.log('Counld not find a user')
        return
    }

    let foundAgencyId = agencyId
    if(!foundAgencyId){
        if(!subaccountId){
            throw new Error(
                'You need to provide at least an agency Id or subaccount Id'
            )
        }
        const response = await db.subAccount.findUnique({
            where: { id: subaccountId }
        });
        if (response) foundAgencyId = response.agencyId;
    }
    if(subaccountId){
        await db.notification.create({
            data:{
                notification: `${userData.name} | ${description}`,
                User: {
                    connect: {
                        id: userData.id
                    }
                },
                Agency: {
                    connect: {
                        id: foundAgencyId
                    }
                },
                SubAccount:{
                    connect:{
                        id:subaccountId
                    }
                }
            }
        })
    }else{
        await db.notification.create({
            data:{
                notification:`${userData.name}|${description}`,
                User:{
                    connect:{
                        id:userData.id,

                    }
                },
                Agency:{
                    connect:{
                        id:agencyId
                    }
                }
            }
        })
    }
}



export const createTeamUser = async (agencyId:string, user:User)=>{
    if(user.role === 'AGENCY_OWNER') return null
    const response = await db.user.create({data:{...user}})
    return response
}


export const verifyAndAcceptInvitation=async ()=>{

    const user = await currentUser()
    if(!user) return redirect('/sign-in')

const invitationExists = await db.invitation.findUnique({
    where:{email:user.emailAddresses[0].emailAddress,status:'PENDING'}
})

let userDetails: User | null = null;

if (invitationExists) {
    userDetails = await createTeamUser(invitationExists.agencyId, {
        email: invitationExists.email,
        agencyId: invitationExists.agencyId,
        avatarUrl: user.imageUrl,
        id: user.id,
        name: `${user.firstName} ${user.lastName} `,
        role: invitationExists.role,
        createdAt: new Date(),
        updatedAt: new Date()
    });

        await saveActivityLogsNotification({
            agencyId: invitationExists?.agencyId,
            description: 'Joined',
            subaccountId: undefined
        });

        if (userDetails) {
            await clerkClient.users.updateUserMetadata(user.id, {
                privateMetadata: {
                    role: userDetails.role ||
                        "SUBACCOUNT_USER"
                }
            });

            await db.invitation.delete({
                where:{
                    email:userDetails.email
                }
            })
            return userDetails.agencyId

        }else{
            return null
        }


    } else{
    const agency = await db.user.findUnique({
        where:{
            email:user?.emailAddresses[0].emailAddress,

        }

    })
    return agency ? agency.agencyId :null
}

}