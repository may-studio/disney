import React from "react";

const VK = window.VK;

class EnterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.VkAuth = this.VkAuth.bind(this);
  }

  VkAuth() {
    VK.Auth.login((res) => {
      if (res.session) {
        console.log("success");
        this.props.onAuth(true);
      } else {
        console.log("canceled");
      }
    });
  }

  render() {
    let text = "Чтобы продолжить, пожалуйста, авторизуйтесь через Вконтакте";

    return (
      <div>
        <div className="textPage">
          {text}
          <br/>
          <button className="btnMain" onClick={this.VkAuth}>
    <span style={{ color: 'rgba(0, 0, 0, 0.9)' }}><i class="fab fa-vk"></i>{" "}войти</span>
          </button>
        </div>
      </div>
    );
  }
}

export default EnterPage;
