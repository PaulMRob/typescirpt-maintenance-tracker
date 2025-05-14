// src/app/api/tasks/[taskId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dynamo } from '../../../../../lib/dynamoClient';
import { GetCommand, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

export async function GET(_: NextRequest, { params }: { params: { taskId: string } }) {
  const taskId = params.taskId;

  try {
    const data = await dynamo.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { taskId },
    }));

    if (!data.Item) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(data.Item);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { taskId: string } }) {
  const taskId = params.taskId;
  const body = await req.json();

  try {
    await dynamo.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          taskId,
          ...body,
        },
      })
    );

    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { taskId: string } }) {
    
    const taskId = params.taskId;

  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { taskId },
      })
    );

    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}