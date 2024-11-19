/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ onGroupChange, onSortChange }) => {
  return (
    <div className="header">
      {/* Grouping Options */}
      <div className="controls">
        <label htmlFor="grouping">Group By:</label>
        <select id="grouping" onChange={(e) => onGroupChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {/* Sorting Options */}
      <div className="controls">
        <label htmlFor="sorting">Sort By:</label>
        <select id="sorting" onChange={(e) => onSortChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

Header.propTypes = {
  onGroupChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Header;
