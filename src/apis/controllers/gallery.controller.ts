import { Gallery, GalleryInterface } from '../models';

export class GalleryController {
  public getAll(): Promise<Gallery[]> {
    return Gallery.findAll<Gallery>({ raw: true });
  }

  public getAllByCompany(id: number): Promise<Gallery[]> {
    return Gallery.findAll({ where: { companyId: id } });
  }

  public getById(id: number): Promise<Gallery> {
    return Gallery.findByPk(id);
  }

  public create(role: GalleryInterface): Promise<Gallery> {
    return Gallery.create<Gallery>(role);
  }

  public removeOne(id: number, companyID: number): Promise<number> {
    return Gallery.destroy({ where: { id, companyId: companyID } });
  }

}
