"use client"
import axios from 'axios'
import styles from './page.module.css'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState } from 'react';
import relatorio from './Relatorios/relatorio'

export default function Home() {
  const[valores,setValores] = useState([])
  
  return (
    <main className={styles.main}>
     <button onClick={(e)=> relatorio()}>Click aqui</button>
     
    </main>
  )
}
