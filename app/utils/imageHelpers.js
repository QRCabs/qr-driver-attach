import ImagePicker from 'react-native-image-crop-picker';
const selectPhotoFromGallary = (image, setImage) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(capturedImg => {
    setImage(capturedImg.path);
    console.log(capturedImg);
  });
};

const takePhotoFromCamera = (image, setImage) => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(capturedImg => {
    setImage(capturedImg.path);
    console.log(capturedImg);
  });
};

export {selectPhotoFromGallary, takePhotoFromCamera};
