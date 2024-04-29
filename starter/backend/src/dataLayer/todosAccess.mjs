import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient, {
      marshallOptions: {
        removeUndefinedValues: true
      }
    })
  }

  async getAllTodos() {
    console.log('Getting all todos')

    const result = await this.dynamoDbClient.scan({
      TableName: this.todosTable
    })
    return result.Items
  }

  async createTodo(todo) {
    console.log(`Creating a todo with todoId ${todo.todoId}`)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async deleteTodo(todoId, userId) {
    console.log(
      `Deleting a todo with todoId ${todoId} from user with id ${userId}`
    )

    await this.dynamoDbClient.delete({
      TableName: this.todosTable,
      Key: { todoId, userId }
    })
  }

  async updateTodo(todoId, todo) {
    console.log(`Update a todo with todoId ${todoId}`)

    await this.dynamoDbClient.update({
      TableName: this.todosTable,
      Key: { todoId },
      Item: todo
    })
  }
}
