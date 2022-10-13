import React, {useContext, useState} from "react";
import styled, {css} from "styled-components";
import {MdAdd} from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);

    font-size: 60px;
    color:white;
    border-radius: 50%;

    border:none;
    outline: none;

    transition: 0.125s all ease-in;

    ${props => props.open && css`
        background: red;
        &:hover {
            background: #ff8787;
        }
        &:active {
            background: #fa5252;
        }

        transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
    width:100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding:32px;
    padding-bottom:32px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius:4px;
    border:1px solid #dee2e6;
    outline: none;
    width: 100%;
    font-size: 18px;
    box-sizing: border-box;
`;

function TodoCreate(){
    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    console.log(nextId)

    const [value, setValue] =useState(''); 
    const [open, setOpen] = useState(false);
    const onToggle = ()=>{
        setOpen(!open);
    }

    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        console.log("TEST" + nextId);
        dispatch({type:'CREATE', todo:{ id: nextId.current, text: value, done:false}});
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    return(
        <>
        {open && 
            <InsertFormPositioner>
                <InsertForm onSubmit={onSubmit}>
                    <Input 
                    placeholder="할일 입력 후 Enter" 
                    autoFocus 
                    onChange = {onChange}
                    value = {value}
                    />
                </InsertForm>
            </InsertFormPositioner>
        }
        <CircleButton onClick={onToggle} open={open}>
            <MdAdd></MdAdd>
        </CircleButton>
        </> 
    )
}

export default React.memo(TodoCreate);