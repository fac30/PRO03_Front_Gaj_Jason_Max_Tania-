import React, { useContext } from 'react';
import { UserContext } from '../sections/Content';
import HeroTxt from '../components/HeroTxt';
import Genre from '../components/Genre';
import OpenQuestion from '../components/OpenQuestion';
import Date from '../components/Date';

interface InputProps {
	onNext: () => void;
}

<<<<<<< HEAD
export default function InputPage() {
    const [userName, setUserName] = React.useState("Ga");
    const [userResponse, setUserResponse] = React.useState({
        day: "",
        feel: "",
        genre: "",
        quant: 6});
=======
function InputPage({ onNext }: InputProps) {
	const { userName } = useContext(UserContext);
	
	const [userResponse, setUserResponse] = React.useState({
		date: Date(),
		feel: "",
		genre: "",
		quant: NaN
	});
>>>>>>> main
 
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUserResponse({
			date: event.currentTarget.date.value,
			feel: event.currentTarget.feel.value,
			genre: event.currentTarget.genre.value,
			quant: 6
		});
		console.log(userResponse);
		//TODO: CALL THE API HERE

		onNext();
	}

	return (
		<div className='bg-pink-300'>
<<<<<<< HEAD
            <HeroTxt userName={} primaryText={'Unleash the power of your emotions,'} />
=======
			<HeroTxt
				userName={userName}
				primaryText={'Unleash the power of your emotions'}
			/>
>>>>>>> main

			<form onSubmit={handleSubmit}>
				<Date/>
				<OpenQuestion/>
				<Genre/>
				<button type="submit">Next</button>
			</form>
		</div>
	);
}

export default InputPage;

/* Gaj's Notes
	first step to create a context API 
	create a used context Api hook
	transfer the state from the pink Section to the context Api
	inside the form create a function. 
	submit the form and inside this function i will need to use context api hook to update the username and user answers.*/