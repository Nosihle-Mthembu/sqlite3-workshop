import axios from "axios";
import { useState, useEffect } from "react";

function AllUsers() {
  const [getAllUsers, setGetAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // new state variable to store the user being edited
  const [isEditing, setIsEditing] = useState(false); // new state variable to track if we're editing

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      setGetAllUsers(response.data);
    }).catch((error) => {
      console.log("this is Error", error);
    })
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setGetAllUsers(getAllUsers.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  function handleEdit(id) {
    const userToEdit = getAllUsers.find((user) => user.id === id);
    setEditingUser(userToEdit); // set the user being edited
    setIsEditing(true); // set isEditing to true
  };

  function handleSubmitEdit(id) {
    const userData = { name: document.getElementById('name-input').value, title: document.getElementById('title-input').value };
    axios.put(`http://localhost:5000/users/${id}`, userData)
      .then((response) => {
        const updatedUser = response.data;
        setGetAllUsers(getAllUsers.map((user) => user.id === id ? updatedUser : user));
        setEditingUser(null); // reset the editing user state
        setIsEditing(false); // reset isEditing to false
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        console.error('Error response:', error.response);
      });
  };

  function handleSubmit() {
    const userData = { name: document.getElementById('name-input').value, title: document.getElementById('title-input').value };
    axios.post("http://localhost:5000/users", userData)
      .then((response) => {
        const newUser = response.data;
        setGetAllUsers([...getAllUsers, newUser]);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        console.error('Error response:', error.response);
      });
  };

  return (
    <>
      <div>
        {getAllUsers.map((list, index) => (
          isEditing && list.id === editingUser.id ? (
            <form key={index} onSubmit={(e) => {
              e.preventDefault();
              handleSubmitEdit(editingUser.id);
            }}>
              <label>
                Name:
                <input type="text" id="name-input" defaultValue={editingUser.name} />
              </label>
              <br />
              <label>
                Title:
                <input type="text" id="title-input" defaultValue={editingUser.title} />
              </label>
              <br />
              <button type="submit">Submit Edit</button>
            </form>
          ) : (
            <div key={index} id={list.id} className="w3-card-4 w3-dark-grey" style={{ marginTop: "3%", position: "relative", width: "20%", height: "70%", textAlign: "center" }}>
              <p>User ID: {list.id}</p>
              <i>Name is: {list.name}</i>
              <div className="w3-container w3-center">
                <h3>{list.title}</h3>
                <button className="w3-button w3-green" onClick={() => handleEdit(list.id)}>Edit</button>
                <button className="w3-button w3-red" onClick={() => handleDelete(list.id)}>Delete</button>
              </div>
            </div>
          )
        ))}
      </div>
    </>
  )
}

export default AllUsers