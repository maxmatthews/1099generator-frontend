import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./App.scss";
import { Animated } from "react-animated-css";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import downloadjs from "downloadjs";

const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#d32f2f",
		},
		secondary: {
			main: "#ff7043",
		},
	},
});

function App() {
	const [cardNumber, setCardNumber] = useState(1);
	const cards = [GetStartedCard, YourInfoCard, PayeeInfoCard, TINCard, Finish];
	const [formData, setFormData] = useState({});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => {
							if (cardNumber) {
								setCardNumber(cardNumber - 1);
							}
						}}
						style={{
							visibility: cardNumber ? "initial" : "hidden",
						}}
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6">1099 Generator</Typography>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<div
					style={{
						position: "relative",
						display: "flex",
						justifyContent: "center",
					}}
				>
					{cards.map((card, index) => {
						return card(
							setCardNumber,
							index === cardNumber,
							formData,
							setFormData
						);
					})}
				</div>
			</Container>
		</ThemeProvider>
	);
}

const GetStartedCard = (setCardNumber, isVisible) => {
	const [display, setDisplay] = useState(isVisible ? "block" : "none");

	useEffect(() => {
		if (!isVisible) {
			setDisplay("none");
		} else {
			setDisplay("block");
		}
	}, [isVisible]);

	return (
		<Animated
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isVisible}
			style={{ flexGrow: 1, display }}
		>
			<div
				style={{
					justifyContent: "center",
					textAlign: "center",
					display: "flex",
				}}
			>
				<Paper
					style={{
						padding: 30,
						maxWidth: 500,
						marginTop: 15,
						flexGrow: 1,
					}}
				>
					<Animated animationIn="fadeInUp" isVisible={true}>
						<h1 style={{ marginTop: 0 }}>Hey!</h1>
					</Animated>
					<Animated
						animationIn="fadeInUp"
						isVisible={true}
						animationInDelay={500}
					>
						<p>I heard you need to generate a 1099. Shall we?</p>
					</Animated>
					<Animated
						animationIn="fadeIn"
						isVisible={true}
						animationInDelay={1500}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setCardNumber(1);
							}}
						>
							Get started!
						</Button>
					</Animated>
				</Paper>
			</div>
		</Animated>
	);
};

function YourInfoCard(setCardNumber, isVisible, formData, setFormData) {
	const [display, setDisplay] = useState(isVisible ? "block" : "none");
	const [name, setName] = useState(formData.payer?.name || "");
	const [zip, setZip] = useState(formData.payer?.zip || "");
	const [phone, setPhone] = useState(formData.payer?.phone || "");
	const [address, setAddress] = useState(formData.payer?.address || "");
	const [city, setCity] = useState(formData.payer?.city || "");
	const [state, setState] = useState(formData.payer?.state || "");

	useEffect(() => {
		if (!isVisible) {
			setDisplay("none");
		} else {
			setDisplay("block");
		}
	}, [isVisible]);

	return (
		<Animated
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isVisible}
			style={{ flexGrow: 1, display }}
		>
			<div
				style={{
					justifyContent: "center",
					textAlign: "center",
					display: "flex",
				}}
			>
				<Paper
					style={{
						padding: 30,
						marginTop: 15,
						flexGrow: 1,
					}}
				>
					<h1 style={{ marginTop: 0 }}>Let's Start with Your Basics:</h1>
					<Grid container spacing={2}>
						<Grid item md={6}>
							<TextField
								label="Name"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setName(evt.target.value);
								}}
								value={name}
							/>
							<TextField
								label="Zip"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setZip(evt.target.value);
								}}
								value={zip}
							/>
							<TextField
								label="Telephone"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setPhone(evt.target.value);
								}}
								value={phone}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								label="Stress Address"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setAddress(evt.target.value);
								}}
								value={address}
							/>
							<TextField
								label="City"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setCity(evt.target.value);
								}}
								value={city}
							/>
							<TextField
								label="State"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setState(evt.target.value);
								}}
								value={state}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={false} sm={3} />
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									setFormData({
										...formData,
										payer: { name, zip, phone, address, city, state },
									});
									setCardNumber(2);
								}}
								style={{ marginTop: 10 }}
								fullWidth
							>
								Continue
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</Animated>
	);
}

