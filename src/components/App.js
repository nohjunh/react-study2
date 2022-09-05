import FoodList from "./FoodList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => {
    if (order === "createdAt") {
      // 문자열로 접근하므로 []대괄호 표기법으로 객체에 접근한다.
      return a[order] - b[order];
    } else {
      return b[order] - a[order];
    }
  });

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} />
    </div>
  );
}

export default App;
