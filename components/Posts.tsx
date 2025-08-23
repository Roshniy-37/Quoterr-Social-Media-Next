import React from 'react'
import Quote from './Quote'
import { fetchPosts } from '@/actions/db'

async function Posts() {
  const postData = await fetchPosts()
  return (
    <div className='flex-1 items-center flex-col gap-4 overflow-y-scroll p-5 grid grid-cols-3 bg-[url(/bg.png)] bg-cover'>
      {postData.map((d)=>(
        <Quote key={d.pid} data={d}/>
      ))}
    </div>
  )
}

export default Posts
