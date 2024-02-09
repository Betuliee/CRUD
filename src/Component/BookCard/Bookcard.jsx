import React from "react"

const BookCard = ({bookInfo, handleModal, handleEditModal, handleRead}) => {

    const{title, date, isRead, id} = bookInfo;

   return(
        <div className="d-flex justify-content-between align-items-center p-3 mt-5 border rounded shadow">
            <div>
            <h5 style={{ textDecoration: isRead ? "line-through": "none", }}>
                {title}</h5>

            <p>{date}</p>

            </div>


       <div className="btn-group">
       <button className="btn btn-danger" onClick={() => {handleModal(id, title)}}>Sil</button>
        <button className="btn btn-primary"  onClick={() => {handleEditModal(bookInfo)}} >Duzenle</button>
        <button className="btn btn-success" onClick={()=> handleRead(bookInfo)}>{isRead === true ? 'Okundu': 'Okunmadi'}</button>

       </div>


        </div>
    )
}


export default BookCard