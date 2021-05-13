import React from 'react';
import Axios from 'axios';
import './Snippet.scss';

function Snippet({snippet, getSnippets, editSnippet}){
    async function deleteSnippets(){
        if(window.confirm("Do you want to delete the Snippet?")){
        await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

        getSnippets();
        }
    }

    return <div className="snippet">
        {snippet.title && <h2 className="title">{snippet.title}</h2>}
        {snippet.description && <p className="description">{snippet.description}</p>}
        {snippet.code && (
            <pre className="code">
                <code>
                {snippet.code}
                </code>
            </pre>
        )}
        <button className="btn-edit" onClick={() => editSnippet(snippet)}>Edit</button>
        <button className="btn-delete" onClick={deleteSnippets}>Delete</button>
    </div>

}

export default Snippet;