import express from "express";
import logger from "morgan"
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(logger("combined"))
let students = [
	{ id: 1, name: "Ali", course: "math" },
	{ id: 2, name: "Sara", course: "science" },
	{ id: 3, name: "John", course: "math" },
];

app.get("/student/list", (req, res) => {
	const course = req.params.course;
	const result = students.filter((student) => student);
	res.json(result);
});

app.get("/student/name/course/:course", (req, res) => {
	const course = req.params.course;
	const result = students.filter((student) => student.course === course);
	res.json(result);
});

app.post("/students", (req, res) => {
	const newStudent = {
		id: students.length + 1,
		name: req.body.name,
		course: req.body.course,
	};

	students.push(newStudent);
	res.json(newStudent);
});

app.put("/students/:id", (req, res) => {
	const id = Number(req.params.id);
	students = students.map((student) =>
		student.id === id
			? { id, name: req.body.name, course: req.body.course }
			: student
	);
	res.json({ message: "student updated", students });
});

app.patch("/students/:id", (req, res) => {
	const id = Number(req.params.id);
	const student = students.find((item) => item.id === id);

	if (!student) {
		return res.json({ message: "student not found" });
	}

	if (req.body.name) {
		student.name = req.body.name;
	}

	if (req.body.course) {
		student.course = req.body.course;
	}

	res.json({ message: "student patched", student });
});

app.delete("/students/:id", (req, res) => {
	const id = Number(req.params.id);
	students = students.filter((student) => student.id !== id);
	res.json({ message: "student deleted", students });

});

app.get("/courses", (req, res) => {
	const courses = [
		{ id: 1, title: "Intro to Math", Instructor: "Ali", Duration: "4 weeks", level: "Beginner", price: 29.99, image: "" },
		{ id: 2, title: "Basics of Science", Instructor: "Sara", Duration: "5 weeks", level: "Beginner", price: 24.99, image: "" },
		{ id: 3, title: "Intro to Programming", Instructor: "John", Duration: "6 weeks", level: "Intermediate", price: 39.99, image: "" },
	];
	res.json(courses);
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
