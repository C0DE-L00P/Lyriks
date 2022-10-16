import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const songs = data?.tracks?.hits?.map((song)=> song.track)

  if (isFetching) return <Loader title={"Loading... "} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-3xl font-bold my-8">
        Showing results for {searchTerm}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
