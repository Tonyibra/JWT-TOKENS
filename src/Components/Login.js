import React, { useState } from "react";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
const Login = () => {
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [cpassword, setCPassword] = useState();
	const [passDontMtach, setPassDontMatch] = useState("");
	const getUserName = (e) => {
		console.log(e.target.value);
		setUserName(e.target.value);
	};
	const getpassword = (e) => {
		console.log(e.target.value);
		setPassword(e.target.value);
	};
	const confirmPassword = (e) => {
		console.log(e.target.value);
		setCPassword(e.target.value);
	};

	const submitInfo = async () => {
		const options = {
			headers: { name: userName, password: password },
		};
		const registerEndPoint = "http://localhost:5000/auth/register";

		if (password !== cpassword) {
			setPassDontMatch("passwords does not match");
		} else {
			const register = await axios.post(registerEndPoint, options.headers).then(
				(res) => {
					console.log(res);
				},
				(error) => {
					console.log(error);
				}
			);
			setPassDontMatch("");
		}
	};
	return (
		<div className="login">
			{passDontMtach !== "" && <Alert severity="error">{passDontMtach}</Alert>}
			<input onChange={getUserName} type="text" placeholder="full name" />
			<input onChange={getpassword} type="text" placeholder="password" />
			<input
				onChange={confirmPassword}
				type="text"
				placeholder="repeat password"
			/>
			<button onClick={submitInfo}>Login</button>
		</div>
	);
};

export default Login;
