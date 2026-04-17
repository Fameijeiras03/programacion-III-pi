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

            // <footer className="alert alert-primary mt-4 text-center">
            //     <p className="mb-0">Integrante 1 | Integrante 2 | Integrante 3</p>
            // </footer>

        // </>
    )
}
    
export default Home;