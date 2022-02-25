/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Home.module.css'
import { useState } from 'react';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DataContainer(props) {   
    
    
    async function deleteData(param){   

        await fetch("https://app-agenda-backend.herokuapp.com/agenda", {
            method: "DELETE",
            headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: param
                })
        })
                     
            
        
    }


    return(
        <>          
                
            <li key={props.i} className={styles.userData}>
                <img className={styles.avatar} src={`https://app-agenda-backend.herokuapp.com/uploads/${props.imagePath}`} alt="avatar" />
                <div className={styles.info}>
                <span ><AccountCircleIcon /> nome: </span>
                <p>{props.name}</p>
                </div>            
                <div className={styles.info}>
                <span ><PhoneIcon /> telefone: </span>
                <p>({props.phoneDDD}) {props.phoneNumber}</p>
                </div>            
                <div className={styles.info}>
                <span ><EmailIcon /> email: </span>
                <p>{props.email}</p>
                </div>            
                        
                
                <button><EditIcon className={styles.icon} onClick={ () => {
                        props.buttonEditInfo(
                            props.id,
                            props.imagePath,
                            props.name,
                            props.phoneDDD,
                            props.phoneNumber,
                            props.email
                                       
                                       
                                       )}}  />
                                       </button>            
                <button><DeleteIcon className={styles.icon} onClick={() => deleteData(props.id)} /> </button>            
            </li>
                
            
        </>
    )

}