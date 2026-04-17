import React, {Component} from "react";
import SeriesCard from "../SeriesCard/SeriesCard";


class SectionSeries extends Component {
    constructor (props) {
        super(props)
        this.state = {series: []}
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then( response => response.json())
            .then( data => this.setState(
                {series: data.results}
            ))
            .catch( error => console.log(error));
    }
    

    render(){
        return(
            <>
            <h2 className="alert alert-warning">Popular TV shows this week</h2>
            <section className="row cards" id="tv-show">
                {this.state.series.length === 0 ?
                <h3>Cargando...</h3> :
                this.state.series.slice(0,5).map((serie) => 
                
                <SeriesCard
                    key = {serie.id}
                    results = {serie}
                />
                )
                }
            </section>
            </>
        )
    }
}

export default SectionSeries