import { useEffect, useState } from "react";
import "./App.css";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import axios from "axios";
import Auth from "./components/Auth";
import { Toaster, toast } from "sonner";
import { useCookies } from "react-cookie";

const serverURL = import.meta.env.VITE_SERVERURL;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  // const authToken = true;

  const getData = async () => {
    try {
      const response = await axios.get(`${serverURL}/todos/${userEmail}`);
      const data = response.data;
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  //sort by date

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="App">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <Toaster richColors />
          <ListHeader listName={"Holiday tick list 🏝️"} getData={getData} />
          <p>Welcome back {cookies.Email}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import "./App.css";
// import ListHeader from "./components/ListHeader";
// import ListItem from "./components/ListItem";

// function App() {
//   const userEmail = "test@test.com";

//   const [tasks, setTasks] = useState(null);

//   const getData = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
//       const json = await response.json();
//       console.log(json, "frontend JSON");
//       setTasks(json);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => getData, []);

//   console.log(tasks, "these are tasks");

//   //sort by date

//   const sortedTasks = tasks?.sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   return (
//     <div className="App">
//       <ListHeader listName={"Holiday tick list 🏝️"} />
//       {sortedTasks?.map((task) => (
//         <ListItem key={task.id} task={task} />
//       ))}
//     </div>
//   );
// }

// export default App;
