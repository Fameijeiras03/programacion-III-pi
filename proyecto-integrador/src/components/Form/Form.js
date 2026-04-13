import React,{Component} from "react";

class  Form extends Component {
    constructor(props) {
        super(props);
        this.state = {valor:''};
    }
    evitarSubmit = (event) => {
        event.preventDefault();
}
controlarCambios(event){
    this.setState({valor: event.target.value},
    ()=> console.log(this.state.valor)) ;
}
render() {
    return(
        <form onSubmit={(event)=>this.evitarSubmit(event)}>
            <label>Name:</label>
            <input type='text' onChange={(event)=>this.controlarCambios(event)} value={this.state.valor}/>
            <input type='submit' value='Submit'/>
        </form>
    )
}
}


export default Form