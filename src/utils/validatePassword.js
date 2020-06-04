const validatePassword = (string) => {
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	return string.match(passwordRegex);
};

export default validatePassword;
