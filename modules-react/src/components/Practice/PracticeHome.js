import {
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import { BsDash, BsCheck2 } from "react-icons/bs";
import Paths from "../../utils/paths";
import { PracticeContext } from "../../context/PracticeContext";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function Question({ index, style, data }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(PracticeContext);

  return (
    <ListItem
      style={{
        ...style,
        width: "60%",
        backgroundColor: index % 2 && "#ededed",
      }}
      key={index}
      component="div"
      disablePadding
    >
      <ListItemButton
        onClick={(e) => {
          dispatch({ type: "solve", payload: data[index] });
          navigate(`${Paths.PRACTICE}/${index + 1}`);
        }}
      >
        <ListItemIcon>
          {/* {data[index].isSolved ? (
            <BsCheck2 className="text-green-500 w-6 h-6" />
          ) : (
            <BsDash className="w-6 h-6" />
          )} */}
          {`${index + 1}.`}
        </ListItemIcon>
        <ListItemText primary={data[index].title} />
      </ListItemButton>
    </ListItem>
  );
}

function QuestionsList({ selectedCompany }) {
  const {
    state: { questions, filteredQuestions },
    dispatch,
  } = useContext(PracticeContext);

  useEffect(() => {
    const db = getFirestore();

    getDocs(collection(db, "questions"))
      .then((snap) => {
        let questions = [];
        snap.forEach((doc) => {
          if (doc.id !== "data") questions.push(doc.data());
        });
        dispatch({ type: "add_questions", payload: questions });
      })
      .catch((e) => console.log(e.message));
  }, []);

  return (
    <div className="h-full w-full md:ml-10 lg:ml-20 xl:ml-28 overflow-hidden">
      <p
        className="text-xl font-semibold"
        style={{ margin: "1em 0 0.5em 0.5em" }}
      >
        Questions
      </p>
      <FixedSizeList
        className="scrollbar"
        height={600}
        itemCount={
          !selectedCompany ? questions.length : filteredQuestions.length
        }
        itemSize={50}
        width={"100%"}
        itemData={!selectedCompany ? questions : filteredQuestions}
      >
        {Question}
      </FixedSizeList>
    </div>
  );
}

function Filter({ selectedCompany, setSelectedCompany }) {
  const {
    state: { companies },
    dispatch,
  } = useContext(PracticeContext);

  useEffect(() => {
    if (companies.length === 0) {
      const db = getFirestore();

      getDocs(collection(db, "companies"))
        .then((snap) => {
          const companies = [];
          snap.forEach((doc) => {
            companies.push(doc.data().name);
          });
          dispatch({ type: "add_companies", payload: companies });
        })
        .catch((e) => console.log(e.message));
    }
  }, []);

  return (
    <div
      className="fixed right-12 bottom-8  w-1/3"
      style={{ maxWidth: "350px", minWidth: "100px", top:"11%" }}
    >
      <Paper variant="outlined" className="p-4 h-full w-full">
        <p className="my-2 text-lg font-medium">Companies</p>
        {companies.map((company) => (
          <Chip
            key={company}
            label={company}
            style={{
              margin: "0.5em",
              backgroundColor: selectedCompany === company && "#2185d0",
              color: selectedCompany === company && "white",
            }}
            onClick={(e) => {
              if (company !== selectedCompany) {
                setSelectedCompany(company);
                dispatch({ type: "filter", payload: company });
              } else {
                setSelectedCompany(null);
              }
            }}
          />
        ))}
      </Paper>
    </div>
  );
}

export default function PracticeHome() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div className="h-full w-full flex justify-around">
      <QuestionsList selectedCompany={selectedCompany} />
      <Filter
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />
    </div>
  );
}
