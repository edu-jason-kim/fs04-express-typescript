import dotenv from "dotenv";
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { connect } from "mongoose";
import multer from "multer";
import { CreateFileDTO, getFiles, saveFile } from "./file";
import { getUsers, saveUser } from "./user";

dotenv.config();

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

app.use(express.json());

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

// MONGODB
const MONGODB_URI =
  "mongodb://root:example@localhost:27017/test-app?authSource=admin";

connect(MONGODB_URI)
  .then(() => console.log("몽고DB에 연결됐습니다!"))
  .catch((error) => console.log("몽고DB 연결 실패: ", error));

app.post("/users", async (req, res) => {
  const { name, email, avatar } = req.body;
  const newUser = await saveUser({ name, email, avatar });
  res.status(201).json(newUser);
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

// Prisma
app.post("/files", async (req, res) => {
  const { name, path, size } = req.body as CreateFileDTO;
  const newFile = await saveFile({ name, path, size });
  res.status(201).json(newFile);
});

app.get("/files", async (req, res) => {
  const files = await getFiles();
  res.status(200).json(files);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}@@`);
});
