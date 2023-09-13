"use client"
import axios from 'axios'
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import relatorio from './Relatorios/relatorio'
interface Nomes {
valores :string
}

export default function Home() {
  const [valores, setValores] = useState<any>({});
  useEffect(() => {
    let lista: { patrimonio: string; descricao: string; motivo: string; serie: string; }[] =[]
      axios.get('http://localhost:3333/equipamentos').then(response => {
      const res = response.data
      const teste = res.map((items: { patrimonio:string, descricao:string ,motivo:string ,serie:string})=>{
        lista.push({
          patrimonio:items.patrimonio,
          descricao:items.descricao,
          motivo:items.motivo,
          serie:items.serie
        })
      })
    
      setValores(lista);
    })
}, []);
  
  return (
    <main className={styles.main}>
     <button onClick={(e)=> relatorio(valores)}>Click aqui</button>
     
    </main>
  )
}
