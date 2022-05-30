import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";
import Logo from "../../assets/resume_bg.jpg";
import Paths from "../../utils/paths";

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    return <Component history={navigate} {...props} />;
  };

  return Wrapper;
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
      this.props.history(Paths.RESUME_BUILDER_TEMPLATES);
  }
  
  render() {
    return (
      <div className="flex flex-col lg:flex-row w-full h-full bg-gray-light font-sans">
        <img className="h-auto lg:h-full bg-blue p-0 m-0" src={Logo} alt="tech-resume-logo"></img>
        <div className="flex flex-col justify-center items-center h-full text-gray-dark mx-auto p-2 lg:p-10">
          <h1 className="text-5xl lg:text-7xl text-blue">FutureDoor Resume</h1>
          <h3 className="text-xl lg:text-3xl">
            Effortlessly make a job-worthy resume
          </h3>
          <div className="flex justify-center">
            <button
              id="get-started"
              className="rounded bg-blue text-white text-lg hover:shadow-xl m-4 mt-8 px-4 py-2 text-center"
              onClick={this.handleClick}
            >
              Get Started
            </button>
            {/* <a
              href="https://www.canva.com/design/DAEXDNrk6RU/h2Fw03hmmWsfYU_6938AbQ/watch?utm_content=DAEXDNrk6RU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
              id="live-demo"
              className="rounded bg-white border-blue border-2 text-blue text-lg hover:shadow-xl m-4 mt-8 px-4 py-2 text-center"
              target="blank"
            >
              Live Demo
            </a> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
