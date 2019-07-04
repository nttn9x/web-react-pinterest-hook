import { useEffect, useContext, useRef, Dispatch } from "react";

import { GlobalContext } from "../../../../context/global.context";
import {
  LOADING_DATA,
  SET_DATAS,
  SHOW_DIALOG,
  IGlobalContext,
  IGlobalAction
} from "../../../../context/global.types";

import axios from "axios";

import {
  CellMeasurerCache,
  createMasonryCellPositioner,
  Positioner,
  IndexRange
} from "react-virtualized";

const gutterSize = 0;
const overscanByPixels = 10;

export let _cache: CellMeasurerCache;
export let _cellPositioner: Positioner;

let _column: number = 0;
let _width: number = 0;
let source: any = null;
let CancelToken: any = null;

function loadImages({ query, offset = 0 }: any) {
  if (!query || query.trim().length < 1) {
    query = "ux/ui";
  }

  if (source) {
    // cancel the request (the message parameter is optional)
    source.cancel("Operation canceled by the user.");
  }

  CancelToken = axios.CancelToken;
  source = CancelToken.source();

  return axios
    .get("https://api.giphy.com/v1/gifs/search?", {
      params: {
        q: query,
        api_key: "oVTKOFlKij3qxjeltRqBzb82ToSujHjd",
        limit: 20,
        offset
      },
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken: source.token
    })
    .then(function(response) {
      return { data: response.data.data };
    })
    .catch(function(error) {
      console.log(error);
      return { isError: true };
    });
}

export async function fetchData(
  textsearch: string,
  dispatch: Dispatch<IGlobalAction>,
  offset: number
) {
  dispatch({ type: LOADING_DATA, textsearch, offset });

  if (offset === 0) {
    const node = document.getElementById("im-clear-all");
    if (node) {
      node.click();
    }
  }

  const res: any = await loadImages({ query: textsearch, offset });
  if (res) {
    dispatch({ type: SET_DATAS, datas: res.data });
  }
}

export function useOwnHook() {
  const { state, dispatch } = useContext<IGlobalContext>(GlobalContext);
  const _masonry: any = useRef(null);
  const textsearch = state.get("textsearch");
  const images = state.get("datas");
  const isLoading = state.get("isLoading");

  function calcWidth(width: number) {
    let _columnCount;
    if (width >= 800) {
      _columnCount = 4;
    } else if (width >= 600) {
      _columnCount = 3;
    } else {
      _columnCount = 2;
    }

    _width = width / _columnCount;
    _column = _columnCount;
  }

  useEffect(() => {
    (async () => {
      const node = document.getElementById("pinterestroot");
      if (node) {
        calcWidth(node.offsetWidth);
      }

      _cache = new CellMeasurerCache({
        defaultHeight: 250,
        defaultWidth: _width,
        fixedWidth: true
      });

      _cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: _cache,
        columnCount: _column,
        columnWidth: _width,
        spacer: gutterSize
      });

      await fetchData("", dispatch, 0);
    })();
  }, [dispatch]);

  async function _onCellsRendered({ startIndex, stopIndex }: IndexRange) {
    if (stopIndex + 1 === images.size && !isLoading) {
      await fetchData(textsearch, dispatch, images.size + 20);
    }
  }

  function _resetCell() {
    _cellPositioner.reset({
      columnCount: _column,
      columnWidth: _width,
      spacer: gutterSize
    });
  }

  function _onResize({ width }: any) {
    if (_cellPositioner) {
      calcWidth(width);

      _resetCell();

      _masonry.current.recomputeCellPositions();
    }
  }

  function viewImage(e: any) {
    try {
      dispatch({
        type: SHOW_DIALOG,
        index: parseInt(e.target.getAttribute("data-index"), 10)
      });
    } catch (error) {}

    e.stopPropagation();
  }

  return {
    isLoading,
    images,
    overscanByPixels,
    _width,
    _masonry,
    _onResize,
    _onCellsRendered,
    _resetCell,
    viewImage
  };
}
