import React, { useState, useContext, useEffect } from 'react';
import { storage } from '../../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const CreatePost = () => {
  // const [imageAsFile, setImageAsFile] = useState('');

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [imageFiles, setImageFiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [imagesUrls, setImagesUrls] = useState([]);

  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImagesAsFile = (e) => {
    // const image = e.target.files[0];

    // for (var i = 0; i < e.target.files.length; i++) {
    //   var imageFile = e.target.files[i];
    // }
    // setImageAsFile((imageFile) => image);

    console.log(e.target.files);
    setImageFiles(e.target.files);
  };

  const uploadToFirebase = async () => {
    console.log('uploading...');
    if (imageFiles.length === 0) {
      setSuccess(false);
      alertContext.setAlert('Please upload at least 1 image');
    }
    console.log(imageFiles);

    Array.from(imageFiles).forEach(async (imageFile) => {
      console.log(imageFile.name);
      const uid = uuidv4();
      // GENERATE UUID AND SAVE IN THE DATABASE
      const uploadTask = storage.ref(`/images/${uid}`).put(imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref('images')
            .child(uid)
            .getDownloadURL()
            .then((firebaseUrl) => {
              setImagesUrls((images) => [...images, firebaseUrl]);
              return 'hi';
            });
        }
      );
    });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  // const handleFirebaseUpload = (e) => {
  //   e.preventDefault();

  //   console.log('start of upload');

  //   if (imageAsFile === '') {
  //     console.error(`not an image, the image file is a ${typeof imageAsFile}`);
  //   }

  //   const uploadTask = storage
  //     .ref(`/images/${imageAsFile.name}`)
  //     .put(imageAsFile);
  //   // initiates the firebase side uploading

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       console.log(snapshot);
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     () => {
  //       storage
  //         .ref('images')
  //         .child(imageAsFile.name)
  //         .getDownloadURL()
  //         .then((firebaseUrl) => {
  //           setImagesUrls((images) => [...images, firebaseUrl]);
  //           console.log(firebaseUrl);
  //         });
  //     }
  //   );
  // };
  //updates when imagesUrls changes
  useEffect(() => {
    // turn loading off
    // create post
    const data = {
      title,
      description,
      images: imagesUrls,
      id: authContext.userId,
    };
    (async () => {
      try {
        console.log(data);

        const res = await axios.post('/api/posts', {
          headers: {
            'x-auth-token': localStorage.getItem('authToken'),
          },
          data,
        });

        console.log(res);

        console.log(res.data);
      } catch (err) {
        console.log(data);
        console.log('errpr');
        console.log(err.message);
      }
    })();
  }, [imagesUrls]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    uploadToFirebase();
  };

  return (
    <form onSubmit={handleFormSubmit} className='ui form'>
      <div className='field'>
        <label>Title</label>
        <input
          type='text'
          placeholder='Title...'
          required
          onChange={handleTitle}
        />
      </div>
      <div className='field'>
        <label>Description</label>
        <textarea
          placeholder='Description...'
          rows='4'
          required
          onChange={handleDescription}
        />
      </div>
      <div className='field'>
        <label>Upload images</label>
        <input
          type='file'
          onChange={handleImagesAsFile}
          multiple
          accept='image/*'
        />
      </div>

      <button type='submit' className='ui primary button'>
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
