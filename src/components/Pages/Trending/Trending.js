import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css'
import CustomePagination from '../../Pagination/CustomePagination';

function Trending() {
const  [content, setContent] = useState([]);
const [page,setPage] = useState(1);
 const fetchTrending = async ()=>{
     const {data} = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=b4ad159332156553e01bc42116f7254f&page=${page}`
     );

     console.log(data);
     setContent(data.results);
 }

 useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
 }, [page])

    return (
        <div>
            <span className="pagetitle">Trending </span>
            <div className="trending">
             {content && content.map((c)=><SingleContent 
             key={c.id} 
             id={c.id} 
             poster={c.poster_path} 
             title={c.title || c.name} 
             date={c.first_air_date || c.release_date}
             media_type={c.media_type}
             vote_average={c.vote_average} 
             />)}
           
               
            </div>
            <CustomePagination setPage={setPage}/>
        </div>
    )
}

export default Trending
