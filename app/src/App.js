import { useState } from "react";
import "./App.css";
import checkinApi from "./api/checkinApi";
function App() {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const [gate, setGate] = useState("GATE1");
	const [checkin, setCheckin] = useState({
		name: "",
		id: "",
		gate: "GATE1",
	});

	const addCheckin = async (name, id, gate) => {
		const newCheckin = {
			name: name,
			id: id,
			gate: gate,
		};
		try {
			setCheckin(newCheckin);
			const response = await checkinApi.post("/checkin", checkin);
			console.log("posted checkin" + response );
		} catch (err) {
			console.log(err);
		}
	};
	//Handles submit events
	const handleSubmit = e => {
		e.preventDefault();
		if (!name) return alert("Please enter employee's name");
		if (!id) return alert("Please enter the id");
		try {
			addCheckin(name, id, gate || "GATE1");
			console.log("added checkin");
		} catch (err) {
			console.log(err);
		}
		// setName("");
		// setId("");
		// setGate("");
	};
	return (
		<div className="container">
			<form className="add-form" onSubmit={handleSubmit}>
				<div className="form-control">
					<label>Enter Employee's name:</label>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Enter Employee's ID</label>
					<input
						type="text"
						placeholder="ID"
						value={id}
						onChange={e => setId(e.target.value)}
					/>
				</div>
				<div className="form-control">
					<label>Enter Check-in gate:</label>
					<input
						type="text"
						placeholder="GATE"
						value={gate}
						onChange={e => setGate(e.target.value)}
					/>
				</div>
				<input type="submit" value="Check-in" className="btn btn-block" />
			</form>
		</div>
	);
}

export default App;
