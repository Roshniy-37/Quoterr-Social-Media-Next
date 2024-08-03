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