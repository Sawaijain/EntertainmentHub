import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'

export const Genres = ({
    type,
    seletedGenres,
    setSeletedGenres,
    genres ,
    setGenres,
    setPage,
}) => {

    const handleAdd=(genre)=>{
        setSeletedGenres([...seletedGenres,genre])
        setGenres(genres.filter((g)=> g.id !== genre.id))
        setPage(1);
    }

    const handleRemove=(genre)=>{
        setSeletedGenres(
            seletedGenres.filter((selected)=> selected.id!== genre.id)
        );

        setGenres([...genres,genre])
        setPage(1);
        // eslint-disable-next-line
    }

const fetchGenres= async ()=>{
    const {data} = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=b4ad159332156553e01bc42116f7254f&language=en-US`
    )

    setGenres(data.genres)
}

useEffect(() => {
   fetchGenres()

   return ()=>{
       setGenres({})
   }
}, [])


    return (
        <div style={{padding:"6px 0"}}>
{
               seletedGenres && seletedGenres.map((genre)=>(
                    <Chip 
                    label={genre.name}
                     style={{margin:2}}
                     color='primary' 
                     size='small'
                      key={genre.id} 
                      clickable
                      onDelete={()=> handleRemove(genre)}
                      />
                      
                ))
            }

            {
               genres && genres.map((genre)=>(
                    <Chip 
                    label={genre.name}
                     style={{margin:2}} 
                     size='small'
                      key={genre.id} 
                      clickable 
                      onClick={()=> handleAdd(genre)}
                      />
                     
                ))
            }
        </div>
    )
}
