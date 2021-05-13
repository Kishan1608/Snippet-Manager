import React,{ useEffect, useState } from 'react';
import Axios from 'axios';
import './SnippetEditor.scss';
import ErrorMessage from '../misc/ErrorMessage';

function SnippetEditor({getSnippets, setSnippetEditorOpen, editSnippetData}) {
    const[editorTitle, setEditorTitle] = useState("");
    const[editorDescription, setEditorDescription] = useState("");
    const[editorCode, setEditorCode] = useState("");
    const [errormessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if(editSnippetData) {
            setEditorTitle(editSnippetData.title ? editSnippetData.title : "");
            setEditorDescription(editSnippetData.description ? editSnippetData.description : "");
            setEditorCode(editSnippetData.code ? editSnippetData.code : "");
        }
    }, [editSnippetData])

    async function saveSnippets(e){
        e.preventDefault();

        const snippetData = {
            title: editorTitle ? editorTitle : undefined ,
            description: editorDescription ? editorDescription : undefined,
            code: editorCode ? editorCode : undefined,
        };

        try{
            if(!editSnippetData)
                await Axios.post("http://localhost:5000/snippet", snippetData);
            else
                await Axios.put(`http://localhost:5000/snippet/${editSnippetData._id}`, snippetData);
        }catch(err){
            if(err.response){
                if(err.response.data.errormessage){
                    setErrorMessage(err.response.data.errormessage);
                }
            }
            return
        }

        getSnippets();
        closeEditor();
    }

    function closeEditor(){
        setSnippetEditorOpen(false);
        setEditorTitle("");
        setEditorDescription("");
        setEditorCode("");
    }

    return <div className="snippet-editor">
    {
        errormessage && <ErrorMessage message={errormessage} clear={() => setErrorMessage(null)}/>
    }
    <form className="form" onSubmit={saveSnippets}>
        <label htmlFor="editor-title">Title</label>
        <input id="editor-title" type="text" 
            value={editorTitle}
            onChange={(e) => {setEditorTitle(e.target.value)}}
        />

        <label htmlFor="editor-description">Description</label>
        <input id="editor-description" type="text" 
            value={editorDescription}
            onChange={(e) => {setEditorDescription(e.target.value)}}
        />

        <label htmlFor="editor-code">Code</label>
        <textarea id="editor-code"
            value={editorCode}
            onChange={(e) => {setEditorCode(e.target.value)}}
        />

        <button className="btn-save" type="submit">Save</button>
        <button className="btn-cancel" type="button" onClick={closeEditor}>Cancel</button>
    </form>
</div>
}

export default SnippetEditor;