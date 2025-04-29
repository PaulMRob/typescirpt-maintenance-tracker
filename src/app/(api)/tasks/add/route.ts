import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();
    return NextResponse.json({message: 'Recieved!', data});
}


// import { NextRequest, NextResponse } from 'next/server';
// import { PutCommand } from "@aws-sdk/lib-dynamodb";
// import { ddb } from '../../../../../lib/dynamoClient';

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { taskId, name, description, frequency } = body;

//   if (!taskId || !name || !frequency) {
//     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//   }

//   const command = new PutCommand({
//     TableName: "Tasks",
//     Item: {
//       taskId,
//       name,
//       description,
//       frequency,
//       createdAt: new Date().toISOString(),
//     },
//   });

//   try {
//     await ddb.send(command);
//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("DynamoDB error:", err);
//     return NextResponse.json({ error: "Failed to insert task" }, { status: 500 });
//   }
// }
