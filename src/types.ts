interface IFipeData {
  brand: string;
  model: string;
  year_model: string;
  reference_month: string;
  fuel: string;
  value: string;
}

export interface IVehicleData {
  brand: string;
  model: string;
  year: string;
  model_year: string;
  color: string;
  chassis: string;
  city: string;
  state: string;
  plate: string;
  fipe: IFipeData[];
}