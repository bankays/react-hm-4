import React, { useState, useEffect } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const editContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    setContactToEdit(contact);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setGender(contact.gender);
  };

  const deleteContact = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const displayContacts = () => {
    let filteredContacts = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filterValue !== "all") {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.gender === filterValue
      );
    }

    return filteredContacts.map((contact) => (
      <tr key={contact.id}>
        <td>{contact.id}</td>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.gender}</td>
        <td>
          <button
            className="btn btn-warning"
            onClick={() => editContact(contact.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const resetForm = () => {
    setContactToEdit(null);
    setFirstName("");
    setLastName("");
    setGender("");
  };

  const saveContact = () => {
    if (contactToEdit) {
      const updatedContact = {
        id: contactToEdit.id,
        firstName,
        lastName,
        gender,
      };

      const updatedContacts = contacts.map((contact) =>
        contact.id === contactToEdit.id ? updatedContact : contact
      );

      setContacts(updatedContacts);
      resetForm();
    } else {
      const newContact = {
        id: contacts.length + 1,
        firstName,
        lastName,
        gender,
      };

      setContacts([...contacts, newContact]);
      resetForm();
    }
  };

  return (
    <div className="container py-3">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
        <select
          className="form-select"
          style={{ maxWidth: "150px !important" }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={resetForm}
        >
          Add Contact
        </button>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Gender</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{displayContacts()}</tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Contact
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <label className="form-label" htmlFor="firstName">
                  Firstname
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="form-label" htmlFor="lastName">
                  Lastname
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="form-label" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="form-select mb-3 ggg"
                  style={{ maxWidth: "30px !important" }}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={saveContact}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
