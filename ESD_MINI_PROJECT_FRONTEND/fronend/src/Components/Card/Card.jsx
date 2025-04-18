import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  FormControlLabel,
  colors
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, update, vacant } from '../../Store/hostelReducer'

let theme = createTheme({})
theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: '#FF5733'
      },
      name: 'salmon'
    })
  }
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#4e4a4b',
  boxShadow: 24,
  p: 4,
  background: 'linear-gradient(300deg,grey,white)',
  borderRadius: 5
}
const Card = ({ room_info }) => {
  const dispatch = useDispatch()
  const {hostel}=useSelector(store=>store);
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState({
    id: room_info.id,
    name: room_info.name,
    floor: room_info.floor,
    roomNumber: room_info.roomNumber,
    studentId: room_info.student===null?"":room_info.student.studentId
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleVacant = () => {
    const existing_data={
      "id":formData.id,
      "name":formData.name,
      "floor":formData.floor,
      "roomNumber":formData.roomNumber,
      "student":{
        "studentId":formData.studentId,
        "email":null
      }
    }
    dispatch(
      vacant({
        j: localStorage.getItem('jwt'),
        hostel_data: existing_data
      })
    )
    handleClose()
  }
  const handleallocate = () => {
    const updated_data={
      "id":formData.id,
      "name":formData.name,
      "floor":formData.floor,
      "roomNumber":formData.roomNumber,
      "student":{
        "studentId":formData.studentId,
        "email":null
      }
    }
    dispatch(update({ 
      j: localStorage.getItem('jwt'), 
      hostel_data: updated_data 
    }))

    handleClose()
  }



  return (
    <>   
    <ThemeProvider theme={theme}>
      <div className='card-main'>
        {room_info.student === null ? (
          <Button onClick={handleOpen} variant='contained'>
            {room_info.roomNumber}
          </Button>
        ) : (
          <Button onClick={handleOpen} variant='contained' color='salmon'>
            {room_info.roomNumber}
          </Button>
        )}

        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form >
                <Grid container spacing={2} alignItems='center'>
                  <Grid item xs={12}>
                    <TextField
                      label='hostel_name'
                      fullWidth
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='floor_no'
                      fullWidth
                      name='floor'
                      value={formData.floor}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='roomNumber'
                      fullWidth
                      name='roomNumber'
                      value={formData.roomNumber}
                      onChange={handleChange}
                      disabled
                    />
                  </Grid>

                  {room_info.student !==null?(
                                      <Grid item xs={12}>
                                      <TextField
                                        label='studentId'
                                        fullWidth
                                        name='studentId'
                                        color='black'
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        disabled
                                      />
                                    </Grid>
                  ):(
                    <Grid item xs={12}>
                    <TextField
                      label='studentId'
                      fullWidth
                      name='studentId'
                      color='black'
                      value={formData.studentId}
                      onChange={handleChange}
                    />
                  </Grid>
                  )}

                  {room_info.student !== null ? (
                    <Grid item xs={12}>
                      <Button
                        sx={{ padding: '.8rem' }}
                        fullWidth
                        className='customeButton'
                        variant='contained'
                        
                        disabled
                      >
                        Allocate
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <Button
                        sx={{ padding: '.8rem' }}
                        fullWidth
                        className='customeButton'
                        variant='contained'
                        
                        onClick={handleallocate}
                      >
                        Allocate
                      </Button>
                    </Grid>
                  )}
                  {room_info.student === null ? (
                    <Grid item xs={12}>
                      <Button
                        sx={{ padding: '.8rem' }}
                        fullWidth
                        className='customeButton'
                        variant='contained'
                        onClick={handleVacant}
                        disabled
                      >
                        VACANT
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <Button
                        sx={{ padding: '.8rem' }}
                        fullWidth
                        className='customeButton'
                        variant='contained'
                        onClick={handleVacant}
                      >
                        VACANT
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </ThemeProvider>
    </>
  )
}

export default Card
