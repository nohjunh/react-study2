import { useState } from "react";
import FileInput from "./FileInput";
import { createFood } from "../api";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;
    default:
      return value;
  }
}

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function FoodForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSumitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleChange = (name, value) => {
    // 리턴값이 함수가 아니라 객체이면
    // setValues의 콜백함수에서 리턴부를 ()로 넣어주면
    // 리액트가 이 부분이 함수리턴이 아니라 객체리턴으로 이해한다.
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 윈도우의 기본동작을 막는다.
    const formData = new FormData();
    // 키,값 쌍을 저장해준다.
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    let result;
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await createFood(formData);
    } catch (e) {
      setSubmittingError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(food);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
      ></input>
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      ></input>
      <input
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></input>
      <button disabled={isSumitting} type="submit">
        확인
      </button>
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;
