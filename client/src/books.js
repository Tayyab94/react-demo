import React, { useState } from 'react';
import BookDetail from './bookdetail';
import ReCAPTCHA  from "react-google-recaptcha"
import styles from './book.module.css'
const Books = () => {
    const [booksList, setBooksList] = useState([]);
    const [bookName, setBookName]= useState("")
    const [updateBook, setUpdateBook]=useState({})
    const [isUpdating, setIsUpdating]=useState(false);
    const [updateingBookId, setUpdatingBookId]=useState(0);
    const [recaptcha, setRecaptcha]= useState(false);
    const Getbookslist = async () => {
        await fetch("http://localhost:1003/api/book")
            .then(result => result.json())
            .then(data => {
                setBooksList(data);
            }).catch(console.log)
    }


    const saveBook=()=>{
        alert(bookName);

        var newbook ={
           id: booksList.length +1,
           name: bookName
        }
        fetch("http://localhost:1003/api/book/addbook",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(newbook)
        }).then(data=>{
            console.log(data)
            Getbookslist();
            setBookName("")
        })

        
    }

    const getSingleBook=(id)=>{
   
        fetch("http://localhost:1003/api/book/"+id,{
            method:"GET",
            headers:{
                "context-type":"application/json"
            }
        }).then(data=> data.json()).then(result=>{
            setUpdateBook({id:result._id, name:result.name});
            setBookName(result.name)
            setIsUpdating(true);
            setUpdatingBookId(id);
        })
    }

    const updateRecord=async()=>{

        var updatingbook ={
            book:{
                name:bookName
            }
         }

        await fetch("http://localhost:1003/api/book/"+updateingBookId,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(updatingbook)
        }).then(result=>{
            Getbookslist();
            setBookName("")
            // setUpdateBook({id:result._id, name:result.name});
            // setBookName(result.name)
            // setIsUpdating(true);
            // setUpdatingBookId(id);
        })
    };

    const DeleteBookById=(id)=>{
        fetch("http://localhost:1003/api/book/"+id,{
            method:"DELETE",
        }).then(
            this.Getbookslist()
        )
    }

    const handleCaptcha =(value)=>{
        console.warn(value)
        setRecaptcha(true);
    }

    return (
        <div>
   
        <div className='row'>
            <div className='col-6'>
            <button className='btn btn-primary' onClick={Getbookslist} type="button" >Get List</button> 
            {booksList.length>0 && (  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add new</button>)}
            </div>
            <div className='col-lg-6'>
            <table className='table table-responsive table-strap table-condence'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{booksList.map((item) =>
                (

                    <BookDetail key={item._id} book={item} getSingleBook={getSingleBook} DeleteBookById={DeleteBookById} />
                )
                )}

                </tbody>
            </table>
            </div>
        </div>
   



<div className="modal fade" id="exampleModal" tabIndex={"-1"} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label htmlFor='name' className="form-label">Book name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={bookName} onChange={(e)=> setBookName(e.target.value)} />
    <div id="emailHelp" className="form-text">Please Enter Book Name.</div>
  </div>
      </div>
      <div className={`card-footer ${styles.recap}`}>
        <div className={styles.formbtns}>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" disabled={!recaptcha} onClick={!isUpdating?  saveBook:updateRecord}>{!isUpdating?"Add New":"Update"}</button>
     
        </div>
       
     <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptcha} />
     
     
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Books;
