import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function ServiceCard() {
  return (
    <Link href ="#" className='rounded-md bg-slate-400 hover:bg-slate-500 flex duration-300 gap-4'>
      <Image 
      src="/images/lawyer.jpg" 
      alt="loading..."
      height={600}
      width={600} 
      className="h-60 w-1/3 object-cover aspect-video"/>
      
      <div className='flex flex-col w-2/3'>
        <h2>Family law</h2>
      </div>
    
    </Link>
    
  )
}


