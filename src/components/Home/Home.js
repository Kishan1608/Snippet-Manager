import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import Snippet from './Snippet';
import SnippetEditor from './SnippetEditor';
import './Home.scss';
import UserContext from '../../context/userContext';

function Home(){
    const[snippets, setSnippets] = useState([]);
    const[snippetEditorOpen, setSnippetEditorOpen] = useState(false);
    const[editSnippetData, setEditSnippetData] = useState(null);
    
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(!user){
            setSnippets([]);
            return;
        } else getSnippets();
    }, [user]);

    async function getSnippets(){
        const snippetRes = await Axios.get("http://localhost:5000/snippet/");
        setSnippets(snippetRes.data);
    }

    function editSnippet(snippetData){
        setEditSnippetData(snippetData);
        setSnippetEditorOpen(true);
    }

    function renderSnippets(){
        let sortedSnippets = [ ...snippets];
        sortedSnippets = sortedSnippets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return sortedSnippets.map((snippet, i) => {
            return <Snippet key={i} snippet={snippet} getSnippets={getSnippets} editSnippet={editSnippet}/>
        });
    }

    return(
        <div className="home">
        {!snippetEditorOpen && user !== null && (
            <button className="btn-editor-toggle" onClick={()=>{setSnippetEditorOpen(true)}}>
                Add Snippet
            </button>
        )}
        {snippetEditorOpen && (
            <SnippetEditor 
                setSnippetEditorOpen={setSnippetEditorOpen} 
                getSnippets={getSnippets}
                editSnippetData={editSnippetData}
            />  
        )}
        {renderSnippets()}
        {user === null && (
            <div className="card">
                <h2 >Welcome to Snippet Manager</h2>
                <p>Snippets are similar to having static preprocessing included in the editor, and do not
                require support by a compiler. On the flip side, this means that snippets cannot be invariably 
                modified after the fact, and thus is vulnerable to all of the problems of copy and paste 
                programming. For this reason snippets are primarily used for simple sections of code (with little 
                logic), or for boilerplate, such as copyright notices, function prototypes, common control 
                structures, or standard library imports.</p>
            </div>
        )}
        
        </div>
    )
}

export default Home;