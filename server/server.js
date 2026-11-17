import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("site"));

// testing to see if the server is live
app.get("/api/health", (req, res) =>{
    res.json({
        ok: true
    });
})

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});