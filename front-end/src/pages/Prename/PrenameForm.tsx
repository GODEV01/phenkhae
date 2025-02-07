import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import TextField from '../../components/Forms/TextField';
import axios from 'axios';

interface PrenameFormData {
  prename_tha: string;
  prename_eng: string;
  prename_short_tha?: string;
  prename_short_eng?: string;
}

interface PrenameFormProps {
  initialData?: PrenameFormData;
  onSubmit: (data: PrenameFormData) => void;
  isLoading?: boolean;
}

const PrenameForm = ({
  initialData,
  onSubmit,
  isLoading = false,
}: PrenameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrenameFormData>({
    defaultValues: initialData,
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4 font-notoLoopThaiRegular">
        {initialData ? 'แก้ไขคำนำหน้าชื่อ' : 'เพิ่มคำนำหน้าชื่อ'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          name="prename_tha"
          label="คำนำหน้าชื่อภาษาไทย"
          placeholder="นาย"
          includeRegister={register}
          error={errors.prename_tha?.message}
        />
        <TextField
          name="prename_eng"
          label="คำนำหน้าชื่อภาษาอังกฤษ"
          placeholder="Mr."
          includeRegister={register}
          error={errors.prename_eng?.message}
        />
        <TextField
          name="prename_short_tha"
          label="คำนำหน้าชื่อย่อภาษาไทย"
          placeholder="น."
          includeRegister={register}
          error={errors.prename_short_tha?.message}
        />
        <TextField
          name="prename_short_eng"
          label="คำนำหน้าชื่อย่อภาษาอังกฤษ"
          placeholder="Mr."
          includeRegister={register}
          error={errors.prename_short_eng?.message}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
        </button>
      </form>
    </div>
  );
};

export default PrenameForm;
