import React, { useState } from "react";
import Container from "../Container";
import TaskForm from "./Form/TaskForm";
import tasksApi from "../../apis/tasks";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");    
  const [loading, setLoading] = useState(false);  

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await tasksApi.create({ task: { title } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
    //   logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}                
        loading={loading}
        handleSubmit={handleSubmit}        
      />
    </Container>
  );
};

export default CreateTask;