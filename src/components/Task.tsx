import type { RadioChangeEvent, TableColumnsType } from "antd";
import { Button, Flex, Radio, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { TableRowSelection, TaskType } from "../types/types";

interface TaskPropsType {
  allTasks: TaskType[];
  setAllTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const columns: TableColumnsType<TaskType> = [
  { title: "№", dataIndex: "key" },
  { title: "Название задачи", dataIndex: "name" },
  {
    title: "Статус",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          const color = tag === "Активно" ? "green" : "black";
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const TaskTable: FC<TaskPropsType> = ({ allTasks, setAllTasks }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<string>("active");

  useEffect(() => {
    filterTasks(allTasks, filter);
  }, [allTasks, filter]);

  const closeTaskHandle = () => {
    const newAllTasks = allTasks.map((task) =>
      selectedRowKeys.includes(task.key)
        ? { ...task, status: true, tags: ["Завершено"] }
        : task
    );
    setAllTasks(newAllTasks);
    setSelectedRowKeys([]);
  };

  const filterTasks = (tasks: TaskType[], filterValue?: string) => {
    let filteredTasks = tasks;

    if (filterValue === "active") {
      filteredTasks = tasks.filter((task) => task.status === false);
    } else if (filterValue === "closed") {
      filteredTasks = tasks.filter((task) => task.status === true);
    }

    setDisplayedTasks(filteredTasks);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<TaskType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: TaskType) => ({
      disabled: record.status === true,
      name: record.name,
    }),
  };

  const handleFilterChange = (event: RadioChangeEvent) => {
    setFilter(event.target.value);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Table<TaskType>
        bordered={true}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={displayedTasks}
        pagination={false}
        style={{ width: "500px" }}
      />
      <Flex justify="flex-end">
        <Radio.Group value={filter} onChange={handleFilterChange}>
          <Radio.Button value="active">Активные</Radio.Button>
          <Radio.Button value="closed">Завершенные</Radio.Button>
          <Radio.Button value="all" onClick={() => filterTasks(allTasks)}>
            Все
          </Radio.Button>
        </Radio.Group>
      </Flex>
      <Flex align="center" justify="center">
        <Button
          type="primary"
          onClick={closeTaskHandle}
          disabled={!hasSelected}
        >
          Завершить
        </Button>
      </Flex>
    </Flex>
  );
};

export default TaskTable;
