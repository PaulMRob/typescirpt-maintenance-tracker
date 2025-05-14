import { NextResponse } from 'next/server';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamo } from '../../../../lib/dynamoClient';

export async function GET() {
  try {
    const data = await dynamo.send(
      new ScanCommand({
        TableName: process.env.DYNAMO_TABLE_NAME!,
      })
    );

    return NextResponse.json({ tasks: data.Items || [] });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
