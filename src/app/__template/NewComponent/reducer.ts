import produce from 'immer'
import { DEFAULT_ACTION } from './actions'


export const initialState = {
  defaultStateEntry: 1
}

const defaultReducer = (state = initialState, action: { type: any; payload: number; }) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.defaultStateEntry = action.payload
        break
    }
  })

export default defaultReducer
