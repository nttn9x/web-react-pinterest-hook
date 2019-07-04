import React from "react";

interface ItemProps {
  style: any;
  index: number;
  height: number;
  width: number;
  url: string;
  user: any;
  handleClick: any;
}

const Item = React.memo(function ItemComponent({
  style,
  index,
  height,
  width,
  url,
  user,
  handleClick
}: ItemProps) {
  return (
    <div
      style={{
        ...style,
        width
      }}
      className="list__item"
    >
      <div className="list__item__root">
        <div
          data-index={index}
          className="item__root_mask"
          onClick={handleClick}
        />
        <div
          className="item__root__body"
          style={{
            height: `${height}px`
          }}
        >
          <img alt="Error" src={url} />
        </div>
        {user && (
          <div className="item__root_author">
            <img src={user.get("avatar_url")} alt="" />
            <label>{user.get("display_name")}</label>
          </div>
        )}
      </div>
    </div>
  );
});

export default Item;
