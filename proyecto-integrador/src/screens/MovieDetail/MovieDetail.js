import React from "react";


function MovieDetail () {

    return (
        //traer el detallle de la pelicula con su id matchparams
        <div>
            <p>Aca estaria el detalle de la pelicula</p>
            
        </div>
    )
}

export default MovieDetail

/* ej con el de rick y morty
class UnPersonaje extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.json())
            .then(data => this.setState({ data }))
            .catch(error => console.log(error));
    }

    render() {
        let data = this.state.data;
        return (
            <div className="character-card">
                <img src={data.image} alt={data.name} />
                <h2>{data.name}</h2>
                <p>{data.status}</p>
                <p>{data.species}</p>
                <p>{data.gender}</p>
                <button>Agregar a favoritos</button>

            </div>
        );
    }
}
 */

