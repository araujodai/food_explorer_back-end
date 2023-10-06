require("express-async-errors");
const AppError = require("./utils/AppError");

const express = require('express');
const routes = require("./routes");

const uploadConfig = require("./configs/upload");

const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  };

  // remover essa linha no final
  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
});

const PORT = 3333
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));