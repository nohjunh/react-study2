import FoodList from "./FoodList";
import { useEffect, useState } from "react";
import { getFoods } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  // 커서 기반 페이지네이션을 진행할 예정 !
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

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

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);
    } catch (e) {
      setLoadingError(e);
    } finally {
      setIsLoading(false);
    }
    const {
      // 리스폰스 결과 result에서 paging.nextCursor의 값을 가져온다.
      paging: { nextCursor },
      foods,
    } = result;
    if (options.cursor !== undefined) {
      setItems((prevItems) => [...prevItems, ...foods]);
    } else {
      setItems(foods);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = async () => {
    await handleLoad({ order, cursor });
  };

  // handleLoad()를 한번만 실행시키기 위한
  // 콜백 함수랑 빈 배열로 useEffect 함수를 실행하면 딱 한 번만 실행할 수 있다.
  useEffect(() => {
    handleLoad({ order });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
