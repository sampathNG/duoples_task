"use client";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Home() {
  const [make, setMake] = useState(false);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    author: "",
    year: "",
    price: "",
  });
  const createBook = () => {
    setMake(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, title, author, year, price } = formData;
      const response = await axios.post("http://localhost:8000/books/", {
        title,
        author,
        year,
        price,
        id,
      });
      console.log("book added successfully", response);
      setMake(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      console.log("book deleted successfully", response);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/books/");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  });
  return (
    <main className="grid">
      <header className="bg-blue-500 w-screen h-20 flex justify-around items-start text-center">
        <h1 className="text-slate-800 text-xl text-center mt-6">
          DUOPLES TASK
        </h1>
        <button
          className="text-blue-700 mt-6 h-8 w-32 font-normal border-2 text-xl border-solid border-blue-700 bg-white hover:bg-black hover:text-white"
          onClick={createBook}
        >
          Add Book
        </button>
      </header>
      {!make && (
        <div className="mt-8 mx-auto w-4/5">
          <h2 className="text-2xl font-semibold mb-4">Books</h2>
          <ul>
            {books.map((book) => (
              <li key={book.id} className="mb-4 grid">
                <h1 className="text-lg font-semibold">Id:{book.id}</h1>
                <h1 className="text-lg font-semibold">Title:{book.title}</h1>
                <h1 className="text-lg font-semibold">Author:{book.author}</h1>
                <h1 className="text-lg font-semibold">Price:{book.price}</h1>
                <h1 className="text-lg font-semibold">Year:{book.year}</h1>
                <div>
                  <button
                    type="button"
                    className="bg-blue-700 text-white font-semibold p-2 rounded m-5 hover:bg-black"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {make && (
        <div className="mt-32 flex justify-center">
          <form className="w-4/12 grid">
            <label className="ml-5">ID</label>
            <input
              type="number"
              id="id"
              name="id"
              placeholder="id"
              value={formData.id}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <label className="ml-5">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              className="focus:outline-none h-10 border border-solid border-gray-400 py-6 px-4 m-5"
              required
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold p-4 rounded m-5 hover:bg-black"
              onClick={handleSubmit}
            >
              Add Book
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
