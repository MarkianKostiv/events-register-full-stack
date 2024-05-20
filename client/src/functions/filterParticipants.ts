import { Participant } from "../interfaces/Participant";
export const filterParticipants = (
  array: Participant[],
  valueForFilter: string,
  setFunc: (participants: Participant[]) => void,
  resetFilter: (filterValue: string) => void
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(valueForFilter);

  if (valueForFilter !== "") {
    const filteredArray = array.filter((item) =>
      isEmail
        ? item.email.toLowerCase().startsWith(valueForFilter.toLowerCase())
        : item.fullName.toLowerCase().startsWith(valueForFilter.toLowerCase())
    );
    setFunc(filteredArray);
  } else {
    setFunc(array);
  }
  resetFilter("");
};
