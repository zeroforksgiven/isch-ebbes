declare module "virtual:gallery-images" {
  interface GalleryImage {
    src: string;
    title: string;
  }

  const galleryImages: GalleryImage[];
  export default galleryImages;
}
