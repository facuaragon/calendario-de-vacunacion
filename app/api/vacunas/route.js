import startDb from "@/libs/mongodb";
import VacunaModel from "@/models/vacunaModel";
import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export const POST = async (req) => {
  const body = await req.json();
  if (!body)
    return NextResponse.json(
      { error: "Informacion Faltante" },
      { status: 422 }
    );

  await startDb();
  //check is vacuna already exists
  let { userId, nombre, lote, vacunatorio, foto, fechaAplicacion } = body;
  const vacunaVieja = await VacunaModel.findOne({
    userId,
    nombre,
    lote,
    vacunatorio,
    fechaAplicacion,
  });
  //if exists return error
  if (vacunaVieja) {
    return NextResponse.json(
      { error: "Esa vacuna ya se encuentra registrada" },
      { status: 422 }
    );
  }
  //if doesn't exist => uploado foto to cloudinary => create vacuna
  const cloudinaryResult = await cloudinary.uploader.upload(foto, {
    folder: "calendario-vacunacion",
  });
  if (!cloudinaryResult)
    throw new Error("Error en la carga del archivo a Cloudinary");
  foto = cloudinaryResult.secure_url;
  const vacuna = await VacunaModel.create({
    userId,
    nombre,
    lote,
    foto,
    vacunatorio,
    fechaAplicacion,
  });
  return NextResponse.json({
    vacuna: {
      id: vacuna._id.toString(),
      nombre: vacuna.email,
      lote: vacuna.name,
      vacunatorio: vacuna.role,
      foto: vacuna.foto,
      fechaAplicacion: vacuna.fechaAplicacion,
    },
  });
};
