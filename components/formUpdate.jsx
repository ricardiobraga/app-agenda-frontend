import { useState } from "react"
import styles from '../styles/Home.module.css'

export default function FormUpdate(props){

  const [imagePath, setImagePath] = useState('')
  const [name, setName] = useState("props.name")
  const [phoneDDD, setPhoneDDD] = useState(props.phoneDDD)
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
  const [email, setEmail] = useState(props.email)

  



    const [arquivo, setArquivo] = useState()
   
   async function updateData(param){
        console.log(param)
        const formData = new FormData()
        
        
        if(param && name && phoneDDD && phoneNumber && email){
        formData.append('myFile', param[0])
        formData.append('id', props.id) 
        console.log("aqui: ",param[0].mozFullPath);
        
        try {
              await fetch('https://app-agenda-backend.herokuapp.com/updateInfo', {
              method: 'PUT',            
              headers: { 'Content-Type': 'application/json'},                        
              body: JSON.stringify({
                id: props.id,
                imagePath: param[0].name,
                name: name,
                phoneDDD: phoneDDD,
                phoneNumber: phoneNumber,
                email: email
               })           

              })         
              .then(res => res.json())
            
             await fetch('https://app-agenda-backend.herokuapp.com/updateImage', {           
              method:"POST",                  
              body: formData         
             })
             //.then(location.reload())

            } catch (err) {
              console.log(err);
            }           
         
        }else {
          alert("todos os campos devem ser preenchidos")
        }  


        

    
  }

  function updateImage(formData) {
     fetch('https://app-agenda-backend.herokuapp.com/updateImage', {           
      method:"POST",                  
      body: formData         
     })
     .then(alert("Cadastro Atualizado")) 
     
  }

  function updateInfo(param){
    fetch('https://app-agenda-backend.herokuapp.com/updateInfo', {
      method: 'PUT',            
      headers: { 'Content-Type': 'application/json'},                        
      body: JSON.stringify({
        id: props.id,
        imagePath: param[0].name,
        name: name,
        phoneDDD: phoneDDD,
        phoneNumber: phoneNumber,
        email: email
       })           
       
     })         
     .then(res => res.json())
     .then(fetch('https://app-agenda-backend.herokuapp.com/updateImage', {           
      method:"POST",                  
      body: formData         
     }))  
  }




   
   
    return( 
        <>
           <div className={props.editForm ? styles.formContainerUpdate : styles.hideComponent}>
                <form action="/" method="post" encType='multipart/form-data'>
                <button type="button" className={styles.btnClose } onClick={() => props.form(false) }>X</button>
                <img className={styles.formUpdateImg} src={`https://app-agenda-backend.herokuapp.com/uploads/${props.imagePath}`} alt="Upload Image"/>
                
                <label className={styles.uploadLabel} htmlFor='arquivoForm' >Selecionar Foto</label>
                <input className={styles.uploadInput } type="file" id='arquivoForm' name='arquivo' accept="image/png, image/jpeg" onChange={ e => setArquivo(e.target.files)} />
                
                <label className={styles.label} htmlFor='nameForm'>nome:</label>
                <input className={styles.input} id='nameForm' type="text" name='name' placeholder={props.name} value={name} onChange={(e) => {setName(e.target.value)}} />
                
                  <label className={styles.label} htmlFor='telefoneForm'>telefone:</label>
                <div className={styles.inputPhone}>
                  <input className={styles.inputPhoneDDD}  type="text" name='phoneDDD' maxLength={2} placeholder={props.phoneDDD} value={phoneDDD} onChange={(e) => {setPhoneDDD(e.target.value)}}/>
                  <input className={styles.inputPhoneNumber}  type="text" name='phoneNumber' maxLength={9} placeholder={props.phoneNumber} value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                </div>
                
                <label className={styles.label} htmlFor='emailForm'>email:</label>
                <input className={styles.input} id='emailForm' type="email" name='email' value={email} placeholder={props.email} onChange={(e) => {setEmail(e.target.value)}}/>
                <button className={styles.formBtn} type="button" onClick={() => updateData(arquivo)}>Atualizar</button>
                </form>
            </div>
        </>
    )
}