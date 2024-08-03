import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Posts } from '@prisma/client'

function Quote({data}:{data: Posts}) {
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
            <Button className='w-full'>Like</Button>
        </CardFooter>
    </Card>
  )
}

export default Quote
