import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CustomDatePicker from "./CustomDatePicker";
import { FormDataProp } from "../../../interfaces/FormDataProp";
import { RegFormId } from "../../../interfaces/RegFormId";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = (props: RegFormId) => {
  const { eventId } = props;
  const numEventId = Number(eventId);
  const initialValues: FormDataProp = {
    fullName: "",
    email: "",
    dateOfBirth: "",
    source: "",
    EventId: numEventId,
  };

  const onSubmit = (
    data: FormDataProp,
    { resetForm }: FormikHelpers<FormDataProp>
  ) => {
    const formattedData = {
      ...data,
      dateOfBirth: format(new Date(data.dateOfBirth), "dd.MM.yyyy"),
    };

    axios
      .post("http://localhost:3002/participants", formattedData)
      .then((response) => {
        console.log("Response from server: ", response.data);
        toast.success("Registration successful!");
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error submitting the form: ", error);
        toast.error("Registration failed. Please try again.");
      });
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dateOfBirth: Yup.date()
      .nullable()
      .required("Date of birth is required")
      .test(
        "DOB",
        "You must be at least 18 years old",
        (value) => value && new Date().getFullYear() - value.getFullYear() >= 18
      ),
    source: Yup.string().required(
      "Please choose where you heard about this event"
    ),
  });

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className='flex flex-col w-full gap-5'>
          <label className='flex flex-col'>
            Full name:
            <Field
              name='fullName'
              placeholder='(e.g., Indiana Jones)'
            />
            <ErrorMessage
              className='text-red-500 text-sm mt-1'
              name='fullName'
              component='span'
            />
          </label>
          <label className='flex flex-col'>
            Email:
            <Field
              name='email'
              type='email'
              placeholder='(e.g., indiana.jones@gmail.com)'
            />
            <ErrorMessage
              name='email'
              component='span'
              className='text-red-500 text-sm mt-1'
            />
          </label>
          <label className='flex flex-col'>
            Date Of Birth:
            <CustomDatePicker
              name='dateOfBirth'
              placeholderText='(e.g., 12.04.2001)'
            />
            <ErrorMessage
              name='dateOfBirth'
              component='span'
              className='text-red-500 text-sm mt-1'
            />
          </label>
          <label className='flex flex-col'>
            Where did you hear about this event?
            <Field
              name='source'
              as='select'
            >
              <option
                value=''
                hidden
              >
                Select an option
              </option>
              <option value='Friends'>Friends</option>
              <option value='Social Media'>Social Media</option>
              <option value='Found myself'>Found myself</option>
            </Field>
            <ErrorMessage
              name='source'
              component='span'
              className='text-red-500 text-sm mt-1'
            />
          </label>
          <button
            type='submit'
            className='font-semibold text-xl pt-4 pb-4 pr-6 pl-6 bg-[#009C2F] hover:bg-[#339039] duration-300 rounded-xl transform active:scale-95 active:bg-[#007B2C] focus:outline-none shadow-md hover:shadow-lg active:shadow-none'
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
