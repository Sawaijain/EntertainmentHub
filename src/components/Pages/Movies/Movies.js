import React, { useState,useEffect } from 'react'
import SingleContent from '../../SingleContent/SingleContent';
import CustomePagination from '../../Pagination/CustomePagination';
import axios from 'axios';

import { Genres } from '../../Genres';
import useGenres from '../../hooks/useGenre';
function Movies() {
    const [page, setpage] = useState(1);
    const  [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [seletedGenres, setSeletedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(seletedGenres);

    const fetchMovie = async ()=>{

        const {data} = await axios.get(
           `https://api.themoviedb.org/3/discover/movie?api_key=b4ad159332156553e01bc42116f7254f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
    setContent(data.results)
    setnumOfPages(data.total_pages)
    }
    
    useEffect(() => {
      fetchMovie();
        // eslint-disable-next-line
    }, [page,genreforURL])

    return (
        <div>
             <span className="pagetitle">Movies </span>
             <Genres 
             type="movie"
             seletedGenres={seletedGenres}
              setSeletedGenres={setSeletedGenres} 
              genres={genres} 
              setGenres={setGenres}
              setPage={setpage}
               />

             <div className="trending">
             {content && content.map((c)=><SingleContent 
             key={c.id} 
             id={c.id} 
             poster={c.poster_path} 
             title={c.title || c.name} 
             date={c.first_air_date || c.release_date}
             media_type='movie'
             vote_average={c.vote_average} 
             />)}
           
               
            </div>
            {numOfPages>1 &&(
                <CustomePagination setPage={setpage} numOfPages={numOfPages}/>
            )

            }
            
        </div>
    )
}

export default Movies
