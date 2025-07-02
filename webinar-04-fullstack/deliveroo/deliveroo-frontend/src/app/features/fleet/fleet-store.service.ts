import { signalStore, withState, withComputed, withMethods, patchState, withHooks } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehicleDTO, VehicleType, VehicleStatus } from './vehicle.model';
import { VehicleHTTPService } from './vehicle-http.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// State interface
interface FleetStoreState {
  vehicles: VehicleDTO[];
  pageSize: 10 | 20 | 50;
  currentPage: number;
  search: {
    text: string;
    type: VehicleType | null;
    status: VehicleStatus | null;
    lastMaintenanceFrom?: string | null;
    lastMaintenanceTo?: string | null;
  };
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FleetStoreState = {
  vehicles: [],
  pageSize: 10,
  currentPage: 1,
  search: {
    text: '',
    type: null,
    status: null,
    lastMaintenanceFrom: null,
    lastMaintenanceTo: null,
  },
  loading: false,
  error: null,
};

export const FleetStore = signalStore(
  withState(initialState),
  withComputed(({ vehicles, pageSize, currentPage, search }) => {
    // Computed: total number of pages
    const pageCount = computed(() => {
      const total = vehicles().length;
      const size = pageSize();
      return size > 0 ? Math.ceil(total / size) : 1;
    });

    // Computed: vehicles filtered by search
    const filteredVehicles = computed(() => {
      const all = vehicles();
      const { text, type, status, lastMaintenanceFrom, lastMaintenanceTo } = search();
      let filtered = all;
      if (text && text.trim()) {
        const lower = text.trim().toLowerCase();
        filtered = filtered.filter(v =>
          v.licensePlate?.toLowerCase().includes(lower) ||
          v.currentDriver?.toLowerCase().includes(lower)
        );
      }
      if (type) {
        filtered = filtered.filter(v => v.type === type);
      }
      if (status) {
        filtered = filtered.filter(v => v.status === status);
      }
      if (lastMaintenanceFrom) {
        filtered = filtered.filter(v => v.lastMaintenance && v.lastMaintenance >= lastMaintenanceFrom);
      }
      if (lastMaintenanceTo) {
        filtered = filtered.filter(v => v.lastMaintenance && v.lastMaintenance <= lastMaintenanceTo);
      }
      return filtered;
    });

    // Computed: vehicles visible on the current page (pagination only)
    const visibleVehicles = computed(() => {
      const filtered = filteredVehicles();
      const size = pageSize();
      const page = currentPage();
      const start = (page - 1) * size;
      return filtered.slice(start, start + size);
    });

    // Computed: last page number
    const lastPage = computed(() => pageCount());

    // Computed: has next/previous page
    const hasNextPage = computed(() => currentPage() < lastPage());
    const hasPreviousPage = computed(() => currentPage() > 1);

    return {
      pageCount,
      filteredVehicles,
      visibleVehicles,
      lastPage,
      hasNextPage,
      hasPreviousPage,
    };
  }),
  withMethods((store) => {
    const vehicleHTTP = inject(VehicleHTTPService);
    return {
      loadVehicles: rxMethod(() => {
        patchState(store, { loading: true, error: null });
        return vehicleHTTP.getAllVehicles().pipe(
          tap({
            next: (vehicles: VehicleDTO[]) => patchState(store, { vehicles, loading: false }),
            error: (err: any) => patchState(store, { error: err?.message || 'Failed to load vehicles', loading: false })
          }),
          catchError((err) => {
            patchState(store, { error: err?.message || 'Failed to load vehicles', loading: false });
            return of([]);
          })
        );
      }),
      setSearchText(text: string) {
        patchState(store, {
          search: { ...store.search(), text },
          currentPage: 1,
        });
      },
      setSearchType(type: VehicleType | null) {
        patchState(store, {
          search: { ...store.search(), type },
          currentPage: 1,
        });
      },
      setSearchStatus(status: VehicleStatus | null) {
        patchState(store, {
          search: { ...store.search(), status },
          currentPage: 1,
        });
      },
      setSearchLastMaintenanceFrom(date: string | null) {
        patchState(store, {
          search: { ...store.search(), lastMaintenanceFrom: date },
          currentPage: 1,
        });
      },
      setSearchLastMaintenanceTo(date: string | null) {
        patchState(store, {
          search: { ...store.search(), lastMaintenanceTo: date },
          currentPage: 1,
        });
      },
      setPageSize(size: 10 | 20 | 50) {
        patchState(store, { pageSize: size, currentPage: 1 });
      },
      setCurrentPage(page: number) {
        patchState(store, { currentPage: page });
      },
      nextPage() {
        const next = store.currentPage() + 1;
        if (next <= store.pageCount()) {
          patchState(store, { currentPage: next });
        }
      },
      prevPage() {
        const prev = store.currentPage() - 1;
        if (prev >= 1) {
          patchState(store, { currentPage: prev });
        }
      },
    };
  }),
  withHooks({
    onInit: (store) => {
      store.loadVehicles(undefined);
    }
  })
);
