import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload, initalValue }) => {
  const [uploadedImage, setUploadedImage] = useState(initalValue);

  const handleImageUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadedImage(reader.result);
      onUpload(reader.result);
    };

    return false;
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
