import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const API_URL = "http://localhost:4000";

  async function fetchNotes(){
    try {
      const response = await axios.get(`${API_URL}/api/notes`);
      console.log(response.data);
      const res = response.data;
      if(res !== undefined){
        for (let i = 0; i < res.length; i++) {
            setNotes((prevNotes) => {
            console.log(res.length);
            return [...prevNotes, response.data[i]];
            
        })}

      } else {
        console.log("No Notes available to fetch");
      }
        // res.forEach(note => {
        //   return [...prevNotes, note];
        // });
    }
    catch (error) {
      console.log(error);
    }

  }

  async function addNote(newNote) {
    const postResponse = await axios.post(`${API_URL}/api/notes`, newNote);
    console.log(postResponse);
    setNotes((prevNotes) => {
      console.log(newNote);
      return [...prevNotes, newNote];
    });
  }
  async function deleteNote(id){

    const deleteResponse = await axios.delete(`${API_URL}/api/notes/${id}`);
    console.log(id);
    console.log(deleteResponse);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id
      });
    });

  }
  useEffect(()=>{

    fetchNotes();
    
  },[])
  return (
    <div>
      <Header />
      <CreateArea 
        onAdd={addNote}
      />
      {notes.map((noteItems, index) => {
        return (
          <Note
            id={noteItems.id}
            key={index}
            title={noteItems.title}
            content={noteItems.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
export default App;
