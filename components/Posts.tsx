import React from 'react'
import Quote from './Quote'
import { fetchPosts } from '@/actions/db'

async function Posts() {
  const postData = await fetchPosts()
  return (
    <div className='flex-1 flex items-center flex-col p-3 gap-4 overflow-y-scroll '>
      {postData.map((d)=>(
        <Quote key={d.pid} data={d}/>
      ))}
    </div>
  )
}

export default Posts
