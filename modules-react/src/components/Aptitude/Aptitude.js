import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PracticeContext } from "../../context/PracticeContext";
import Paths from "../../utils/paths";

export default function Home() {
  const navigate = useNavigate();
  const { dispatch } = useContext(PracticeContext);

  // useEffect(() => {
  //   const db = getFirestore();

  //   getDocs(collection(db, "companies"))
  //     .then((snap) => {
  //       const companies = [];
  //       snap.forEach((doc) => {
  //         companies.push(doc.data().name);
  //       });
  //       dispatch({ type: "add_companies", payload: companies });
  //     })
  //     .catch((e) => console.log(e.message));
  // }, []);

  return (
    <div className="max-h-screen h-full w-full ">
      <div
        className="w-full
        flex justify-around items-center
        text-center
      "
        style={{
          position: "absolute",
        top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}
      >
        <div
          className="relative h-36 md:h-44 lg:h-64 xl:h-80 w-1/3 
          rounded-lg 
          bg-blue-300 
          cursor-pointer 
          flex flex-col justify-center"
          onClick={(e) => {
            navigate(Paths.PRACTICE);
          }}
        >
          <div
            className="z-50 h-full w-full
          overflow-hidden
          flex flex-col justify-center"
          >
            <p className="font-semibold text-2xl">Practice</p>
          </div>
          <img
            src={`https://unsplash.com/photos/5fNmWej4tAA/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8dGVzdHx8MHx8fHwxNjQzNjI5NzI3&force=true`}
            alt="practice"
            className="absolute h-full w-full rounded-lg overflow-hidden opacity-20"
          />
        </div>
        <div
          className="relative h-36 md:h-44 lg:h-64 xl:h-80 w-1/3 
          rounded-lg 
          bg-blue-300 
          cursor-pointer 
          flex flex-col justify-center"
          onClick={(e) => {
            navigate(Paths.MOCK_TEST);
          }}
        >
          <div
            className="z-50 h-full w-full
          overflow-hidden
          flex flex-col justify-center"
          >
            <p className="font-semibold text-2xl ">Mock Test</p>
          </div>
          <img
            src={`https://unsplash.com/photos/qDgTQOYk6B8/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8dGVzdHx8MHx8fHwxNjQzNjI5NzI3&force=true`}
            alt="practice"
            className="absolute h-full w-full rounded-lg overflow-hidden opacity-20"
          />
        </div>
      </div>
    </div>
  );
}
