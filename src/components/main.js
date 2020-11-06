import React from "react";

import { NavLink } from "react-router-dom";

import Post from "./Post";

const VK = window.VK;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      colors: [],

      postsLoad: true,
    };

    this.postColors = [
      "#FFA69E",
      "#74F2CE",
      "#7EE8FA",
      "#E899DC",
      "#FFAC81",
      "#F7B42C",
      "#ABE9CD",
      "#F8CEEC",
      "#FFD8C",
      "#B0F3F1",
      "#DAD2F3",
      "#F3E6E8",
      "#D5FEFD",
      "#DCF8EF",
      "#7DDFF8",
      "#B9D1EB",
      "#A1BAFE",
      "#E1D4E6",
      "#FFA69E",
      "#00BFB2",
      "#FF4081",
      "#A29BFE",
      "#7ED6DF",
      "#48DBFB",
      "#FF6B6B",
    ];

    this.getPosts = this.getPosts.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.getBestPhoto = this.getBestPhoto.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  goTo(to) {
    let target = document.getElementById(to);

    target.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  componentDidMount() {
    // this.authBtn.current.click();

    this.loadPosts();
  }

  loadPosts() {
    let posts = [];

    VK.Api.call(
      "wall.get",
      { owner_id: "-173711218", offset: 1, count: 40, v: "5.73" },
      (r) => {
        if (r.response) {
          console.log(r.response.items);

          posts = r.response.items.map((post) => {
            if (!post.copy_history && !post.marked_as_ads) {
              let i = this.getRandom(0, this.postColors.length - 1);
              let color = this.postColors[i];
              let photo = this.getBestPhoto(post);
              let data = {
                title: post.text,
                postColor: color,
                textColor: "rgba(0, 0, 0, 0.8)",
                id: `${post.id}`,
                source: `https://vk.com/wall${post.owner_id}_${post.id}`,
                cover: photo,
                views: post.views.count,
                likes: post.likes.count,
                comms: post.comments.count,
                reps: post.reposts.count,
                video: false,
              };
              posts.push(data);
              this.setState({ posts, postsLoad: false });
            }
          });
        }
      }
    );
  }

  getBestPhoto(item) {
    let best = "";
    let res = "";
    let nums = [];

    if (item.attachments && item.attachments[0] && item.attachments[0].photo) {
      for (let key in item.attachments[0].photo) {
        if (~key.indexOf("photo_")) {
          let str = key.substring(6);
          nums.push(str);
        }
      }

      best = "photo_" + Math.max.apply(null, nums);
      res = item.attachments[0].photo[best];
    }

    return res;
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  }

  getPostsFromStorage(obj) {
    let openRequest = indexedDB.open(obj.store, 1);

    openRequest.onupgradeneeded = () => {
      let DB = openRequest.result;
      if (!DB.objectStoreNames.contains(obj.store)) {
        DB.createObjectStore(obj.store);
      }
    };

    openRequest.onerror = function () {
      console.error("Can't create DB", openRequest.error);
    };

    openRequest.onsuccess = () => {
      let DB = openRequest.result;

      let tx = DB.transaction(obj.store, "readonly");
      let store = tx.objectStore(obj.store);

      let posts = store.get(obj.key);

      tx.oncomplete = () => {
        if (posts.result) {
          this.setState({ savedPosts: posts.result });
        }
      };
    };
  }

  getPosts() {
    let posts = this.state.posts;
    let response = [];

    response = posts.map((post, i) => {
      return (
        <Post
          key={post.title + i}
          content={post}
          onPostSave={this.savePost}
          onPostDelete={this.deletePost}
        ></Post>
      );
    });

    return response;
  }

  render() {
    let posts = this.state.posts && this.getPosts();

    let postLoading = this.state.postsLoad ? (
      <div className="spinner-border" role="status"></div>
    ) : (
      <div style={{ float: "right" }} onClick={this.loadPosts}>
        <i className="fas fa-redo"></i>
      </div>
    );

    let posts1 = [];
    let posts2 = [];

    for (let i = 0; i < posts.length; i++) {
      if (i % 2 !== 0) posts1.push(posts[i]);
      else posts2.push(posts[i]);
    }

    return (
      <div>
        <div className="pageHint" id="Home">
          меню группы
        </div>
        <div className="row mt-4 mb-2">
          <div className="col">
              <div className="icon" data-toggle="modal" data-target="#aboutModal">
                <i className="fas fa-info-circle"></i>
                <span className="iconTitle">о группе</span>
              </div>
          </div>
          <div className="col">
          <a href="https://vk.com/app5748831_-173711218" className="linkStyle">
              <div className="icon">
                <i className="fas fa-paper-plane"></i>
                <span className="iconTitle">рассылка</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="https://vk.com/app5727453_-173711218" className="linkStyle">
              <div className="icon">
                <i className="fas fa-cookie-bite"></i>
                <span className="iconTitle">пожертвовать</span>
              </div>
            </a>
          </div>
        </div>
        <br />
        <div className="btnsTitle">Последние записи {postLoading}</div>
        <div className="row mt-2 mb-3">
          <div className="col">{posts1}</div>
          <div className="col">{posts2}</div>
        </div>
        {!this.state.postsLoad ? (
          <button className="loadMoreBtn" onClick={(e) => this.goTo("Home", e)}>
            наверх
          </button>
        ) : (
          ""
        )}
        <br />
      </div>
    );
  }
}

export default Main;
