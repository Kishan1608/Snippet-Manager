const router = require("express").Router();
const SnippetModel = require('../models/snippetModels');
const Auth = require('../middleware/auth');

router.get("/", Auth, async(req, res) => {
    try{
        const snippet = await SnippetModel.find({ user: req.user});
        res.json(snippet);
    }catch{
        res.status(500).send();
    }
})

router.post("/", Auth, async (req, res) => {
    try{
    const {title, description, code} = req.body;

    //validation

    if(!description && !code){
        return res.status(400).json({ errormessage: "You need to enter alteast a description or some code"});
    }
   
    const newSnippet = new SnippetModel({
        title, 
        description, 
        code,
        user: req.user,
    });

    const savedSnippet = await newSnippet.save();

    res.json(savedSnippet);
    }catch(err){
        res.status(500).json({ message: err.message});
    }
});

router.put("/:id", Auth, async(req, res) => {
    try{
        const {title, description, code} = req.body;
        const snippetId = req.params.id;
        
        //validation

        if(!description && !code){
            return res.status(400).json({ errormessage: "You need to enter alteast a description or some code"});
        }

        if(!snippetId) return res.status(400).json({ errormessage: "Snippet id not given_ please contact the developer"});

        const originalSnippet = await SnippetModel.findById(snippetId);
        if(!originalSnippet)  return res.status(400).json({ errormessage: "No Snippet with this ID found_ please contact the developer"});

        if(originalSnippet.user.toString() !== req.user)
            return res.status(401).json({errormessage: "Unauthorized"});

        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;

        const savedSnippet = await originalSnippet.save();

        res.json(savedSnippet);
        
    }catch(err){
        res.status(500).json({ message: err.message});
    } 
})

router.delete("/:id", Auth, async (req, res) => {
    try{
        const snippetId = req.params.id;
        
        //validation

        if(!snippetId) return res.status(400).json({ errormessage: "Snippet id not given_ please contact the developer"});

        const existingSnippet = await SnippetModel.findById(snippetId);
        if(!existingSnippet)  return res.status(400).json({ errormessage: "No Snippet with this ID found_ please contact the developer"});

        if(existingSnippet.user.toString() !== req.user)
            return res.status(401).json({errormessage: "Unauthorized"});

        await existingSnippet.delete();

        res.json(existingSnippet);

    }catch(err){
        res.status(500).json({ message: err.message});
    }
})

module.exports = router;