import axios from "axios"
import {
  ADD_TO_CART,
  DEC_CART_ITEM,
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCES,
  REMOVE_CART_ITEM, RESET_SEARCH, SEARCH_ITEM,
  SELECT_ITEM, SET_COUNT_ON_PAGE, SET_CURRENT_PAGE,
} from "./actionTypes"

const fetchStart = () => ({
  type: FETCH_DATA_START
})
const fetchSuccess = data => ({
  type: FETCH_DATA_SUCCES,
  data
})
const fetchError = error => ({
  type: FETCH_DATA_ERROR,
  error
})

export const setSelected = id => ({
  type: SELECT_ITEM,
  id
})


export const fetchData = () => async (dispatch, getState) => {
  try {
    dispatch(fetchStart())
    const {data} = await axios
      .get(`https://rick-morty-3c452.firebaseio.com/heroes.json`)
    let resData = data['-M5S5FeMLhIOnq7jmZ2G']
    const cartData = getState().product.cart.orders
    if(cartData.length){
      resData = resData.map(el=>{
        cartData.forEach(item=>{
          if(el.id===item.id){
            el.inCart = item.inCart
          }
        })
        return el
      })
    }
    dispatch(fetchSuccess(resData))
    dispatch(setCurrentPage(1))
  } catch (e) {
    dispatch(fetchError(e))
    console.log(e)
  }
}

export const addToCart = order => ({
  type: ADD_TO_CART,
  order
})

export const decCart = order => ({
  type: DEC_CART_ITEM,
  order
})

export const removeFromCart = order => ({
  type: REMOVE_CART_ITEM,
  order
})


export const setCurrentPage = page => ({
  type: SET_CURRENT_PAGE,
  page
})

export const setCountOnPage = count => dispatch => {
  dispatch({
    type: SET_COUNT_ON_PAGE,
    count
  })
  dispatch(setCurrentPage(1))
}

export const searchItem = value => (dispatch, getState) => {
  dispatch({
    type: SEARCH_ITEM,
    value
  })
  dispatch(setCountOnPage(getState().product.pageCount))
}
//todo
export const resetSearch = () => ({
  type: RESET_SEARCH,
})
