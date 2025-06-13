import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("get");
});

const pokemons = [
    {id:1, name:"pikachu", color:"yellow"}, {id:2, name:"ditto", color:"ditto"}
];

app.post("/pokemon/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = pokemons.findIndex((pokemon)=>{
        return id === pokemon.id;
    });

    if(index === -1){
        return res.status(404).json({message: "pokemon not found!"});
    }

    pokemons[index] = {
        id: req.body.id,
        name: req.body.name,
        color:req.body.color,
    }
    res.json(pokemons[index]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
})