import { SignedIn, SignedOut,  SignOutButton, SignUpButton, } from '@clerk/nextjs'
import React from 'react'

export default function Home() {
    return(
        <div>
        <SignedOut>
    <SignUpButton>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign Up</button>
    </SignUpButton>
  </SignedOut>
  <SignedIn>
    <SignOutButton>
        <button  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Sign out</button>
    </SignOutButton>
  </SignedIn>
    </div>
    )
}