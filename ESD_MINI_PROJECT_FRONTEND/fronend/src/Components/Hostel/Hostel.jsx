import React from 'react'
import './Hostel.css'
import Floor from '../Floor/Floor'

// const floor=[1,1,1,1,1,1,1]
const Hostel = ({hostel_info}) => {
  return (
    <div className='hostel-main'>
        <div className='hostel-name'>

                <h1 ><b>{hostel_info[0][0].name}</b></h1>
        </div>
        <div className='inside-hostel-main'>

            {
                hostel_info.map((item,index)=>(
                    <Floor  floor_info={item}/>
                ))
            }
        </div>
    </div>
  )
}

export default Hostel