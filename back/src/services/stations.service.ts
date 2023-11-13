import stationsModel, { Station } from '@models/stations.model';

class StationsService {
  public async findAllStations(page: string, single: string): Promise<Station[]> {
    const stationsPerPage = 45;
    const pageNumber = parseInt(page);
    const isSingle = single === 'true';
    const sliceStart = isSingle ? stationsPerPage * (pageNumber - 1) : 0;
    const sliceEnd = stationsPerPage * pageNumber;

    const stations: Station[] = await stationsModel.find();
    const stationsSlice = sliceStart > stations.length ? [] : stations.slice(sliceStart, sliceEnd);

    return stationsSlice;
  }
}

export default StationsService;
