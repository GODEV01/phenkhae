<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "prename_id" => "required|exists:prenames,id",
            "firstname_tha" => "required|string|max:255",
            "lastname_tha" => "required|string|max:255",
            "firstname_eng" => "required|string|max:255",
            "lastname_eng" => "required|string|max:255",
            "citizen_card" => "required|string|max:255",
            "birthdate" => "required|date",
            "birth_province_id" => "required|exists:provinces,id",
            "father_lname" => "required|string|max:255",
            "mother_fname" => "required|string|max:255",
            "mother_lname" => "required|string|max:255",
            "marital_id" => "required|exists:maritals,id",
            "address_number" => "required|string|max:255",
            "address_moo" => "required|string|max:255",
            "address_road" => "required|string|max:255",
            "address_subdistrict_id" => "required|exists:subdistricts,id",
            "phonenumber" => "required|string|max:255",
            "email" => "required|string|max:255|email",
            "occupation_id" => "required|exists:occupations,id",
            "medical_condition_id" => "required|exists:medical_conditions,id",
            "surgery_history" => "required|string|max:255",
            "learn_massage" => "required|integer|min:0|max:1",
            "learn_massage_des" => "nullable|text",
            "work_massage" => "required|integer|min:0|max:1",
            "work_massage_des" => "nullable|text",
        ];
    }
}
