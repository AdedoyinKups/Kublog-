import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
const fs = require("fs");
const { NextResponse } = require("next/server");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//API Endpoint for fetching blog data
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

//API Endpoint for uploading blog data
export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch (err) {
    return NextResponse.json(
      {
        error:
          "Invalid form data. Make sure you are sending multipart/form-data.",
      },
      { status: 400 }
    );
  }

  const timestamp = Date.now();
  const image = formData.get("image");
  if (!image) {
    return NextResponse.json(
      { error: "No image file provided." },
      { status: 400 }
    );
  }
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`,
    date: new Date(), 
  };

  await BlogModel.create(blogData);
  console.log("blog svaed");

  return NextResponse.json({ success: true, msg: "Blog added" });
}

//creating API endpoint for deleting blog data
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  // Only try to delete the image if it exists
  if (blog && blog.image) {
    fs.unlink(`./public${blog.image}`, () => {});
  }

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog deleted" });
}
