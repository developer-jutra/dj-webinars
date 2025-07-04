export interface ShipmentStatus {
    id: string;
    name: string;
    icon: string;
    completed: boolean;
    current: boolean;
    timestamp?: string;
    details: Record<string, any>;
  }
  
  export interface Shipment {
    id: string;
    customerName: string;
    referenceNumber: string;
    currentStep: number;
    statuses: ShipmentStatus[];
  }
  
  export const mockShipments: Shipment[] = [
    {
      id: "SHIP-001",
      customerName: "Acme Corp",
      referenceNumber: "RES-20250704-001",
      currentStep: 3, // In Transit
      statuses: [
        {
          id: "request",
          name: "Shipment Request",
          icon: "package",
          completed: true,
          current: false,
          timestamp: "2025-07-04 09:00 CEST",
          details: {
            customerInfo: {
              customerId: "CUST12345",
              customerName: "Acme Corp",
              contactPhone: "+48 123 456 789",
              contactEmail: "orders@acmecorp.com"
            },
            shipmentDetails: {
              originAddress: "ul. Warszawska 10, 05-080 Owczarnia, Poland",
              destinationAddress: "ul. Krakowska 25, 30-001 Kraków, Poland",
              cargoDescription: "100 boxes of electronics",
              weight: "1200 kg",
              volume: "15 m³",
              preferredPickupDate: "2025-07-10",
              deliveryDeadline: "2025-07-15"
            }
          }
        },
        {
          id: "reservation",
          name: "Reservation",
          icon: "check",
          completed: true,
          current: false,
          timestamp: "2025-07-04 14:30 CEST",
          details: {
            transportInfo: {
              vehicleId: "TRUCK-789",
              driverAssigned: "Jan Kowalski",
              scheduledPickupTime: "2025-07-10 08:00 CEST"
            },
            costEstimation: {
              estimatedPrice: "2500 PLN",
              paymentTerms: "30 days net"
            },
            confirmation: {
              reservationStatus: "Confirmed",
              referenceNumber: "RES-20250704-001"
            }
          }
        },
        {
          id: "pickup",
          name: "Pickup",
          icon: "truck",
          completed: true,
          current: false,
          timestamp: "2025-07-10 08:15 CEST",
          details: {
            pickupExecution: {
              actualPickupTime: "2025-07-10 08:15 CEST",
              cargoCondition: "Intact, sealed",
              driverSignature: "Digital signature verified"
            },
            documentation: {
              pickupReceiptNumber: "PR-20250710-001",
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
          timestamp: "2025-07-14 12:30 CEST",
          details: {
            trackingInfo: {
              currentLocation: "52.2297 N, 21.0122 E",
              estimatedArrival: "2025-07-14 16:00 CEST",
              statusUpdate: "On route, good weather conditions"
            },
            vehicleStatus: {
              fuelLevel: "75%",
              lastCheckIn: "2025-07-14 12:00 CEST"
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
              amountDue: "2500 PLN",
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
      id: "SHIP-002",
      customerName: "Tech Solutions Ltd",
      referenceNumber: "RES-20250703-002",
      currentStep: 4, // Delivered
      statuses: [
        {
          id: "request",
          name: "Shipment Request",
          icon: "package",
          completed: true,
          current: false,
          timestamp: "2025-07-03 10:00 CEST",
          details: {
            customerInfo: {
              customerId: "CUST67890",
              customerName: "Tech Solutions Ltd",
              contactPhone: "+48 987 654 321",
              contactEmail: "logistics@techsolutions.pl"
            },
            shipmentDetails: {
              originAddress: "ul. Gdańska 15, 80-001 Gdańsk, Poland",
              destinationAddress: "ul. Wrocławska 30, 50-001 Wrocław, Poland",
              cargoDescription: "Server equipment - 5 units",
              weight: "800 kg",
              volume: "8 m³",
              preferredPickupDate: "2025-07-08",
              deliveryDeadline: "2025-07-12"
            }
          }
        },
        {
          id: "reservation",
          name: "Reservation",
          icon: "check",
          completed: true,
          current: false,
          timestamp: "2025-07-03 16:45 CEST",
          details: {
            transportInfo: {
              vehicleId: "TRUCK-456",
              driverAssigned: "Anna Nowak",
              scheduledPickupTime: "2025-07-08 09:00 CEST"
            },
            costEstimation: {
              estimatedPrice: "1800 PLN",
              paymentTerms: "14 days net"
            },
            confirmation: {
              reservationStatus: "Confirmed",
              referenceNumber: "RES-20250703-002"
            }
          }
        },
        {
          id: "pickup",
          name: "Pickup",
          icon: "truck",
          completed: true,
          current: false,
          timestamp: "2025-07-08 09:10 CEST",
          details: {
            pickupExecution: {
              actualPickupTime: "2025-07-08 09:10 CEST",
              cargoCondition: "Excellent, professionally packed",
              driverSignature: "Digital signature verified"
            },
            documentation: {
              pickupReceiptNumber: "PR-20250708-002",
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
          timestamp: "2025-07-12 10:00 CEST",
          details: {
            trackingInfo: {
              currentLocation: "Completed journey",
              estimatedArrival: "Delivered on time",
              statusUpdate: "Journey completed successfully"
            },
            vehicleStatus: {
              fuelLevel: "Journey completed",
              lastCheckIn: "2025-07-12 09:45 CEST"
            }
          }
        },
        {
          id: "delivery",
          name: "Delivered",
          icon: "check",
          completed: true,
          current: true,
          timestamp: "2025-07-12 11:30 CEST",
          details: {
            deliveryExecution: {
              actualDeliveryTime: "2025-07-12 11:30 CEST",
              cargoCondition: "Perfect condition, no damage",
              receiverName: "Marcin Wiśniewski"
            },
            documentation: {
              deliveryReceiptNumber: "DR-20250712-002",
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
              invoiceNumber: "INV-20250713-002",
              amountDue: "1800 PLN",
              paymentStatus: "Invoice sent, payment pending"
            },
            paymentMethod: {
              paymentType: "Bank Transfer",
              paymentDate: "Due: 2025-07-27"
            }
          }
        }
      ]
    }
  ];