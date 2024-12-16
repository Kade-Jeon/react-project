import "./Editor.css";
import attach from "../assets/attach-black.png";

import { useEffect, useState } from "react";

import Button from "./Button";

const Editor = ({ initData, handleInput }) => {
  const [file, setFile] = useState();
  const [base64Image, setBase64Image] = useState("");
  const [input, setInput] = useState({
    date: "",
    content: "",
    img: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
      });
      setBase64Image(initData.img);
    }
  }, [initData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let name = e.target.name;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64Image(reader.result);
        setFile(file);
        setInput({
          ...input,
          [name]: reader.result,
        });
      };

      reader.onerror = (error) => {
        alert("이미지 업로드 중 오류가 발생하였습니다.");
      };

      reader.readAsDataURL(file); // 파일을 Base64로 읽음
    }
  };

  const onClickUpload = () => {
    document.getElementById("upload_btn").click();
  };

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickResetImage = () => {
    setFile();
    setBase64Image();
    setInput({
      ...input,
      img:"",
    })
  };

  useEffect(()=>{
    handleInput(input);
  },[input])

  return (
    <div className="Editor">
      {base64Image ? (<div className="image_header">
        <Button
          className="reset_image"
          name={"RESET"}
          color={"red"}
          hoverColor={"red"}
          onClick={onClickResetImage}
        />
      </div>) : ""}
      {base64Image ? (
        <div className="editor_image_preview">
          <img src={base64Image} alt="Preview" />
        </div>
      ) : (
        <div className="editor_upload" onClick={onClickUpload}>
          <img src={attach} />
          <p>클릭하여 사진을 업로드 해주세요.</p>
        </div>
      )}
      <div className="_editor_upload">
        <input
          id="upload_btn"
          type="file"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="editor_content">
        <textarea
          name="content"
          value={input.content}
          placeholder="공유할 내용을 입력해주세요."
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default Editor;
