import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {
  useGetSongsByGenreQuery,
} from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );
  const dispatch = useDispatch();

  if (isFetching) return <Loader title={"Loading... "} />;
  if (error) return <Error />
  const genreTitle = genres.find( genre=> genre.value === genreListId)?.title?? ''

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <h2 className="text-white text-3xl font-bold">
          Discover {genreTitle}
        </h2>
        <select
          className="outline-none p-4 bg-slate-800 text-gray-200 text-sm rounded-lg sm:m-0 m-5"
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'Pop'}
        >
          {genres?.map((genre) => (
            <option value={genre.value} key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
