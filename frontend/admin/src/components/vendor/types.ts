export interface VendorTableProps {
  vendorId: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

export interface Vendor {
  vendorId: number | string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  joinedOn: string;
}

export const mapTableToVendor = (v: VendorTableProps): Vendor => ({
  vendorId: v.vendorId,
  businessName: v.name,
  contactPerson: v.contactPerson,
  email: v.email,
  phone: v.phone,
  address: v.address,
  isActive: v.isActive,
  joinedOn: v.createdAt.includes("T") ? v.createdAt.slice(0, 10) : v.createdAt,
});
