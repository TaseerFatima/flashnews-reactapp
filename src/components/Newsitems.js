import React, { Component } from "react";

export class Newsitems extends Component {
  render() {
    let { title, description, imageUrl, newsurl, date, author,source } = this.props;
    return (
      <div className="my-3">
        <div className="card" ><span className=" badge rounded-pill bg-danger" style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}> {source} </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author ? author : "unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a href={newsurl} target="blank" className="btn btn-sm btn-dark ">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitems;
