import { createContext, useReducer } from "react";

export const PracticeContext = createContext();

// { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },
//     { title: "jlkjdfalkdjf", question: "", companies:["TCS"], isSolved: false },
//     { title: "fkj", question: "", companies:[], isSolved: false },
//     { title: "lskdjf", question: "", companies:["Wipro"], isSolved: false },
//     { title: "lsja", question: "", companies:[], isSolved: true },

const initialState = {
  questions: [],
  filteredQuestions: [],
  companies: [],
  question: null,
};

function practiceReducer(state, action) {
  switch (action.type) {
    case "add_questions":
      return {...state, questions: [...action.payload]};
    case "filter":
      return {
        ...state,
        filteredQuestions: state.questions.filter((question) =>
          question.companies.includes(action.payload)
        ),
      };
    case "add_question":
      return { ...state, questions: [...state.questions, action.payload] };
    case "add_companies":
      return { ...state, companies: [...state.companies, ...action.payload] };
    case "solve":
      return { ...state, question: action.payload };
    default:
      return state;
  }
}

export default function PracticeContextProvider({ children }) {
  const [state, dispatch] = useReducer(practiceReducer, initialState);
  return (
    <PracticeContext.Provider value={{ state, dispatch }}>
      {children}
    </PracticeContext.Provider>
  );
}
