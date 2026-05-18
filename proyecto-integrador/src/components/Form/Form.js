import { useState } from "react";
import './Form.css';
import { withRouter } from "react-router-dom";

function Form (props) {
    const [valor, setValor] = useState('');
    
    const evitarSubmit = (event) => {
        event.preventDefault(); /*Evita que se recargue la pagina al hacer submit, lo hace react despues
        para no cargar todo el navegador*/
        props.history.push('/RdoBusqueda/' + valor)
    }

    const controlarCambios = (event) => {
        setValor(event.target.value);
    }

    return(
        <form className="form-container" onSubmit={(event) => evitarSubmit(event)}>
            <label>Buscar:</label>
            <input
                type='text'
                placeholder='Películas, series...'
                onChange={(event) => controlarCambios(event)}
                value={valor}
            />
            <input type='submit' value='Buscar'/>
        </form>
    )
}

export default withRouter(Form)