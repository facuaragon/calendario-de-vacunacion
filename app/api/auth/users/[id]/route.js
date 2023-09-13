import startDb from "@/libs/mongodb";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  try {
    const { id } = params;
    const { name, email, role, birthday } = await request.json();
    if (id && name && email && role && birthday) {
      await startDb();
      await UserModel.findByIdAndUpdate(id, {
        name,
        email,
        role,
        birthday,
      });
      return NextResponse.json({ message: "User Updated" }, { status: 200 });
    } else {
      throw new Error("data missing");
    }
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 400 });
  }
};
