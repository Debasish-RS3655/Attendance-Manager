const childProcess = require("child_process");
const path = require('path');
const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 5000;
app.set("view engine", "ejs");

//start the server only after establishing the connection to the MongoDB database
connectDB()
app.use(express.json());
app.use(cookieParser());    //cookies for JWT
// Routes for the CRUD operations are defined here
app.use("/api/auth", require("./Auth/route"));
// Routes for the new view operations
app.use("/new_views", require("./Auth/route_views"));
//logging out to the main page from here
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});

//when we use the views folder it will simply redirect to the new directory
app.use('/views', express.static(path.join(__dirname + "/new_views")));
app.get('/', function (req, res) {
  res.redirect("/views/index.html")
})
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

//running the face server
runScript("./views/tensorflow/face_server.js");
function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;
  var process = childProcess.fork(scriptPath);
  // listen for errors as they may prevent the exit event from firing
  process.on('error', function (err) {
      if (invoked) return;
      invoked = true;
      callback(err);
  });
  // execute the callback once the process has finished running
  process.on('exit', function (code) {
      if (invoked) return;
      invoked = true;
      var err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
  });
}