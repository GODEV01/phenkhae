import React, { useState } from 'react';
import IconBxsUserCircle from '../../common/BxsUserCircle';
import AttachFile from '../Forms/AttachFile';
const UploadImage = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="mt-6 mb-6 text-4xl font-bold text-black font-notoExtraBold dark:text-white">
        อัปโหลดรูปภาพประจำตัว
      </h1>
      <p className="mb-6 font-notoRegular text-sm text-gray-500 dark:text-white">
        <span className="text-red-500">* </span>หากยังไม่มีรูปภาพประจำตัว
        สามารถอัปโหลดในภายหลังได้
      </p>
      <div className="flex flex-col gap-2 justify-center items-center">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-100 h-100 object-cover rounded-lg"
          />
        ) : (
          <IconBxsUserCircle height="20em" width="20em" />
        )}
        <AttachFile
          label="เลือกรูปภาพผู้ใช้งาน"
          onChange={(file) => handleImageChange(file)}
        />
      </div>
    </>
  );
};

export default UploadImage;
