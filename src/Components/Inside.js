import React from "react";
import Navbar from "./Navbar";
import styles from "./Styles/Inside.module.css";
import Search from "./Search";

const Inside = (props) => {
const{toggle} = props;

  return (
    <>
      <Navbar />
      
      <Search toggle={toggle}/>
      
    </>
  );
};

export default Inside;
