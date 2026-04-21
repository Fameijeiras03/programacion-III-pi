import React from "react";
import {Link} from "react-router-dom"

function FavoritesCards(props){
    let item = props.item;
    let titulo = item.titulo;

    return(
        <article className="single-card-movie">
            <h3>{titulo}</h3>

            <Link to= "/movidetail">Ver detalle</Link>

            <button onClick={()=>props.eliminar(item.id)}>Eliminar de favoritos</button>


        </article>
    );
}

export default FavoritesCards;