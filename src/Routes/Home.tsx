import { useQuery } from "react-query";
import { IGetMoviesResult, getMovies, getUpcomingMovies, getTopRatedMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

const Wrapper = styled.div`
    background-color: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), 
    url(${props => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 24px;
    width: 50%;
`;

const Slider = styled(motion.div)`
    position: relative;
    top: -200px;
`;

const RowWrapper = styled.div`
    position: relative;
    height: 300px;
`;

const Row = styled(motion.div)`
    display:grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
    background-color: white;
    height:200px;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    font-size: 66px;
    cursor: pointer;
    &: first-child{
        transform-origin: center left;
    }
    &: last-child{
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${(props)=>props.theme.black.darker}
`;

const BigCover = styled.div`
    width: 100%;
    background-size: cover;
    background-position: center center;
    height: 400px;
`;

const BigTitle = styled.h3`
    color: ${(props) => props.theme.white.lighter};
    padding: 20px;
    font-size: 46px;
    position: relative;
    top: -80px;
`;

const BigOverview = styled.p`
    padding: 20px;
    position: relative;
    top: -80px;
    color: ${(props) => props.theme.white.lighter};
`;

const BigRate = styled.div`
    color: yellow;
    margin-bottom: 10px;
    font-size:20px;
`;

const HeadLine = styled.h3`
    padding: 20px;
    font-size: 24px;
    display:flex;
    items-align:center;
`;

const SliderButton = styled.span`
    font-size: 18px;
    cursor: pointer;
    border: 1px solid whitesmoke;
    border-radius: 4px;
    padding: 1px 4px;
    line-height: 1.4;
    transition: 0.3s;
    &: hover{
        background-color: whitesmoke;
        color: rgb(0,0,0,1);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    item-align: center;
`;

const PlayButton = styled.span`
    font-size:24px;
    cursor: pointer;
    border: 1px solid whitesmoke;
    border-radius: 4px;
    padding: 10px 20px;
    margin-top: 20px;
    line-height: 1.4;
    &: hover{
        background-color: whitesmoke;
        color: rgb(0,0,0,1);
    }
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0
    },
    exit : {
        x: -window.outerWidth - 5,
    }
}

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.1,
        y: -20,
        transition: {
            delay: 0.3,
            duration: 0.3,
            type: "tween"
        }
    }
}

const infoVariants = {
    hover:{
        opacity:1,
        transition:{
            delay:0.3,
            duration:0.1,
            type:"tween",
        },
    },
}

const offset = 6;

function Home() {   
    const navi = useNavigate();
    const bigMovieMatch:PathMatch<string>|null = useMatch("/movies/:movieId");
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data : data2, isLoading : isLoading2 } = useQuery<IGetMoviesResult>(["movies", "upcomming"], getUpcomingMovies);
    const { data : data3, isLoading : isLoading3 } = useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);
    const [ index, setIndex ] = useState(0);
    const [ index2, setIndex2 ] = useState(0);
    const [ index3, setIndex3 ] = useState(0);
    const [ leaving, setLeaving ] = useState(false);
    const [ clickedMovieOption, setClickedMovieOption] = useState('');
    const toggleLeaving = () => setLeaving( (prev) => (!prev) );
    const incraseIndex = () => { 
        if(data){
            if(leaving) return;
            //toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const incraseIndex2 = () => { 
        if(data2){
            if(leaving) return;
            //toggleLeaving();
            const totalMovies = data2.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex2((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const incraseIndex3 = () => { 
        if(data3){
            if(leaving) return;
            //toggleLeaving();
            const totalMovies = data3.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex3((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const onBoxClicked = (movieId: number, option: string) => {
        navi(`/movies/${movieId}`);
        setClickedMovieOption(option);
    };
    const clickedMovie =
    bigMovieMatch?.params.movieId && 
    (  data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!)
    || data2?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!)
    || data3?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId!));

    const onOverlayClicked = () => navi(`/`);
    return (
        <Wrapper>{ isLoading ? (<Loader>Loading...</Loader>) : 
        (
        <>
            <Banner 
                bgPhoto={ makeImagePath(data?.results[0].backdrop_path || "") }>
                <Title>{data?.results[0].title}</Title>
                <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <RowWrapper>
                    <HeadLine>최신영화&nbsp;<SliderButton onClick={ incraseIndex }>&rarr;</SliderButton></HeadLine>
                    <Row key={index}
                    variants={rowVariants} 
                    animate="visible" 
                    initial="hidden" 
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    >
                    {
                        data?.results
                        .slice(1)
                        .slice(offset * index, offset * index + offset)
                        .map( (movie)=>(
                            <Box 
                            layoutId={movie.id+''}
                            key={movie.id}
                            bgPhoto={ makeImagePath(movie.backdrop_path) }
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            onClick={()=>onBoxClicked(movie.id, '')}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                </Info>
                            </Box>
                        ) )
                    }
                    </Row>
                    </RowWrapper>
                    <RowWrapper>
                    <HeadLine>개봉예정&nbsp;<SliderButton onClick={ incraseIndex2 }>&rarr;</SliderButton></HeadLine>
                    <Row key={index2+"_p"}
                    variants={rowVariants} 
                    animate="visible" 
                    initial="hidden" 
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    >
                    {
                        data2?.results
                        .slice(1)
                        .slice(offset * index2, offset * index2 + offset)
                        .map( (movie)=>(
                            <Box 
                            layoutId={movie.id+"_p"}
                            key={movie.id+"_p"}
                            bgPhoto={ makeImagePath(movie.backdrop_path) }
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            onClick={()=>onBoxClicked(movie.id,'_p')}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                </Info>
                            </Box>
                        ) )
                    }
                    </Row>
                    </RowWrapper>
                    <RowWrapper>
                    <HeadLine>인기영화&nbsp;<SliderButton onClick={ incraseIndex3 }>&rarr;</SliderButton></HeadLine>
                    <Row key={index3+"_t"}
                    variants={rowVariants} 
                    animate="visible" 
                    initial="hidden" 
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    >
                    {
                        data3?.results
                        .slice(1)
                        .slice(offset * index3, offset * index3 + offset)
                        .map( (movie)=>(
                            <Box 
                            layoutId={movie.id+"_t"}
                            key={movie.id+"_t"}
                            bgPhoto={ makeImagePath(movie.backdrop_path) }
                            variants={boxVariants}
                            initial="normal"
                            whileHover="hover"
                            onClick={()=>onBoxClicked(movie.id,'_t')}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{movie.title}</h4>
                                </Info>
                            </Box>
                        ) )
                    }
                    </Row>
                    </RowWrapper>
                </AnimatePresence>
            </Slider>
            <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                onClick={onOverlayClicked}
                exit={{opacity:0}}
                animate={{opacity:1}}
                />
                <BigMovie
                style={{top:scrollY.get() + 100}}
                layoutId={`${bigMovieMatch.params.movieId}${clickedMovieOption}`}
                >
                    {clickedMovie && (
                        <>
                        <BigCover
                            style={{    
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                clickedMovie.backdrop_path,
                                "w500"
                            )})`,
                            }}
                        />
                        <BigTitle>{clickedMovie.title}</BigTitle>
                        <BigOverview>
                            <BigRate>평점:{Math.floor((clickedMovie.vote_average)*10)/10}</BigRate>
                            {clickedMovie.overview}
                            <ButtonWrapper><PlayButton>보러가기</PlayButton></ButtonWrapper>
                        </BigOverview>
                        </>
                    )}
                </BigMovie>
              </>
            ) : null}
            </AnimatePresence>
        </>
        ) }</Wrapper>
    );
}
export default Home;