import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todosAccess.mjs'

const todoAccess = new TodoAccess()

export async function getAllTodos() {
  return todoAccess.getAllTodos()
}

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    attachmentUrl: createTodoRequest.attachmentUrl,
    dueDate: createTodoRequest.dueDate,
    createdAt: new Date().toISOString,
    name: createTodoRequest.name,
    done: false
  })
}

export async function updateTodo(todoId, updateTodoRequest, userId) {
  return await todoAccess.updateTodo(
    todoId,
    {
      name: updateTodoRequest.name,
      dueDate: updateTodoRequest.dueDate,
      done: updateTodoRequest.done
    },
    userId
  )
}

export async function deleteTodo(todoId, userId) {
  await todoAccess.deleteTodo(todoId, userId)
}
