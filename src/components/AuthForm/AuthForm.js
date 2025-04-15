import styled from "styled-components";
import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

const InputGroup = styled.div`
  margin-bottom: 5px;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  font-size: 0.9em;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;
`;

const AuthForm = ({ fields, submitText, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setErrors);
  };

  return (
    <FormContainer>
      <form
        style={{ width: "100%", maxWidth: "300px" }}
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <InputGroup key={field.name}>
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
            {errors[field.name] && (
              <ErrorMessage>{errors[field.name]}</ErrorMessage>
            )}
          </InputGroup>
        ))}
        <Button fullWidth type="submit">
          {submitText}
        </Button>
      </form>
    </FormContainer>
  );
};

export default AuthForm;
