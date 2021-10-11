import React from 'react'
import { useState ,useEffect} from 'react';
import useGenres from '../../hooks/useGenre';
import { Genres } from '../../Genres';
import SingleContent from '../../SingleContent/SingleContent';
import CustomePagination from '../../Pagination/CustomePagination';
import axios from 'axios';


function Series() {

    const [page, setpage] = useState(1);
    const  [content, setContent] = useState([]);
    const [numOfPages, setnumOfPages] = useState();
    const [seletedGenres, setSeletedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(seletedGenres);

    const fetchMovie = async ()=>{

        const {data} = await axios.get(
           `https://api.themoviedb.org/3/discover/tv?api_key=b4ad159332156553e01bc42116f7254f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
    setContent(data.results)
    setnumOfPages(data.total_pages)
    }
    
    useEffect(() => {
        window.scroll(0, 0);
      fetchMovie();
      // eslint-disable-next-line  
    
    }, [page,genreforURL])


    return (
        <div>
             <span className="pagetitle">Series </span>


             <Genres 
             type="tv"
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
             media_type='tv'
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

export default Series
