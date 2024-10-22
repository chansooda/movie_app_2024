import React,{ useState ,useEffect } from "react";
import axios from "axios";

const App =() => {
  const [isLoading,setIsLoading] =useState(true);
  const [movies,setMovies] = useState([]);

//비동기 식으로 처리 
  const getMovies = async() =>{
    try{
      const apiKey ='2276106737c3cf3fbd48059560a3dd54';
      const targetDate ='20241021';

      const response = await axios.get(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${targetDate}`);
      console.log(response.data);
      const movieData =response.data.boxOfficeResult.dailyBoxOfficeList;

      setMovies(movieData);
      setIsLoading(false);
    }catch(error){
      console.error("Error fetching movies:",error);
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    getMovies();
  },[]);

  return(
    <div>
      {isLoading ?(
        "Loding..."
      ) : (
        <ul>
          {movies.map((movie, index) =>(
            <li key={index}>
            {movie.image && (
              <img src={movie.image} alt={movie.movieNm} />
          )}
            <h1>{movie.movieNm}</h1>
            <p>개봉일:{movie.openDt}</p>
            <p>박스오피스 :{movie.rank}</p> 
            <p>해당일 관객수:{movie.audiCnt}</p>
            <p>해당일 매출액:{movie.salesAmt}원</p> 
            <p>총 누적 관객수:{movie.audiAcc}명</p>
          </li>
          ))}
        </ul>
        )}
        </div>
      );
    };
export default App;