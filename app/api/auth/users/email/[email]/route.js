import startDb from "@/libs/mongodb";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = params;
  //   console.log("email", email);
  if (!email) {
    return NextResponse.json(
      { error: "Informacion Faltante" },
      { status: 422 }
    );
  }
  await startDb();
  //searchs user
  const user = await UserModel.findOne({ email: email });
  //if doesn't exist return error
  if (!user) {
    return NextResponse.json(
      { error: "No existe el usuario" },
      { status: 422 }
    );
  }
  //if exists => send data
  return NextResponse.json(
    {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        birthday: user.birthday,
      },
    },
    { status: 200 }
  );
};
