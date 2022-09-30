import data from './data';
import { MunicipalityModel } from '../models/svt';

const compare = new Intl.Collator('sv', { usage: 'sort' }).compare;
const sortByName = (a: MunicipalityModel, b: MunicipalityModel) => {
  return compare(a.name, b.name);
};

export default async function getMunicipalities(): Promise<
  MunicipalityModel[]
> {
  return [...data.municipalities].sort(sortByName);
}
