// express 불러오기
const express = require("express");
// cors 불러오기
const cors = require('cors');
// app은 express()
const app = express();
const port = process.env.PORT || 8080;
// sequelize를 실행하는 함수
const models = require('./models');
// json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(express.json());
// 브라우저의 CORS 이슈를 막기 위해 사용하는 코드
app.use(cors()) 

// 해당파일을 보여줄 때 입력한 경로대로 보여주기 위해 세팅
app.use("/upload",express.static("upload"));
// 업로드 이미지를 관리하는 스토리지 서버로 멀터를 사용함.
const multer = require('multer');
// 이미지 파일 저장 장소 지정
const uploadProduct = multer({ 
    storage: multer.diskStorage({
        destination: function(req, file, cd) {
            // 저장 장소 지정
            cd(null, 'upload/product');
        },
        filename: function(req, file, cd){
            // 저장 이름 지정
            // 파일에 있는 원본이름으로 저장
            cd(null, file.originalname);
        }
    })
});
// 이미지 파일 저장장소 지정
const uploadDetail = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cd) {
            // 저장 장소 지정
            cd(null, 'upload/detail');
        },
        filename: function(req, file, cd) {
            // 저장 이름 지정
            // 파일에 있는 원본 이름으로 저장
            cd(null, file.originalname);
        }
    })
})
// 이미지 파일 post 요청 시 업로드 폴더에 이미지 저장
// 이미지가 하나일 때 single
app.post('/upload_product', uploadProduct.single('image'), (req, res) => {
    console.log('aa');
    const file = req.file;
    console.log(file);
    // 이미지 파일의 경로를 응답해줌
    res.send({
        imageUrl: file.filename
    })
})
app.post('/upload_detail', uploadDetail.single('image'), (req, res) => {
    console.log('bb');
    const file = req.file;
    console.log(file);
    // 이미지 파일의 경로를 응답해줌
    res.send({
        imageUrl: file.filename
    })
})

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
            "product_description",
            "group",
            "price",
            "quantity"
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
// get방식 응답 지정
app.get('/products_group/:group', async (req, res) => {
    const params = req.params;
    console.log(params);
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    models.Product.findAll({
        where: {
            group:params.group
        },
        order: [
            ["id", "asc"]
        ],
        attributes: [
            "id",
            "name",
            "subname",
            "imageUrl",
            "description",
            "product_description",
            "group",
            "price"
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
    const { id, name, subname, description, product_description, group, price, imageUrl } = body;
    // Product 테이블에 테이터를 삽입
    // 구문 -> models.테이블이름.create
    models.Product.create({
        id,
        name,
        subname,
        imageUrl,
        description,
        product_description,
        group,
        price
    }).then((result) => {
        console.log("성공");
        console.log("상품 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.log("실패");
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

/* products */
// get방식 응답 지정
app.get('/product', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    models.Product.findAll({
        order: [
            ["id", "asc"]
        ],
        attributes: [
            "id",
            "name",
            "subname",
            "imageUrl",
            "description",
            "product_description",
            "group",
            "price"
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
// get방식 경로 파라미터 관리하기
app.get('/products/:group',async(req,res) => {
    const params = req.params;
    console.log(params);
    // 하나만 찾을 때(select할 때) findOne
    models.Product.findOne({
        //조건절
        where: {
            group:params.group
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

/* recipe */
// get방식 응답 지정
app.get('/recipes', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    models.Recipe.findAll({
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

/* about */
// get방식 응답 지정
app.get('/abouts', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    console.log(queryString.desc);
    models.About.findAll({
        order: [
            ["id"]
        ],
        attributes: [
            "id",
            "name",
            "desc",
            "imageUrl"
        ]
    })
    .then((result) => {
        console.log("ABOUTS:", result);
        res.send({
            about: result
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})

/* notice */
// get방식 응답 지정
app.get('/notice', async (req, res) => {
    const queryString = req.query;
    console.log(queryString.id);
    console.log(queryString.name);
    console.log(queryString.desc);
    console.log(queryString.title);
    console.log(queryString.createdAt);
    models.Notice.findAll({
        order: [
            ["id"]
        ],
        attributes: [
            "id",
            "name",
            "desc",
            "title",
            "createdAt"
        ]
    })
    .then((result) => {
        console.log("NOTICES:", result);
        res.send({
            notice: result
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})
// get방식 경로 파라미터 관리하기
app.get('/notice/:id',async(req,res) => {
    const params = req.params;
    console.log(params);
    // 하나만 찾을 때(select할 때) findOne
    models.Notice.findOne({
        //조건절
        where: {
            id:params.id
        }
    })
    .then((result) => {
        res.send({
            notice: result,
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('상품조회에 문제가 생겼습니다.')
    })
})
// post방식 응답 지정
app.post('/notice', async(req,res)=>{
    const body = req.body;
    const { id, name, desc, title, createdAt } = body;
    console.log('공지사항여기여기')
    console.log(req.body);
    // Notice 테이블에 테이터를 삽입
    // 구문 -> models.테이블이름.create
    models.Notice.create({ 
        id,
        name,
        desc,
        title,
        createdAt
    }).then((result) => {
        console.log("게시판 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.error(error);
        res.send("게시판 업로드에 문제가 발생했습니다.");
    })
})
// 수정
// update 테이블명 set 필드이름 = 값 where 필드명 = 값
app.post('/notice_edit/:id', async(req, res) => {
    const params = req.params;
    console.log(params);
    const body = req.body;
    const { id, name, desc, title, createdAt } = body;
    // Notice 테이블에 테이터를 삽입
    // 구문 -> models.테이블이름.update

    console.log(body);
    models.Notice.update({ 
        id,
        name,
        desc,
        title,
        createdAt
    },{where: {id: params.id}}).then((result) => {
        console.log("게시판 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error)=>{
        console.log(error);
        res.send("게시판 업로드에 문제가 발생했습니다.");
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
