import { useAppSelector } from '../../stores'

export function TodoList() {
  const todos = useAppSelector((s) => s.todo)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
}
