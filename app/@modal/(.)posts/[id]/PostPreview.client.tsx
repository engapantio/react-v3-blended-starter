'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById } from '@/lib/api';
import { useParams } from 'next/navigation';

import css from './PostPreview.module.css';
//import { useEffect } from 'react';
// import { User } from '@/types/user';

export default function PostPreviewClient() {
  // useEffect(() => {
  //   const fn = async () => {};
  //   fn();
  // }, []);

  //const handleClose = () => {};

  const { id } = useParams<{ id: string }>();

  // const [user, setUser] = useState<User | null>(null);

  const details = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  // useEffect(() => {
  //   if (!isSuccess) return;
  //   const fn = async () => {
  //     const user = await fetchUserById(data.id);
  //     setUser(user);
  //   };
  //   fn();
  // }, [isSuccess, user]);

  return (
    <>
      <Modal onClose={() => {}}>
        <button className={css.backBtn}>← Back</button>

        {details.isSuccess && (
          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>{details.data.title}</h2>
              </div>

              <p className={css.content}>{details.data.body}</p>
            </div>
            <p className={css.user}>Author: {details.data.user.name}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
