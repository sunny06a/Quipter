import './App.css';
//eslint-disable-next-line
import {Navigate,Routes,Route,BrowserRouter } from 'react-router-dom'
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import {useMemo} from 'react'
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode=useSelector((state)=> state.mode);
  const theme=useMemo(()=> createTheme(themeSettings(mode)),[mode]);
  return (
  <>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
  <CssBaseline/>
  <Routes>
    <Route path='/' element={<LoginPage></LoginPage>}></Route>
    <Route path='/home' element={<HomePage></HomePage>}></Route>
    <Route path='/profile/:userId' element={<ProfilePage></ProfilePage>}></Route>
  </Routes>
  </ThemeProvider>
  </BrowserRouter>


  </>
    );
}

export default App;
