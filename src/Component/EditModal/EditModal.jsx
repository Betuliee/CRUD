const EditModal = ({
    setShowEditModal=()=>{}, 
    editItem={}, 
    setEditItem=()=>{},
    handleEditBook=()=>{}    
}) =>{

    return(


        <div className="modal-wrapperr">
            <div className="modall">
                <h5>Kitap Ismini Deuzenle</h5>
                <input onChange={(e)=> setEditItem({...editItem, title:e.target.value})} type="text" value={editItem.title} className="form-control" />
                <div className="d-flex justify-content-between mt-3">
                    <button onClick={()=> setShowEditModal(false)} className="btn btn-warning">Vazgeç</button>
                    <button onClick={() => handleEditBook()} className="btn btn-success">Kaydet</button>
                </div>
            </div>
        </div>
    )
};

export default EditModal