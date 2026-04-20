import React, {Component} from "react";
import Cookies from "universal-cookie";
import Favoritos from "../../components/FavoritesCards/FavoritesCards";
import NotFound from "../../NotFound/NotFound";
import Login from "../Login/Login";



class Favorites extends Component{
    constructor(props){
        super(props);
        this.state ={
            favoritesMovies: [],
            favoritesSeries: []
        };
    }

    componentDidMount(){
        let favoritesMovies =[];
        let favoritesSeries = [];

        if (localStorage.getItem("favoritesMovies") !== null){
            favoritesMovies = JSON.parse(localStorage.getItem("favoritesMovies"));
        }

        if (localStorage.getItem("favoritesSeries") !== null){
            favoritesSeries = JSON.parse(localStorage.getItem("favoritesSeries"));
        }

        this.setState({
            favoritesMovies :favoritesMovies,
            favoritesSeries: favoritesSeries
        });

    }

    eliminarFavoriteMovie(id){
        let updateMovies = this.state.favoritesMovies.filter( movie => movie.id !== id);

        localStorage.setItem("favoritesMovies", JSON.stringify(updateMovies));

        this.setState({
            favoritesMovies: updateMovies,
        });

    }

    eliminarFavoriteSerie(id){
        let updateSeries = this.state.favoritesSeries.filter (serie => serie.id !== id);

        localStorage.setItem("favoritesSeries", JSON.stringify(updateSeries));

        this.setState({
            favoritesSeries:updateSeries,
        });
    }

    render(){ //VER NUEVAMENTE TODO ESTO SI ESTA BIEN
        const cookies = new Cookies();

        const userLogged =
            cookies.get("userEmail") ||
            cookies.get("usuario") ||
            cookies.get("email") ||
            cookies.get("session");

        if (!userLogged) { //COMPLETAR RETURN  
            return <Login/>;
        }



    }
}

export default Favorites
