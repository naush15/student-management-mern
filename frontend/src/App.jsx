import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div>
      <h1>Student Management System</h1>

      {students.map((student) => (
        <div key={student._id}>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
          <p>{student.course}</p>
        </div>
      ))}
    </div>
  );
}

export default App;