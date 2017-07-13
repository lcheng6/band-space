//Here all we need is the combineReducers function to combine our reducers so we can export them to our store

import { combineReducers } from "redux"

import player from "./player"
import counter from './counterReducer'

export default combineReducers({
  counter,
  player
})