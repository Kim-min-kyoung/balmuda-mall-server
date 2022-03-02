// node는 Common JS를 사용함
// import할 때 require를 사용

const http = require('http');
// 172.30.1.43 localhost와 같음! 내 컴퓨터 주소를 의미함.
const hostname = "172.30.1.43";
const port = process.env.PORT || 8080;

// 서버만들기 createServer
const server = http.createServer(function (req, res) {
    const path = req.url;
    const method = req.method;
    if (path === "/products") {
        if (method === "GET") {
            // 응답을 보낼 때 json 객체를 헤더에 보내기
            res.writeHead(200, { 'Content-Type' : 'application/json' })
            const products = JSON.stringify([
                {
                    name: "BALMUDA The Range (Black)",
                    subname: "전자레인지와 오븐이 하나로"
                }
            ])
            res.end(products);
        }
        else if (method === "POST") {
            res.end("생성되었습니다.");
        }
    }
    console.log('요청하는 정보 : ', req);
    res.end("Hello Client!");
})

//
server.listen(port, hostname);
console.log('발뮤다 서버 on!');