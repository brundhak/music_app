import { Error, Loader, SongCard } from "../components";
import {genres} from '../assets/constants';
import { selectGenreListId } from "../redux/features/playerSlice";
import {useGetSongsByGenreQuery} from '../redux/services/shazamCore';
import { useDispatch, useSelector } from "react-redux";
const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const {data, isFetching, error} = useGetSongsByGenreQuery(genreListId || 'POP');
    if(isFetching) return <Loader title='Loading songs just for you....'/>;
    if(error) return <Error/>;

    const genreTitle = genres.find(({value}) => value === genreListId)?.title;
    // console.log(data);

    return(
        <div className="flex flex-col flex-wrap">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h1 className="font-bold text-3xl text-white text-left">DISCOVER {genreTitle}</h1>
                <select onChange={(e) => dispatch(selectGenreListId(e.target.value))} value={genreListId || 'pop'}
                className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                {genres.map((genre) =><option key={genre.value} value={genre.value}>{genre.title}</option>)}
                    
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {/* display songs */}
                {data?.map((song, index) => (
                    <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    index={index}/>
                ))}

            </div>
        </div>
    );
};

export default Discover;
