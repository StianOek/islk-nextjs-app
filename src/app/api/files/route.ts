import { NextResponse } from "next/server";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const uploadPath = `public/uploads/${fileName}`;
  await fs.promises.writeFile(uploadPath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
