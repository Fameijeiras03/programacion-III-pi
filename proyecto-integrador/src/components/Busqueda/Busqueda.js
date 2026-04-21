import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Buscador extends Component {
    constructor(props) {
    super(props)
    this.state = {
    busqueda: '',
    tipo: ""
    };
}

controlarForm(evento) {
    evento.preventDefault();
    const texto = this.state.busqueda;
    const tipo = this.state.tipo;
    const path = tipo ? `/resultados/${texto}/${tipo}` : `/resultados/${texto}`;
    this.props.history.push(path);
};
controlarInput(evento) {
    this.setState({ busqueda: evento.target.value })
};

controlarRadio(evento)  {
    this.setState({ tipo: evento.target.value });

};

render() {
    return (
    <form className="search-form" onSubmit={(evento) => this.controlarForm(evento)} method="get">
        <input
        type="text"
        name="searchData"
        placeholder="Buscar..."
        value={this.state.busqueda}
        onChange={(evento) => this.controlarInput(evento)} required />
        <label><input type="radio" name="tipo" value="movie" onChange={(evento) => this.controlarRadio(evento)} required /> Películas</label>
        <label><input type="radio" name="tipo" value="tv" onChange={(evento) => this.controlarRadio(evento)} required /> Series</label>
        <button type="submit" className="botonBuscar">Buscar</button>
    </form>
    );
}
}

export default withRouter(Buscador);