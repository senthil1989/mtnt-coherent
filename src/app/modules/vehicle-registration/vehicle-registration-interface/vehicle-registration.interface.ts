export interface RegisteredForm {
    vehicleNumber: string;
    chassisNumber: string;
    QRCode: string;
    typeOfVehicle: string;
    insuranceNumber: string;
    roadWorthyNumber: string;
    formCorANumber: string;
    vendorContact: string;
    vendorAddress: string;
    transportOfficerName: string;
    transportOfficerContact: string;
    capacityOfVehicle: string;
    createdBy: string;
    modifiedBy: string;
    modifiedTime: string;
    createdTime: string;
    seasonID: string;
    vendorID: string;
    status: string;
    QRCodeRescan: string;
    softDelete: string;
    blockID: string;
    driverName: string;
    driverPhone: string;
    driverLicenseNumber: string;
}

export interface DriverDetails {
    driverName: string;
    driverPhone: string;
    driverLicenseNumber: string;
    vehicleID: number;
}
