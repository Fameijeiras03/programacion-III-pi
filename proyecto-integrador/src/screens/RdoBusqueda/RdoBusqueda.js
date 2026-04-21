import React, { Component } from 'react';
import Movies from "../../components/Movies/Movies";
import Series from '../../components/Series/Series';

class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargandoElementos: true,
            elementos: []
        };
    }

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/search/${this.props.match.params.tipo}?api_key=f9fed29318027d1571e2d4e385ce272d&query=${this.props.match.params.busqueda}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const elementosFiltrados = data.results.filter(elemento => elemento !== null && elemento !== undefined);
                this.setState({ elementos: elementosFiltrados, cargandoElementos: false })
            })
    }

    render() {
        return (
            <main className="container">
                <h1>UdeSA Movies</h1>

                {this.props.match.params.tipo === "movie" ?
                    <>
                        <h2>Resultados de películas para "{this.props.match.params.busqueda}"</h2>
                        {this.state.cargandoElementos ? <h1>Cargando...</h1> :
                            <div>
                                {this.state.elementos.map((elemento, idx) =>
                                    <Movies key={idx} results={elemento} />
                                )}
                            </div>
                        }
                    </>
                    :
                    <>
                        <h2>Resultados de series para "{this.props.match.params.busqueda}"</h2>
                        {this.state.cargandoElementos ? <h1>Cargando...</h1> :
                            <div>
                                {this.state.elementos.map((elemento, idx) =>
                                    <Series key={idx} results={elemento} />
                                )}
                            </div>
                        }
                    </>
                }
            </main>
        )
    }
}

export default Resultados