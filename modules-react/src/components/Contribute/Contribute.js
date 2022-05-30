import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Children, cloneElement, useContext, useState } from "react";
import { PracticeContext } from "../../context/PracticeContext";
import { Question } from "../../utils/types";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  writeBatch,
  getDocs,
  collection,
} from "firebase/firestore";
import CustomSnackbar from "../Snackbar/CustomSnackbar";

function Form({ children }) {
  return (
    <form className=" h-full w-2/3 flex flex-col ">
      {Children.map(children, (child, key) =>
        cloneElement(child, { style: { margin: "1em 0" }, key })
      )}
    </form>
  );
}

export default function Contribute() {
  const options = [2, 3, 4];
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [optionCount, setOptionCount] = useState(4);
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [companiesStr, setCompaniesStr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    dispatch,
  } = useContext(PracticeContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [severity, setSeverity] = useState("error");

  const submit = async (e) => {
    e.preventDefault();
    const options = [optionA.trim(), optionB.trim()];
    if (optionCount === 3) {
      options.push(optionC.trim());
    }
    if (optionCount === 4) {
      options.push(optionC.trim());
      options.push(optionD.trim());
    }
    const currentCompanies = companiesStr.trim().length
      ? companiesStr
          .trim()
          .split(",")
          .map((company) => company.trim())
      : [];
    const questionObject = new Question(
      title.trim(),
      question.trim(),
      options,
      answer.trim(),
      currentCompanies
    );

    try {
      setIsLoading(true);
      
      const db = getFirestore();
      const docRef = doc(db, "questions", title.trim());
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // upload question
        await setDoc(docRef, { ...questionObject });
        const dataSnap = await getDoc(doc(db, "questions", "data"));
        if (dataSnap.exists()) {
          await setDoc(doc(db, "questions", "data"), {
            size: dataSnap.data().size + 1,
          });
        }

        // upload companies
        
        const companiesSnap = await getDocs(collection(db, "companies"));
        const companies = [];
        companiesSnap.forEach((doc) => {
          companies.push(doc.data().name);
        });
        dispatch({ type: "add_companies", payload: companies });
        const newCompanies = currentCompanies.filter(
          (company) => !companies.includes(company)
        );
        const companiesBatch = writeBatch(db);
        newCompanies.forEach(company => {
          const companyRef = doc(db, "companies", company);
          companiesBatch.set(companyRef, { name: company });
        });
        await companiesBatch.commit();

        // update local data
        dispatch({ type: "add_question", payload: questionObject });
        dispatch({ type: "add_companies", payload: newCompanies });
        setIsSnackbarOpen(true);
        setSeverity("success");
        setSnackbarMessage("Contributed successfully!!!");
        setIsLoading(false);
      } else {
        setIsSnackbarOpen(true);
         setSeverity("error");
        setSnackbarMessage("Title or question may already exists!");
        setIsLoading(false);
      }
    } catch (e) {
      setIsSnackbarOpen(true);
      setSnackbarMessage(e.message);
    }
  };

  return (
    <div className="py-8 min-h-full w-full flex flex-col items-center">
      <Form>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Question"
          variant="outlined"
          required
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Options"
          value={optionCount}
          onChange={(e) => {
            setOptionCount(e.target.value);
          }}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label={`Option 1`}
          variant="outlined"
          required
          value={optionA}
          onChange={(e) => {
            setOptionA(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label={`Option 2`}
          variant="outlined"
          required
          value={optionB}
          onChange={(e) => {
            setOptionB(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label={`Option 3`}
          variant="outlined"
          value={optionC}
          onChange={(e) => {
            setOptionC(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label={`Option 4`}
          variant="outlined"
          value={optionD}
          onChange={(e) => {
            setOptionD(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label={`Answer`}
          variant="outlined"
          required
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Companies"
          placeholder="Separate companies with comma"
          variant="outlined"
          value={companiesStr}
          onChange={(e) => {
            setCompaniesStr(e.target.value);
          }}
        />
        <Button
          className="mb-8 w-2/3 self-center"
          variant="contained"
          onClick={submit}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size="1.7em" /> : "Submit"}
        </Button>
      </Form>
      <CustomSnackbar
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        severity={severity}
        message={snackbarMessage !== null && snackbarMessage}
      />
    </div>
  );
}
