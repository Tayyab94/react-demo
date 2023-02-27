import React, { useEffect, useState } from 'react'
import TodoList from './todoList';

const Todo = () => {
    const [text, setText] = useState("");
    const [items, setItems] = useState([]);

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        const newItem={
            "id":items.length +1,
            "name":text
        }

        if(items.find((data)=> data.name.toUpperCase() ==text.toUpperCase()))
        {
                alert("Name is already exist")
                return;
        }
        else{
            setItems([...items, newItem]);
        }  
    }

    // useEffect(()=>{
    //         console.warn(items)
    // },[items])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='id'>Input Item</label>
                <input type="text" id="id" onChange={(e) => setText(e.target.value)} />
                <button type='submit'>submit</button>
                <br />
                {/* <p>{text}</p> */}
            </form>
          <TodoList  items={items} />
        </div>
    )
}

export default Todo
