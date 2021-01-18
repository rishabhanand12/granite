import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "../Container";
import Comments from "../Comments/index";
import PageLoader from "../PageLoader";
import tasksApi from "../../apis/tasks";
import commentsApi from "../../apis/comments";

const ShowTask = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
      setComments(response.data.comments);
    } catch (error) {
      // logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await commentsApi.create({
        comment: { content: newComment, task_id: id },
      });
      await fetchTaskDetails();
      setLoading(false);
    } catch (error) {
      // logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Task Title : </span>
        {taskDetails?.title}
      </h1>
      <h2 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Assigned To : </span>
        {assignedUser?.name}
      </h2>
      <Comments
        comments={comments}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default ShowTask;
