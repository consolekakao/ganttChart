import { useEffect, useState } from "react";
import "./App.css";
import { IData } from "./types";
import { Box, Paper, Grid, Typography } from "@mui/material";
import Sortable from "sortablejs";
const DATA: IData[] = [
  {
    categoryId: 0,
    category: "Back Log",
    tasks: [
      {
        id: 11111,
        title: "Task 1",
        description: "Description 1",
        assignee: "Assignee 1",
        creator: "Creator 1",
        created: "Created 1",
        deletedAt: "DeletedAt 1",
      },
      {
        id: 22222,
        title: "Task 2",
        description: "Description 2",
        assignee: "Assignee 2",
        creator: "Creator 2",
        created: "Created 2",
        deletedAt: "DeletedAt 2",
      },

      {
        id: 55555,
        title: "Task 5",
        description: "Description 5",
        assignee: "Assignee 5",
        creator: "Creator 5",
        created: "Created 5",
        deletedAt: "DeletedAt 5",
      },
    ],
  },
  {
    categoryId: 1,
    category: "Todo",
    tasks: [
      {
        id: 33333,
        title: "Task 3",
        description: "Description 3",
        assignee: "Assignee 3",
        creator: "Creator 3",
        created: "Created 3",
        deletedAt: "DeletedAt 3",
      },
    ],
  },
  {
    categoryId: 2,
    category: "In Progress",
    tasks: [
      {
        id: 44444,
        title: "Task 4",
        description: "Description 4",
        assignee: "Assignee 4",
        creator: "Creator 4",
        created: "Created 4",
        deletedAt: "DeletedAt 4",
      },
    ],
  },
  { categoryId: 3, category: "Done", tasks: [] },
];

function App() {
  const [data, setData] = useState<IData[]>(DATA);
  const changeTask = (task, start, end) => {
    console.log("Task----", task);
    console.log("Start---", start);
    console.log("End----", end);
    setData((prevData) => {
      const newPrevData = prevData.map((category) => {
        if (category.categoryId === +start) {
          return {
            ...category,
            tasks: category.tasks.filter((t) => t.id !== task.id),
          };
        } else if (category.categoryId === +end) {
          return {
            ...category,
            tasks: [...category.tasks, task],
          };
        }
        return category;
      });
      console.log("newPrevDatanewPrevData", newPrevData);
      return newPrevData;
    });
  };
  useEffect(() => {
    const categories = document.querySelectorAll(".category");
    categories.forEach((column) => {
      new Sortable(column as HTMLElement, {
        group: "task",
        animation: 150,
        ghostClass: "blue-background-class",

        onEnd: (evt) => {
          const startTarget = evt.from;
          const targetCategoryElement = evt.to;
          const start = startTarget.querySelector(".idid")?.textContent;
          const end = targetCategoryElement.querySelector(".idid")?.textContent;
          console.log("Start", start);
          console.log("End", end);
          const taskId = evt.item.querySelector(".taskId")?.textContent;
          console.log("TaskId", taskId);
          console.log("before::", data);
          const newTask = data
            .find((category) => category.categoryId === +start)
            ?.tasks.find((task) => task.id === +taskId);
          console.log("newTask", newTask);
          changeTask(newTask, start, end);
        },
      });
    });
  }, []);

  return (
    <>
      <div>
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#FFF9D0", height: "100vh" }}
        >
          {data.map((category) => {
            return (
              <Grid item xs={3} key={category.categoryId}>
                <Box component={Paper} sx={{ height: "100%" }}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h5">{category.category}</Typography>
                  </Box>
                  <Grid
                    container
                    gap={2}
                    justifyContent={"center"}
                    alignContent={"flex-start"}
                    className="category"
                    sx={{ height: "100vh" }}
                  >
                    <div className="idid" hidden>
                      {category.categoryId}
                    </div>
                    {category.tasks.map((task) => {
                      return (
                        <Grid
                          item
                          data-task-id={task.id}
                          xs={11}
                          component={Paper}
                          key={task.id}
                          padding={1}
                          draggable
                          className="task"
                          sx={{
                            cursor: "pointer",
                            height: "160px",
                            backgroundColor: "#CAF4FF",
                          }}
                        >
                          <Box>
                            <div className="taskId" hidden>
                              {task.id}
                            </div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{task.assignee}</p>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default App;
