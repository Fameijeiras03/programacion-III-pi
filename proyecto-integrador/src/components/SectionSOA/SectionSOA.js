import {useState,useEffect} from "react";
import Series from "../Series/Series";


function SectionSOA() {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then(response => response.json())
            .then(data => setSeries(data.results))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <h2 className="alert alert-warning">TV shows airing today</h2>
            <section className="row cards" id="on-air-today">
                {series.length === 0 ? (
                    <h3>Cargando...</h3>
                ) : (
                    series.slice(0,5).map((serie) => (
                        <Series
                            key={serie.id}
                            results={serie}
                        />
                    ))
                )}
            </section>
        </>
    );
}

export default SectionSOA;