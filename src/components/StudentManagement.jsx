import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Textarea,
  Select,
  SelectItem,
  Card,
  CardBody,
  CardHeader,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { User, UserPlus, Edit, Trash2, Send } from "lucide-react";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://backend-with-kotlin-demo.onrender.com";
const ROLE = [
  { key: "teacher", value: "teacher", displace: "Teacher" },
  { key: "student", value: "student", displace: "Student" },
  { key: "none", value: "none", displace: "None" },
];

export default function StudentManagement() {
  const [role, setRole] = useState("teacher");
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    studentId: "",
    name: "",
    age: 0,
    gpa: 0,
  });
  const [apiRequest, setApiRequest] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [statusCode, setStatusCode] = useState(-1);

  useEffect(() => {
    // scroll to top when apiRequest or apiResponse changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [apiRequest, apiResponse]);

  const headers = {
    "Content-Type": "application/json",
    Role: role,
  };

  async function fetchStudents() {
    setApiRequest(
      `GET ${BASE_URL}/students\nHeaders: ${JSON.stringify(headers, null, 2)}`
    );
    try {
      const response = await fetch(`${BASE_URL}/students`, { headers });
      setStatusCode(response.status);

      if (!response.ok) {
        const error = await response.text();
        setApiResponse(error);
        return;
      }

      const data = await response.json();
      setStudents(data.students);
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(JSON.stringify(error, null, 2));
    }
  }

  async function getStudent(id) {
    setApiRequest(
      `GET ${BASE_URL}/students/${id}\nHeaders: ${JSON.stringify(
        headers,
        null,
        2
      )}`
    );
    try {
      const response = await fetch(`${BASE_URL}/students/${id}`, { headers });
      setStatusCode(response.status);

      if (!response.ok) {
        const error = await response.text();
        setApiResponse(error);
        return;
      }

      const data = await response.json();
      setCurrentStudent(data);
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(JSON.stringify(error, null, 2));
    }
  }

  async function addStudent() {
    setApiRequest(
      `POST ${BASE_URL}/students\nHeaders: ${JSON.stringify(
        headers,
        null,
        2
      )}\nBody: ${JSON.stringify(currentStudent, null, 2)}`
    );
    try {
      const response = await fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers,
        body: JSON.stringify(currentStudent),
      });
      setStatusCode(response.status);

      if (!response.ok) {
        const error = await response.text();
        setApiResponse(error);
        return;
      }

      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(JSON.stringify(error, null, 2));
    }
  }

  async function updateStudent() {
    setApiRequest(
      `PUT ${BASE_URL}/students/${
        currentStudent._id
      }\nHeaders: ${JSON.stringify(headers, null, 2)}\nBody: ${JSON.stringify(
        currentStudent,
        null,
        2
      )}`
    );
    try {
      const response = await fetch(
        `${BASE_URL}/students/${currentStudent._id}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify(currentStudent),
        }
      );
      setStatusCode(response.status);

      if (!response.ok) {
        const error = await response.text();
        setApiResponse(error);
        return;
      }

      const data = await response.text();
      setApiResponse(data);
    } catch (error) {
      setApiResponse(JSON.stringify(error, null, 2));
    }
  }

  const deleteStudent = async (id) => {
    setApiRequest(
      `DELETE ${BASE_URL}/students/${id}\nHeaders: ${JSON.stringify(
        headers,
        null,
        2
      )}`
    );
    try {
      const response = await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
        headers,
      });
      setStatusCode(response.status);

      if (!response.ok) {
        const error = await response.text();
        setApiResponse(error);
        return;
      }

      const data = await response.text();
      setApiResponse(data);
    } catch (error) {
      setApiResponse(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Demo Student Management System
      </h1>

      <div className="mb-4 max-w-96">
        <Select
          label="Role"
          placeholder="Select a role"
          selectedKeys={[role]}
          onSelectionChange={(keys) => setRole(keys.currentKey)}
        >
          {ROLE.map((item) => (
            <SelectItem key={item.key} value={item.value}>
              {item.displace}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Thẻ Student Form */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Student Form</h2>
          </CardHeader>
          <CardBody className="gap-4">
            <Input
              label="Student Id"
              value={currentStudent.studentId}
              onChange={(e) =>
                setCurrentStudent({
                  ...currentStudent,
                  studentId: e.target.value,
                })
              }
            />
            <Input
              label="Name"
              value={currentStudent.name}
              onChange={(e) =>
                setCurrentStudent({
                  ...currentStudent,
                  name: e.target.value,
                })
              }
            />
            <Input
              label="Age"
              type="number"
              value={currentStudent.age.toString()}
              onChange={(e) =>
                setCurrentStudent({
                  ...currentStudent,
                  age: parseInt(e.target.value),
                })
              }
            />
            <Input
              label="GPA"
              type="number"
              value={currentStudent.gpa.toString()}
              onChange={(e) =>
                setCurrentStudent({
                  ...currentStudent,
                  gpa: parseFloat(e.target.value),
                })
              }
            />
            <div className="flex gap-2 mt-2">
              <Button
                color="primary"
                onClick={addStudent}
                startContent={<UserPlus size={18} />}
              >
                Add Student
              </Button>
              <Button
                color="secondary"
                onClick={updateStudent}
                startContent={<Edit size={18} />}
              >
                Update Student
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Thẻ API Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">API Information</h2>
          </CardHeader>
          <CardBody className="gap-4">
            <Textarea label="API Request" value={apiRequest} readOnly />
            <Textarea label="API Response" value={apiResponse} readOnly />
            <div>
              <p
                className={
                  statusCode === -1
                    ? "text-black"
                    : statusCode >= 200 && statusCode < 300
                    ? "text-green-500 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                Status Code: {statusCode !== -1 ? statusCode : "No status yet"}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Button
        color="primary"
        onClick={fetchStudents}
        className="mb-4"
        startContent={<Send size={18} />}
      >
        Fetch Students
      </Button>

      <Table aria-label="Student table">
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Student Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Age</TableColumn>
          <TableColumn>GPA</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody emptyContent={<p>No data</p>}>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student._id}</TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.gpa}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => getStudent(student._id)}
                    startContent={<User size={18} />}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => deleteStudent(student._id)}
                    startContent={<Trash2 size={18} />}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
