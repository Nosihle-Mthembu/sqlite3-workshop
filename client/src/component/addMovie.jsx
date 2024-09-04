import axios from "axios";
import { useState } from "react";

function AddMovie() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [storeData, setStoreData] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const userData = { name, age };
    const movieData = { movieName, genre, year };

    axios.post("http://localhost:5000/users", userData)
      .then((response) => {
        setStoreData([...storeData, movieData]);
      })
      .catch((error) => {
        console.log("This is an error", error);
      });
  }

  return (
    <>
      <div
        style={{
          width: "40%",
          boxSizing: "border-box",
          border: "2px solid #ccc",
          fontSize: "16px",
          backgroundColor: "white",
          backgroundPosition: "10px 10px",
          padding: "12px 20px 12px 40px",
        }}
      >
        <h1>Movie List</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        /><br></br>
        <button onClick={handleSubmit}>Add Movie</button>
      </div>
    </>
  );
}

export default AddMovie;