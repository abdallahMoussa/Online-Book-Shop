import styles from './Nav.module.css';
import { Link, useNavigate } from 'react-router-dom';
import InputSearch from './InputSearch';
import { useRef } from 'react';


const Nav= props =>{

    const profileList = useRef();
    const Navigate = useNavigate()
    
    const showList = ()=>{
        let alt =profileList.current.getAttribute('alt');
        if(alt=="hide"){
            profileList.current.children[1].style.display="block";
            profileList.current.children[2].style.display="block";
            profileList.current.style.opacity="1";
            profileList.current.style.height="80px";
            profileList.current.setAttribute('alt',"show")
        }else{
            profileList.current.style.opacity="0";
            profileList.current.style.height="0";
             profileList.current.children[1].style.display="none";
             profileList.current.children[2].style.display="none";
            profileList.current.setAttribute('alt',"hide")
        }
    }
    const LogOut = ()=>{
        props.Login(false)
        Navigate('/')
    }

    return <div className={`${styles.Nav} pt-14 pb-9 w-full flex align-top` }>
                <div className="logo max-h-10 w-1/5 text-left pl-6">
                    <Link to='/' className={`${styles.logo}`}>
                        <img src="/images/logo.png" height="auto" width="auto" />
                    </Link>   
                </div>
                <label className="relative flex min-w-min w-3/5">
                    <InputSearch />
                   
                </label>
                

                <div className={`${styles.profileLike} min-w-min w-1/5 flex gap-6 pr-5 `} >
                   {
                    props.isLogin&&( <>
                                <Link to="/liked">
                                    <span className='text-2xl cursor-pointer hover:opacity-90 duration-300 active:opacity-1 active:text-black active:relative '>&#10084;</span>
                                </Link>
                                
                                <div  onClick={showList} className={`${styles.profile} w-10 h-10 rounded-full shadow-md pt-1 duration-300 relative `}>
                                    <span className='cursor-pointer'>{localStorage.getItem('Name')&&localStorage.getItem('Name')[0].toUpperCase()}</span>
                                    <div ref={profileList} alt="hide" className='profileList opacity-0 duration-300 absolute w-28 h-22 text-lg font-thin rounded-md -left-10 top-14 z-10 bg-slate-400 py-3 '>
                                        <span className='arrow w-5 h-5 block bg-slate-400 absolute -top-2 left-12 rotate-45'></span>
                                        <Link to="/profile">
                                             <span className='block text-purple-800 hover:text-purple-300 mb-1 duration-500 font-bold'>Profile</span>
                                        </Link>
                                        <span onClick={LogOut} className='cursor-pointer relative  text-purple-800 hover:text-purple-300  block w-full font-bold duration-500'>Log Out</span>
                                    </div>
                                </div>
                            
                            </>
                            )   
                   }
                   { !props.isLogin&&(<>
                                    <Link to="/login">
                                        <svg className='w-8' viewBox="0 0 512 512">
                                            <path className='fill-purple-900' d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z"/>
                                        </svg>
                                    </Link>
                                    <Link to="/signup">
                                        <svg className='w-8' viewBox="0 0 640 512">
                                            <path  className='fill-purple-900' d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"/>
                                        </svg>
                                    </Link>
                                </>
                            )
                   }
                        <div className="changeLang hover:text-black duration-300">
                            <span>EN</span>
                        </div>
 

                </div>
            </div>

};

export default Nav;