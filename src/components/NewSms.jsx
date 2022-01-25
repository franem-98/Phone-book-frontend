import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { sendMessage } from "../services/smsService";
import Input from "../common/Input";
import TextArea from "./../common/TextArea";
import Button from "../common/Button";

function NewSms() {
  const [data, setData] = useState({
    number: "",
    message: "",
  });
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
    const timestamp = new Date().toISOString();

    const dataToSubmit = { ...data, timestamp };
    await sendMessage(dataToSubmit);

    navigate("/smshistory");
  };

  return (
    <>
      <h2 className="page-top">Text message</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="number"
          value={data.number}
          onChange={handleChange}
          placeholder="Enter number"
          error={errors.number}
        />
        <TextArea
          name="message"
          value={data.message}
          onChange={handleChange}
          placeholder="Enter message..."
          error={errors.message}
        />
        <Button disabled={validate()} type="submit" label="Send" />
      </form>
    </>
  );
}

export default NewSms;