function PayeeInfoCard(setCardNumber, isVisible, formData, setFormData) {
	const [display, setDisplay] = useState(isVisible ? "block" : "none");
	const [name, setName] = useState(formData.payee?.name || "");
	const [zip, setZip] = useState(formData.payee?.zip || "");
	const [phone, setPhone] = useState(formData.payee?.phone || "");
	const [address, setAddress] = useState(formData.payee?.address || "");
	const [city, setCity] = useState(formData.payee?.city || "");
	const [state, setState] = useState(formData.payee?.state || "");

	useEffect(() => {
		if (!isVisible) {
			setDisplay("none");
		} else {
			setDisplay("block");
		}
	}, [isVisible]);

	return (
		<Animated
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isVisible}
			style={{ flexGrow: 1, display }}
		>
			<div
				style={{
					justifyContent: "center",
					textAlign: "center",
					display: "flex",
				}}
			>
				<Paper
					style={{
						padding: 30,
						marginTop: 15,
						flexGrow: 1,
					}}
				>
					<h1 style={{ marginTop: 0 }}>
						Enough about you. I want the deets on who you're paying:
					</h1>
					<Grid container spacing={2}>
						<Grid item md={6}>
							<TextField
								label="Name"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setName(evt.target.value);
								}}
								value={name}
							/>
							<TextField
								label="Zip"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setZip(evt.target.value);
								}}
								value={zip}
							/>
							<TextField
								label="Telephone"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setPhone(evt.target.value);
								}}
								value={phone}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								label="Stress Address"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setAddress(evt.target.value);
								}}
								value={address}
							/>
							<TextField
								label="City"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setCity(evt.target.value);
								}}
								value={city}
							/>
							<TextField
								label="State"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setState(evt.target.value);
								}}
								value={state}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={false} sm={3} />
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									setFormData({
										...formData,
										payee: { name, zip, phone, address, city, state },
									});
									setCardNumber(3);
								}}
								style={{ marginTop: 10 }}
								fullWidth
							>
								Continue
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</Animated>
	);
}

function TINCard(setCardNumber, isVisible, formData, setFormData) {
	const [display, setDisplay] = useState(isVisible ? "block" : "none");
	const [payerTIN, setPayerTIN] = useState(formData.tin?.payerTIN || "");
	const [compensation, setCompensation] = useState(
		formData.tin?.compensation || ""
	);
	const [federalTaxWithheld, setFederalTaxWithheld] = useState(
		formData.tin?.federalTaxWithheld || ""
	);
	const [payeeTIN, setPayeeTIN] = useState(formData.tin?.payeeTIN || "");
	const [stateIncome, setStateIncome] = useState(
		formData.tin?.stateIncome || ""
	);
	const [stateTaxWithheld, setStateTaxWithheld] = useState(
		formData.tin?.stateTaxWithheld || ""
	);

	useEffect(() => {
		if (!isVisible) {
			setDisplay("none");
		} else {
			setDisplay("block");
		}
	}, [isVisible]);

	return (
		<Animated
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isVisible}
			style={{ flexGrow: 1, display }}
		>
			<div
				style={{
					justifyContent: "center",
					textAlign: "center",
					display: "flex",
				}}
			>
				<Paper
					style={{
						padding: 30,
						marginTop: 15,
						flexGrow: 1,
					}}
				>
					<h1 style={{ marginTop: 0 }}>Now for the private stuff...</h1>
					<Grid container spacing={2}>
						<Grid item md={6}>
							<TextField
								label="Payer TIN (EIN or SSN)"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setPayerTIN(evt.target.value);
								}}
								value={payerTIN}
							/>
							<TextField
								label="Compensation amount"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setCompensation(evt.target.value);
								}}
								value={compensation}
							/>
							<TextField
								label="Federal tax withheld"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setFederalTaxWithheld(evt.target.value);
								}}
								value={federalTaxWithheld}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								label="Payee TIN (EIN or SSN)"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setPayeeTIN(evt.target.value);
								}}
								value={payeeTIN}
							/>
							<TextField
								label="State income"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setStateIncome(evt.target.value);
								}}
								value={stateIncome}
							/>
							<TextField
								label="State tax withheld"
								variant="filled"
								fullWidth
								style={{ marginBottom: 10 }}
								onChange={(evt) => {
									setStateTaxWithheld(evt.target.value);
								}}
								value={stateTaxWithheld}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={false} sm={3} />
						<Grid item xs={12} sm={6}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									setFormData({
										...formData,
										tin: {
											payerTIN,
											compensation,
											federalTaxWithheld,
											payeeTIN,
											stateIncome,
											stateTaxWithheld,
										},
									});
									setCardNumber(4);
								}}
								style={{ marginTop: 10 }}
								fullWidth
							>
								Continue
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</Animated>
	);
}

function Finish(setCardNumber, isVisible, formData) {
	const [display, setDisplay] = useState(isVisible ? "block" : "none");

	useEffect(() => {
		if (!isVisible) {
			setDisplay("none");
		} else {
			console.log(formData);
			setDisplay("block");
		}
	}, [isVisible]);

	return (
		<Animated
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isVisible}
			style={{ flexGrow: 1, display }}
		>
			<div
				style={{
					justifyContent: "center",
					textAlign: "center",
					display: "flex",
				}}
			>
				<Paper
					style={{
						padding: 30,
						marginTop: 15,
						flexGrow: 1,
					}}
				>
					<h1 style={{ marginTop: 0 }}>
						You made it. See, that wasn't too bad.
					</h1>
					<Button
						variant="contained"
						color="primary"
						onClick={async () => {
							const { id } = await fetch(`http://localhost:3001/generate`, {
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(formData),
								method: "POST",
							}).then((res) => res.json());

							console.log(`http://localhost:3001/download?id=${id}`);
							downloadjs(`http://localhost:3001/download?id=${id}`);
						}}
					>
						Download Some 🔥
					</Button>
				</Paper>
			</div>
		</Animated>
	);
}

export default App;
