import express from "express";
import dotenv from "dotenv";
import mySqlPool from "./config/db.js";
import router from "./routes/studentRoutes.js"

dotenv.config();

const app = express();

app.use(express.json()); 

app.use('/api/v1/student',router);

app.get("/test", (req, res) => {
  res.send("HELLOOO");
});

// Conditionally Listen

mySqlPool.query("SELECT 1").then(() => {

    console.log("MySQL Connection");
    app.listen(process.env.PORT, () => {
        console.log("listening on PORT " + process.env.PORT);
      });
}).catch(err => {
    console.error("Error connecting to MySQL", err);
})


// Using async/await

// const startServer = async () => {
//     try {
//       await mySqlPool.query("SELECT 1");
//       console.log("MySQL Connection");
//       app.listen(process.env.PORT, () => {
//         console.log("listening on PORT " + process.env.PORT);
//       });
//     } catch (err) {
//       console.error("Error connecting to MySQL", err);
//     }
//   };
  
//   startServer();

