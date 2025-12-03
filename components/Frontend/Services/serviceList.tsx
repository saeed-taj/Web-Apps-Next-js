import React from 'react'
import ServiceCard from './ServiceCard'

export default function ServiceList () {
  return (
    <div className='grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid:cols-1 gap-6'>
      <ServiceCard/>
    </div>
  )
}


