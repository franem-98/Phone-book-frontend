import React from "react";

function AddContact() {
  return (
    <>
      <h1>New contact</h1>
      <form>
        <div className="mb-3">
          <label class="form-label">First name</label>
          <input type="text" className="form-control" autoFocus />
        </div>
        <div className="mb-3">
          <label class="form-label">Last name</label>
          <input type="text" className="form-control" autoFocus />
        </div>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input type="phone-number" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default AddContact;
