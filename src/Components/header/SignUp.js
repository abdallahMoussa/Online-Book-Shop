import styles from './SignUp.module.css';
import {useEffect, useRef } from 'react';
import { Link , useNavigate  } from 'react-router-dom';

const SignUp = (props)=>{

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confPass = useRef();
    const layoutRef = useRef();
    const Navigate  = useNavigate()

    const handleSubmit = e =>{
        e.preventDefault();
        let errors = document.getElementsByClassName('error');
        let numberPattern = /[0-9]/
    //validity checking

    // name validity
        numberPattern.test(name.current.value)?
        errors[0].innerHTML='* invalid name, remove numbers':
        name.current.value.length<6 ?
            (errors[0].innerHTML='* name too short'):
            (errors[0].innerHTML='<i> &#10003;</i>');
    //email validity
        if(email.current.value.includes('@')){
            emailExist(email.current.value)
        }else{
            errors[1].innerHTML='* invalid e-mail'
        }
            
    // password validity
        password.current.value.length>7?
            (errors[2].innerHTML='<i> &#10003;</i>'):
            ( errors[2].innerHTML='* password too short');

        confPass.current.value==password.current.value&& password.current.value!=''?
            (errors[3].innerHTML='<i> &#10003;</i>'):
            ( errors[3].innerHTML='*  doesn`t match');

    //commit validtity         
        setTimeout(()=>{
            if(Array.from(errors).filter(e=>{return e.children.length>0}).length==4){
                let user = {
                    name:name.current.value,
                    email:email.current.value,
                    password:password.current.value
                }
                addUser(user)
                   
            }
        },500)
    }
    async function emailExist(email){
        let errors = document.getElementsByClassName('error');
        const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/users.json',{
            method: 'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.ok){
            let exist = false;
            const data = await response.json();
            for(let key in data){
                if(data[key]['email'] == email){
                    exist = true
                    errors[1].innerHTML='* email allready exist'
                }
            }
            !exist&&(errors[1].innerHTML='<i> &#10003;</i>')
        }
    }

    async function addUser(user){
        const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/users.json',{
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(response.ok){
            props.Login(true);
            localStorage.setItem('Name',name.current.value)
            localStorage.setItem('userId',name.current.value)
            setTimeout(() => {
                Navigate('/')
            }, 1000);  
        }else{
            alert("there are a problem right now, please try later")
        }
    
    }

    useEffect(()=>{
        layoutRef.current.style.opacity='1'
    },[])

    return (
        <div ref={layoutRef} className={`${styles.layout} opacity-0`}>
            <div className={`${styles.signUp} `}>
                <Link to='/'>
                    <div className={styles.close}>&#x2715;</div>
                </Link>
                
                <div className={styles.bg}>
                    <div className={styles.bgChild1}></div>
                    <div className={styles.bgChild2}></div>
                    <div className={styles.bgChild3}></div>
                </div>
                <div className={styles.SignDetails}>
                    <div className={styles.title}>
                        <h1><span>Sign</span> <span>Up</span></h1>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.SignForm}>
                    <div className={styles.fullName}>
                            <input ref={name} className={`${styles.input}`} placeholder="Full Name.." />  
                            <span className={`${styles.error} error`} ></span>    
                        </div>
                        <div className={styles.email}>
                            
                            <input ref={email} className={` ${styles.input}`} placeholder="Email.." />  
                            <span className={`${styles.error} error`} ></span>    
                        </div>
                        <div className={styles.password}>
                           
                            <input ref={password} className={` ${styles.input}`} placeholder="Password.." />  
                            <span className={`${styles.error} error`} ></span>    
                        </div> 
                        <div className={styles.password}>
                           
                            <input ref={confPass} className={` ${styles.input}`} placeholder="Confirm Password..." />  
                            <span className={`${styles.error} error`} ></span>    
                        </div>
                        <div className='text-left text-purple-600 underline -left-1 -bottom-8 relative hover:text-purple-200 duration-300'>
                            <Link to="/login">I Have Account</Link>
                        </div>
                        
                        <input className={styles.submit} type="submit" value="Sign Up"  />
                    </form>

                </div>
            </div>
        </div>
    );
}

export default SignUp;