import React, { useState, useEffect } from "react";
const Lists = ({ task, index, isDone }) => {
  const [isChecked, setIsChecked] = useState(isDone);
  const [list, setList] = useState([]);
  const [text, setText] = useState(task);
  const [inputBoxToggle, setInputBoxToggle] = useState(false);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("crudData")));
  }, []);
  // edit button toggle
  const editButton = () => {
    setInputBoxToggle(true);
  };
  // refresh page
  const refreshpage = () => {
    window.location.reload();
  };
  // save data in localstorage after editing
  const saveData = () => {
    list[index].task = text;
    // console.log("list", list);
    localStorage.setItem("crudData", JSON.stringify(list));
    setInputBoxToggle(false);
    refreshpage();
  };
  // change handler
  const handleChange = (e) => {
    setText(e.target.value);
  };
  // delete
  const deleteTask = () => {
    const filterdData = list.filter((_, i) => {
      return index !== i;
    });
    localStorage.setItem("crudData", JSON.stringify(filterdData));
    if (filterdData.length === 0) {
      localStorage.removeItem("crudData");
    }
    refreshpage();
    console.log("filterdData");
  };
  // checkbox handler
  const checkboxHandler = () => {
    list[index].isDone = !isChecked;
    localStorage.setItem("crudData", JSON.stringify(list));
    setIsChecked(!isChecked);
    console.log(isChecked);
  };
  return (
    <>
      <div className="item" key={index}>
        <div>
          <input
            type="checkbox"
            onChange={checkboxHandler}
            checked={isChecked}
            name=""
          />
          {inputBoxToggle ? (
            <p>
              <input type="text" onChange={handleChange} value={text} />
            </p>
          ) : (
            <p className={isChecked ? "done" : ""}>{task}</p>
          )}
        </div>
        <div>
          {inputBoxToggle ? (
            <button className="save" onClick={saveData}>
              Save
            </button>
          ) : (
            <button
              className={isChecked ? "checkedEdit" : "edit"}
              disabled={isChecked}
              onClick={editButton}
            >
              Edit
            </button>
          )}

          <button className="delete" onClick={deleteTask}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
export default Lists;
