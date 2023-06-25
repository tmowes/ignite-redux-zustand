import { FormEvent, useState } from 'react'

import { useDispatch } from 'react-redux'

import { addTodo } from '../../stores'

export function TodoForm() {
  const dispatch = useDispatch()
  const [task, setTask] = useState('')

  const onAddNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTodo(task))
    setTask('')
  }

  return (
    <form onSubmit={onAddNewTodo}>
      <input type="text" value={task} onChange={({ target }) => setTask(target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}
