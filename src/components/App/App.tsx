import { useState } from "react";
import toast from "react-hot-toast";
import { type Photo } from "../../types/photo";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { getPhotos } from "../../services/photos";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    console.log(setSelectedPhoto);
  };

  const onSubmit = async (query: string) => {
    setIsEmpty(true);
    setIsLoading(true);
    setPhotos([]);

    try {
      const data = await getPhotos(query);
      if (!data || data.length === 0) {
        toast.error("No photos found for this query.");
        setIsEmpty(true);
        return;
      }
      setPhotos(data);
    } catch (error) {
      toast.error("Failed to fetch photos.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={onSubmit} />
          {isLoading && <Loader />}
          {isEmpty && (
            <p>No photos found. Please try a different search term.</p>
          )}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onPhotoClick={handlePhotoClick} />
          )}
          {selectedPhoto && (
            <Modal onClose={closeModal}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
        Home page
      </Section>
    </>
  );
}
