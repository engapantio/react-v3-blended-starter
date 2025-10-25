import { useState } from "react";
import toast from "react-hot-toast";
import { type Photo } from "../../types/photo";
import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";
import { getPhotos } from "../../services/photos";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = (photo: Photo) => {
    setIsOpen(true);
    setSelectedPhoto(photo);
  };

  const onSubmit = async (query: string) => {
    setIsEmpty(false);
    setIsLoading(true);
    setPhotos([]);

    try {
      const data = await getPhotos(query);
      if (!data || data.length === 0) {
        toast.error("No photos found for this query.");
        setIsEmpty(true);
        return;
      }
      setIsEmpty(false);
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
    setIsOpen(false);
  };

  return (
    <>
      <Section>
        <Container>
          {isOpen && selectedPhoto && (
            <Modal onClose={closeModal}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )}
          <Form onSubmit={onSubmit} />
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onPhotoClick={openModal} />
          )}
          {isLoading && <Loader />}
          {isEmpty && (
            <Text textAlign="center" variant="error">
              No photos found. Please try a different search term.
            </Text>
          )}
        </Container>
        Home page
      </Section>
    </>
  );
}
