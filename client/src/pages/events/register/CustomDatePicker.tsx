import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useField } from "formik";
const CustomDatePicker = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(date) => helpers.setValue(date)}
        dateFormat='dd.MM.yyyy'
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomDatePicker;
