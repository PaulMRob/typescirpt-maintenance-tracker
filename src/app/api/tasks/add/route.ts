import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamo } from "../../../../../lib/dynamoClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log("ENV DYNAMO_TABLE_NAME:", process.env.DYNAMO_TABLE_NAME);
    console.log("Request body:", body);

        const { taskId, name, description, frequency } = body;

        if (!taskId || !name || !description || !frequency ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await dynamo.send(
            new PutCommand({
              TableName: process.env.DYNAMO_TABLE_NAME!,
              Item: {
                taskId: body.taskId,
                name: body.name,
                description: body.description,
                frequency: body.frequency,
              },
            })
          );


        return NextResponse.json({ message: "Task created successfully" });
    } catch (error) {
        console.error("Error inserting task:", error);
        return NextResponse.json({ error: `Internal Server Error: ${String(error)}` }, { status: 500 });
    }
}