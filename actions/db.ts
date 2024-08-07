"use server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();




export async function fetchPosts(){
    return await prisma.posts.findMany({
        orderBy: [
            {
              createdAt: 'desc',
            }
        ]
    })
}

export async function createPost({username, content}: {username:string,content:string}){
    return await prisma.posts.create({
        data:{
            username, 
            content
        }
    })
}
export async function existLike({username, pid}:{username: string, pid: string}){
    return await prisma.like.findFirst({
        where : { 
            username, 
            pid,
        }
    })

}
export async function newLike({username, pid}:{username: string, pid: string}){

    const exist = await existLike({username, pid})
    if(exist){
        return null
    }
    return await prisma.like.create({
        data: {username, pid}
    }) 
}
export async function countLike(pid: string){
    const res = await prisma.like.count({
        where:{
            pid 
        }
    })
    return res
}
export async function disLike({username, pid}:{username: string, pid: string}){
    const exist = await existLike({username, pid})
    const lid = exist?.lid
    if(!exist){
        return null
    }
    return await prisma.like.delete({
        where:{
            lid
        }
    })
}