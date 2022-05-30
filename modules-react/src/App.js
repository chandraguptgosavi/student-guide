import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contribute from "./components/Contribute/Contribute";
import Aptitude from "./components/Aptitude/Aptitude";
import PracticeHome from "./components/Practice/PracticeHome";
import PracticeQuestion from "./components/Practice/PracticeQuestion";
import Test from "./components/Test";
import InterviewQuestion from "./features/InterviewQuestion";
import InterviewQuestionsList from "./features/InterviewQuestions";
import FirebaseApp from "./firebase/config";
import Paths from "./utils/paths";
import LandingPage from "./components/ResumeBuilder/LandingPage";
import TemplateData from "./components/ResumeBuilder/TemplateData";
import PageNotFound from "./PageNotFound";

export default function App() {
  return (
    <div className="h-full">
      <nav
        className="relative z-50 shadow-xl flex justify-between items-center"
        style={{ height: "10%" }}
      >
        <p
          className="ml-8 text-4xl"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "orangered",
          }}
        >
          FutureDoor
        </p>
        <div className="flex">
          <a href="https://home-futuredoor.netlify.app">
            <p className="text-xl mr-6 hover:text-red-400">Home</p>
          </a>
          <a href="https://futuredoor.netlify.app">
            <p className="text-xl mx-6 hover:text-red-400">Aptitude</p>
          </a>
          <a href="https://futuredoor.netlify.app/interview-preparation/questions">
            <p className="text-xl mx-6 hover:text-red-400">Interview</p>
          </a>
          <a href="https://futuredoor.netlify.app/resume-builder">
            <p className="text-xl mr-8 hover:text-red-400">Resume</p>
          </a>
        </div>
      </nav>
      <div className="" style={{ height: "90%" }}>
        <BrowserRouter>
          <Routes>
            <Route exact path={Paths.APTITUDE} element={<Aptitude />} />
            <Route exact path={Paths.PRACTICE} element={<PracticeHome />} />
            <Route
              exact
              path={`${Paths.PRACTICE}/:id`}
              element={<PracticeQuestion />}
            />
            <Route exact path={Paths.MOCK_TEST} element={<Test />} />
            <Route exact path={Paths.CONTRIBUTE} element={<Contribute />} />
            <Route
              exact
              path={Paths.INTERVIEW_QUESTIONS}
              element={<InterviewQuestionsList />}
            />
            <Route
              exact
              path={`${Paths.INTERVIEW_QUESTION}/:id`}
              element={<InterviewQuestion />}
            />
            <Route
              exact
              path={Paths.RESUME_BUILDER}
              element={<LandingPage />}
            />
            <Route
              exact
              path={Paths.RESUME_BUILDER_TEMPLATES}
              element={<TemplateData />}
            />
            <Route path="*" element={<PageNotFound status={404} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
