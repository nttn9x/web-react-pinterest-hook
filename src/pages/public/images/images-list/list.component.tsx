import React from "react";

import {
  AutoSizer,
  Masonry,
  MasonryCellProps,
  CellMeasurer,
  WindowScroller
} from "react-virtualized";

import ItemComponent from "./list-item.component";
import LoadingComponent from "../../../../component/progress/loader/loader.component";

import { _cache, _cellPositioner, useOwnHook } from "./list.hook";

const ListImages: React.FC = () => {
  const {
    isLoading,
    images,
    overscanByPixels,
    _width,
    _masonry,
    _resetCell,
    _onResize,
    _onCellsRendered,
    viewImage
  } = useOwnHook();

  function _cellRenderer({ index, key, parent, style }: MasonryCellProps) {
    if (images.size < 1) {
      return null;
    }
    try {
      const data = images.get(index % images.size);
      const image = data.get("images").get("fixed_width");
      const user = data.get("user");

      return (
        <CellMeasurer index={index} key={key} parent={parent} cache={_cache}>
          <ItemComponent
            index={index}
            style={style}
            width={_width}
            height={image.get("height")}
            url={image.get("url")}
            user={user}
            handleClick={viewImage}
          />
        </CellMeasurer>
      );
    } catch (error) {
      return null;
    }
  }
  function clearList() {
    _cache.clearAll();
    _resetCell();
    _masonry.current.clearCellPositions();
  }

  if (!_cellPositioner) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <div className="images__loading">
          <LoadingComponent />
        </div>
      )}
      <div className="images__list">
        <button
          style={{ display: "none" }}
          id="im-clear-all"
          onClick={clearList}
        >
          clear
        </button>
        <WindowScroller overscanByPixels={overscanByPixels}>
          {({ height, scrollTop }) => (
            <AutoSizer
              disableHeight
              onResize={_onResize}
              overscanByPixels={overscanByPixels}
            >
              {({ width }) => {
                return (
                  <>
                    <Masonry
                      ref={_masonry}
                      autoHeight={true}
                      cellCount={images.size}
                      cellMeasurerCache={_cache}
                      cellPositioner={_cellPositioner}
                      cellRenderer={_cellRenderer}
                      scrollTop={scrollTop}
                      height={height}
                      width={width}
                      onCellsRendered={_onCellsRendered}
                      overscanByPixels={overscanByPixels}
                    />
                  </>
                );
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>
    </>
  );
};

export default ListImages;
