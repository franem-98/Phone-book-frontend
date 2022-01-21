import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import { saveContact, getContact } from "../services/contactService";

function ContactForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const contactSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().required().min(1).label("First name"),
    lastName: Joi.string().label("Last name"),
    number: Joi.string()
      .required()
      .min(9)
      .max(10)
      .pattern(/^[0-9]+$/)
      .label("Number"),
  });

  const validate = () => {
    const { error } = contactSchema.validate(data, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;

    return newErrors;
  };

  const validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({
      [name]: contactSchema.extract([name]),
    });
    const property = { [name]: value };
    const { error } = propertySchema.validate(property);
    return error ? error.details[0].message : null;
  };

  useEffect(() => {
    const onMount = async () => {
      try {
        const contactId = id;
        if (contactId === "new") return;
        const { data: contact } = await getContact(contactId);
        setData(mapToForm(contact));
      } catch (err) {
        if (err.response && err.response === 404)
          navigate("/notfound", { replace: true });
      }
    };

    onMount();
  }, [id, navigate]);

  const mapToForm = ({ id, firstName, lastName, number }) => {
    return {
      id,
      firstName,
      lastName,
      number,
    };
  };

  const handleChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors || {});
    if (newErrors) return;

    doSubmit();
  };

  const doSubmit = async () => {
    const dataToSubmit = {
      ...data,
      label: `${data.firstName} ${data.lastName}`,
    };
    await saveContact(dataToSubmit);

    navigate("/contacts");
  };

  return (
    <>
      <h1>New contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First name</label>
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
          <label className="form-label">Last name</label>
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
            type="text"
            name="number"
            value={data.number}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </>
  );
}

export default ContactForm;
