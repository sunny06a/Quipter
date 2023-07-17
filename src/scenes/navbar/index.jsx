import { Close, DarkMode, Help, LightMode, Menu, Message, Notifications, Search } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout, setMode } from 'state';

export default function Navbar() {
  const [isMobileMenuToggled,setIsMobileMenuToggled] =useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=useState((state)=> state.user);
  const isNonMobileScreens=useMediaQuery("(min-with:1000px");
  const theme=useTheme();
  const neturalLight=theme.palette.neutral.light;
  const dark=theme.palette.neutral.dark;
  const background=theme.palette.background.default;
  const primaryLight=theme.palette.primary.light;
  const all=theme.palette.background.all;

  const fullName=`${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={all}>
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem,2.25rem)" color="primary" onClick={()=> navigate("/home")} sx={{"&:hover":{color:primaryLight,cursor:"pointer",},}}>
          SocialMedia
        </Typography>
        {isNonMobileScreens && (<FlexBetween background={neturalLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
          <InputBase placeholder='search...'></InputBase>
          <IconButton><Search/></IconButton>
        </FlexBetween>)}
      </FlexBetween>

      {isNonMobileScreens ? (<FlexBetween gap="2rem"><IconButton onClick={()=>dispatch(setMode())}>{theme.palette.mode==='dark'?(<DarkMode sx={{fontSize:"25px"}}>
      </DarkMode>):(<LightMode sx={{color:dark,fontSize:"25px"}}></LightMode>)}</IconButton>
      <Message sx={{fontSize:"25px"}}/>
      <Notifications sx={{fontSize:"25px"}}/>
      <Help sx={{fontSize:"25px"}}/>
      <FormControl variant='standard' value={fullName}>
        <Select value={fullName} sx={{background:neturalLight,width:"150px",borderRadius:"0.25rem",p:"0.25rem 1rem",
        "& .MuiSvgIcon-root":{pr:"0.25rem",width:"3rem"}," & .MuiSelect-select:focus":{backgroundColor:neturalLight}, fontSize:"25px"}} input={<InputBase/>}>
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={()=>dispatch(setLogout())}>Log Out
        </MenuItem>
        </Select>
      </FormControl>
      </FlexBetween>):
      (<IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
        <Menu></Menu>
      </IconButton>)

      }
    {!isNonMobileScreens && isMobileMenuToggled && (
      <Box position="fixed" right='0' bottom='0' height='100%' zIndex='10'maxWidth='500px' minWidth='300px' backgroundColor={background}>
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton onClick={()=>setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Close></Close>
          </IconButton>
        </Box>
        
        <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem"><IconButton onClick={()=>dispatch(setMode())}>{theme.palette.mode==='dark'?(<DarkMode sx={{fontSize:"25px"}}>
      </DarkMode>):(<LightMode sx={{color:dark,fontSize:"25px"}}></LightMode>)}</IconButton>
      <Message sx={{fontSize:"25px"}}/>
      <Notifications sx={{fontSize:"25px"}}/>
      <Help sx={{fontSize:"25px"}}/>
      <FormControl variant='standard' value={fullName}>
        <Select value={fullName} sx={{background:neturalLight,width:"150px",borderRadius:"0.25rem",p:"0.25rem 1rem",
        "& .MuiSvgIcon-root":{pr:"0.25rem",width:"3rem"}," & .MuiSelect-select:focus":{backgroundColor:neturalLight}, fontSize:"25px"}} input={<InputBase/>}>
        <MenuItem value={fullName}>
          <Typography>{fullName}</Typography>
        </MenuItem>
        <MenuItem onClick={()=>dispatch(setLogout())}>Log Out
        </MenuItem>
        </Select>
      </FormControl>
      </FlexBetween>

      </Box>
    )}
    </FlexBetween>
  )
}
