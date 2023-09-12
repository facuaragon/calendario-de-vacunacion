import startDb from "@/libs/mongodb";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  await startDb();

  //check is user already exists
  const oldUser = await UserModel.findOne({ email: body.email });

  //if exists return error
  if (oldUser) {
    return NextResponse.json(
      { error: "El correo electrónico ya se encuentra en uso" },
      { status: 422 }
    );
  }
  //if doesn't exist => create user
  const user = await UserModel.create({ ...body });
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};
