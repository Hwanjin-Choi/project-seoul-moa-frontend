import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";

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
const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-evenly;
`;

const RegiForm = ({ fields, submitText, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, gender: selectedGender }, setErrors);
  };
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (value) => {
    setSelectedGender(value);
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
        <RadioContainer>
          <Radio
            label="남자"
            value="male"
            checked={selectedGender === "male"}
            onChange={() => handleGenderChange("male")}
          />
          <Radio
            label="여자"
            value="male"
            checked={selectedGender === "female"}
            onChange={() => handleGenderChange("female")}
          />
        </RadioContainer>

        <Button fullWidth type="submit">
          {submitText}
        </Button>
      </form>
    </FormContainer>
  );
};

export default RegiForm;
