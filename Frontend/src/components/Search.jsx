import { useRef } from "react";
import "../App.css"
export const Search = ({ fn }) => {
  const Name = useRef();

  return (
    <div className="search-container">
      <label htmlFor="searchInput">Artist Name</label>
      <div className="search-input-container">
        <input
          ref={Name}
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Search Anything"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            fn(Name.current.value);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};
