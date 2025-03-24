
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: require("path").resolve(__dirname, "../../.env") });

// const uri = "mongodb+srv://mymongo:<db_password>@cluster0.sd2xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://"+process.env.MONGO_DB_USER+":"+process.env.MONGO_DB_PASSWORD+"@"+process.env.MONGO_DB_CLUSTER+"?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(); // 1. async가 있으므로 비동기 처리 함수
    const adminDB = client.db('test').admin();    // 2. admin DB 인스턴스
    const listDatabases = await adminDB.listDatabases();    // 3. 데이터 베이스 정보 가져오기
    console.log(listDatabases);
    return "OK";
}
run()   // 4. 실행함수
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
