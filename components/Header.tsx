"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPost } from '@/actions/db'
import { useRouter } from 'next/navigation'


function Header() {
  const router = useRouter()
  const {user} = useUser();
  const [quote, setQuote] = useState("")
  async function uploadQuote(){
    if(quote.length<10){
      window.alert("Quote too short")
      return
    }
    if(!user){
      return
    }
    const username = user.username || user.fullName || "";
    const content = quote
    const res = await createPost({username , content})
    setQuote("")
    router.refresh()


  }
  return (
    <div className='w-full z-40 flex bg-white justify-between h-16 items-center border-b px-3 shadow-md'>
      <h1>Quoterr</h1>
      <div className='flex justify-center items-center gap-4'>
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size='sm'>Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Quote
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={quote}
              onChange={(e)=>setQuote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
          <Button onClick={uploadQuote} type="submit">Post Now</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
