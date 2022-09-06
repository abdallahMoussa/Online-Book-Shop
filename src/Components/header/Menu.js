import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu= props =>{

   
    const clickHandler = (e)=>{
       
        if(e.target.title == 'Category'){
            let list = document.getElementById('category')
                list.style.display=='block'?list.style.display='none':list.style.display='block';
           
        }else{
            document.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');            
            document.getElementById('category').style.display='none';
        }
    }

    useEffect(()=>{

    })
    return <div className={`${styles.menu}`}>
        
            <nav className="flex sm:justify-center space-x-3 py-1 m-auto">
                {[
                    ['Home', '/'],
                    ['Sellars', '/Bestsellar'],
                    ['Store', '/Store'],
                    ['Blog', '/Blog']
                ].map(([title, url]) => {
                    return <div key={url} className={`${styles.menuList} relative`}>
                                <Link to={url}>
                                    <span  onClick={clickHandler}
                                        title={title}
                                        className={`${title=='Home'?'active':'nonActive'} px-3 py-2 text-slate-400 font-medium text-lg active:text-black hover:text-slate-600 duration-300`}>
                                    {title}</span>
                                </Link>
                    </div>                                
            })}
                <div className={`${styles.menuList} relative`}>
                     <span  onClick={clickHandler}
                            title={'Category'}
                            className={`cursor-pointer px-3 py-2 text-slate-400 font-medium text-lg active:text-black hover:text-slate-600 duration-300`}   
                        >Category
                    </span>
                    <div className={`${styles.category}`} id='category'>
                            <ul>
                                <li><a>History</a></li>
                                <li><a>Poetry</a></li>
                                <li><a>Horror</a></li>
                                <li><a>Romance</a></li>
                            </ul>
                    </div>
                </div>
            </nav>
           
        </div>
};

export default Menu;