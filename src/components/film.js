import React from "react";

function Film({ element, setElement }) {
  const { name, localized_name, rating } = element;
  return (
    <div>
      <div className="card mt-3 md-3">
        <div className="card-body">
          <div className="col">
            <button className="card-title" onClick={() => setElement(element)}>
              {localized_name}
            </button>
            <p className="card-text">{name}</p>
          </div>
          <div className="col">
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Film;
