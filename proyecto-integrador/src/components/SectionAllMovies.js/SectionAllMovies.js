import {useState,useEffect} from "react";
import Movies from "../Movies/Movies";


function SectionAllMovies() {
    const [allMoviesList, setAllMoviesList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then(response => response.json())
            .then(data => setAllMoviesList(data.results))
            .catch(error => console.log(error));
    }, []);

    const loadMoreMovies = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&page=${page + 1}`)
            .then(response => response.json())
            .then(data => {
                setAllMoviesList(prevState => [...prevState, ...data.results]);
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <h2 className="alert alert-primary">Todas las películas</h2>
            <section className="row cards" id="movies">
                {allMoviesList.length === 0 ? (
                    <h3>Cargando...</h3>
                ) : (
                    allMoviesList.map((movie) => (
                        <Movies
                            key={movie.id}
                            results={movie}
                        />
                    ))
                )}
                <button className="btn btn-info" onClick={loadMoreMovies}>Mas Peliculas</button>
            </section>
        </>
    );
}

export default SectionAllMovies;
