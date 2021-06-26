import React, {useState} from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Button, Modal} from '@material-ui/core';
import './Todo.css';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    },
}));
      

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input,setInput] = useState('')
    const handleOpen =() =>{
        setOpen(true)
    }

    const updateTodo = () => {
        //update the todo with new input
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        },{merge:true})
        setOpen(false)
    }


    return (
        
        <div>
        <Modal open={open}
        close={e => setOpen(false)}>
            <div className={classes.paper}>
                <h2>Edit</h2>
                <input placeholder={props.todo.todo} value ={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick= {e => setOpen(false)}>Close</Button>
                <Button onClick= {updateTodo}>Update</Button>
            </div>
        </Modal>        
        <List className="todo_list">  
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText
                primary={props.todo.todo} secondary="Deadline : 1/10/2021" />
            </ListItem>
            <Button onClick = {e => setOpen(true)}>Edit</Button>
            <Button 
            onClick= {
                event => db.collection('todos').doc(props.todo.id).delete()
            }> Delete me </Button>
        </List>      
    
        </div>
    )
}

export default Todo
