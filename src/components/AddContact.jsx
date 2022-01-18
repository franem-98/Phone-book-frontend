import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveContact } from "../services/contactService";

function AddContact() {
  const [data, setData] = useState({ firstName: "", lastName: "", number: "" });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    await saveContact({
      firstName: `${data.firstName}`,
      lastName: `${data.lastName}`,
      number: data.number,
    });

    navigate("/contacts");
  };

  return (
    <>
      <h1>New contact</h1>
      <form onSubmit={doSubmit}>
        <div className="mb-3">
          <label class="form-label">First name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            className="form-control"
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label class="form-label">Last name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            className="form-control"
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input
            type="number"
            name="number"
            value={data.number}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default AddContact;
