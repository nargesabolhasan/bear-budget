import { NextResponse } from "next/server";

export async function GET({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) {
  try {
    return NextResponse.json(
      { message: "hello" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "bye" }, { status: 400 });
  }
}
