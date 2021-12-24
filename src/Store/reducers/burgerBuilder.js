import * as actionType from '../actions/actionTypes'
import { updateObject } from '../../Store/utility'

const InitialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	building: false,
}
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}
const removeIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	}
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
		building: true,
	}
	return updateObject(state, updatedState)
}
const addIngredient = (state, action) => {
	const updatedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	}
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true,
	}
	return updateObject(state, updatedState)
}
const reducer = (state = InitialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT: {
			return addIngredient(state, action)
		}
		case actionType.REMOVE_INGREDIENT: {
			return removeIngredient(state, action)
		}
		case actionType.SET_INGREDIENTS:
			return updateObject(state, {
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false,
				building: false,
			})
		case actionType.FECHT_INGS_FAILD:
			return updateObject(state, {
				error: true,
			})
		default:
			return state
	}
}
export default reducer
