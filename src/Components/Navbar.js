import React from 'react'
import styles from "./Styles/Navbar.module.css";
import etap from "./Images/etaplogo.png";


const Navbar = () => {
  return (
    <div className={styles.Navbar}>
        <img src={etap}  style={{width:"60px" , margin:"5.5px 2px"}}/>
    </div>
  )
}

export default Navbar