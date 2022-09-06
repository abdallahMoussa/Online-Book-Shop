import {Link , useNavigate  } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import styles from './Login.module.css';


const Login = (props)=>{

    const email = useRef();
    const Password = useRef();
    const remember = useRef();
    const layoutRef = useRef();
    const Navigate = useNavigate() 
   

    const handleSubmit = e =>{
        e.preventDefault();  
        getUser(email.current.value , Password.current.value)
    }
    async function getUser(userName,password){
        try{
            const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/users.json')
            const users = await response.json();

            let errors = document.getElementsByClassName('login-error');
            errors[0].innerHTML='';
            errors[1].innerHTML='';
            let foundUser = false;
            
            for(let user in users){
            
                if(users[user]['email'].toLowerCase() == userName.toLowerCase()){
                    foundUser=true;
                    if(users[user]['password']==password){
                    rememberMe(user,users[user]['name'])     
                        props.Login(true)
                        Navigate(-1)?Navigate(-1):Navigate('/')
                        return 0;
                    }else{
                        errors[1].style.opacity='1'
                        errors[1].innerHTML='* invalid password';
                    }
                }
            }
            if(!foundUser){
                errors[0].style.opacity='1'
                errors[0].innerHTML='* invalid e-mail'
            }
        }catch(error){
            alert("there are a problem in server right now, please try later ")
        }

    }
    const hideError=(e)=>{
        let errors = document.getElementsByClassName('login-error');
        errors[0].style.opacity='0'
        errors[1].style.opacity='0'
    }
    useEffect(()=>{
        if(localStorage.getItem('isRemember')=='true'){
            email.current.value=localStorage.getItem('rememberEmail');
            Password.current.value=localStorage.getItem('rememberPassword');
        }else if(localStorage.getItem('isRemember')=='false'){
            email.current.value='';
            Password.current.value='';
        }
        layoutRef.current.style.opacity='1'
    })
    const rememberMe=(id,name)=>{
        if(remember.current.checked){
            localStorage.setItem('isRemember',true)
            localStorage.setItem('Email',email.current.value)
            localStorage.setItem('Password',Password.current.value)
        }else{
            localStorage.setItem('isRemember',false)
        }
        localStorage.setItem('Name',name)
        localStorage.setItem('userId',name)
    }
    const checkedHandler = ()=>{
        let alt =remember.current.getAttribute('alt');
        if(alt=="checked"){
            remember.current.setAttribute('alt','unChecked');
            remember.current.checked= false;
        }else{
            remember.current.setAttribute('alt','checked');
            remember.current.checked= true;   
        }
        
    }

    return (
       <div ref={layoutRef} className={`${styles.layout} w-full opacity-0`}>
         <div className={`${styles.login} `}>
            
            <Link to="/">
                <div className={styles.close}>&#x2715;</div>
            </Link>

            <div className={styles.bg}>
                <div className={styles.bgChild1}></div>
                <div className={styles.bgChild2}></div>
                <div className={styles.bgChild3}></div>
            </div>
            <div className={styles.loginDetails}>
                <div className={styles.title}>
                    <h1><span>Log</span> <span>In</span></h1>
                </div>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.user}>
                        <input onChange={hideError} ref={email} placeholder='e-mail..' className={`${styles.userName} ${styles.input}`} />  
                        <span className={`${styles.error} login-error`} ></span>    
                    </div>  
                    <div className={styles.pass}>
                        <input onChange={hideError} ref={Password} type='password' placeholder='password..' className={`${styles.password} ${styles.input}`} />      
                        <span className={`${styles.error} login-error`} ></span>
                    </div> 
                    <input className={styles.submit} type="submit" value="Log In" />
                </form>
                <div className={styles.rememberMe}  onClick={checkedHandler}>
                    <input ref={remember} type="checkbox" alt="unChecked" /><label > Remember  Me</label>
                </div>
                <div className={styles.forgetPass}>
                    <span className='font-sans cursor-pointer text-purple-100 hover:text-purple-400'>Forget Password..?</span>
                </div>
                <div className='text-left pt-5 underline w-auto underline-offset-6 '>
                    <Link to="/signup" className=' text-purple-100 hover:text-black'>or SignUP</Link>
                </div>

            </div>
        </div>

       </div>
    
    );
}
export default Login;
