import React from "react";

function Film({ element }) {
  const { name, localized_name, rating } = element;
  return (
    <div>
      <div className="card mt-3 md-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h6 className="card-title">{localized_name}</h6>
              <p className="text-muted">{name}</p>
            </div>
            <div className="col">
              <p className='text-right'>{rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Film;
