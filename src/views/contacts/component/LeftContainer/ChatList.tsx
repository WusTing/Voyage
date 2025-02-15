import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Avatar, Dropdown, theme, GlobalToken, Badge } from "antd";
import { purple } from "@ant-design/colors";
import type { MenuProps } from "antd";
const { useToken } = theme;

export interface ChatListItemData {
  userId: string | number;
  userStatus?: string;
  userAvatar?: string;
  title?: string;
  lastMsg?: string;
  lastTime?: string;
  lastChatRecords?: [];
}
export interface ChatListProps {
  data: ChatListItemData[];
  onSelected: (selectedVal: ChatListItemData) => void;
}

const items: MenuProps["items"] = [
  {
    label: "置顶",
    key: "1",
  },
  {
    label: "消息免打扰",
    key: "2",
  },
  {
    label: "标记为未读",
    key: "3",
  },
  {
    label: "删除消息",
    key: "4",
  },
];
const ChatList: React.FC<ChatListProps> = ({ data, onSelected }) => {
  const { token } = useToken();
  const [selectItem, setSelectedItem] = useState<string | number>();

  const listRef = useRef<HTMLLIElement | null>(null);

  return (
    <ChatListContainer token={token}>
      {data.map((item, index) => (
        <Dropdown menu={{ items }} trigger={["contextMenu"]}>
          <li
            className={`list-item ${index === selectItem && "selected"}`}
            key={index}
            ref={listRef}
            onClick={() => {
              setSelectedItem(index);
              onSelected(item);
            }}
          >
            <div className="left">
              <Badge count={index} size="small">
                <Avatar size={40} shape="square" src={item.userAvatar} />
              </Badge>

              <span className="chat-info">
                <p className="chat-title">{item.title}</p>
                <p className="chat-last-msg">{item.lastMsg}</p>
              </span>
            </div>
            <div className="right">
              <div className="chat-last-time">{item.lastTime}</div>
              <div className="other"></div>
            </div>
          </li>
        </Dropdown>
      ))}
    </ChatListContainer>
  );
};

const ChatListContainer = styled.ul<{ token: GlobalToken }>`
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 5px;
  margin: 0;
  color: ${(t) => t.token.colorTextHeading};
  background-color: ${(t) => t.token.colorBgContainer};
  & .list-item {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    &:hover {
      background-color: ${(t) => t.token.colorBgTextHover};
    }
    &.selected {
      background-color: ${(t) => t.token.colorBgTextActive};
      /* ${purple[3]}; */
    }
    & .left {
      padding: 10px 0;
      display: flex;
      align-items: center;
      overflow-x: hidden;
      flex: 1;

      & .chat-info {
        height: 50px;
        margin: 0 10px;
        padding: 2px 0 2px 0;
        & .chat-title {
          font-weight: 600;
          margin: 0;
        }
        & .chat-last-msg {
          font-size: 0.75rem;
          margin-bottom: 0;
          margin-top: 5px;
          color: ${(t) => t.token.colorTextDescription};
        }
      }
    }
    & .right {
      & .chat-last-time {
        font-family: "Microsoft YaHei New", 微软雅黑, "Microsoft Yahei", "Microsoft JhengHei",
          SimSun, "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

        font-size: 0.75rem;
      }
    }
  }
`;

export default ChatList;
