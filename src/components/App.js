import { useEffect, useState } from "react";
import { createFood, updateFood, getFoods, deleteFood } from "../api";
import FoodList from "./FoodList";
import FoodForm from "./FoodForm";
import LocaleContext from "../contexts/LocaleContext";

function App() {
  // 커서 기반 페이지네이션을 진행할 예정 !
  const [cursor, setCursor] = useState(null);
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");

  const sortedItems = items.sort((a, b) => {
    if (order === "createdAt") {
      // 문자열로 접근하므로 []대괄호 표기법으로 객체에 접근한다.
      return a[order] - b[order];
    } else {
      return b[order] - a[order];
    }
  });

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => items.filter((item) => item.id !== id)); // useState이므로 값이 변경되면 재렌더링을 함.
  };

  const handleNewestClick = () => setOrder("createdAt");

  const handleCalorieClick = () => setOrder("calorie");

  const handleLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const {
      // 리스폰스 결과 result에서 paging.nextCursor의 값을 가져온다.
      foods,
      paging: { nextCursor },
    } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    });
  };

  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  // handleLoad()를 한번만 실행시키기 위한
  // 콜백 함수랑 빈 배열로 useEffect 함수를 실행하면 딱 한 번만 실행할 수 있다.
  useEffect(() => {
    handleLoad({
      order,
      search,
    });
  }, [order, search]);

  return (
    // Context에 있는 Provider라는 컴포넌트로 Context를 적용
    // 넘겨줄 값은 value Prop으로 내려줌.
    <LocaleContext.Provider value="ko">
      <div>
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" />
          <button type="submit">검색</button>
        </form>
        <FoodList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
