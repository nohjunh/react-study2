import "./FoodList.css";
import { useContext, useState } from "react";
import FoodForm from "./FoodForm";
import LocaleContext from "../contexts/LocaleContext";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt } = item;

  // Context 값을 사용하려면 useContext 함수 사용
  const locale = useContext(LocaleContext);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <p>현재 언어: {locale}</p>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content, imgFile: null };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (newItem) => {
            onUpdateSuccess(newItem);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
