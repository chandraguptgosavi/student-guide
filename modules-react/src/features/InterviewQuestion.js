import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Button,
  Menu,
  MenuItem,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

function QuestionDetails({ question }) {
  return (
    <div className="w-2/5 h-full py-2 text-lg overflow-scroll hidden-scrollbar">
      <p className="my-4 text-2xl font-medium">{question.title}</p>
      <p className="mb-4">{question.statement}</p>
      <p className="my-2 text-xl ">Input:</p>
      <p className="mb-4">{question.input}</p>
      <p className="my-2 text-xl ">Output:</p>
      <p className="mb-4">{question.output}</p>
      <p className="my-2 text-xl ">Sample input:</p>
      <textarea
        disabled
        className="h-40 w-full my-2 p-2 bg-gray-100 rounded"
        value={question.sampleTestCases.sampleInput}
      />
      <p className="my-2 text-xl ">Sample output:</p>
      <textarea
        disabled
        className="h-40 w-full my-2 p-2 bg-gray-100 rounded"
        value={question.sampleTestCases.sampleOutput}
      />
    </div>
  );
}

function CodeRunningLoader() {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height="85%"
      style={{ borderRadius: "0.25em" }}
    />
  );
}

function CodeEditor({ submitInput, expectedOutput }) {
  const [languages, setLanguages] = useState([
    { name: "CPP", id: "54" },
    { name: "Java", id: "62" },
    { name: "Python", id: "71" },
  ]);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [code, setCode] = useState("");
  const [runInput, setRunInput] = useState("");
  const [runOutput, setRunOutput] = useState("");

  const [submitOutputMessage, setSubmitOutputMessage] = useState("");

  const [alertSeverity, setAlertSeverity] = useState("info");
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);
  const open = Boolean(anchorEl);
  const SUBMISSION_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const closeSnackbar = (event, reason) => {
    setIsSnackbarOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedLangIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEditorDidMount() {
    setIsEditorReady(true);
  }

  function handleEditorChange(value, event) {
    setCode(value);
  }

  useEffect(() => {}, []);

  const runCode = async (SUBMISSION_URL, code, lang_id, stdInput) => {
    try {
      setIsCodeRunning(true);
      const config = {
        method: "post",
        url: `${SUBMISSION_URL}/?wait=true`,
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key":
            "a71a150466mshf1e4d69182ffc26p191695jsn12c9caf9d531",
        },
        data: {
          source_code: code,
          language_id: lang_id,
          stdin: stdInput,
          cpu_time_limit: "2.0",
        },
      };
      const res = await axios(config);
      setRunOutput(res.data.stdout);
      setIsCodeRunning(false);
      setRunInput("");
    } catch (error) {
      setIsCodeRunning(false);
      setRunOutput("Something went wrong!");
    }
  };

  const submitCode = async (
    SUBMISSION_URL,
    code,
    lang_id,
    stdInput,
    expectedOutput
  ) => {
    try {
      setIsCodeRunning(true);
      const config = {
        method: "post",
        url: `${SUBMISSION_URL}/?wait=true`,
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key":
            "a71a150466mshf1e4d69182ffc26p191695jsn12c9caf9d531",
        },
        data: {
          source_code: code,
          language_id: lang_id,
          stdin: stdInput,
          expected_output: expectedOutput,
          cpu_time_limit: "2.0",
        },
      };
      const res = await axios(config);
      const data = res.data;
      setSubmitOutputMessage(data.status.description);
      if (data.status.id === 3) setAlertSeverity("success");
      else if (data.status.id === 1 || data.status.id === 2)
        setAlertSeverity("info");
      else setAlertSeverity("error");
      setIsCodeRunning(false);
      setIsSnackbarOpen(true);
    } catch (error) {
      setIsCodeRunning(false);
      setRunOutput("Something went wrong!");
    }
  };
  return (
    <div className="w-3/5 h-full p-4 flex flex-col justify-between">
      <Editor
        height="80%"
        theme={"light"}
        language={languages[selectedLangIndex].name.toLowerCase()}
        value={code}
        editorDidMount={handleEditorDidMount}
        onChange={handleEditorChange}
        className="rounded-lg"
      />
      <div className="h-1/5">
        <div className="w-full h-4/5 flex justify-between items-center">
          {isCodeRunning ? (
            <CodeRunningLoader />
          ) : (
            <>
              <textarea
                placeholder="Input"
                className=" h-full px-2 rounded"
                style={{ width: "49%", height: "85%" }}
                onChange={(e) => {
                  setRunInput(e.target.value);
                }}
              />
              <textarea
                disabled
                placeholder="Output"
                style={{ width: "49%", height: "85%" }}
                className="h-full px-2 bg-gray-100 rounded"
                value={runOutput}
              />
            </>
          )}
        </div>
        <div className="h-1/5 flex justify-between items-center">
          <Button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="outlined"
          >
            {languages[selectedLangIndex].name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {languages.map((language, index) => (
              <MenuItem
                key={language.id}
                selected={index === selectedLangIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {language.name}
              </MenuItem>
            ))}
          </Menu>
          <div>
            <Button
              disabled={isCodeRunning}
              style={{ marginRight: "0.25em" }}
              onClick={async (e) => {
                await runCode(
                  SUBMISSION_URL,
                  code.trim(),
                  languages[selectedLangIndex].id,
                  runInput.trim()
                );
              }}
            >
              Run
            </Button>
            <Button
              disabled={isCodeRunning}
              style={{ marginLeft: "0.25em" }}
              variant="contained"
              onClick={async (e) => {
                await submitCode(
                  SUBMISSION_URL,
                  code.trim(),
                  languages[selectedLangIndex].id,
                  submitInput.trim(),
                  expectedOutput.trim()
                );
              }}
            >
              Submit
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={isSnackbarOpen}
              autoHideDuration={5000}
              onClose={closeSnackbar}
            >
              <Alert
                onClose={closeSnackbar}
                severity={alertSeverity}
                sx={{ width: "100%" }}
              >
                {submitOutputMessage}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewQuestion() {
  const [question, setQuestion] = useState({
    title: "",
    statement: "",
    input: "",
    output: "",
    sampleTestCases: {
      sampleInput: "",
      sampleOutput: "",
    },
  });
  const [submitInput, setSubmitInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const { id } = useParams();

  const loadQuestion = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, "interview-questions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestion({
          ...data,
          sampleTestCases: {
            sampleInput: data.sampleTestCases.sampleInput.replaceAll(
              ",",
              "\r\n"
            ),
            sampleOutput: data.sampleTestCases.sampleOutput.replaceAll(
              ",",
              "\r\n"
            ),
          },
        });
        setSubmitInput(data.submitInput.replaceAll(",", "\r\n"));
        setExpectedOutput(data.expectedOutput.replaceAll(",", "\r\n"));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    loadQuestion();
  }, []);

  return (
    <div className="h-full w-full bg-gray-200 flex justify-center">
      <div className="h-full w-11/12  flex justify-evenly">
        <QuestionDetails question={question} />
        <CodeEditor submitInput={submitInput} expectedOutput={expectedOutput} />
      </div>
    </div>
  );
}
