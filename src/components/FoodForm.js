import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCalorieChange = (e) => {
    // 숫자가 아니면 0의 값을 가지도록 만들기 위해 OR 연산추가
    const nextCalorie = Number(e.target.value) || 0;
    setCalorie(nextCalorie);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form>
      <input name="title" value={title} onChange={handleTitleChange}></input>
      <input
        type="number"
        name="calorie"
        value={calorie}
        onChange={handleCalorieChange}
      ></input>
      <input
        name="content"
        value={content}
        onChange={handleContentChange}
      ></input>
    </form>
  );
}

export default FoodForm;
