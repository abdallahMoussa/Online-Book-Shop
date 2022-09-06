import './App.css';
import Loader from './Components/body/Loader';
import {Routes ,Route } from 'react-router-dom';
import { lazy , Suspense, useEffect, useState } from 'react';


const Slider = lazy(()=>import('./Components/body/SLider'));
const Header = lazy(()=>import('./Components/header/Header'));
const Home = lazy(()=>import('./Components/body/Home'));
const Content = lazy(()=>import('./Components/body/Content'));
const BookPage = lazy(()=>import('./Components/body/BookPage'));
const LoginForm = lazy(()=>import('./Components/header/LoginForm'));
const SignUp = lazy(()=>import('./Components/header/SignUp'));
const LikedPage = lazy(()=>import('./Components/body/LikedPage'));
const Profile = lazy(()=>import('./Components/body/Profile'));
const StillDeveloped = lazy(()=>import('./Components/header/StillDeveloped'));

function App() {

  const [isLogin , setLogin] = useState(false)

  const Login=(TorF)=>{
    localStorage.setItem("isLogin",'true');
    setLogin(prev=>TorF)
  }

  useEffect(()=>{
  },[])

  return (
    <div className="App">
      <Header isLogin={isLogin} Login={Login} />
      <Suspense fallback={<Loader />}>
        <Routes>
            
            <Route path='/' element={<><Slider /><Home /></>} /> 
            <Route path='/login' element={<LoginForm Login={Login}/>} />
            <Route path='/signup' element={<SignUp Login={Login}/>} />
            <Route path='/liked' element={<LikedPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/books' element={<Content />} />
            <Route path='/books/:bookId' element={<BookPage isLogin={isLogin} />} />
            <Route path='*' element={<StillDeveloped />} />
    
        </Routes>  
      </Suspense>  
    </div>
  );
}

export default App;
