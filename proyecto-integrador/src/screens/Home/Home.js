import React from "react";
import './Home.css';
import SectionMovies from "../../components/SectionMovies/SectionMovies";
import SectionMP from "../../components/SectionMP/SectionMP";
import SectionSeries from "../../components/SectionSeries/SectionSeries";
import SectionSOA from "../../components/SectionSOA/SectionSOA";
/**
 * 
 * hay que terminar esto, hay parte ya hecha, faltaria codear la parte de series y alguna que otra mas, pondria 4 ponele, es todo lo
 * mismo solo que con otra api
 */

function Home () {
    return (

            <div className="container hryhry">
                <SectionMovies/>
                <SectionMP/>
                <SectionSeries/>
                <SectionSOA/>
            </div>
    )
}
    
export default Home;