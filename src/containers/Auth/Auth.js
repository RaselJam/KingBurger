import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../Store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: true,
	}
	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath()
		}
	}
	checkValidity(value, rules) {
		let isValid = true
		if (!rules) {
			return true
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/
			isValid = pattern.test(value) && isValid
		}

		return isValid
	}
	inputChangedHandler = (e, ctrName) => {
		const updatedControls = {
			...this.state.controls,
			[ctrName]: {
				...this.state.controls[ctrName],
				value: e.target.value,
				valid: this.checkValidity(e.target.value, this.state.controls[ctrName].validation),
				touched: true,
			},
		}
		this.setState({ controls: updatedControls })
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
	}
	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup }
		})
	}
	render() {
		const formElementsArray = []
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			})
		}
		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
			/>
		))
		if (this.props.loading) {
			form = <Spinner />
		}
		let errorMessage = null
		if (this.props.error) {
			errorMessage = <p>{this.props.error.message}</p>
		}
		let authRedirect = null
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
			console.log('in If statement :', authRedirect)
		}
		console.log('in Rendering redirect is  :', authRedirect)
		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}

				<form onSubmit={this.handleSubmit}>
					{form}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
				<Button clicked={this.switchAuthModeHandler} btnType='Danger'>
					Switch To {this.state.isSignup ? 'SignIn' : 'SignUp'}
				</Button>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	}
}
const mapDispatchToProps = (dispatch) => ({
	onAuth: (email, pass, isSignUp) => dispatch(actions.auth(email, pass, isSignUp)),
	onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
})
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
