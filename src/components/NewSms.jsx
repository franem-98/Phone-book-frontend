import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { sendMessage } from "../services/smsService";
import { getContacts } from "../services/contactService";
import getCurrentDateTime from "./../services/currentDateTime";

function NewSms() {
  const [data, setData] = useState({
    number: "",
    message: "",
  });
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const smsSchema = Joi.object({
    number: Joi.string()
      .required()
      .min(9)
      .max(10)
      .pattern(/^[0-9]+$/)
      .label("Number"),

    message: Joi.string().required().max(255).label("Message"),
  });

  const validate = () => {
    const { error } = smsSchema.validate(data, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) newErrors[item.path[0]] = item.message;

    return newErrors;
  };

  const validateProperty = ({ name, value }) => {
    const propertySchema = Joi.object({
      [name]: smsSchema.extract([name]),
    });
    const property = { [name]: value };
    const { error } = propertySchema.validate(property);
    return error ? error.details[0].message : null;
  };

  useEffect(() => {
    const onMount = async () => {
      const { data: myContacts } = await getContacts();
      setContacts(myContacts);
    };

    onMount();
  }, [contacts]);

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

  const doSubmit = async (e) => {
    const timestamp = getCurrentDateTime();
    const existingContact = contacts.find((c) => c.number === data.number);
    const contactLabel = existingContact ? existingContact.label : data.number;

    const dataToSubmit = { ...data, contactLabel, timestamp };
    await sendMessage(dataToSubmit);

    navigate("/smshistory");
  };

  return (
    <>
      <h2 className="page-top">Text message</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="number"
            value={data.contact}
            onChange={handleChange}
            autoFocus
            placeholder="Enter number"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="message-input"
            name="message"
            value={data.message}
            onChange={handleChange}
            placeholder="Enter message..."
          />
        </div>
        <button disabled={validate()} type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </>
  );
}

export default NewSms;
