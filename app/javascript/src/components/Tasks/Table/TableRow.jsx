import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TableRow = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((rowData) => (
        <tr key={rowData.id}>
          <td
            className={classnames(
              "px-6 py-4 text-sm font-medium leading-5 whitespace-no-wrap",
              {
                "text-indigo-500 hover:text-indigo-700 cursor-pointer": !isCompleted,
              },
              { "line-through": isCompleted }
            )}
            onClick={() => !isCompleted && showTask(rowData.id)}
          >
            {rowData.title}
          </td>
          {!isCompleted && (
            <>
              <td className="px-6 py-4 text-sm font-medium leading-5 text-gray-900 whitespace-no-wrap">
                {rowData.user_id}
              </td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className={classnames(
                    "transition duration-300 ease-in-out ri-star-line text-2xl hover:text-orange-400 p-1",
                    {
                      "text-gray-500": rowData.status !== "starred",
                    },
                    {
                      "text-white bg-orange-600 rounded-full":
                        rowData.status === "starred",
                    }
                  )}
                  onClick={() => starTask(rowData.id, rowData.status)}
                ></i>
              </td>
            </>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }}></td>
              <td className="px-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-gray-500 transition duration-300 ease-in-out ri-delete-bin-5-line hover:text-red-500"
                  onClick={() => destroyTask(rowData.id)}
                ></i>
              </td>
            </>
          )}
          <td className="px-6 py-4 text-center">
            <input
              type="checkbox"
              checked={isCompleted}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded form-checkbox focus:ring-indigo-500"
              onChange={() =>
                handleProgressToggle({
                  id: rowData.id,
                  progress: toggledProgress,
                })
              }
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
};

export default TableRow;
