import { Prisma } from "../database/prismaClient";
const CheckinHistory = async (req, res) => {
	Prisma.checkin
		.findMany()
		.then(checkins => {
			return res.status(200).json(checkins);
		})
		.catch(err => {
			return res.status(400).json(err);
		});
};
export default CheckinHistory;
