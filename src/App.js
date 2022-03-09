import React from "react";
import styled from "styled-components";

import { GoogleFormProvider, useGoogleForm } from "react-google-forms-hooks";

import form from "./form.json";

import CheckboxInput from "./components/CheckboxInput";
import RadioInput from "./components/RadioInput";
import ShortAnswerInput from "./components/ShortAnswerInput";
import LongAnswerInput from "./components/LongAnswerInput";
import RadioGridInput from "./components/RadioGridInput";
import CheckboxGridInput from "./components/CheckboxGridInput";
import DropdownInput from "./components/DropdownInput";
import LinearGrid from "./components/LinearGrid";

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 50px 0;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionLabel = styled.h3`
  margin-bottom: 10px;
`;

const Questions = () => {
  return (
    <div>
      {form.fields.map((field) => {
        const { id } = field;

        let questionInput = null;
        switch (field.type) {
          case "CHECKBOX":
            questionInput = <CheckboxInput id={id} />;
            break;
          case "RADIO":
            questionInput = <RadioInput id={id} />;
            break;
          case "SHORT_ANSWER":
            questionInput = <ShortAnswerInput id={id} />;
            break;
          case "LONG_ANSWER":
            questionInput = <LongAnswerInput id={id} />;
            break;
          case "RADIO_GRID":
            questionInput = <RadioGridInput id={id} />;
            break;
          case "CHECKBOX_GRID":
            questionInput = <CheckboxGridInput id={id} />;
            break;
          case "DROPDOWN":
            questionInput = <DropdownInput id={id} />;
            break;
          case "LINEAR":
            questionInput = <LinearGrid id={id} />;
            break;
          default:
            return null;
        }

        if (!questionInput) {
          return null;
        }

        return (
          <QuestionContainer key={id}>
            <QuestionLabel>{field.label}</QuestionLabel>
            {questionInput}
          </QuestionContainer>
        );
      })}
    </div>
  );
};

const App = () => {
  const methods = useGoogleForm({ form });
  const onSubmit = async (data) => {
    console.log(">>> Here is the data", data);
    await methods.submitToGoogleForms(data);
    alert("Form submitted with success!");
  };

  console.log(">>> Here are the errors!!!", methods.formState.errors);

  return (
    <GoogleFormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Questions />
        <button type="submit">Submit</button>
      </Form>
    </GoogleFormProvider>
  );
};

export default App;
