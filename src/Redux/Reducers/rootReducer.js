import {combineReducers} from "redux"
import {productReducer} from "./productReducer"
import {authReducer} from "./authReducer"
import {pageReducer} from "./pagesReducer"
import {cartReducer} from "./cartReducer"
import {filterReducer} from "./filterReducer"


export default combineReducers({
  auth: authReducer,
  product: productReducer,
  pages: pageReducer,
  cart: cartReducer,
  filter: filterReducer
})

