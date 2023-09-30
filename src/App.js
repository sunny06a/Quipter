import './App.css';
//eslint-disable-next-line
import {Navigate,Routes,Route,BrowserRouter } from 'react-router-dom'
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import {useMemo} from 'react' //useMemo is used to prevent re-rendering of the component
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider} from '@mui/material'; //CssBaseline is used to reset the css of the page and ThemeProvider is used to provide the theme to the app
import { createTheme } from '@mui/material/styles'; //createTheme is used to create the theme
import { themeSettings } from './theme'; //themeSettings is used to get the theme settings from the theme.js file

function App() {
  const mode=useSelector((state)=> state.mode);  //useSelector is used to get the state from the redux store
  const theme=useMemo(()=> createTheme(themeSettings(mode)),[mode]); 
  const isAuth=Boolean(useSelector((state)=>state.token)) //isAuth is used to check if the user is authenticated or not
  return (
  <div className='app'>
  <BrowserRouter>
  <ThemeProvider theme={theme}>
  <CssBaseline/>
  <Routes>
    <Route path='/' element={<LoginPage></LoginPage>}></Route>
    <Route path='/home' element={isAuth?<HomePage></HomePage>:<Navigate to='/'/>}></Route>
    <Route path='/profile/:userId' element={isAuth?<ProfilePage></ProfilePage>:<Navigate to='/'/>}></Route>
  </Routes>
  </ThemeProvider>
  </BrowserRouter>
  </div>
    );
}

export default App;
