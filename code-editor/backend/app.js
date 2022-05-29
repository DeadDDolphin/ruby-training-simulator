const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
// const { async } = require('jshint/src/prod-params');
const backMethods = require('./backMethods.js');

const PORT = process.env.PORT || 3001;

//отключаем запрет на кросдоменные запросы
app.use(cors());

//включаем возможность раскодирования url для доступа к id, передаваемых в ссылках
app.use(
  express.urlencoded({
    extended: true
  })
)


//включаем поддержку отправки json клиентскому приложению
app.use(express.json())

app.use(express.static(path.join(__dirname, '../frontend/dist/')))

app.get('/', cors(), (req, res) => {
  res.sendFile(`${path.join(__dirname, '../frontend/dist/')}index.html`);
});

app.post("/saveFile", async (req, res, next) => {
  const data = req.body;

  const result = await backMethods('saveFile', data);
  console.log(result);
  res.json(result);
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.get("/getFileNames", async (req, res, next) =>{
  const result = await backMethods('getFileNames');
  res.json(result);
});

app.post("/runTest", async (req, res, next) =>{
    const data = req.body;
    // const data = {
    //     rubyCode: "puts 'Hello World!'",
    //     path: "hello_world.rb"
    // };

    const result = await backMethods('runTest', data);
    res.json(result);
});

app.listen(3001, () => {
    console.log(new Date(), ', ', 'Application started, listening on port 3001! \r\n')
  });