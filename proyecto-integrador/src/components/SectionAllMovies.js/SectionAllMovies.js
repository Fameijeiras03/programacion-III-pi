import React, {Component} from "react";
import Movies from "../Movies/Movies";


class SectionAllMovies extends Component {
    constructor (props) {
        super(props)
        this.state = {AllMoviesList: [], page: 1}
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then( response => response.json())
            .then( data => this.setState(
                {AllMoviesList: data.results}
            ))
            .catch( error => console.log(error));
    }
    cargarMasPeliculas(){
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&page=${this.state.page + 1}`)
        .then( response => response.json())
        .then( data => this.setState(
            {
                AllMoviesList: this.state.AllMoviesList.concat(data.results),
                page: this.state.page + 1

            },
        ))
        .catch(error => console.log(error))
    }

    

    render(){
        return(
            <>
            <h2 className="alert alert-primary">Todas las películas</h2>
            <section className="row cards" id="movies">
                {this.state.AllMoviesList.length === 0 ?
                <h3>Cargando...</h3> :
                this.state.AllMoviesList.map((movie) => 
                
                <Movies
                    key = {movie.id}
                    results = {movie}
                />
                )
                }
                <button className="btn btn-info" onClick={() => this.cargarMasPeliculas()}>Mas Peliculas</button>
            </section>
            </>
        )
    }
}

export default SectionAllMovies;