import './App.css';
//eslint-disable-next-line
import {Navigate,Routes,Route,BrowserRouter } from 'react-router-dom'
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LoginPage></LoginPage>}></Route>
    <Route path='/home' element={<HomePage></HomePage>}></Route>
    <Route path='/profile/:userId' element={<ProfilePage></ProfilePage>}></Route>
  </Routes>
  </BrowserRouter>


  </>
    );
}

export default App;
