import React from 'react'
{/* <h1>{book._id} - {book.name}</h1> */ }
const BookDetail = ({ book , getSingleBook,DeleteBookById}) => {
    return (
       <tr>
            <td>
                {book._id}
            </td>
            <td>
                {book.name}
            </td>
            <td>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> getSingleBook(book._id)}> update</button>
            |      <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> DeleteBookById(book._id)}> Delete</button>
            </td>
       </tr>
    )
}

export default BookDetail
