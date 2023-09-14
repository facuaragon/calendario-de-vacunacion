import startDb from "@/libs/mongodb";
import VacunaModel from "@/models/vacunaModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  //   console.log("email", email);
  if (!id) {
    return NextResponse.json(
      { error: "Informacion Faltante" },
      { status: 422 }
    );
  }
  await startDb();
  //searchs vacunas
  const vacunas = await VacunaModel.find({ userId: id });
  //if doesn't exist return error
  if (!vacunas) {
    return NextResponse.json(
      { error: "No existen vacunas asociadas al usuario" },
      { status: 422 }
    );
  }
  //if exists => send data
  console.log(vacunas);
  return NextResponse.json(
    {
      vacunas,
    },
    { status: 200 }
  );
};
