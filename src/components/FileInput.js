import { useRef, useEffect, useState } from "react";

function FileInput({ name, value, onChange }) {
  // fileinput 노드를 참조할 Ref 객체 생성
  const inputRef = useRef();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    // 인풋노드에 해당하는 inputRef.current 값이 있는지 확인
    const inputNode = inputRef.current;
    if (!inputNode) return;

    // DOM노드의 value값을 빈 문자열로 변경
    inputNode.value = "";
    // onChange로 상위 컴포넌트에도 빈 값 null로 변경해줌.
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    // URL.createObjectURL() == 사이드 이펙트
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 사이드 이펙트 정리함수
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    // inputRef객체를 파일 인풋에 ref Prop으로 내려줌.
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input type="file" onChange={handleChange} ref={inputRef} />
      {value && (
        <button type="button" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}

export default FileInput;
