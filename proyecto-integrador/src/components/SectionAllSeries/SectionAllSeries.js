import {useState,useEffect} from "react";
import Series from "../Series/Series";


function SectionAllSeries() {
    const [allSeriesList, setAllSeriesList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13')
            .then(response => response.json())
            .then(data => setAllSeriesList(data.results))
            .catch(error => console.log(error));
    }, []);

    const loadMoreSeries = () => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=e6ab0746b9dd21afaaa10cb1e2ec2d13&page=${page + 1}`)
            .then(response => response.json())
            .then(data => {
                setAllSeriesList(prevState => [...prevState, ...data.results]);
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <h2 className="alert alert-warning">Todas las series</h2>
            <section className="row cards" id="movies">
                {allSeriesList.length === 0 ? (
                    <h3>Cargando...</h3>
                ) : (
                    allSeriesList.map((series) => (
                        <Series
                            key={series.id}
                            results={series}
                        />
                    ))
                )}
                <button className="btn btn-info" onClick={loadMoreSeries}>Mas Series</button>
            </section>
        </>
    );
}

export default SectionAllSeries;