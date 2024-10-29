import { Button, Input, Space } from "antd";
import { useState } from "react";
import { mockTasks } from "../constants/constants";
import "../css/App.css";
import { TaskType } from "../types/types";
import TaskTable from "./Task";

function App() {
  const [allTasks, setAllTasks] = useState<TaskType[]>(mockTasks);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const addTaskHandle = () => {
    if (!inputValue.trim()) {
      setErrorMessage("Введите название задачи");
      return;
    }

    setAllTasks((prev) => [
      ...prev,
      {
        key: allTasks.length + 1,
        name: inputValue,
        status: false,
        tags: ["Активно"],
      },
    ]);
    setInputValue("");
    setErrorMessage("");
  };

  const inputChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Space direction="vertical" size="middle">
        <span style={{ color: "red" }}>
          {errorMessage ? errorMessage : null}
        </span>
        <Space.Compact style={{ display: "flex" }}>
          <Input
            value={inputValue}
            size="large"
            placeholder="Введите название задачи"
            onChange={inputChangeHandle}
          />
          <Button size="large" type="primary" onClick={addTaskHandle}>
            Добавить
          </Button>
        </Space.Compact>
        <TaskTable allTasks={allTasks} setAllTasks={setAllTasks} />
      </Space>
    </>
  );
}

export default App;
