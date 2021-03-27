import React,{useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [movies,setMovies] = useState([]);
  const [myList,setMyList] = useState(() => {
    const local = localStorage.getItem('myList');
    return local ? JSON.parse(local) : [];
  });
  const [myTVlist,setMyTVlist] = useState(() => {
    const local = localStorage.getItem('myTVlist');
    return local ? JSON.parse(local) : [];
  });
  const [myCelebsList,setMyCelebsList] = useState(() => {
    const local = localStorage.getItem('myCelebsList');
    return local ? JSON.parse(local) : [];
  });

  const [option,setOption] = useState('all');
  const [pageNumber,setPageNumber] = useState(1);
  const [moviesPage,setMoviesPage] = useState(1);
  const [tvPage,setTvPage] = useState(1);
  const [peoplePage,setPeoplePage] = useState(1);
  
  // const API = 'https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3';
  const API = 'https://api.themoviedb.org/3';
  const key = 'ace333fddd5f05d5bf871983c3e0d136';
  const img = 'https://image.tmdb.org/t/p/w200/';
  const popular = `${API}/movie/top_rated?api_key=${key}&language=en-US&page=${moviesPage}`;
  const series = `${API}/tv/popular?api_key=${key}&language=en-US&language=ru&page=${tvPage}`;
  const people = `${API}/person/popular?api_key=${key}&language=en-US&language-ru&page=${peoplePage}`;
  
  //save your favourites movies in local storage:
  async function toggleAddOrDelete(inp,id,popularity,addMark,type) {
    if(addMark) {
      // const response = await axios.get(`${API}/${type}/${id}?api_key=${key}&language=en-US`);
      const response = await axios.get(`${API}/search/multi?api_key=${key}&language=en-US&language=ru&query=${inp}&page=1&include_adult=false`);
      const results = response.data.results;
      //ADD MOVIES TO MY LIST:
      if(type === 'movie') {
        const checkSameId = () => {
          //prevent adding to my list the same popularity(ids are NOT unique!):
          return myList.some(movie => movie.popularity === popularity)   
        }
        const res4check = myList.some(checkSameId);
        if(res4check) return;
        results.map(result => {
          if(result.popularity === popularity && result.id === id) {
            setMyList([...myList, {...result, addMark: false} ]);
          }
        })
      }
      //ADD TV SHOWS TO MY LIST:
      if(type === 'tv') {
        const checkSameId = () => {
          //prevent adding to my list the same popularity(ids are NOT unique!):
          return myTVlist.some(tv => tv.popularity === popularity)   
        }
        const res4check = myTVlist.some(checkSameId);
        if(res4check) return;
        results.map(result => {
          if(result.popularity === popularity && result.id === id) {
            setMyTVlist([...myTVlist, {...result, addMark: false} ]);
          }
        })
      }
      //ADD CELEBRITIES TO MY LIST:
      if(type === 'person') {
        const checkSameId = () => {
          //prevent adding to my list the same popularity(ids are NOT unique!):
          return myCelebsList.some(person => person.popularity === popularity)   
        }
        const res4check = myCelebsList.some(checkSameId);
        if(res4check) return;
        results.map(result => {
          if(result.popularity === popularity && result.id === id) {
            setMyCelebsList([...myCelebsList, {...result, addMark: false} ]);
          }
        })
      }
    }
      //delete movies, actors in my lists:
    else {
      if(type === 'movie') {
        const newList = myList.filter(movie => (movie.popularity !== popularity && movie.id !== id));
        setMyList(newList);
        localStorage.setItem('myList',JSON.stringify(myList));
      }
      if(type === 'tv') {
        const newList = myTVlist.filter(tv => (tv.popularity !== popularity && tv.id !== id));
        setMyTVlist(newList);
      }
      if(type === 'person') {
        console.log(myCelebsList)
        const newList = myCelebsList.filter(person => (person.popularity !== popularity && person.id !== id));
        setMyCelebsList(newList);
      }
    }
  }

  useEffect(() => {
    if(myList.length >= 0) {
      localStorage.setItem('myList',JSON.stringify(myList));
    }
    if(myTVlist.length >= 0) {
      localStorage.setItem('myTVlist',JSON.stringify(myTVlist));
    }
    if(myCelebsList.length >= 0) {
      localStorage.setItem('myCelebsList',JSON.stringify(myCelebsList));
    }
  },[myList,myTVlist,myCelebsList]);

  async function myRequest(inp,selectedValue) {
    if(selectedValue === 'all') {
      const response = await axios.get(`${API}/search/multi?api_key=${key}&language=en-US&language=ru&query=${inp}&page=1&include_adult=false`);
      setMovies(response.data.results);
    }
    if(selectedValue === 'episodes') {
      const response = await axios.get(`${API}/search/tv?api_key=${key}&language=en-US&language=ru&page=1&query=${inp}&include_adult=false`);
      setMovies(response.data.results);
    }
    if(selectedValue === 'celebs') {
      const response = await axios.get(`${API}/search/person?api_key=${key}&language=en-US&language=ru&query=${inp}&page=1&include_adult=false`);
      setMovies(response.data.results);
    }
  }
  
  const searchRequest = (inp,selectedValue) => myRequest(inp,selectedValue);
  
  const changeOption = selectedValue => setOption(selectedValue);
  
  useEffect(() => {
    chooseCategories();
  },[option]);
  
  async function chooseCategories() {
    if(option === 'all') {

      const response = await fetch(popular, {
      method: "GET",
      mode: "cors",
      headers: {
          "Content-Type": "application/json"
      },
      // body: JSON.stringify(response)
    });   
    console.log(response.json())
    }



    //   const response = await axios.get(popular);
    //   setMovies(response.data.results);
    //   setPageNumber(moviesPage);
    // }
    if(option === 'episodes') {
      const response = await axios.get(series);
      setMovies(response.data.results);
      setPageNumber(tvPage);
    }
    if(option === 'celebs') {
      const response = await axios.get(people);
      setMovies(response.data.results);
      setPageNumber(peoplePage);
    }
  }
  
  const changeFromBackCard = (inp, selectedValue) => {
    myRequest(inp,selectedValue);
  }

  const incrementPage = () => {
    option === 'all' && setMoviesPage(num => num + 1);
    option === 'episodes' && setTvPage(num => num + 1);
    option === 'celebs' && setPeoplePage(num => num + 1);
    chooseCategories()
  }
  const decrementPage = () => {
    (option === 'all' && pageNumber > 1) && setMoviesPage(num => num - 1);
    (option === 'episodes' && pageNumber > 1) && setTvPage(num => num - 1);
    (option === 'celebs' && pageNumber > 1) && setPeoplePage(num => num - 1);
    chooseCategories()
  }
  useEffect(() => {
    chooseCategories();
  },[moviesPage,tvPage,peoplePage])
  
  const clearList = (list) => {
    list === myList && setMyList([]);
    list === myTVlist && setMyTVlist([]);
    list === myCelebsList && setMyCelebsList([]);
  }

  return (
    <MainContext.Provider value=
      {{movies,
        myList,
        myTVlist,
        myCelebsList,
        img,
        pageNumber,
        option,
        toggleAddOrDelete,
        searchRequest,
        changeOption,
        changeFromBackCard,
        decrementPage,
        incrementPage,
        clearList
      }}>
        {children}
    </MainContext.Provider>
  )
}

export default MainContextProvider;


