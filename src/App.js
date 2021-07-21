//  https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search

import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario/formulario'
import axios from 'axios';
import Cancion from './components/Cancion/cancion';
import Info from './components/Info/info';

function App() {

  // Definir State
  const [busquedaLetra, guardarBusquedaLetra] = useState({}); // State para la búsqueda
  const [letra, guardarLetra] = useState(''); // State para la letra
  const [info, guardarInfo] = useState({}); // State para la informacion del artista

  useEffect(() => {
    if(Object.keys(busquedaLetra).length === 0) return;
 
    const consultarApiLetra = async () => {
      const {artista, cancion} =  busquedaLetra;
      const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlArtista = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios(urlLetra),
        axios(urlArtista)
      ]);


      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    }
    consultarApiLetra();
  }, [busquedaLetra, info])

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info}/>        
          </div>
          <div className="col-md-6">
            <Cancion letra={letra}/> 
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
