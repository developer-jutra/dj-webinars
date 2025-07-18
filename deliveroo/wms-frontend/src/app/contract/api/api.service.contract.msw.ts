/**
 * Generated by orval v7.10.0 🍺
 * Do not edit manually.
 * WMS API (Warehouse Management System)
 * API for managing contractors and storage requests
 * OpenAPI spec version: 1.0.0
 */
import {
  faker
} from '@faker-js/faker';

import {
  HttpResponse,
  delay,
  http
} from 'msw';

import {
  ContractorStatus,
  SpecialRequirement,
  StorageRequestStatus
} from '.././contract';
import type {
  ContractorDetails,
  ContractorsSummaryCollection,
  StorageRequestDetails,
  StorageRequestSummary
} from '.././contract';


export const getGetContractorsResponseMock = (): ContractorsSummaryCollection => (Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.string.alpha({length: {min: 10, max: 20}}), name: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(Object.values(ContractorStatus)), tax_id_number: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), contacts: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({type: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), details: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}))})))

export const getGetContractorsIdResponseMock = (overrideResponse: Partial< ContractorDetails > = {}): ContractorDetails => ({id: faker.string.alpha({length: {min: 10, max: 20}}), name: faker.string.alpha({length: {min: 10, max: 20}}), status: faker.helpers.arrayElement(Object.values(ContractorStatus)), tax_id_number: faker.helpers.arrayElement([faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), null]), undefined]), created_at: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined]), updated_at: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined]), contacts: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({type: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), details: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])})), addresses: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({address_id: faker.helpers.arrayElement([faker.string.uuid(), undefined]), street_address: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), city: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), country: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), postal_code: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), address_type: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])})), employees: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({employee_id: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), employee_name: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), employee_data: faker.helpers.arrayElement([{type: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), job_title: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), contacts: faker.helpers.arrayElement([Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({type: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), details: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])})), undefined])})), ...overrideResponse})

export const getGetStorageRequestsResponseMock = (): StorageRequestSummary[] => (Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({id: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorId: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorName: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), cargo: faker.helpers.arrayElement([{name: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), entryDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), exitDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), status: faker.helpers.arrayElement([faker.helpers.arrayElement(Object.values(StorageRequestStatus)), undefined])})))

export const getPostStorageRequestsResponseMock = (overrideResponse: Partial< StorageRequestDetails > = {}): StorageRequestDetails => ({id: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorInformation: faker.helpers.arrayElement([{contractorId: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorName: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), warehouse: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), requestTimeline: faker.helpers.arrayElement([{requestedEntryDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), requestedExitDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), storageDuration: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), createdAt: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined])}, undefined]), cargoDetails: faker.helpers.arrayElement([{description: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), estimatedValue: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), weight: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), volume: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), currency: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), specialRequirements: faker.helpers.arrayElement([faker.helpers.arrayElements(Object.values(SpecialRequirement)), undefined]), specialHandlingInstructions: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), ...overrideResponse})

export const getGetStorageRequestsIdResponseMock = (overrideResponse: Partial< StorageRequestDetails > = {}): StorageRequestDetails => ({id: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorInformation: faker.helpers.arrayElement([{contractorId: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), contractorName: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), warehouse: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), requestTimeline: faker.helpers.arrayElement([{requestedEntryDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), requestedExitDate: faker.helpers.arrayElement([faker.date.past().toISOString().split('T')[0], undefined]), storageDuration: faker.helpers.arrayElement([faker.number.int({min: undefined, max: undefined}), undefined]), createdAt: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined])}, undefined]), cargoDetails: faker.helpers.arrayElement([{description: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), estimatedValue: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), weight: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), volume: faker.helpers.arrayElement([faker.number.float({min: undefined, max: undefined, fractionDigits: 2}), undefined]), currency: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined])}, undefined]), specialRequirements: faker.helpers.arrayElement([faker.helpers.arrayElements(Object.values(SpecialRequirement)), undefined]), specialHandlingInstructions: faker.helpers.arrayElement([faker.string.alpha({length: {min: 10, max: 20}}), undefined]), ...overrideResponse})


export const getGetContractorsMockHandler = (overrideResponse?: ContractorsSummaryCollection | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ContractorsSummaryCollection> | ContractorsSummaryCollection)) => {
  return http.get('*/contractors', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetContractorsResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getGetContractorsIdMockHandler = (overrideResponse?: ContractorDetails | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<ContractorDetails> | ContractorDetails)) => {
  return http.get('*/contractors/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetContractorsIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPatchContractorsIdMockHandler = (overrideResponse?: void | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<void> | void)) => {
  return http.patch('*/contractors/:id', async (info) => {await delay(1000);
  if (typeof overrideResponse === 'function') {await overrideResponse(info); }
    return new HttpResponse(null,
      { status: 200,
        
      })
  })
}

export const getGetStorageRequestsMockHandler = (overrideResponse?: StorageRequestSummary[] | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<StorageRequestSummary[]> | StorageRequestSummary[])) => {
  return http.get('*/storage-requests', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetStorageRequestsResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPostStorageRequestsMockHandler = (overrideResponse?: StorageRequestDetails | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<StorageRequestDetails> | StorageRequestDetails)) => {
  return http.post('*/storage-requests', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getPostStorageRequestsResponseMock()),
      { status: 201,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getGetStorageRequestsIdMockHandler = (overrideResponse?: StorageRequestDetails | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<StorageRequestDetails> | StorageRequestDetails)) => {
  return http.get('*/storage-requests/:id', async (info) => {await delay(1000);
  
    return new HttpResponse(JSON.stringify(overrideResponse !== undefined
    ? (typeof overrideResponse === "function" ? await overrideResponse(info) : overrideResponse)
    : getGetStorageRequestsIdResponseMock()),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
  })
}

export const getPatchStorageRequestsIdMockHandler = (overrideResponse?: void | ((info: Parameters<Parameters<typeof http.patch>[1]>[0]) => Promise<void> | void)) => {
  return http.patch('*/storage-requests/:id', async (info) => {await delay(1000);
  if (typeof overrideResponse === 'function') {await overrideResponse(info); }
    return new HttpResponse(null,
      { status: 200,
        
      })
  })
}
export const getDefaultMock = () => [
  getGetContractorsMockHandler(),
  getGetContractorsIdMockHandler(),
  getPatchContractorsIdMockHandler(),
  getGetStorageRequestsMockHandler(),
  getPostStorageRequestsMockHandler(),
  getGetStorageRequestsIdMockHandler(),
  getPatchStorageRequestsIdMockHandler()]
