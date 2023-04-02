import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  scoreWin: 0,
  scoreLoss: 0,
  doubleWin: false,
  doubleLoss: false,
  lastResult: { data: "" }
}
const slice = createSlice({
  name: 'slice',
  initialState,
  reducers:
  {
    addScoreWin: (state) => { state.scoreWin = state.doubleWin ? state.scoreWin + 2 : state.scoreWin + 1 },
    addScoreLoss: (state) => { state.scoreLoss = state.doubleLoss ? state.scoreLoss + 2 : state.scoreLoss + 1 },
    addLastResult: (state, action) => { state.lastResult = { data: action.payload } },
    clearScore: (state) => { state.scoreWin = 0; state.scoreLoss = 0; },
    addDoubleWin: (state) => { state.doubleWin = !state.doubleWin },
    addDoubleLoss: (state) => { state.doubleLoss = !state.doubleLoss }
  },
});
const { actions, reducer } = slice;
export default reducer;
export const {
  addScoreWin,
  addScoreLoss,
  addLastResult,
  clearScore,
  addDoubleWin,
  addDoubleLoss
} = actions
