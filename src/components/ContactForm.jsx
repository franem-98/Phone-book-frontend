import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import {
  saveContact,
  getContact,
  getContacts,
} from "../services/contactService";
import Input from "../common/Input";
import Button from "./../common/Button";

function ContactForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });
  const [errors, setErrors] = useState({});
  const [contacts, setContacts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const contactSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().required().min(1).label("First name"),
    lastName: Joi.string().allow("").label("Last name"),
    number: Joi.string()
      .required()
      .min(9)
      .max(10)
      .pattern(/^[0-9]+$/)
      .label("Number"),
  });

  useEffect(() => {
    const onMount = async () => {
      const { data: myContacts } = await getContacts();
      setContacts(myContacts);
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

  const numberAlreadyExists = (number) => {
    const existingContact = contacts.find((c) => c.number === number);
    return existingContact;
  };

  const validate = () => {
    if (numberAlreadyExists(data.number)) {
      return { number: "A contact with this number already exists." };
    }

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

    if (name === "number" && numberAlreadyExists(value)) {
      return "A contact with this number already exists.";
    }

    const property = { [name]: value };
    const { error } = propertySchema.validate(property);
    return error ? error.details[0].message : null;
  };

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
    await saveContact(data);

    navigate("/contacts");
  };

  const { firstName, lastName, number } = data;

  return (
    <>
      <h1>New contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First name</label>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last name</label>
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number</label>
          <Input
            type="text"
            name="number"
            value={number}
            onChange={handleChange}
            error={errors.number}
          />
        </div>
        <Button disabled={validate()} type="submit" label="Add" />
      </form>
    </>
  );
}

export default ContactForm;
