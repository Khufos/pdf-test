import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';



const date = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();
let origem = "";
let responsavel = ''
let local = ''
let resorigem = ''
let resresponsavel = ''
let reslocal = ''

interface Item {
  id:string
  patrimonio:string
  descricao:string
  motivo:string
  serie:string

  itens: any[]; 
  relatorio: string;
  dados: any[]; 
}

async function relatoriosPDF(relatorio: Item[]) {
  const dados = relatorio.map((item: {patrimonio:string, descricao:string,motivo:string, serie:string}) => {
    return [
      {text: item.patrimonio},
      {text:item.descricao},
      {text:item.motivo},
      {text:item.serie}

    ];
  });
 
  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  
  const details = [
     
{ 
  image:'building',
  width:50,
  height:50,
  alignment: 'center',
   
},

 {
  text: 'Defensoria Pública do Estado da Bahia ' ,
  alignment: 'center',
  margin:[0, 10, 0, 0]
 },
 {
  text: 'Coordenação de Modernização e Informática',
  alignment: 'center',
  margin:[0, 2, 0, 0],
  fontSize: 9,
 },
 {
  text: 'Data de Movimentação:' + date  +  ' Hora: ' + hora ,
  alignment: 'center',
  bold:true,
  fontSize: 9,
  margin:[0, 5, 0, 0]
 }, 
 {
  text: 'MOVIMENTAÇÃO DE EQUIPAMENTOS',
  alignment: 'center',
  bold:true,
  fontSize: 15,
  margin:[0, 5, 0, 0]
 },

 {
  margin:[0, 10, 0, 0],
  fontSize:11,
  text: [
      { text: 'Origem:', style: 'header', bold: true },' '+ origem +'\n',
      { text: 'Responsavel de Origem :', style: 'header', bold: true , margin:[13, 40, 0, 0]},' '+ responsavel+'\n',
      { text: 'local de Origem:', style: 'header', bold: true },' '+ local
  ]
},
{   
  margin:[0, 5, 0, 0],
  fontSize:11,
  text: [
      { text: 'Destino:', style: 'header', bold: true },' '+ resorigem +'\n',
      { text: 'Responsavel de Destino :', style: 'header', bold: true , margin:[13, 40, 0, 0]},' '+ resresponsavel+'\n',
      { text: 'local de Destino:', style: 'header', bold: true },' '+ reslocal
  ]
},





  {
      fontSize: 9,
      margin:[0, 10, 0, 0],
      table: {
          headerRows: 1,
          widths:['*','*','*','*'],
          body: [
             
             [
              {text:'patrimonio',style:'tableHeader',fontSize:10 ,bold:true},
              {text:'descricao',style:'tableHeader',fontSize:10 ,bold:true},
              {text:'motivo',style:'tableHeader',fontSize:10 ,bold:true},
              {text:'serie',style:'tableHeader',fontSize:10 ,bold:true},

              
             ],
            ...dados
            ]
            
      },
      layout: 'headerLineOnly'
  },
  {
      margin:[0, 0, 0, 0],
      absolutePosition: { x: 40, y: 670},
      alignment:'justify',
      fontSize:11,
      text: [
          {text:'____________________________________________________________________________________________________\n'},
          {text:'Certifico que recebi os bens patrimonias descritos neste documento,comprometendo-me integralmente com a responsablidade pela sua custódia e preservação.', style: 'header', bold: true,fontSize:9 },
      ]
  },
  
     {
      fontSize:7,
      alignment:'left',
      absolutePosition: { x: 40, y: 750 },
      text: [
          {text:'________/________/________\n\n',margin: [0, 0,0,0]},
          {text:'___________________________\n'},
          {text: 'Ass:Responsável Origem', style: 'header', bold: true,fontSize:9 },
      ]
  },
  {
      fontSize:7,
      absolutePosition: { x: 310, y: 750 },
     
      text: [
          {text:'________/________/________\n\n',},
          {text:'___________________________\n'},
          {text: 'Ass:Transporte', style: 'header', bold: true,fontSize:9, alignment:'left' },
      ]
  },
  {
      fontSize:7,
      absolutePosition: { x: 440, y: 750 },
      text: [
          {text:'________/________/________\n\n'},
          {text:'___________________________\n'},
          {text: 'Ass:Responsável Destino', style: 'header', bold: true,fontSize:9},
      ],
  },
  
  {
      fontSize:7,
      absolutePosition: { x: 180, y: 750 },
      

      text: [
          {text:'________/________/________\n\n'},
          {text:'___________________________\n'},
          {text: 'Ass:Expedidor', style: 'header', bold: true,fontSize:9 },
      ]
  },
  


];
const images: { [key: string]: string } = {
  building:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAB NCAYAAAAxWePoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAATdEVYdFNvZnR3YXJlAFBob3RvU2NhcGWAdZG/AAAFB0lEQVR4Xu2cTYgcRRiGe2aqaiZBcwoqRtGDiOBJBBU99HRVTVzEH1Djwb+A4ILTVTXuLhFEdPUkIiLGRJTkEjDKgnpQEBSNevIQLzFGBY9ZSBQEg4qSQ2LV9Lfb29M12z1/7ex0PfAyy+5Mf18/29NdNd3TXpfl5SqWwWMk5EdqbXa4Jug7U5FuL8EB0qEv1CWTRNIHkaC3ePtuvzRqfDqo4JAdqyt+sdGZzpjeevInCem3WPH9pNPa4y36O2Fdikf/V5+zNLjVch6FzY+rneBxT87tgFUrBiLYN5aGtmQaqqUf6Tms6H5vwb8OVnGyoJD/bGtmK6cBQYqueCG7HlZ1MmiBp2xNzEKiLZJf1FvkG9783dthlccLkfyH3sKzFrM16oPObzVJ74HVHh9lELgxep9/SK92JVr7MVA2gWZr1GPMk94C3QUKRqNsAk3WjtZI8ttAw/CUUWAignFQMRylF6j4hXrI7wQdg+MEdnOBqOAuUDIYTiBEsn+G2ic6gXGQ4qe9pdZloCYfTmAyWLHPQE0+nMBkzDgRq9ZLoCcbJ9AeLNlNoGhznEB7sOSfg6LNcQLtMbOVqmruBU39cQLt6X6eKOiP3rJXBVV2nMD+MRKrneAJUGXHCdw8eobyPaiy4wRmhwh+P+hKU7RA22nLScVWf5ggwT4CXWmKFIhl8BUW7PWaYIcmHRyyt4mgK1jQL4hgJ+qC/mXrKV+Cf7eF/EpQlqRIgdU2fwjKFo+c24FE8w4tdclI1f2cNweJ3h77RR+RBSwpSbFbIHsEyv7vbG/7VyAZPKvfnqtrZ+/6JRrS8PfhpUkKFSjoo1B2ejDXBalgHiv6q63n9Qj6u/WanNILXKPtX6L3zwdMn/3e2qjdvBWeHeMEJqnJYLce+/1h6x9JtghPi3ECLSzQXXXBT2zs3ewna5IehGfEOIF92Os3iKJfJ/qX/FP4a4wTuAlyrm62xPV9ov4Z/hLjBGbQDq7RB5ezRiIW/Gzq+kMnMJua9OcaMhorbuu9JMQJzAcJ+UGzFTYWd18Nv4qYYoEVPXN5U++4P0GSHh0qevaAwuBdrNiresbRxk8HN8KyB2fe34kU/Sl1rmSaBRLB9TQrGtiOkp4+Tukp3FPe/M0Y6uSmppoPbCmBeqe9alvOqDFjOjMHrkk2B7WGp4wC47T02I6+DPWGo9wCoxBB34Kag+MERsEhexHqDoYTGKcWNge/TtAJjENCenLgo7MTmAxWreyrETbiBCYz1Ze3bQWBRNFz9Y5/LfSQjROYDpHsPughGycwHSSZhB6ycQLTwSJ4DXrIxglMx5ydgx6ycQLTQYI+Az1k4wQmE12ZGjwMPWTjBKaT+wJzgxMYx3z4ShT7DurnwwmMYwQiRZegfj6cwDhY8TOeopdD/Xw4gVG6H/OHtAO18+MErp8j6X8Z72aUXWB01q513Fv2EdQdjLILNHdu8vbdO/zNzMoo0LxlzSNWA8x5+1FGgXqo8qEn/BugzmjMtkD6N5LsF/14nCi6UhdceNK/CpY/HmZZoB7XHYNlTY7ZFsi+hGVNDidwRJzAEXECR8QJHJEi72A5qwILu4fqbL6FC7yL76wKfN5WfBKZSYHmYxyzFZoJtu1r8+OMFvIkVM1DRR/gVm3LyZ1CBBqW9xD935pHkh6JvjJvua/9KGmzw0jQo3oeOsjt5Sq4zV5BIXvPusyM6Hof6Nemv105VjzvP/yhkZhyQzwnAAAAAElFTkSuQmCC'
}

    

interface v {
  dados:[]
}

  const docDefinitios:any = {
    pageSize: "A4",
    images:images,
    content: details,
    dados:dados
     
  };
  const pdf = await pdfMake.createPdf(docDefinitios)
  pdf.open({}, window.open('', '_blank'));

}

export default relatoriosPDF;





