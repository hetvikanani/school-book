import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload, initalValue }) => {
  const [uploadedImage, setUploadedImage] = useState(initalValue);

  const handleImageUpload = (file) => {
    // Check if the uploaded file is an image
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    // Check if the image size is within the limit
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }

    // Convert the image to base64 format
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadedImage(reader.result);
      onUpload(reader.result); // Pass the uploaded image data to the parent component
    };

    return false; // Prevent default upload behavior
  };

  return (
    <Upload
      accept='image/*'
      listType='picture-card'
      showUploadList={false}
      beforeUpload={handleImageUpload}
    >
      {uploadedImage ? (
        <img src={uploadedImage} alt='Uploaded' style={{ width: '100%' }} />
      ) : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default ImageUpload;
