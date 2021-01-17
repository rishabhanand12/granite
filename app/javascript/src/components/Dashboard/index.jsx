import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import Container from "../Container";
// import ListTasks from "../Tasks/ListTasks";
import PageLoader from "../PageLoader";
import tasksApi from "../../apis/tasks";

const Dashboard = ({ history }) => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      const { pending, completed } = response.data.tasks;
      setPendingTasks(pending);
      setCompletedTasks(completed);
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

  const destroyTask = async (id) => {
    try {
      await tasksAPI.destroy(id);
      await fetchTasks();
    } catch (error) {
      // logger.error(error);
    }
  };

  const handleProgressToggle = async ({ id, progress }) => {
    try {
      setLoading(true);
      await tasksApi.update({ id, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const starTask = async (id, status) => {
    try {
      setLoading(true);
      const toggledStatus = status === "starred" ? "unstarred" : "starred";
      await tasksApi.update({
        id,
        payload: { task: { status: toggledStatus } },
      });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
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

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    console.log("called")
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
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          destroyTask={destroyTask}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
          starTask={starTask}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          destroyTask={destroyTask}
          handleProgressToggle={handleProgressToggle}
          starTask={starTask}
        />
      )}
    </Container>
  );
};

export default Dashboard;
