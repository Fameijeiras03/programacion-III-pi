import React,{Component} from "react";
import './Form.css';
import { withRouter } from "react-router-dom";

class  Form extends Component {
    constructor(props) {
        super(props);
        this.state = {valor:''};
    }
    evitarSubmit = (event) => {
        event.preventDefault();
        this.props.history.push('/RdoBusqueda/' + this.state.valor)
}
controlarCambios(event){
    this.setState({valor: event.target.value},
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