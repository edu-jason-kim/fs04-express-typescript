import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import multer from "multer";

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

// 1. parameter에 타입적용
const middleware = (req: Request, res: Response, next: NextFunction) => {
  req.userId = "u001";
  next();
};

// 2. 함수에 핸들러 타입 적용
const middleware2: RequestHandler = (req, res, next) => {
  console.log("middleware2");
  next();
};

app.get("/", middleware, middleware2, async (req, res) => {
  console.log("uesrId: ", req.userId);
  res.send("Hello World!");
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}@@`);
});
