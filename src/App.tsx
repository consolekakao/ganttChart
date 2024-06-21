import { useEffect } from "react";
import Sortable from "sortablejs";
import { ITask } from "./types";
import { Box, Grid, Paper, Typography } from "@mui/material";
const DATA: ITask[] = [
  {
    id: 1111,
    title: "Task 1",
    description: "Description 1",
    assignee: "Assignee 1",
    creator: "Creator 1",
    created: "2021-01-01",
    deletedAt: "2021-01-01",
    status: "DONE",
  },
  {
    id: 1222,
    title: "Task 2@@@",
    description: "Description 1",
    assignee: "Assignee 1",
    creator: "Creator 1",
    created: "2021-01-01",
    deletedAt: "2021-01-01",
    status: "DONE",
  },
];

export const App = () => {
  const baseData = window.location.search.split("=")[1];
  const data: ITask[] = baseData ? JSON.parse(atob(baseData)) : DATA;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const CATEGORIES = ["BACKLOG", "TODO", "INPROGRESS", "DONE"];

  const updateUrl = (newData: ITask[]) => {
    window.history.pushState(
      null,
      "",
      `?data=${btoa(JSON.stringify(newData))}`
    );
  };

  useEffect(() => {
    CATEGORIES.map((el) => {
      Sortable.create(document.getElementById(el)!, {
        animation: 200,
        group: {
          name: "shared",
        },

        onEnd: (evt) => {
          updateUrl(
            [...data].map((task) => {
              if (task.id.toString() === evt.item.getAttribute("id")) {
                task.status = evt.to.id;
              }
              return task;
            })
          );
        },
      });
    });
  }, [CATEGORIES, data]);

  return (
    <Grid container justifyContent={"space-around"} spacing={1}>
      {CATEGORIES.map((category) => (
        <Grid
          item
          xs={3}
          component={Paper}
          key={category}
          id={category}
          justifyContent={"center"}
        >
          <Typography>{category}</Typography>
          {data
            .filter((data) => data.status === category)
            .map((data) => (
              <div key={data.id.toString()} id={data.id.toString()}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  key={data.id}
                  alignItems={"center"}
                  mt={1}
                  p={1}
                  sx={{ cursor: "pointer" }}
                >
                  <Box sx={{ width: "100%" }} component={Paper}>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                  </Box>
                </Box>
              </div>
            ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
