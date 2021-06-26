import React,{useState, useEffect} from "react"
import Todo from './Todo'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');
  //state gets cleared as soon as you click refresh. we use setTodos to update the todo array
  
  useEffect(() => {
    // this code here..fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      console.log(snapshot.docs.map(doc => doc.data().todo));
      setTodos(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo})))
    })
  }, []);  
  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
 
  const addTodos = (event) =>{
    event.preventDefault();
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //setTodos([...todos,input]); 
    //... are called spread. all the current contents will appemd
    setInput('')// to clear input box after you submit
  }
  return (
    
    <div className="App">

      <FormControl>
        <InputLabel >Add Tasks :</InputLabel>
        <Input  value={input} onChange={event => setInput (event.target.value)} />
        <Button disabled={!input} type="submit" onClick={addTodos} variant="contained" color="primary">
        Add todo
        </Button>
      </FormControl>

    
       

        {/* <button type="submit" onClick={addTodos}>Add todo </button>  */}
        {/* type submit will refresh.therefore to prevent refreshing we use event.preventDefault  */}
    

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>

      
    </div>
  );
}

export default App;
