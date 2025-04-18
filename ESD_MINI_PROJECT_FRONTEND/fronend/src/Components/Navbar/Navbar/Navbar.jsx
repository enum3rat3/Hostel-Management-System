import { React, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import './Navbar.css'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../Store/AuthReducer'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate=useNavigate();
  const { auth } = useSelector(store => store)
  const user = auth.user

  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handlelogout = () => {
    dispatch(logout())
    handleClose()
    navigate("/")
  }

  useEffect(()=>{
      
  },[])

  return (
    <>
      {auth.loading ? (
        <div>loading.....</div>
      ) : (
        <div className='main'>
          <div className='left-panel'>HOSTEL MANAGMENT</div>

          <div className='right-panel'>
            {user !== null ? (
              <span>{user.fullName}</span>
            ) : (
              <span>Log in first</span>
            )}

            <div>
              <Button
                id='fade-button'
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {user !== null ? (
                  <Avatar alt='falcon_30'>{user.fullName.charAt(0)}</Avatar>
                ) : (
                  <Avatar alt='falcon_30'>L</Avatar>
                )}
              </Button>
              <Menu
                id='fade-menu'
                MenuListProps={{
                  'aria-labelledby': 'fade-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handlelogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
