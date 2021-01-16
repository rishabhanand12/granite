import React from "react";
import { compose, juxt, join, toUpper, head, tail } from "ramda";

const TableHeader = ({ type }) => {
  const getTitleCase = compose(join(""), juxt([compose(toUpper, head), tail]));

  const title = `${getTitleCase(type)} Tasks`;
  return (
    <thead>
      <tr>
        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-50">
          Title
        </th>
        {type === "pending" && (
          <th className="px-6 py-3 text-sm font-medium leading-4 tracking-wider text-left text-gray-500 bg-gray-50">
            Assigned To
          </th>
        )}
        {type === "completed" && (
          <>
            <th style={{ width: "164px" }}></th>
            <th className="px-6 py-3 text-sm font-medium leading-4 tracking-wider text-center text-gray-500 bg-gray-50">
              Delete
            </th>
          </>
        )}
        <th className="px-6 py-3 text-sm font-medium leading-4 tracking-wider text-center text-gray-500 bg-gray-50">
          Completed
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
