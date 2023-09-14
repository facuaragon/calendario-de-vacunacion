import { models, model } from "mongoose";
import { Schema } from "mongoose";

const vacunaSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  lote: {
    type: String,
    trim: true,
  },
  vacunatorio: {
    type: String,
    trim: true,
  },
  foto: {
    type: String,
    required: true,
  },
  fechaAplicacion: {
    type: Date,
    required: true,
  },
});

const VacunaModel = models.Vacuna || model("Vacuna", vacunaSchema);

export default VacunaModel;
