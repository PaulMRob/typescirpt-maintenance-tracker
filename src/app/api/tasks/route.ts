import { NextRequest, NextResponse } from 'next/server';
import { ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../../../../lib/dynamoClient';
import { v4 as uuidv4 } from 'uuid';
import { Task } from 'lib/types/task';

const TABLE_NAME = process.env.DYNAMO_TABLE_NAME!;

// get all tasks
export async function GET() {
  try {
    const data = await dynamo.send(new ScanCommand({
      TableName: TABLE_NAME,
    }));

    return NextResponse.json(data.Items || []);
  } catch (error) {
    console.error('GET all tasks error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// create new task
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const task: Task = {
      taskId: uuidv4(), // generate a unique ID
      title: body.title,
      status: body.status || 'pending',
      description: body.description || '',
      createdAt: new Date().toISOString(),
    };

    await dynamo.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: task,
    }));

    return NextResponse.json({ message: 'Task created', task });
  } catch (error) {
    console.error('POST task error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}