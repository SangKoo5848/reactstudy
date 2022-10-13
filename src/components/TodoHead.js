import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom : 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  } 
    //open Color site 참고
  .day {
    margin-top: 4px;
    color: black;
    font-size: 21px;
  }

  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {

  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);

  const date = new Date();
  const dateString = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month:'long',
    day: 'numeric'
  });

  const dayname = date.toLocaleDateString('ko-KR', {
    weekday: 'long'
  });

  return (
      <TodoHeadBlock>
          <h1>{dateString}</h1>
          <div className="day">{dayname}</div>
          <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
      </TodoHeadBlock>
  )
}

export default TodoHead;