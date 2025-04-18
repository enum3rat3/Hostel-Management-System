import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import './Filter.css'
import { Button, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNames, gethostel } from '../../Store/hostelReducer'



const Filter = () => {
  
  
 
  const dispatch = useDispatch()
  const { hostel } = useSelector(store => store)
  const [hostelName, SetHostelName] = useState('')
  const [floor, SetFloor] = useState('')
  const [available, SetAvailable] = useState('')
  const [load, setLoad] = useState(false)

  const handleNameChange = event => {
    SetHostelName(event.target.value)
  }
  const handleFloorChange = event => {
    SetFloor(event.target.value)
  }
  const handleAvailableChange = event => {
    SetAvailable(event.target.value)
  }

  const handleReset = () => {
    SetFloor('')
    SetAvailable('')
    SetHostelName('')
    const jwt = localStorage.getItem('jwt')
    setLoad(true)
    
    dispatch(gethostel({ j: jwt, n: '', f: 0, a: 0 }))
  }

  const handleapply = () => {
    const jwt = localStorage.getItem('jwt')
    var fl = 0
    if (floor.length > 0) {
      fl = parseInt(floor, 10)
    }
    var avail = 0
    if (available.length > 0) {
      avail = parseInt(available, 10)
    }
   
    dispatch(gethostel({ j: jwt, n: hostelName, f: fl, a: avail }))
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    dispatch(getAllNames({jwt:jwt}))
  }, [hostel.hostels])


  useEffect(()=>{

  },[])

  
  return (
    <>
    {
      hostel.loading?(<div>loading....</div>):(
        <div className='filter-main'>
    
        <div className='heading'>
          <h1> Filter by Name and Floor</h1>
          <div className='name-menu'>
            <FormControl variant='filled' fullWidth>
              <InputLabel id='demo-simple-select-label'>HOSTEL_NAME</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={hostelName}
                label='Hostel_Name'
                onChange={handleNameChange}
              >
                {/* <MenuItem value={'bhaskara'}>Bhaskara</MenuItem>
                <MenuItem value={'lilavati'}>Lilavati</MenuItem>
                <MenuItem value={'vishvareya'}>Vishvareya</MenuItem> */}
                {
                  hostel.hostelNames.map((item, index) => 
                  <MenuItem value={item}>{item}</MenuItem>
                )

                }
              </Select>
            </FormControl>
          </div>

          <div className='floor-menu'>
            <FormControl variant='filled' fullWidth>
              <InputLabel id='demo-simple-select-label'>FLOOR_NO</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={`${floor}`}
                label='floor'
                onChange={handleFloorChange}
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
                <MenuItem value={'6'}>6</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='avail_alloc'>
          <h1> Filter by availability</h1>
          <div className='avail-menu'>
            <FormControl variant='filled' fullWidth>
              <InputLabel id='demo-simple-select-label'>
                AVAILIBILITY
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={`${available}`}
                label='availability'
                onChange={handleAvailableChange}
              >
                <MenuItem value={'1'}>Available</MenuItem>
                <MenuItem value={'2'}>Allocated</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='btn'>
          <div className='avail-menu'>
            <Button
              sx={{ padding: '.8rem' }}
              fullWidth
              className='customeButton'
              variant='contained'
              onClick={handleapply}
              
            >
              Apply
            </Button>
          </div>

          <div className='avail-menu'>
            <Button
              sx={{ padding: '.8rem' }}
              fullWidth
              className='customeButton'
              variant='contained'
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
     
    </div>
      )
    }
    </>
  )
}

export default Filter
