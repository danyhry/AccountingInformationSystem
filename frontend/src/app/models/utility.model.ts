export interface Utility {
  id: number;
  userId: number;
  addressId: number;
  utilityTypeId: number;
  previousValue: number;
  currentValue: number;
  tariff: number;
  usage: number;
  amountToPay: number;
}
