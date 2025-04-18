import React from 'react'
import Card from '../Card/Card'
import './Floor.css'

const Floor = ({floor_info}) => {
  return (
    <div className='floor-main'>
      <div className=''>
        <h1>Floor No ::  {floor_info[0].floor}</h1>
      </div>
      <div className='inside-floor'>
        {floor_info.map((item, index) => (
          <Card room_info={item}/>
        ))}
      </div>
    </div>
  )
}

export default Floor
