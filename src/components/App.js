import FoodList from "./FoodList";
import { useState } from "react";
import { getFoods } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => {
    if (order === "createdAt") {
      // 문자열로 접근하므로 []대괄호 표기법으로 객체에 접근한다.
      return a[order] - b[order];
    } else {
      return b[order] - a[order];
    }
  });

  const handleDelete = (id) => {
    const NextItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(NextItems); // useState이므로 값이 변경되면 재렌더링을 함.
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleLoadClick = async () => {
    // 받아온 body에서 foods값만 destructuring해서 items State를 변경시킨다.
    const { foods } = await getFoods();
    setItems(foods);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
        <button onClick={handleLoadClick}>불러오기</button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
