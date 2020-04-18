import * as AWS from 'aws-sdk'
import { MessageType } from './conversationModel'

const dynamodb = new AWS.DynamoDB()

async function addList(message: string, userId: string): Promise<string[]> {
  const { Item } = await dynamodb.getItem({
    TableName: process.env.TABLE_NAME!,
    Key: {
      userId: {
        S: userId
      }
    },
  }).promise()
  const shoppingList: AWS.DynamoDB.AttributeValue[] = [{ S: message }]
  if (Item) {
    Item.shoppingList.L?.map(value=>shoppingList.push(value))
  }
  await dynamodb.putItem({
    TableName: process.env.TABLE_NAME!,
    Item: {
      userId: {
        S: userId
      },
      shoppingList: {
        L: shoppingList
      }
    }
  }).promise()
  return []
}

async function confirmList(userId: string): Promise<string[]> {
  const { Item } = await dynamodb.getItem({
    TableName: process.env.TABLE_NAME!,
    Key: {
      userId: {
        S: userId
      }
    },
  }).promise()
  const shoppingList: string[] = []
  if (Item) {
    Item.shoppingList.L?.map(value=>shoppingList.push(value.S!))
  }
  return shoppingList
}

async function clearList(userId: string): Promise<string[]> {
  await dynamodb.deleteItem({
    TableName: process.env.TABLE_NAME!,
    Key: {
      userId: {
        S: userId
      }
    },
  }).promise()
  return[]
}

export async function dbHandler(messageType: MessageType, message: string, userId: string): Promise<string[]> {
  switch(messageType) {
    case MessageType.Add:
      return await addList(message, userId)
    case MessageType.Confirm:
      return await confirmList(userId)
    case MessageType.Clear:
      return await clearList(userId)
  }
}