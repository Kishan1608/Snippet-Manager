const router = require("express").Router();
const { ensureIndexes } = require("../models/snippetModels");
const Snippet = require("../models/snippetModels");
const SnippetModel = require('../models/snippetModels');

router.get("/", async(req, res) => {
    try{
        const snippet = await SnippetModel.find();
        res.json(snippet);
    }catch{
        res.status(500).send();
    }
})

router.post("/", async (req, res) => {
    try{
    const {title, description, code} = req.body;

    //validation

    if(!description && !code){
        return res.status(400).json({ errormessage: "You need to enter alteast a description or some code"});
    }
   
    const newSnippet = new SnippetModel({
        title, description, code
    });

    const savedSnippet = await newSnippet.save();

    res.json(savedSnippet);
    }catch(err){
        res.status(500).json({ message: err.message});
    }
});

router.put("/:id", async(req, res) => {
    try{
        const {title, description, code} = req.body;
        const snippetId = req.params.id;
        
        //validation

        if(!description && !code){
            return res.status(400).json({ errormessage: "You need to enter alteast a description or some code"});
        }

        if(!snippetId) return res.status(400).json({ errormessage: "Snippet id not given_ please contact the developer"});

        const originalSnippet = await Snippet.findById(snippetId);
        if(!originalSnippet)  return res.status(400).json({ errormessage: "No Snippet with this ID found_ please contact the developer"});

        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;

        const savedSnippet = await originalSnippet.save();

        res.json(savedSnippet);
        
    }catch(err){
        res.status(500).json({ message: err.message});
    } 
})

router.delete("/:id", async (req, res) => {
    try{
        const snippetId = req.params.id;
        
        //validation

        if(!snippetId) return res.status(400).json({ errormessage: "Snippet id not given_ please contact the developer"});

        const existingSnippet = await Snippet.findById(snippetId);
        if(!existingSnippet)  return res.status(400).json({ errormessage: "No Snippet with this ID found_ please contact the developer"});

        await existingSnippet.delete();

        res.json(existingSnippet);

    }catch(err){
        res.status(500).json({ message: err.message});
    }
})

module.exports = router;