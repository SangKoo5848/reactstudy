import React, {useContext, useReducer, useRef} from "react";
import { MdSwitchAccount } from "react-icons/md";

const initialTodos = [
    {
        id:1,
        text: 'prj1',
        done: true
    },
    {
        id:2,
        text: 'prj2',
        done: true
    },
    {
        id:3,
        text: 'prj3',
        done: false
    }
]
// create, toggle, remove
function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            console.log("toggle remove")
            return state.map(
                todo => todo.id === action.id ? {...todo, done: !todo.done} : todo
            )
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error('Error: ${action.type}');
    }
}

//Context 생성 
//Context에는 Provider라는 컴포넌트가잇음.
const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();
//id는 useRef로 관리할거임
const TodoNextIdContext = React.createContext();

//provider 생성
export function TodoProvider({children}){
    const [state, dispatch]= useReducer(todoReducer, initialTodos);
    const nextId = useRef(4);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

//3개의 커스텀 훅 생성
export function useTodoState(){
    const context = useContext(TodoStateContext);
    if(!context)
        return new Error('NOT FOUND TodoStateContext');

    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context)
        return new Error('NOT FOUND TodoDispatchContext');

    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    console.log(context);
    if(!context)
        return new Error('NOT FOUND TodoNextIdContext');
        
    return context;
}