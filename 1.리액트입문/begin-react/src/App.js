import './App.css';
import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');

  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: '',
  // });
  // const { username, email } = inputs;

  const [{ username, email }, onChange, reset ] = useInputs({
    username: '',
    email: '',
  })
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(users.length + 1);

  // const onChange = useCallback(
  //   e => {
  //     const { name, value } = e.target;

  //     setInputs(inputs => ({
  //       ...inputs,
  //       [name]: value,
  //     }));
  //   },
  //   [inputs]
  // )

  // const onCreate = useCallback(() => {
  //   // 새로운 유저 생성
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //   }

  //   //users배열에 추가
  //   setUsers([...users, user]);

  //   //inputs 값 비우기
  //   setInputs({
  //     username: '',
  //     email: ''
  //   });

  //   // nextId 업데이트
  //   nextId.current += 1;
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  // const onRemove = useCallback(
  //   id => {
  //     setUsers(users => users.filter(user => user.id !== id));
  //   },
  //   []
  // );

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  // const onToggle = useCallback(
  //   id => {
  //     setUsers(users =>
  //       users.map(user =>
  //         user.id === id
  //         ? { ...user, active: !user.active}
  //         : user
  //       )
  //     );
  //   },
  //   []
  // );

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  )
}

export default App;
