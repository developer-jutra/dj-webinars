import type { Shipment } from './shipment.model'

export interface ShipmentStatusDetail {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  current: boolean;
  timestamp?: string;
  details: Record<string, any>;
}

export interface EnhancedShipment extends Shipment {
  timelineStatuses?: ShipmentStatusDetail[];
  currentTimelineStep?: number;
}

export const mockShipments: EnhancedShipment[] = [
  {
    id: 'SH-2024-001',
    shipmentNumber: 'SH-2024-001',
    type: 'SHIPMENT',
    status: 'IN_TRANSIT' as any,
    priority: 'NORMAL' as any,
    pickupLocation: {
      address: { city: 'Warsaw', country: 'Poland', street: 'ul. Logistyczna 123', postalCode: '00-001' },
      contactPerson: 'John Doe',
      contactPhone: '+48123456789',
      contactEmail: 'john@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'WAREHOUSE' as any
    },
    deliveryLocation: {
      address: { city: 'Berlin', country: 'Germany', street: 'Hauptstraße 456', postalCode: '10115' },
      contactPerson: 'Jane Smith',
      contactPhone: '+49123456789',
      contactEmail: 'jane@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'WAREHOUSE' as any
    },
    cargo: {} as any,
    serviceType: 'FULL_TRUCKLOAD' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-15'),
    scheduledDeliveryDate: new Date('2024-01-17'),
    actualPickupDate: new Date('2024-01-15'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK123456789',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 3,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-14 09:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST12345",
            customerName: "Warsaw Logistics Co.",
            contactPhone: "+48123456789",
            contactEmail: "orders@warsawlogistics.com"
          },
          shipmentDetails: {
            originAddress: "ul. Logistyczna 123, 00-001 Warsaw, Poland",
            destinationAddress: "Hauptstraße 456, 10115 Berlin, Germany",
            cargoDescription: "Electronic equipment - 80 units",
            weight: "1000 kg",
            volume: "12 m³",
            preferredPickupDate: "2024-01-15",
            deliveryDeadline: "2024-01-17"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-14 14:30 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-456",
            driverAssigned: "Piotr Kowalski",
            scheduledPickupTime: "2024-01-15 08:00 CET"
          },
          costEstimation: {
            estimatedPrice: "2200 EUR",
            paymentTerms: "30 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-001"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-15 08:15 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-15 08:15 CET",
            cargoCondition: "Excellent, properly packaged",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240115-001",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: false,
        current: true,
        timestamp: "2024-01-16 12:30 CET",
        details: {
          trackingInfo: {
            currentLocation: "52.5200 N, 13.4050 E",
            estimatedArrival: "2024-01-17 14:00 CET",
            statusUpdate: "Approaching Berlin, on schedule"
          },
          vehicleStatus: {
            fuelLevel: "68%",
            lastCheckIn: "2024-01-16 12:00 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: false,
        current: false,
        details: {
          deliveryExecution: {
            actualDeliveryTime: "Pending",
            cargoCondition: "Pending inspection",
            receiverName: "To be confirmed"
          },
          documentation: {
            deliveryReceiptNumber: "Pending",
            photosAvailable: false
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: false,
        current: false,
        details: {
          invoiceDetails: {
            invoiceNumber: "Pending",
            amountDue: "2200 EUR",
            paymentStatus: "Not yet invoiced"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "Pending"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-002',
    shipmentNumber: 'SH-2024-002',
    type: 'SHIPMENT',
    status: 'DELIVERED' as any,
    priority: 'HIGH' as any,
    pickupLocation: {
      address: { city: 'Krakow', country: 'Poland', street: 'ul. Przemysłowa 789', postalCode: '30-001' },
      contactPerson: 'Anna Kowalski',
      contactPhone: '+48987654321',
      contactEmail: 'anna@example.com',
      operatingHours: {} as any,
      loadingType: 'GROUND' as any,
      facilityType: 'FACTORY' as any
    },
    deliveryLocation: {
      address: { city: 'Vienna', country: 'Austria', street: 'Industriestraße 321', postalCode: '1010' },
      contactPerson: 'Hans Mueller',
      contactPhone: '+43123456789',
      contactEmail: 'hans@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'WAREHOUSE' as any
    },
    cargo: {} as any,
    serviceType: 'EXPRESS_DELIVERY' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-12'),
    scheduledDeliveryDate: new Date('2024-01-13'),
    actualPickupDate: new Date('2024-01-12'),
    actualDeliveryDate: new Date('2024-01-13'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK987654321',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 4,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-11 10:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST67890",
            customerName: "Krakow Industrial Ltd",
            contactPhone: "+48987654321",
            contactEmail: "logistics@krakowindustrial.pl"
          },
          shipmentDetails: {
            originAddress: "ul. Przemysłowa 789, 30-001 Krakow, Poland",
            destinationAddress: "Industriestraße 321, 1010 Vienna, Austria",
            cargoDescription: "Precision machinery parts - 12 units",
            weight: "650 kg",
            volume: "6 m³",
            preferredPickupDate: "2024-01-12",
            deliveryDeadline: "2024-01-13"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-11 16:45 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-789",
            driverAssigned: "Anna Nowak",
            scheduledPickupTime: "2024-01-12 09:00 CET"
          },
          costEstimation: {
            estimatedPrice: "1650 EUR",
            paymentTerms: "14 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-002"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-12 09:10 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-12 09:10 CET",
            cargoCondition: "Excellent, professionally packed",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240112-002",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-13 10:00 CET",
        details: {
          trackingInfo: {
            currentLocation: "Completed journey",
            estimatedArrival: "Delivered on time",
            statusUpdate: "Journey completed successfully"
          },
          vehicleStatus: {
            fuelLevel: "Journey completed",
            lastCheckIn: "2024-01-13 09:45 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: true,
        current: true,
        timestamp: "2024-01-13 11:30 CET",
        details: {
          deliveryExecution: {
            actualDeliveryTime: "2024-01-13 11:30 CET",
            cargoCondition: "Perfect condition, no damage",
            receiverName: "Hans Mueller"
          },
          documentation: {
            deliveryReceiptNumber: "DR-20240113-002",
            photosAvailable: true
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: false,
        current: false,
        details: {
          invoiceDetails: {
            invoiceNumber: "INV-20240114-002",
            amountDue: "1650 EUR",
            paymentStatus: "Invoice sent, payment pending"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "Due: 2024-01-28"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-003',
    shipmentNumber: 'SH-2024-003',
    type: 'SHIPMENT',
    status: 'PICKUP_SCHEDULED' as any,
    priority: 'NORMAL' as any,
    pickupLocation: {
      address: { city: 'Prague', country: 'Czech Republic', street: 'Průmyslová 555', postalCode: '110 00' },
      contactPerson: 'Pavel Novák',
      contactPhone: '+420123456789',
      contactEmail: 'pavel@example.com',
      operatingHours: {} as any,
      loadingType: 'CRANE' as any,
      facilityType: 'WAREHOUSE' as any
    },
    deliveryLocation: {
      address: { city: 'Hamburg', country: 'Germany', street: 'Hafenstraße 888', postalCode: '20095' },
      contactPerson: 'Klaus Weber',
      contactPhone: '+49987654321',
      contactEmail: 'klaus@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'PORT' as any
    },
    cargo: {} as any,
    serviceType: 'OVERSIZED_CARGO' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-18'),
    scheduledDeliveryDate: new Date('2024-01-20'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK456789123',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 1,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-17 14:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST11111",
            customerName: "Prague Heavy Industries",
            contactPhone: "+420123456789",
            contactEmail: "transport@pragueheavy.cz"
          },
          shipmentDetails: {
            originAddress: "Průmyslová 555, 110 00 Prague, Czech Republic",
            destinationAddress: "Hafenstraße 888, 20095 Hamburg, Germany",
            cargoDescription: "Industrial machinery - 1 oversized unit",
            weight: "2500 kg",
            volume: "25 m³",
            preferredPickupDate: "2024-01-18",
            deliveryDeadline: "2024-01-20"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: false,
        current: true,
        timestamp: "2024-01-17 16:30 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-CRANE-123",
            driverAssigned: "Tomáš Svoboda",
            scheduledPickupTime: "2024-01-18 07:00 CET"
          },
          costEstimation: {
            estimatedPrice: "3200 EUR",
            paymentTerms: "30 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-003"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: false,
        current: false,
        details: {
          pickupExecution: {
            actualPickupTime: "Scheduled for 2024-01-18 07:00 CET",
            cargoCondition: "Pending inspection",
            driverSignature: "Pending"
          },
          documentation: {
            pickupReceiptNumber: "Pending",
            photosAvailable: false
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: false,
        current: false,
        details: {
          trackingInfo: {
            currentLocation: "Pending pickup",
            estimatedArrival: "2024-01-20 16:00 CET",
            statusUpdate: "Awaiting pickup"
          },
          vehicleStatus: {
            fuelLevel: "Pending",
            lastCheckIn: "Pending"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: false,
        current: false,
        details: {
          deliveryExecution: {
            actualDeliveryTime: "Pending",
            cargoCondition: "Pending",
            receiverName: "Klaus Weber"
          },
          documentation: {
            deliveryReceiptNumber: "Pending",
            photosAvailable: false
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: false,
        current: false,
        details: {
          invoiceDetails: {
            invoiceNumber: "Pending",
            amountDue: "3200 EUR",
            paymentStatus: "Not yet invoiced"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "Pending"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-004',
    shipmentNumber: 'SH-2024-004',
    type: 'SHIPMENT',
    status: 'OUT_FOR_DELIVERY' as any,
    priority: 'URGENT' as any,
    pickupLocation: {
      address: { city: 'Budapest', country: 'Hungary', street: 'Ipari út 222', postalCode: '1117' },
      contactPerson: 'László Kovács',
      contactPhone: '+36123456789',
      contactEmail: 'laszlo@example.com',
      operatingHours: {} as any,
      loadingType: 'FORKLIFT' as any,
      facilityType: 'WAREHOUSE' as any
    },
    deliveryLocation: {
      address: { city: 'Amsterdam', country: 'Netherlands', street: 'Industrieweg 777', postalCode: '1043 AP' },
      contactPerson: 'Jan van der Berg',
      contactPhone: '+31123456789',
      contactEmail: 'jan@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'DISTRIBUTION_CENTER' as any
    },
    cargo: {} as any,
    serviceType: 'EXPRESS_DELIVERY' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-16'),
    scheduledDeliveryDate: new Date('2024-01-17'),
    actualPickupDate: new Date('2024-01-16'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK789123456',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 4,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-15 11:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST22222",
            customerName: "Budapest Express Ltd",
            contactPhone: "+36123456789",
            contactEmail: "urgent@budapestexpress.hu"
          },
          shipmentDetails: {
            originAddress: "Ipari út 222, 1117 Budapest, Hungary",
            destinationAddress: "Industrieweg 777, 1043 AP Amsterdam, Netherlands",
            cargoDescription: "Pharmaceutical products - temperature controlled",
            weight: "450 kg",
            volume: "4 m³",
            preferredPickupDate: "2024-01-16",
            deliveryDeadline: "2024-01-17"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-15 13:30 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-COOL-456",
            driverAssigned: "László Nagy",
            scheduledPickupTime: "2024-01-16 06:00 CET"
          },
          costEstimation: {
            estimatedPrice: "1950 EUR",
            paymentTerms: "7 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-004"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-16 06:05 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-16 06:05 CET",
            cargoCondition: "Temperature controlled, sealed",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240116-004",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-17 08:00 CET",
        details: {
          trackingInfo: {
            currentLocation: "Approaching Amsterdam",
            estimatedArrival: "2024-01-17 11:00 CET",
            statusUpdate: "Temperature maintained, on schedule"
          },
          vehicleStatus: {
            fuelLevel: "45%",
            lastCheckIn: "2024-01-17 07:30 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Out for Delivery",
        icon: "truck",
        completed: false,
        current: true,
        timestamp: "2024-01-17 09:30 CET",
        details: {
          deliveryExecution: {
            actualDeliveryTime: "In progress",
            cargoCondition: "Temperature maintained",
            receiverName: "Jan van der Berg"
          },
          documentation: {
            deliveryReceiptNumber: "Pending completion",
            photosAvailable: false
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: false,
        current: false,
        details: {
          invoiceDetails: {
            invoiceNumber: "Pending",
            amountDue: "1950 EUR",
            paymentStatus: "Not yet invoiced"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "Pending"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-005',
    shipmentNumber: 'SH-2024-005',
    type: 'SHIPMENT',
    status: 'COMPLETED' as any,
    priority: 'NORMAL' as any,
    pickupLocation: {
      address: { city: 'Gdansk', country: 'Poland', street: 'ul. Portowa 111', postalCode: '80-001' },
      contactPerson: 'Marek Wiśniewski',
      contactPhone: '+48555666777',
      contactEmail: 'marek@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'PORT' as any
    },
    deliveryLocation: {
      address: { city: 'Stockholm', country: 'Sweden', street: 'Industrivägen 999', postalCode: '111 60' },
      contactPerson: 'Erik Andersson',
      contactPhone: '+46123456789',
      contactEmail: 'erik@example.com',
      operatingHours: {} as any,
      loadingType: 'GROUND' as any,
      facilityType: 'WAREHOUSE' as any
    },
    cargo: {} as any,
    serviceType: 'FULL_TRUCKLOAD' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-10'),
    scheduledDeliveryDate: new Date('2024-01-14'),
    actualPickupDate: new Date('2024-01-10'),
    actualDeliveryDate: new Date('2024-01-14'),
    requiresInsurance: false,
    requiresCustomsClearance: true,
    currency: 'EUR',
    trackingNumber: 'TRK321654987',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 5,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-08 09:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST33333",
            customerName: "Gdansk Port Services",
            contactPhone: "+48555666777",
            contactEmail: "export@gdanskport.pl"
          },
          shipmentDetails: {
            originAddress: "ul. Portowa 111, 80-001 Gdansk, Poland",
            destinationAddress: "Industrivägen 999, 111 60 Stockholm, Sweden",
            cargoDescription: "Containerized goods - mixed cargo",
            weight: "18000 kg",
            volume: "45 m³",
            preferredPickupDate: "2024-01-10",
            deliveryDeadline: "2024-01-14"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-08 15:00 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-CONTAINER-789",
            driverAssigned: "Marek Kowalczyk",
            scheduledPickupTime: "2024-01-10 08:00 CET"
          },
          costEstimation: {
            estimatedPrice: "2850 EUR",
            paymentTerms: "30 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-005"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-10 08:30 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-10 08:30 CET",
            cargoCondition: "Container sealed, customs cleared",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240110-005",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-14 09:00 CET",
        details: {
          trackingInfo: {
            currentLocation: "Completed journey",
            estimatedArrival: "Delivered on schedule",
            statusUpdate: "Ferry crossing completed successfully"
          },
          vehicleStatus: {
            fuelLevel: "Journey completed",
            lastCheckIn: "2024-01-14 08:45 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-14 10:15 CET",
        details: {
          deliveryExecution: {
            actualDeliveryTime: "2024-01-14 10:15 CET",
            cargoCondition: "Container intact, customs cleared",
            receiverName: "Erik Andersson"
          },
          documentation: {
            deliveryReceiptNumber: "DR-20240114-005",
            photosAvailable: true
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: true,
        current: true,
        timestamp: "2024-01-24 12:00 CET",
        details: {
          invoiceDetails: {
            invoiceNumber: "INV-20240115-005",
            amountDue: "2850 EUR",
            paymentStatus: "Paid in full"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "2024-01-24"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-006',
    shipmentNumber: 'SH-2024-006',
    type: 'SHIPMENT',
    status: 'AWAITING_PAYMENT' as any,
    priority: 'HIGH' as any,
    pickupLocation: {
      address: { city: 'Bratislava', country: 'Slovakia', street: 'Priemyselná 333', postalCode: '821 09' },
      contactPerson: 'Michal Horváth',
      contactPhone: '+421123456789',
      contactEmail: 'michal@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'FACTORY' as any
    },
    deliveryLocation: {
      address: { city: 'Milan', country: 'Italy', street: 'Via Industriale 444', postalCode: '20100' },
      contactPerson: 'Marco Rossi',
      contactPhone: '+39123456789',
      contactEmail: 'marco@example.com',
      operatingHours: {} as any,
      loadingType: 'FORKLIFT' as any,
      facilityType: 'WAREHOUSE' as any
    },
    cargo: {} as any,
    serviceType: 'LESS_THAN_TRUCKLOAD' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-14'),
    scheduledDeliveryDate: new Date('2024-01-16'),
    actualPickupDate: new Date('2024-01-14'),
    actualDeliveryDate: new Date('2024-01-16'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK654987321',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 5,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-13 10:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST44444",
            customerName: "Bratislava Manufacturing",
            contactPhone: "+421123456789",
            contactEmail: "shipping@bratislavamanuf.sk"
          },
          shipmentDetails: {
            originAddress: "Priemyselná 333, 821 09 Bratislava, Slovakia",
            destinationAddress: "Via Industriale 444, 20100 Milan, Italy",
            cargoDescription: "Automotive components - mixed pallets",
            weight: "850 kg",
            volume: "8 m³",
            preferredPickupDate: "2024-01-14",
            deliveryDeadline: "2024-01-16"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-13 14:00 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-LTL-234",
            driverAssigned: "Michal Novák",
            scheduledPickupTime: "2024-01-14 10:00 CET"
          },
          costEstimation: {
            estimatedPrice: "1750 EUR",
            paymentTerms: "14 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-006"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-14 10:15 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-14 10:15 CET",
            cargoCondition: "Good condition, properly palletized",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240114-006",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-16 08:00 CET",
        details: {
          trackingInfo: {
            currentLocation: "Completed journey",
            estimatedArrival: "Delivered on time",
            statusUpdate: "Border crossing completed successfully"
          },
          vehicleStatus: {
            fuelLevel: "Journey completed",
            lastCheckIn: "2024-01-16 07:45 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-16 14:30 CET",
        details: {
          deliveryExecution: {
            actualDeliveryTime: "2024-01-16 14:30 CET",
            cargoCondition: "Excellent condition, all pallets intact",
            receiverName: "Marco Rossi"
          },
          documentation: {
            deliveryReceiptNumber: "DR-20240116-006",
            photosAvailable: true
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: false,
        current: true,
        timestamp: "2024-01-17 09:00 CET",
        details: {
          invoiceDetails: {
            invoiceNumber: "INV-20240117-006",
            amountDue: "1750 EUR",
            paymentStatus: "Invoice sent, awaiting payment"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "Due: 2024-01-31"
          }
        }
      }
    ]
  },
  {
    id: 'SH-2024-007',
    shipmentNumber: 'SH-2024-007',
    type: 'SHIPMENT',
    status: 'PAID' as any,
    priority: 'LOW' as any,
    pickupLocation: {
      address: { city: 'Lyon', country: 'France', street: 'Rue Industrielle 555', postalCode: '69000' },
      contactPerson: 'Pierre Dubois',
      contactPhone: '+33123456789',
      contactEmail: 'pierre@example.com',
      operatingHours: {} as any,
      loadingType: 'DOCK' as any,
      facilityType: 'WAREHOUSE' as any
    },
    deliveryLocation: {
      address: { city: 'Barcelona', country: 'Spain', street: 'Carrer Industrial 777', postalCode: '08001' },
      contactPerson: 'Carlos García',
      contactPhone: '+34123456789',
      contactEmail: 'carlos@example.com',
      operatingHours: {} as any,
      loadingType: 'GROUND' as any,
      facilityType: 'DISTRIBUTION_CENTER' as any
    },
    cargo: {} as any,
    serviceType: 'FULL_TRUCKLOAD' as any,
    vehicleRequirements: {} as any,
    scheduledPickupDate: new Date('2024-01-08'),
    scheduledDeliveryDate: new Date('2024-01-12'),
    actualPickupDate: new Date('2024-01-08'),
    actualDeliveryDate: new Date('2024-01-12'),
    requiresInsurance: true,
    requiresCustomsClearance: false,
    currency: 'EUR',
    trackingNumber: 'TRK888999111',
    progressUpdates: [],
    createdBy: '1',
    companyId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    currentTimelineStep: 5,
    timelineStatuses: [
      {
        id: "request",
        name: "Shipment Request",
        icon: "package",
        completed: true,
        current: false,
        timestamp: "2024-01-05 15:00 CET",
        details: {
          customerInfo: {
            customerId: "CUST55555",
            customerName: "Lyon Distribution Hub",
            contactPhone: "+33123456789",
            contactEmail: "logistics@lyondist.fr"
          },
          shipmentDetails: {
            originAddress: "Rue Industrielle 555, 69000 Lyon, France",
            destinationAddress: "Carrer Industrial 777, 08001 Barcelona, Spain",
            cargoDescription: "Consumer goods - full truck load",
            weight: "20000 kg",
            volume: "50 m³",
            preferredPickupDate: "2024-01-08",
            deliveryDeadline: "2024-01-12"
          }
        }
      },
      {
        id: "reservation",
        name: "Reservation",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-05 17:30 CET",
        details: {
          transportInfo: {
            vehicleId: "TRUCK-FTL-567",
            driverAssigned: "Pierre Martin",
            scheduledPickupTime: "2024-01-08 07:00 CET"
          },
          costEstimation: {
            estimatedPrice: "2400 EUR",
            paymentTerms: "30 days net"
          },
          confirmation: {
            reservationStatus: "Confirmed",
            referenceNumber: "SH-2024-007"
          }
        }
      },
      {
        id: "pickup",
        name: "Pickup",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-08 07:20 CET",
        details: {
          pickupExecution: {
            actualPickupTime: "2024-01-08 07:20 CET",
            cargoCondition: "Full truck load, properly secured",
            driverSignature: "Digital signature verified"
          },
          documentation: {
            pickupReceiptNumber: "PR-20240108-007",
            photosAvailable: true
          }
        }
      },
      {
        id: "transit",
        name: "In Transit",
        icon: "truck",
        completed: true,
        current: false,
        timestamp: "2024-01-12 06:00 CET",
        details: {
          trackingInfo: {
            currentLocation: "Completed journey",
            estimatedArrival: "Delivered early",
            statusUpdate: "Highway journey completed without issues"
          },
          vehicleStatus: {
            fuelLevel: "Journey completed",
            lastCheckIn: "2024-01-12 05:45 CET"
          }
        }
      },
      {
        id: "delivery",
        name: "Delivered",
        icon: "check",
        completed: true,
        current: false,
        timestamp: "2024-01-12 09:45 CET",
        details: {
          deliveryExecution: {
            actualDeliveryTime: "2024-01-12 09:45 CET",
            cargoCondition: "Perfect condition, all items intact",
            receiverName: "Carlos García"
          },
          documentation: {
            deliveryReceiptNumber: "DR-20240112-007",
            photosAvailable: true
          }
        }
      },
      {
        id: "payment",
        name: "Payment",
        icon: "payment",
        completed: true,
        current: true,
        timestamp: "2024-01-30 11:00 CET",
        details: {
          invoiceDetails: {
            invoiceNumber: "INV-20240113-007",
            amountDue: "2400 EUR",
            paymentStatus: "Paid in full"
          },
          paymentMethod: {
            paymentType: "Bank Transfer",
            paymentDate: "2024-01-30"
          }
        }
      }
    ]
  }
] 