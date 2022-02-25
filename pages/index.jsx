/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import DataContainer from '../components/DataContainer'
import { useEffect } from 'react'
import FormUpdate from '../components/formUpdate'










export default function Home() {
  const [id, setId] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [imageName, setImageName] = useState('')
  const [name, setName] = useState('')
  const [phoneDDD, setPhoneDDD] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  
  const [editForm, setEditForm] = useState(false)

  const [agenda, setAgenda] = useState()

  function cutName(param){
      
      
      param.length >= 8 ? reduceString(param) : setImageName(<p><span>Arquivo: </span>{param}</p>)

      function reduceString(param){
        
        let imageReduce = ''
        for (let i = 0; i <= 20; i++) {
          param.length === i ? i = 20 : imageReduce += param[i]
          
          
        }
        
       setImageName(<p><span>Arquivo: </span>{imageReduce.length > 20 ?  imageReduce + "..." : imageReduce}</p> )
      }       
  }

  useEffect( () => {
    isNaN(phoneDDD) && setPhoneDDD('')
    isNaN(phoneNumber) && setPhoneNumber('') 


  }, [phoneDDD, phoneNumber] )

  useEffect(() => {
   
    fetch('https://app-agenda-backend.herokuapp.com/agenda')
    .then(res => {
      if(!res.ok) {throw res}
      return res.json()
    })    
    .then(data => setAgenda(data))   
    
 

    
  }, [agenda])

  function buttonEditInfo(id, imagePath, name, phoneDDD, phoneNumber, email){
    setId(id)
    setImagePath(imagePath)
    setName(name)
    setPhoneDDD(phoneDDD)
    setPhoneNumber(phoneNumber)
    setEmail(email)

    setEditForm(true)
  }
  
  function renderData(agenda) {
    if(agenda){
      return agenda.map((item, i) => {
        return ( 
          <DataContainer 
             key={i}
             id={item.id}
             imagePath={item.imagePath}
             name={item.name}
             phoneDDD={item.phoneDDD}
             phoneNumber={item.phoneNumber}
             email={item.email}

             buttonEditInfo={buttonEditInfo}
             />
        ) 
       })
    }   
    
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Agenda</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className={styles.formContainer}>
                <form action="https://app-agenda-backend.herokuapp.com/" method="post" encType='multipart/form-data'>
                <img className={styles.formImage} src='/imgs/avatarUpload.png' alt="Upload Image"/>
                <div className={styles.imagePath}>{imageName}</div> 
                <label className={styles.uploadLabel} htmlFor='file' >Selecionar Foto</label>
                <input className={styles.uploadInput } type="file" id='file' name='file' accept="image/png, image/jpeg" onChange={ e => cutName(e.target.files[0].name)} />
                
                <label className={styles.label} htmlFor='name'>nome:</label>
                <input className={styles.input} id='name' type="text" name='name' placeholder='nome' value={name} onChange={(e) => {setName(e.target.value)}}  />
                
                  <label className={styles.label} htmlFor='telefone'>telefone:</label>
                <div className={styles.inputPhone}>
                  <input className={styles.inputPhoneDDD} id='telefone' type="text" name='phoneDDD' maxLength={2} placeholder="DDD" value={phoneDDD} onChange={(e) => {setPhoneDDD(e.target.value)}}/>
                  <input className={styles.inputPhoneNumber} id='telefone' type="text" name='phoneNumber' maxLength={9} placeholder="99999.9999" value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                </div>
                
                <label className={styles.label} htmlFor='email'>email:</label>
                <input className={styles.input} id='email' type="email" name='email' value={email} placeholder="e-mail" onChange={(e) => {setEmail(e.target.value)}}/>
                <button className={styles.formBtn} type="submit">Cadastrar</button>
                </form>
            </div>
            <div className={styles.dataContainer}>

              <div className={styles.dataContainerSpace}></div>
              <ul className={styles.ul}>
                {renderData(agenda)}
              </ul>
              
            </div>
      </main>
            <FormUpdate editForm={editForm} form={setEditForm} id={id} imagePath={imagePath} name={name} phoneDDD={phoneDDD} phoneNumber={phoneNumber} email={email} />

      <footer className={styles.footer}>
       
      </footer>
    </div>
  )
}
