import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';


const app = express();
const port = 4000;
const uri = process.env.MONGODB_URL;
app.options('*', cors())
app.use(cors(
    {
        origins:["https://keeper-mern-frontend.vercel.app"],
        methods:["POST", "GET"],
        credentials:true
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

main().catch(err => console.log(err))
async function main(){
    await mongoose.connect(uri + "/NotesDB")
}

const notesSchema = new mongoose.Schema({
    id: Number,
    title: String,
    content: String
})

const Note = mongoose.model("Note", notesSchema)

let lastId = 0;

// const note = new Note ({
//     id: lastId+=1,
//     title: "My Note",
//     content: "My Note's Content"
// });
// note.save();
app.get("/", (req,res)=>{
    res.json("Hello Successfully connected")
})
app.get("/api/notes", (req, res)=>{
    Note.find()
    .then((foundNotes) => {
        res.send(foundNotes)
    });
})

app.post("/api/notes", (req, res)=>{
    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    const note = new Note ({
        id: lastId+=1,
        title: noteTitle,
        content: noteContent
    })
    note.save();
    res.sendStatus(201);

})

app.delete("/api/notes/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    Note.deleteOne({
        id:id
    })
    .then(()=>{console.log("Note Deleted")})
    .catch((err)=> console.log(err))
    res.sendStatus(200);
})

app.listen(port, ()=>{
    console.log(`Server started at Port ${port}`);
})

