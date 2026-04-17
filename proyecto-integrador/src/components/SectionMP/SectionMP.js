import React, {Component} from "react";
import Movies from "../Movies/Movies";


class SectionMP extends Component {
    constructor (props) {
        super(props)
        this.state = {movies: []}
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then( response => response.json())
            .then( data => this.setState(
                {movies: data.results}
            ))
            .catch( error => console.log(error));
    }
    

    render(){
        return(
            <>
            <h2 className="alert alert-primary">Movies now playing</h2>
            <section className="row cards" id="now-playing">
                {this.state.movies.length === 0 ?
                <h3>Cargando...</h3> :
                this.state.movies.slice(0,5).map((movie) => 
                
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
}

export default SectionMP