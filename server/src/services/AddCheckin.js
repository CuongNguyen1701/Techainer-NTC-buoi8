import { Prisma } from "../database/prismaClient";
import { Gate } from "@prisma/client";
const AddCheckin = async (req, res) => {
	const resource = req.body;
	console.log(resource);
	const inputName = resource.name;
	const inputId = resource.id;
	const inputGate = resource.gate;
	let STATUS = {};

	if (isNaN(inputId))
		return res.status(200).json("Invalid ID, please enter a number");
	if (!(inputGate in Gate))
		return res.status(200).json(`Invalid gates, please enter one of these gates: ${Object.getOwnPropertyNames(Gate)}`);
	
	
		//Check if the staff is already on the database or not
	let staff = await Prisma.staff.findUnique({
		where: {
			id: Number(inputId),
		},
	});

	//create staff data if not found
	if (!staff) {
		staff = await Prisma.staff.create({
			data: {
				id: Number(inputId),
				name: inputName,
			},
		});
	}

	//create checkin data
	staff = await Prisma.staff
		.update({
			where: {
				id: Number(inputId),
			},
			data: {
				Checkin: {
					create: {
						Gate: inputGate,
					},
				},
			},
		})
		.then((staff) => {
			console.log(staff);
			return res.status(200).json("Check-in successfully!");
		})
		.catch(error => {
			return res.status(400).json(error);
		});
};
export default AddCheckin;
