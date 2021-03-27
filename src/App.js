import MainContextProvider from './components/contexts/MainContext';
import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MyTVshows from './components/MyTVshows';
import MyCelebs from './components/MyCelebs';

const MainPage = lazy(() => import('./components/MainPage'));
const MyMovies = lazy(() => import('./components/MyMovies'));


function App() {
  return (
    <MainContextProvider>
      <Router basename='/'>
          <Header />
          <Suspense fallback={<div className="loader">Loading....</div>}>
            <Route exact path="/appsR7/2021/imdb" component={MainPage}/>
            <Route path="/appsR7/2021/imdb/MyMovies" component={MyMovies} />
            <Route path="/appsR7/2021/imdb/MyTVshows" component={MyTVshows} />
            <Route path="/appsR7/2021/imdb/MyCelebs" component={MyCelebs} />
          </Suspense>
          <Footer />
      </Router>
    </MainContextProvider>
  );
}

export default App;
