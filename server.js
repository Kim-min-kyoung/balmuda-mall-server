// express 불러오기
const express = require("express");
// cors 불러오기
const cors = require('cors');
// app은 express()
const app = express();
const port = 8080;
// sequelize를 실행하는 함수
const models = require('./models');

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
