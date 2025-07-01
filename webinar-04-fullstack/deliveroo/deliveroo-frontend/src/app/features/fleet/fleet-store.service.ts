import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Vehicle, VehicleType, VehicleStatus } from './vehicle.model';

// State interface
interface FleetStoreState {
  vehicles: Vehicle[];
  filters: {
    search: string;
    status: VehicleStatus | null;
    type: VehicleType | null;
  };
  pagination: {
    pageSize: number;
    pageIndex: number;
  };
}

// Initial state
const initialState: FleetStoreState = {
  vehicles: [],
  filters: {
    search: '',
    status: null,
    type: null,
  },
  pagination: {
    pageSize: 10,
    pageIndex: 0,
  },
};

export const FleetStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setVehicles(vehicles: Vehicle[]) {
      patchState(store, { vehicles });
    },
    setFilters(filters: Partial<{ search: string; status: VehicleStatus | null; type: VehicleType | null }>) {
      patchState(store, {
        filters: { ...store.filters(), ...filters },
        pagination: { ...store.pagination(), pageIndex: 0 }, // Reset page on filter change
      });
    },
    setPagination(pagination: Partial<{ pageSize: number; pageIndex: number }>) {
      patchState(store, {
        pagination: { ...store.pagination(), ...pagination },
      });
    },
  }))
);
