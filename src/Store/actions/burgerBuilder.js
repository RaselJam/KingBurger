import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name,
	}
}
export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name,
	}
}
export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
		building : false
	}
}
export const fethcIngsFailed = () => {
	return {
		type: actionTypes.FECHT_INGS_FAILD,
	}
}
export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get(
				'https://burgerkingrussell-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json'
			)
			.then((response) => {
				dispatch(setIngredients(response.data))
			})
			.catch((error) => {
				dispatch(fethcIngsFailed())
			})
	}
}
