import React, { useState, useContext, useEffect} from "react";
import "./Comentario.css";
 const Comentario = ({medico}) => {
    const [comentarios, setComentarios] = useState([])

    useEffect(() => {
        setComentarios(medico.comentarios)
     },[])

    if(!comentarios){
        return (
            <div>
                No hay Comentarios
            </div>
             )
        }

    return(

        <div>
            {comentarios.map((comentario) => {
                return(
                    <div className="casillaComentarios">
                        <p>Anonimo</p>
                        <p>{comentario}</p>
                     </div>
                    )
                })}
        </div>
        )
    }


export default Comentario