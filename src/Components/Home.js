import React from 'react';
import { useState } from 'react';
import styles from "./Styles/Home.module.css";
import Inside from './Inside';


function Home() {
    
    const[show, setShow] = useState(false);

    const toggle =()=>{
        setShow(!show);
      
      
    }
  

  return (
   <>
    
     { show ? <Inside toggle={toggle}/> :( <div className={styles.container}>
     <div className={styles.overlay}>IGE+XAO.INDIA</div> 
    <button className={styles.overlay1} onClick={toggle}>Welcome</button>
    </div>)}
       
    </>
   
    
  );
}

export default Home;


