const axios = require("axios"); // axios 임포트


async function getTop20Movies() {   // 1. await을 사용하므로 async 사용
    const url = "https://raw.githubusercontent.com/wapj/musthavenodejs/main/movieinfo.json";

    try {
        // 2. 네트워크에서 데이터를 받아오므로 await로 기다림
        const result = await axios.get(url);
        const { data } = result;    // 결괏값 result 에는 data 프로퍼티가 있음.
        // data 또는 articleList 없을 떄 예외 처리
        if (!data.articleList || data.articleList.size === 0) {
            throw new Error( "데이터 없습니다.");
        }
        // data에서 필요한 영화 제목과 순위 정보를 뽑아냄
        const movieInfos = data.articleList.map((article, idx) => {
            return { title: article.title, rank: idx + 1 };
        })

        // 데이터 출력
        for (let movieInfo of movieInfos) {
            console.log(`[${movieInfo.rank}위] ${movieInfo.title}`);
        }
    }catch (err) {
        // 3. 예외 처리는 기존 코드와  같게 try catch로 감쌈
        throw new Error(err);
    }

}


// await를 함수 안에서만 사용 가능하므로 함수를 하나 생성해 실행
getTop20Movies();


