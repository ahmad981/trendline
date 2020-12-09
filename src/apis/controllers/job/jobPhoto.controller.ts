import { JobPhotos, JobPhotosInterface } from '../../models';

export class JobPhotoController {


  public addJobPhotos(photos: JobPhotosInterface[]): Promise<JobPhotosInterface[]> {
    return JobPhotos.bulkCreate(photos);
  }

  public addJobPhoto(photo: JobPhotosInterface): Promise<JobPhotosInterface> {
    return JobPhotos.create(photo);
  }

  public removePhotosByJob(id: number) : Promise<number> {
    return JobPhotos.destroy({where: {jobId: id}});
  }
}

