import React from 'react'

const TodoList = ({ items }) => {
    return (
        <ul>
            {items.map((item, index) => (<li key={item.id}>{item.name}</li>))}
        </ul>
    )
}

export default TodoList
