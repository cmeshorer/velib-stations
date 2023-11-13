import authMiddleware from '@/middlewares/auth.middleware';
import StationsController from '@controllers/stations.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

class StationsRoute implements Routes {
  public path = '/stations';
  public router = Router();
  public stationsController = new StationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/stations', authMiddleware, this.stationsController.getStations);
  }
}

export default StationsRoute;
