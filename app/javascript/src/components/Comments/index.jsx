import React from "react";

import Button from "../Button";

const Comments = ({ comments, loading, setNewComment, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Comment
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              className="flex-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm resize-none text-grey-darkest focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <Button type="submit" buttonText="Comment" loading={loading} />
      </form>
      {comments?.map((comment, index) => (
        <p
          key={index}
          className="px-3 py-3 my-2 leading-5 text-gray-700 border-b border-gray-400 text-md"
        >
          {comment.content}
        </p>
      ))}
    </>
  );
};

export default Comments;
