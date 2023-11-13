import { Station } from '@/models/stations.model';
import stationsService from '@services/stations.service';
import { NextFunction, Request, Response } from 'express';

class StationsController {
  public stationsService = new stationsService();

  public getStations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const single = req.query.single as string;
      const finAllStations: Station[] = await this.stationsService.findAllStations(page, single);

      res.status(200).json({ data: finAllStations, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default StationsController;
