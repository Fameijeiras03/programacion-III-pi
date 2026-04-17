import './App.css';
import AllMovies from './screens/AllMovies/AllMovies';
import AllSeries from './screens/AllSeries/AllSeries';
import Home from './screens/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MovieDetail from './screens/MovieDetail/MovieDetail';
import SerieDetail from './screens/SerieDetail/SerieDetail';
import Favorites from './screens/Favorites/Favorite';
import Login from './screens/Login/Login';
import Result from './screens/RdoBusqueda/RdoBusqueda';
import Register from './screens/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';


function App() {
  return (
    <>
    <Header/>
<<<<<<< HEAD


=======
    <Form/>
    <BrowserRouter>
>>>>>>> 5a10edd424b0dd38d9541300bc4c2ed7582a60c2
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/allmovies" component={AllMovies} />
        <Route path="/allseries" component={AllSeries} />
        <Route path='/moviedetail/:id' component={MovieDetail} />
        <Route path='/seriesdetail/:id' component={SerieDetail} />
        <Route path='/favorites' component={Favorites} />
        <Route path='/login' component={Login} />
        <Route path='/result' component={Result} />
        <Route path='/register' component={Register} />

      </Switch>
<<<<<<< HEAD

      <Footer/>

=======
    </BrowserRouter>
    
    
    <Footer/>
>>>>>>> 5a10edd424b0dd38d9541300bc4c2ed7582a60c2
    </>
  );
}

export default App;
