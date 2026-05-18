import {useState,useEffect} from "react";
import {Link} from "react-router-dom"

function FavoritesCards(props){
    const [item, setItem] = useState(props.item);
    const [titulo, setTitulo] = useState(item.titulo);
    

    return(
        
        <article className="single-card-movie">
            <h3>{titulo}</h3>


            <Link to= "/movidetail">Ver detalle</Link>

            <button onClick={()=>props.eliminar(item.id)}>Eliminar de favoritos</button>


        </article>
    );
}

export default FavoritesCards;