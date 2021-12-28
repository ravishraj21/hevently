import dbConnect from '../../db/utils/dbConnect.js';
import { SocialVenue } from '../../db/model/Venue';
import { EventProvider } from '../../context/EventContext';
import { UserContext } from '../../context/Users';
import { useContext } from 'react';
import { CircularProgress } from '@mui/material';
import Event from '../../components/Events/Event';

const SocialPage = ({ venues }) => {
	const user = useContext(UserContext);
	return (
		<>
			{user ? (
				<EventProvider>
					<div>
						<Event venues={venues} type={'social'} />
					</div>
				</EventProvider>
			) : (
				<div className="flex h-screen w-screen fixed justify-center items-center text-xl text-center">
					<CircularProgress />
				</div>
			)}
		</>
	);
};

export default SocialPage;

export async function getStaticProps() {
	dbConnect();

	let data = await SocialVenue.find({});
	let venues = JSON.parse(JSON.stringify(data));

	if (!venues) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			venues,
		},
	};
}
