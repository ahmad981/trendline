import { Address, AddressInterface } from '../models';

export class AddressController {



  public findAll(): Promise<Address[]> {
    return Address.findAll({});
  }

  public getAddressById(id: number): Promise<Address> {
    return Address.findByPk(id);
  }

  public create(address: AddressInterface): Promise<Address> {
    return Address.create<Address>(address);
  }

  public findByCompanyId(id: number): Promise<Address> {
    return Address.findOne({ where: { companyId: id } });
  }

  public updateAddress(address: AddressInterface, id: number): Promise<[number, Address[]]> {
    return Address.update(address, { where: { id } });
  }

  public updateByCompanyId(address: AddressInterface, cid: number): Promise<[number, Address[]]> {
    return Address.update(address, { where: { companyId: cid } });
  }
}
