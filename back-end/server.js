const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 4000
const path = require('path')
var ObjectID = require('mongodb').ObjectID;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

//Mongoose Stuff
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.fk5vge6.mongodb.net/?retryWrites=true&w=majority');
}

//Team Schema - Teams consist of a team name, the creator of the team, and a string array of Pokémon in the team.
const teamSchema = new mongoose.Schema({
    teamName: String,
    creator: String,
    pokemon: [String]
});

const teamModel = mongoose.model('Team', teamSchema);

//CORS code
const cors = require('cors');
const { ObjectId } = require('mongodb')
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();

});


app.get('/api/teams/searchName/:teamName', async (req, res) => {
    let teams = await teamModel.find({title: req.params.teamName});
    res.json(teams);
})
app.get('/api/teams/searchID/:teamID', async (req, res) => {
    let teams = await teamModel.find({_id: req.params.teamID});
    res.json(teams);
})

app.delete('/api/teams/deleteID/:teamID', async (req, res) => {
    await teamModel.findByIdAndDelete(req.params.teamID);
    console.log("deleted: "+req.params.teamID)
    res.send("Team Deleted");
})

app.get('/api/teams', async (req, res) => {
    let teams = await teamModel.find({});
    res.json(teams);
})

//Send a team to the database
app.post('/api/teams', (req, res) => {

    console.log(req.body);

    teamModel.create({
        teamName:req.body.teamName,
        creator:req.body.creator,
        pokemon:req.body.pokemon,

    }).then(()=>{res.send("Team Created")})
    .catch(()=>{res.send("Team Not Created")});
})

//Update a team in the database
app.put('/api/teams/:id', async (req, res) => {
    console.log(req.body)

    let team = await teamModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(() => {res.send("Team Updated")})
    .catch(() => {res.send("Team not Updated")});
})

//Send Back React App
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+"/../build/index.html"));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})