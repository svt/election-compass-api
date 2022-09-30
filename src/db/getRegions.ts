import data from './data';
import { RegionModel } from '../models/svt';

const compare = new Intl.Collator('sv', { usage: 'sort' }).compare;
const sortByName = (a: RegionModel, b: RegionModel) => {
  return compare(a.name, b.name);
};

export default async function getMunicipalities(): Promise<RegionModel[]> {
  const regions: RegionModel[] = [];

  for (const municipality of data.municipalities) {
    const region = regions.find(
      (region) => region.slug === municipality.regionSlug
    );

    if (region) {
      region.municipalityIds.push(municipality.id);
    } else {
      regions.push({
        id: municipality.regionId,
        name: municipality.regionName,
        slug: municipality.regionSlug,
        altingetId: municipality.regionAltingetId,
        municipalityIds: [municipality.id],
      });
    }
  }

  return regions.sort(sortByName);
}
