import startDb from "@/libs/mongodb";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { error: "Informacion Faltante" },
      { status: 422 }
    );

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
  if (body.birthday) {
    let { email, name, password, birthday } = body;
    email = email.toLowerCase();
    const user = await UserModel.create({ email, name, password, birthday });
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        birthday: user.birthday,
      },
    });
  } else {
    const user = await UserModel.create({ ...body });
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }
};
