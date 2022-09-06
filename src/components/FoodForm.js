import { useState } from "react";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;
    default:
      return value;
  }
}

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
      ></input>
      <input
        name="content"
        value={values.content}
        onChange={handleChange}
      ></input>
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;
