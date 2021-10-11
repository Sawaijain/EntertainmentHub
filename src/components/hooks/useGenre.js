const useGenres = (selectedGenres)=>{
 if(selectedGenres.length < 1) return "";

 const GenreId = selectedGenres.map((g)=> g.id)
 return GenreId.reduce((acu,curr)=> acu + " "+curr);

};

export default useGenres;