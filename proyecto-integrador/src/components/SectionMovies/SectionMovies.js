import {useState,useEffect} from "react";
import Movies from "../Movies/Movies";


function SectionMovies() {
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then( response => response.json())
            .then( data => setMovies(data.results))
            .catch( error => console.log(error));
        },[])
        return(
            <>
            <h2 className="alert alert-primary">Popular Movies This Week</h2>
            <section className="row cards" id="movies">
                {movies.length === 0 ?
                <h3>Cargando...</h3> :
                movies.slice(0,5).map((movie) => 
                
                <Movies
                    key = {movie.id}
                    results = {movie}
                />
                )
                }
            </section>
            </>
        )
    }

export default SectionMovies;