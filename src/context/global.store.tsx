import { useReducer, Dispatch } from "react";

import { fromJS, List } from "immutable";

import {
  SHOW_DIALOG,
  LOADING_DATA,
  SET_DATAS,
  IGlobalState,
  IGlobalAction
} from "./global.types";

const initialState = new IGlobalState();

function reducer(state = initialState, action: IGlobalAction) {
  switch (action.type) {
    case SHOW_DIALOG: {
      return state.set("indexSelected", action.index);
    }
    case LOADING_DATA: {
      if (action.offset === 0 && state.get("datas").size > 0) {
        state = state.update("datas", () => List());
      }
      return state.set("isLoading", true).set("textsearch", action.textsearch);
    }
    case SET_DATAS: {
      return state
        .update("datas", datas => datas.concat(fromJS(action.datas)))
        .set("isLoading", false);
    }
    default:
      return state;
  }
}

export function useOwnRedux(): {
  state: IGlobalState;
  dispatch: Dispatch<IGlobalAction>;
} {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch
  };
}
