import React,{Component} from "react";
import './Form.css';
import { withRouter } from "react-router-dom";

class  Form extends Component {
    constructor(props) {
        super(props);
        this.state = {valor:''};
    }
    evitarSubmit = (event) => {
        event.preventDefault(); /*Evita que se recargue la pagina al hacer submit, lo hace react despues
        para no cargar todo el navegador*/
        this.props.history.push('/RdoBusqueda/' + this.state.valor)
}
controlarCambios(event){
    this.setState({valor: event.target.value}, /*Es lo que hay escrito en el momento en el input */
    ()=> console.log(this.state.valor)) ;
}
render() {
    return(
        <form className="form-container" onSubmit={(event)=>this.evitarSubmit(event)}>
            <label>Buscar:</label>
            <input
                type='text'
                placeholder='Películas, series...'
                onChange={(event)=>this.controlarCambios(event)}
                value={this.state.valor}
            />
            <input type='submit' value='Buscar'/>
        </form>
    )
}
}


export default withRouter(Form)