import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "../Container";
import ListTasks from "../Tasks/ListTasks";
import PageLoader from "../PageLoader";
import tasksApi from "../../apis/tasks";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      console.log(response);
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (error) {
      //   logger.error(error);
      setLoading(false);
    }
  };

  const showTask = (id) => {
    history.push(`/tasks/${id}/show`);
  };

  const updateTask = (id) => {
    history.push(`/tasks/${id}/edit`);
  };

  const destroyTask = async id => {
    try {
      await tasksAPI.destroy(id);
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="text-xl leading-5 text-center">
          You have no tasks assigned 😔
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <ListTasks data={tasks} showTask={showTask} updateTask={updateTask} destroyTask={destroyTask} />
    </Container>
  );
};

export default Dashboard;
