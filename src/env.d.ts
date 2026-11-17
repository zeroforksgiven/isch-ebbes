declare module "virtual:gallery-images" {
  interface GalleryImage {
    src: string;
    title: string;
    year: string;
  }

  const galleryImages: GalleryImage[];
  export default galleryImages;
}

declare module "virtual:actor-images" {
  interface ActorImage {
    src: string;
    title: string;
  }

  const actorImages: ActorImage[];
  export default actorImages;
}

declare module "virtual:flyer-files" {
  interface FlyerFile {
    src: string;
    date: string;
    location: string;
    title: string;
    sortDate: string;
  }

  const flyerFiles: FlyerFile[];
  export default flyerFiles;
}
