const MongoClient = require('mongodb').MongoClient;
require('dotenv').config({ path: require("path").resolve(__dirname, "../../.env") });

const url =  "mongodb+srv://"+process.env.MONGO_DB_USER+":"+process.env.MONGO_DB_PASSWORD+"@"+process.env.MONGO_DB_CLUSTER+"?retryWrites=true&w=majority&appName=Cluster0";
// &appName=Cluster0

// 1. MongoClient 생성
const client = new MongoClient(url); // { useNewUrlParser: true} 옵션은 더이상 필요 없으므로 제거

async function main() {
    try {
        // 2. 커넥션을 생성하고 연결 시도
        await client.connect();

        console.log('MongoDB 접속 성공');

        // 3. test 데이터베이스의 person 컬렉션 가져오기
        const collection = client.db('test').collection('person');

        const randomAge = Math.floor(Math.random() * 100) + 1 // 1 <= ramdom < 9

        // 4. document 하나 추가
        await collection.insertOne({ name: 'purity', age: randomAge });
        console.log('document 추가 완료')

        // 5. document 찾기
        const documents = await collection.find({ name: 'purity'}).toArray();
        console.log(' 찾은 문서: ', documents);

        // 6. document 갱신하기
        await collection.updateOne({ name: 'purity' }, { $set: { age: randomAge + 1 }})
        console.log('document 업데이트')

        // 7. 갱신된 문서 확인하기
        const updatedDocuments = await collection.find({ name: 'purity' }).toArray();
        console.log('갱신된 문서: ', updatedDocuments);

        // 8. 문서 삭제하기
        await collection.deleteOne( { name: "purity"} )
        console.log('문서 삭제')

        // 연결 끊기
        await client.close();

    } catch (error) {

    }
}


main();
