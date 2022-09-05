import FoodList from "./FoodList";
import { useEffect, useState } from "react";
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

  const handleLoad = async (orderQuery) => {
    // 받아온 body에서 foods값만 destructuring해서 items State를 변경시킨다.
    const { foods } = await getFoods(orderQuery);
    setItems(foods);
  };

  // handleLoad()를 한번만 실행시키기 위한
  // 콜백 함수랑 빈 배열로 useEffect 함수를 실행하면 딱 한 번만 실행할 수 있다.
  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
