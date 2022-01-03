import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HouseIcon from '@mui/icons-material/House';
import { LoadingButton } from '@mui/lab';
import UserData from './UserData';
import Gender from './Gender';
import { Button, CircularProgress } from '@mui/material';
import DOB from './DOB';
import updateUser from '../../../config/api/updateUser';
import { useUser } from '../../../hooks/useUser';

const Loading = () => {
	return (
		<div className="flex h-[40vh] w-full relative justify-center items-center text-xl text-center">
			<CircularProgress />
		</div>
	);
};

const MyProfile = () => {
	const [disabledBtn, setDisabledBtn] = useState(true);
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user: userData, loading: loader } = useUser();

	const {
		uid = '',
		city = '',
		dob = '',
		gender = '',
		state = '',
		phoneNumber = '',
		email = '',
		displayName = '',
		photoURL = '',
	} = userData || {};
	const [userCity, setUserCity] = useState(city);
	const [userDob, setUserDob] = useState(dob);
	const [userGender, setUserGender] = useState(gender);
	const [userState, setUserState] = useState(state);
	const [userPhoneNumber, setUserPhoneNumber] = useState(phoneNumber);

	if (loader) {
		return <Loading />;
	}

	const onEdit = () => {
		setDisabledBtn(!disabledBtn);
		setEdit(!edit);
	};

	const onSave = async () => {
		setLoading(true);
		const ob = {
			uid,
			city: userCity,
			dob: userDob,
			gender: userGender,
			state: userState,
			phoneNumber: userPhoneNumber,
			email,
			displayName,
			photoURL,
		};
		console.log(ob);
		setDisabledBtn(!disabledBtn);
		setEdit(!edit);

		const res = await updateUser(ob);
		if (res) {
			console.log('User updated succefully');
		} else {
			console.log('User not updated');
		}
		setLoading(false);
	};
	return (
		<div>
			<div className="">
				<div className="  p-6 mb-8">
					<h3 className="text-3xl text-center font-semibold tracking-wider text-gray-600 pb-12">
						Profile
					</h3>
					<div>
						<div className="flex justify-center gap-12 md:gap-20 flex-wrap">
							<div className="flex flex-col space-y-6 text-gray-600 text-md md:text-lg tracking-wider w-[26rem]">
								<UserData
									icon={<EmailIcon />}
									value={email}
									title="Email"
									edit={false}
								/>
								<UserData
									icon={<CallIcon />}
									title="Mobile"
									edit={edit}
									handleChange={setUserPhoneNumber}
									value={userPhoneNumber}
								/>
								<Gender
									value={userGender}
									handleChange={setUserGender}
									edit={edit}
								/>
							</div>
							<div className="flex flex-col space-y-6 text-gray-600 text-md md:text-lg tracking-wider w-[26rem] ">
								<UserData
									icon={<HouseIcon />}
									title="City"
									edit={edit}
									handleChange={setUserCity}
									value={userCity}
								/>
								<UserData
									icon={<LocationCityIcon />}
									title="State"
									edit={edit}
									handleChange={setUserState}
									value={userState}
								/>
								<DOB value={userDob} handleChange={setUserDob} edit={edit} />
							</div>
						</div>
						<div className="flex justify-center gap-4 pt-12 pb-4">
							<Button
								className="bg-blue-500 hover:bg-blue-700 capitalize text-md poppins"
								variant="contained"
								size="small"
								onClick={onEdit}
								disabled={disabledBtn ? false : true}
							>
								Edit
							</Button>
							<LoadingButton
								onClick={onSave}
								loading={loading}
								variant="contained"
								className="poppins capitalize text-md bg-blue-500 hover:bg-blue-700"
								size="small"
								disabled={disabledBtn ? true : false}
							>
								Save
							</LoadingButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
