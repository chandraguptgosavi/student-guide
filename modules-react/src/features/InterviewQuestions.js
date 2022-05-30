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
import Paths from "../utils/paths";
import {
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

function Question({ index, style, data }) {
  const navigate = useNavigate();

  return (
    <ListItem
      style={{
        ...style,
        width: "100%",
        backgroundColor: index % 2 && "#ededed",
      }}
      key={index}
      component="div"
      disablePadding
    >
      <ListItemButton
        onClick={(e) => {
          navigate(`${Paths.INTERVIEW_QUESTION}/${data[index].id}`);
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

export default function InterviewQuestionsList() {
  const [questions, setQuestions] = useState([]);

  const loadQuestions = async () => {
    try {
      const db = getFirestore();
    const querySnapshot = await getDocs(
      query(collection(db, "interview-questions-list"))
    );
    let results = [];
    querySnapshot.forEach((doc) => {
      results.push({id: doc.id, ...doc.data()});
    });
    setQuestions([...results]);
    } catch (error) {
      console.log(error);
   }
  }

  useEffect(() => {
    loadQuestions();
  }, [questions]);

  return (
    <div className="h-full w-full flex justify-center">
      <div className="h-full w-3/4 overflow-hidden ">
        <p
          className="text-xl font-semibold"
          style={{ margin: "1em 0 0.5em 0.5em" }}
        >
          Questions
        </p>
        <FixedSizeList
          className="scrollbar"
          height={600}
          itemCount={questions.length}
          itemSize={50}
          width={"100%"}
          itemData={questions}
        >
          {Question}
        </FixedSizeList>
      </div>
    </div>
  );
}
