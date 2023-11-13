import {Station as StationBackend} from '../../../../back/src/models/stations.model';

export interface StationListScreenProps {}

export type StationsBackend = StationBackend[];

export interface Station {
  name?: string; // Name of the bike station
  numBikesAvailable?: number; // Number of bikes available
  numBikesAvailableTypes?: {
    // Number of bike types available
    mechanical?: number;
    ebike?: number;
  };
}

export type Stations = Station[];

// Known ESLint bug
// source: https://github.com/typescript-eslint/tslint-to-eslint-config/issues/856
export enum BikeType {
  MECHANICAL = 'mechanical',
  EBIKE = 'ebike',
  ANY = 'any',
}
