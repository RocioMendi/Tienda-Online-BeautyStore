const express = require("express");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", userRoutes);
app.use("/productos", productRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
