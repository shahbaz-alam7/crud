import React, { useState, useEffect } from "react";
import Lists from "./Lists";
const MainApp = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("crudData")));
  }, []);

  const changeHandler = (e) => {
    setTask(e.target.value);
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const addTask = () => {
    let arr;
    const getData = localStorage.getItem("crudData");
    // console.log("getData", getData);
    if (getData === null) {
      arr = [];
    } else {
      arr = JSON.parse(getData);
    }
    if (task) {
      arr.push({ task: task, isDone: false });
      localStorage.setItem("crudData", JSON.stringify(arr));
      refreshPage();
    } else {
      alert("please write something before adding");
    }
  };
  return (
    <>
      <div className="main-app">
        <h1>CRUD</h1>
        <div className="">
          <textarea
            placeholder="Write here..."
            onChange={changeHandler}
            value={task}
          ></textarea>
        </div>
        <button onClick={addTask}>Add</button>
      </div>
      <div className="list">
        {list ? (
          <>
            {list.map((item, index) => {
              return (
                <Lists
                  key={index}
                  task={item.task}
                  isDone={item.isDone}
                  index={index}
                />
              );
            })}
          </>
        ) : (
          <h1>Please add some task first</h1>
        )}
      </div>
    </>
  );
};
export default MainApp;
