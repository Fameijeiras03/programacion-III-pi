import {useState,useEffect} from "react";
import { withRouter } from 'react-router-dom';

function Buscador() {
    const [busqueda, setBusqueda] = useState('');
    const [tipo, setTipo] = useState('');

    const controlarForm = (evento) => {
        evento.preventDefault();
        const path = tipo ? `/resultados/${busqueda}/${tipo}` : `/resultados/${busqueda}`;
        this.props.history.push(path);
    };

    const controlarInput = (evento) => {
        setBusqueda(evento.target.value);
    };

    const controlarRadio = (evento) => {
        setTipo(evento.target.value);
    };

    return (
        <form className="search-form" onSubmit={controlarForm} method="get">
            <input
                type="text"
                name="searchData"
                placeholder="Buscar..."
                value={busqueda}
                onChange={controlarInput}
                required />
            <label>
                <input type="radio" name="tipo" value="movie" onChange={controlarRadio} required /> Películas
            </label>
            <label>
                <input type="radio" name="tipo" value="tv" onChange={controlarRadio} required /> Series
            </label>
            <button type="submit" className="botonBuscar">Buscar</button>
        </form>
    );
}

export default withRouter(Buscador);