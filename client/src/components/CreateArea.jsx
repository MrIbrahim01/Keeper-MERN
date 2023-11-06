import React, { useState } from "react";
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [active, setActive] = useState(false);

  function handleChange(event){
    const { name, value } = event.target;
    setNote(prevNote => {
        return{
            ...prevNote,
            [name] : value
        };
    })
  }
  function submitNote(event){
    props.onAdd(note);
    setNote({
        title:"",
        content:""
    })
    event.preventDefault();
  }
  function handleContentClick(){
    setActive(true);
  }
  return (
    <div>
    <form className="create-note">
    {active ? <input
      name="title"
      value={note.title}
      onChange={handleChange}
      placeholder="Title" 
      /> : null} 

      <textarea 
      name="content"
      value={note.content}
      onChange={handleChange}
      onClick={handleContentClick}
      placeholder="Type Content Here"
      rows={active ? "3" : "1"}
      />
      
      <Zoom in={active}>
        <Fab onClick={submitNote}><AddIcon /></Fab>
      </Zoom>
      {/* {active?<button onClick={submitNote}> <AddIcon /> </button>:null} */}
    </form>
    </div>
  );
}
export default CreateArea;
