require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de SchoolConnect funcionando!");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const prisma = require("./prisma");

app.get("/test-db", async (req, res) => {
  try {
    const alumnos = await prisma.alumnos.findMany();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
