import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useEffect } from "react";
import { useGetTopChartsQuery } from "../redux/features/shazamCore";

const Discover = () => {
    const { data, isFetching, error} = useGetTopChartsQuery()
    console.log('data', data)
    if(isFetching) return <Loader title={'Loading... '}/> 
    if(error) return <Error /> 

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="text-white text-3xl font-bold">Discover {genres[0].title}</h2>
        <select className="outline-none p-4 bg-slate-800 text-gray-200 text-sm rounded-lg sm:m-0 m-5">
          {genres?.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
