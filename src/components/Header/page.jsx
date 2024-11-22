import React from 'react'
import Router from 'next/router'
import Image from 'next/image'

function Header() {
  return (
    <header className='w-full p-4 shadow-sm '>
         <div >
            <Image src={"/logo.png"} width={128} height={128} style={{ objectFit: 'contain' }} className=''/>
         </div>
         <nav>
            
         </nav>
         <div >

         </div>
    </header>
  )
}

export default Header
