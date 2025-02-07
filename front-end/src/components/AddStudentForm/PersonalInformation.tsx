import React, { useEffect, useState } from 'react';
import TextField from '../Forms/TextField';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import DropdownSearchWithController from '../Forms/DropdownSearchWithController';
import { useFormContext } from 'react-hook-form';

import { AxiosResponse } from 'axios';

import {
  fetchMaritalStatuses,
  fetchProvinces,
  fetchPrefixNames,
} from '../../services/api';

interface SelectOption {
  value: number;
  label: string;
}

type MaritalStatus = SelectOption;
type Province = SelectOption;
type PrefixName = SelectOption;

interface ProvinceResponse {
  status: string;
  message: string;
  data: {
    id: number;
    code: number;
    name_in_thai: string;
    name_in_english: string;
  }[];
}

const PersonalInformation = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [prefixNames, setPrefixNames] = useState<PrefixName[]>([]);

  useEffect(() => {
    const fetchMaritals = async () => {
      const response: AxiosResponse<{ id: number; marital_name: string }[]> =
        await fetchMaritalStatuses();
      const formattedStatuses = response.data.map((status) => ({
        value: status.id,
        label: status.marital_name,
      }));
      setMaritalStatuses(formattedStatuses);
    };

    const fetchProvinceList = async () => {
      const response: AxiosResponse<ProvinceResponse> = await fetchProvinces();
      const formattedProvinces = response.data.data.map((province) => ({
        value: province.id,
        label: province.name_in_thai,
      }));
      setProvinces(formattedProvinces);
    };

    const fetchPrefixList = async () => {
      const response: AxiosResponse<
        {
          id: number;
          prename_tha: string;
          prename_eng: string;
          prename_short_tha?: string;
          prename_short_eng?: string;
        }[]
      > = await fetchPrefixNames();
      const formattedPrefixNames = response.data.map((prefixName) => ({
        value: prefixName.id,
        label: prefixName.prename_tha,
      }));
      setPrefixNames(formattedPrefixNames);
    };
    fetchMaritals();
    fetchProvinceList();
    fetchPrefixList();
  }, []);

  return (
    <>
      <h1 className="mt-6 mb-6 text-4xl font-bold text-black dark:text-white font-notoExtraBold">
        ประวัติส่วนตัว
      </h1>
      <div className="mt-4 md:grid grid-cols-2 gap-4">
        <DropdownSearchWithController<SelectOption['value']>
          className="col-span-2 lg:w-[49.3%]"
          label="คำนำหน้า"
          name="prename_tha"
          placeholder="คำนำหน้า"
          required={true}
          options={prefixNames}
          control={control}
          error={
            typeof errors.prename_tha?.message === 'string'
              ? errors.prename_tha.message
              : ''
          }
        />
        <TextField
          label="ชื่อนักเรียน - ภาษาไทย"
          name="firstname_tha"
          includeRegister={register}
          placeholder="ชื่อนักเรียน"
          required={true}
          error={
            typeof errors.firstname_tha?.message === 'string'
              ? errors.firstname_tha.message
              : ''
          }
        />
        <TextField
          label="นามสกุลนักเรียน - ภาษาไทย"
          name="lastname_tha"
          includeRegister={register}
          placeholder="นามสกุลนักเรียน"
          required={true}
          error={
            typeof errors.lastname_tha?.message === 'string'
              ? errors.lastname_tha.message
              : ''
          }
        />
        <TextField
          label="ชื่อนักเรียน - ภาษาอังกฤษ"
          name="firstname_eng"
          includeRegister={register}
          placeholder="ชื่อนักเรียน"
          required={true}
          error={
            typeof errors.firstname_eng?.message === 'string'
              ? errors.firstname_eng.message
              : ''
          }
        />
        <TextField
          label="นามสกุลนักเรียน - ภาษาอังกฤษ"
          name="lastname_eng"
          includeRegister={register}
          placeholder="นามสกุลนักเรียน"
          required={true}
          error={
            typeof errors.lastname_eng?.message === 'string'
              ? errors.lastname_eng.message
              : ''
          }
        />
        <TextField
          label="เลขประจำตัวประชาชน"
          name="citizenid_card"
          includeRegister={register}
          placeholder="เลขประจำตัวประชาชน"
          required={true}
          error={
            typeof errors.citizenid_card?.message === 'string'
              ? errors.citizenid_card.message
              : ''
          }
        />
        <DatePickerOne
          label="วัน/เดือน/ปี เกิด"
          name="birthdate"
          includeRegister={register}
          placeholder="วันเกิด"
          required={true}
          error={
            typeof errors.birthdate?.message === 'string'
              ? errors.birthdate.message
              : ''
          }
        />
        <DropdownSearchWithController<SelectOption['value']>
          label="สถานภาพปัจจุบัน"
          name="marital_status"
          options={maritalStatuses}
          control={control}
          required={true}
          placeholder="โปรดเลือกสถานภาพปัจจุบัน"
          error={
            typeof errors.marital_status?.message === 'string'
              ? errors.marital_status.message
              : ''
          }
        />
        <DropdownSearchWithController<SelectOption['value']>
          label="สถานที่เกิด"
          name="birth_province"
          placeholder="สถานที่เกิด"
          options={provinces}
          control={control}
          required={true}
          error={
            typeof errors.birth_province?.message === 'string'
              ? errors.birth_province.message
              : ''
          }
        />
      </div>
    </>
  );
};

export default PersonalInformation;
