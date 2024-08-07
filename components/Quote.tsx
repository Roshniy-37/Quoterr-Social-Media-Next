"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardDescription, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Posts } from '@prisma/client'
import { countLike, disLike, existLike, newLike } from '@/actions/db'
import { useUser } from '@clerk/nextjs'

function Quote({data}:{data: Posts}) {
  const [isLike, setIsLike] = useState<Boolean>(false)
  const [count, setCount] = useState<Number>(0)
  const {user} = useUser() 
  async function toggleLike(){
    const username = user?.username as string
    const pid = data.pid
    setIsLike((like)=>!like)
    if(!isLike){
      const res = await newLike({username, pid})
      if(res){
        await postCount()
      }
    }else{
      const res = await disLike({username, pid})
      if(res){
        await postCount()
      }
    }
    
  }
  async function postCount(){
    const res = await countLike(data.pid)
    setCount(res)
  }
  useEffect(()=>{
    async function likeStatus(){
      const username = user?.username as string
      const pid = data.pid
      const res = await existLike({username, pid})
      if(res){
        setIsLike(true)
      }
    }
    likeStatus()
    postCount()
  },[])

  return (
    <Card className='shadow-lg w-full'>
        <CardHeader className='flex justify-between items-center text-xs p-4'>
            <h1>{data.username}</h1>
            <h1>{data.createdAt.toLocaleDateString()}</h1>
        </CardHeader>
        <CardDescription className='flex p-4 text-lg text-zinc-600 font-semibold'>
           {data.content}
        </CardDescription>
        <CardFooter className='w-full p-4 '>
            <Button onClick={toggleLike} variant={isLike ? 'destructive':'default'} className='w-full'>Like</Button>
            <h1 className='items-center p-2 min-w-fit'>{count.toString()} Likes</h1>
        </CardFooter>
    </Card>
  )
}

export default Quote
