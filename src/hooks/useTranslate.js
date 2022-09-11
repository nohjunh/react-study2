import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
  },
};

function useTranslate() {
  const locale = useLocale();

  const translate = (key) => dict[locale][key] || "";
  return translate; // 값이 아니라 함수를 리턴하는 것이다.
}

export default useTranslate;
