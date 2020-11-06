import React from "react";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.content.id,
      title: this.props.content.title,
      source: this.props.content.source,
      cover: this.props.content.cover,
      textColor: this.props.content.textColor,
      postColor: this.props.content.postColor,
      views: this.props.content.views,
      comms: this.props.content.comms,
      reps: this.props.content.reps,
      likes: this.props.content.likes,
    };
  }

  render() {
    let data = this.props.content;

    let title = "";

    if (data.title) {
      let text = data.title;
      title = text.length > 200 ? text.substring(0, 200) + "..." : text;
    }

    const markup = (
      <div
        className="postView card"
        style={{ backgroundColor: data.postColor }}
      >
        <div className="postHeader">
          <div className="postViews">
            <i className="fas fa-eye"></i>
            {"  "}
            {data.views}
          </div>
          <button className="postReadBtn">
            <a
              style={{ textDecoration: "none", color: "white" }}
              href={data.source}
            >
              читать
            </a>
          </button>
        </div>
        {title.length ? (
          <div className="postTitle" style={{ color: data.textColor }}>
            {title}
          </div>
        ) : (
          ""
        )}
        {data.cover ? (
          <a className="linkStyle" href={data.source}>
            <img className="postCover" src={data.cover} alt="Обложка записи" />
          </a>
        ) : (
          ""
        )}
        <div className="postFooter">
          <div className="postCounts">
            <i className="fas fa-heart"></i> {data.likes}
          </div>
          <div className="postCounts">
            <i className="fas fa-comment"></i> {data.comms}
          </div>
          <div className="postCounts">
            <i className="fas fa-reply"></i> {data.reps}
          </div>
        </div>
      </div>
    );

    return <div>{markup}</div>;
  }
}

export default Post;
