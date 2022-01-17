// express 불러오기
const express = require("express");
// cors 불러오기
const cors = require('cors');
// app은 express()
const app = express();
const port = 8080;
// sequelize를 실행하는 함수
const models = require('./models');

app.use(cors());
// 해당파일을 보여줄 때 입력한 경로대로 보여주기 위해 세팅
app.use("/upload",express.static("upload"));
// 업로드 이미지를 관리하는 스토리지 서버로 멀터를 사용함.
const multer = require('multer');
// 이미지 파일 저장 장소 지정
const upload = multer({ 
    storage: multer.diskStorage({
        destination: function(req, file, cd) {
            // 저장 장소 지정
            cd(null, 'upload');
        },
        filename: function(req, file, cd){
            // 저장 이름 지정
            // 파일에 있는 원본이름으로 저장
            cd(null, file.originalname);
        }
    })
});

// json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(express.json());
// 브라우저의 CORS 이슈를 막기 위해 사용하는 코드
app.use(cors()) 

// get방식 응답 지정
app.get('/products', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    models.Product.findAll({
        limit: 3,
        order: [
            ["id", "asc"]
        ],
        attributes: [
            "id",
            "name",
            "subname",
            "imageUrl",
            "description",
            "product_description"
        ]
    })
    .then((result) => {
        console.log("PRODUCTS:", result);
        res.send({
            product: result
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})

// post방식 응답 지정
app.post('/products', async(req,res)=>{
    const body = req.body;
    const { name, subname, description, price, imageUrl } = body;
    // Product 테이블에 테이터를 삽입
    // 구문 -> models.테이블이름.create
    models.Product.create({
        name,
        subname,
        description,
        price,
        imageUrl,
    }).then((result) => {
        console.log("상품 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send("상품 업로드에 문제가 발생했습니다.");
    })
})

// get방식 경로 파라미터 관리하기
app.get('/products/:id',async(req,res) => {
    const params = req.params;
    console.log(params);
    // 하나만 찾을 때(select할 때) findOne
    models.Product.findOne({
        //조건절
        where: {
            id:params.id
        }
    })
    .then((result) => {
        res.send({
            product: result,
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('상품조회에 문제가 생겼습니다.')
    })
})

// // banners로 요청이 왔을 때 응답하기
// app.get("/banners", (req, res) => {
//     models.Banner.findAll({
//         limit: 3,
//         attributes: ["imageUrl", "id", "href"]
//     })
//     .then((result) => {
//         res.send({
//             banners: result,
//         })
//     })
//     .catch((error) => {
//         console.error(error);
//         res.send("에러가 발생했습니다.");
//     })
// })

/* recipe */
// get방식 응답 지정
app.get('/recipes', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    models.Recipe.findAll({
        // limit: 4,
        order: [
            ["id"]
        ],
        attributes: [
            "id",
            "name",
            "imageUrl"
        ]
    })
    .then((result) => {
        console.log("RECIPES:", result);
        res.send({
            recipe: result
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})
// post방식 응답 지정
app.post('/recipes', async(req,res)=>{
    const body = req.body;
    const { name, imageUrl } = body;
    // Recipe 테이블에 테이터를 삽입
    // 구문 -> models.테이블이름.create
    models.Recipe.create({ 
        name,
        imageUrl,
    }).then((result) => {
        console.log("레시피 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send("레시피 업로드에 문제가 발생했습니다.");
    })
})

// 설정한 app을 실행 시키기
app.listen(port, () => {
    console.log('발뮤다몰 서버가 돌아가고 있습니다.');
    models.sequelize
    .sync()
    .then(() => {
        console.log('DB연결성공');
    })
    .catch(function(err){
        console.error(err);
        console.log('DB연결에러');
        process.exit();
    })
})
