// //Implement all your function here to make it a working application.

//function which will add genre(options) in select tag

function genresList(genres){
    const select = document.getElementById("genres");
      
    for(const genre of genres){
       const option  = document.createElement("option");
       option.value = genre.id;
       option.textContent = genre.name;
       select.appendChild(option);
    }  
  }
  
  //return selected genre

  function getSelectedGenre(){
      const selectedGenre = document.getElementById('genres').value;
       return selectedGenre;
  }

  // it will show nextbutton

  function showBtn(){
    const nextBtnDiv = document.getElementById('likeOrDislikeBtns');
    nextBtnDiv.removeAttribute('hidden');
   }

   //function remove previous detail of movie
  
  function removePrevMovieDetail(){
      const moviePoster = document.getElementById('moviePoster');
      const movieText = document.getElementById('movieText');
      moviePoster.innerHTML = "";
      movieText.innerHTML = ""; 
  }

//return image

  function posterImage(posterImg){
      
    const image = document.createElement("img");
    const posterURL = `https://image.tmdb.org/t/p/w500${posterImg}`;
    image.setAttribute('src',posterURL);
    image.setAttribute('id','moviePoster');
      return image;
      
  }
  
  //return heading which contain movie title

  function createMovieTitle(title){
      const movieHeading = document.createElement("h1");
      movieHeading.setAttribute('id','movieTitle');
      movieHeading.textContent = title;
      
      return movieHeading;
  }

  //return paragraph which contain movie overview
  
  function createMovieOverview(overview){
     const overviewParagraph  = document.createElement('p');
     overviewParagraph.setAttribute('id','movieOverview');
     overviewParagraph.textContent = overview;
      
      return overviewParagraph;
  }

  
  //select random movie from the list of selected genre

  function getRandomMovie(movie){
      const movieIndex = Math.floor(Math.random()*movie.length);
      return movie[movieIndex];
  }
  
  const tmdbKey = '230c7c7536278408db17a9fb2101037f';
  const baseURL = 'https://api.themoviedb.org/3/';
  
  function getGenre(){
  const  genreEndpoint = 'genre/movie/list';
  const apiKey = `?api_key=${tmdbKey}`;
  const genreListURL =  baseURL+genreEndpoint+apiKey;
  const  xhr = new XMLHttpRequest();
    xhr.open('GET',genreListURL,true);
    xhr.onreadystatechange = function(){
       if(xhr.readyState === 4 && xhr.status === 200){
           const jsonresponse = JSON.parse(xhr.responseText);
           genresList(jsonresponse.genres);
       }
   };
    xhr.send();
  }
  
  function movieListofGenre(){
      const selectedgenre = getSelectedGenre();
      const movieEndpoint = 'discover/movie';
      const apiKey = `?api_key=${tmdbKey}&with_genres=${selectedgenre}`;
      const movieListURL = baseURL+movieEndpoint+apiKey;
      const xhr = new XMLHttpRequest();
      xhr.open('GET',movieListURL,true);
      xhr.onreadystatechange = function(){
         if(xhr.readyState===4 && xhr.status===200){
             const responsetext = JSON.parse(xhr.responseText);
             const movie = getRandomMovie(responsetext.results);
             getMovieInfo(movie);
             
         }
      };
      xhr.send();
  }
  
  function getMovieInfo(movie){
       const movieId = movie.id;
       const movieEndpoint = `movie/${movieId}`;
       const apiKey = `?api_key=${tmdbKey}`;
       const url =  baseURL+movieEndpoint+apiKey;
       const xhr = new XMLHttpRequest();
       xhr.open('GET',url,true);
        xhr.onreadystatechange = function(){
         if(xhr.readyState===4 && xhr.status===200){
            const responsetext = JSON.parse(xhr.responseText);
            displayMovieInfo(responsetext);   
            
         }
  };
  xhr.send();
}
    
 function likeMovie(){
    removePrevMovieDetail(); 
    movieListofGenre();

 }
  function displayMovieInfo(movie){
      const moviePoster = document.getElementById('moviePoster');
      const movieText = document.getElementById('movieText');
      const likeBtn = document.getElementById('likeBtn');
      removePrevMovieDetail(); 
      
      const posterImg = posterImage(movie.poster_path);
      const title = createMovieTitle(movie.title);
      const overview =   createMovieOverview(movie.overview);
      
      moviePoster.appendChild(posterImg);
      movieText.appendChild(title);
      movieText.appendChild(overview);
      
      likeBtn.addEventListener('click',likeMovie);

      showBtn();

      
  }
  getGenre();

  const searchBtn = document.getElementById('playBtn');
  searchBtn.addEventListener('click', movieListofGenre);
