import {useState,useEffect} from "react";
import Series from "../Series/Series";

function SectionSeries () {
    const [series, setSeries] = useState([])
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13') /*Aca "llamo a la api" */
            .then( response => response.json())
            .then( data => setSeries(data.results)) /*Aca guardo la info de la api en el estado */
            .catch( error => console.log(error));
    }, [])
    return(
            <>
            <h2 className="alert alert-warning">Popular TV shows this week</h2>
            <section className="row cards" id="tv-show">
                {series.length === 0 ?
                <h3>Cargando...</h3> :
                series.slice(0,5).map((serie) => /*mapeo series (info de la api) y 
                llamo serie, serie toma valores que son cada una de las series */
                
                <Series
                    key = {serie.id}
                    results = {serie} /*La info que le pase al hijo va en reuslts por ende... */
                />
                )
                }
            </section>
            </>
        )
}

export default SectionSeries