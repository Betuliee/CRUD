import { useState } from "react";
import Header from "./Component/Header/HeaderComponent";
import { toast } from "react-toastify";
import { v4 } from 'uuid'
import BookCard from "./Component/BookCard/Bookcard";
import DeleteModal from "./Component/DeleteModal/DeleteModal";
import EditModal from "./Component/EditModal/EditModal";

function App() {

  const [bookName, setBookName] = useState('');
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  const handleChange = (e) => {
    setBookName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!bookName) {
      toast.warn('Lutfen Kitap ismi Giriniz', { autoClose: 2000 })
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    console.log('Yeni kitap', newBook)

    setBooks([...books, newBook])
    toast.success('Kitap Basariyla eklendi', { autoClose: 2000 })
    setBookName('')
  };
  console.log('Kitaplar dizisi', books)

  const handleModal = (deletedBookId, deleteBookTitle) => {
    setDeleteId(deletedBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  }

  const handleDelete = () => {
    const filteresBooks = books.filter((book) => book.id !== deleteId);
    setBooks(filteresBooks);
    setShowDeleteModal(false);

    toast.error('Kitap Basariyla silindi', { autoClose: 2000 })
  }

  const handleEditModal = (editBook) => {
    setEditItem(editBook);
    setShowEditModal(true);
  }

  const handleEditBook = () => {
    const editIndex = books.findIndex((book) => book.id === editItem.id);
    const cloneBooks = [...books];
    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false)
    toast.success('Kitap Basariyla Guncellendi', { autoClose: 2000 })
  }

  const handleRead = (readBook) => {
    // console.log(readBook.isRead)
    const updatedBook = { ...readBook, isRead: !readBook.isRead };

    const index = books.findIndex((book) => book.id === readBook.id);

    const cloneBooks = [...books];
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  }

  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            type="text"
            className="form-control shadow"
            placeholder="Bir kitap ismi giriniz..." />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {books.length === 0 ? (<h4>Henuz herhangi bir kitap eklenmedi</h4>) : (books.map((book) => <BookCard handleEditModal={handleEditModal} handleModal={handleModal} bookInfo={book} key={book.id} handleRead={handleRead} />)
        )}
      </div>
      {showDeleteModal &&
        <DeleteModal bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      }
      {showEditModal && <EditModal handleEditBook={handleEditBook} editItem={editItem} setEditItem={setEditItem} setShowEditModal={setShowEditModal} />}
    </div>
  );
}

export default App;
