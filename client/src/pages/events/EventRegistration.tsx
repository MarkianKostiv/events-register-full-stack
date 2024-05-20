import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../../interfaces/Event";
import RegisterFrom from "./register/RegisterForm";
const EventRegistration = () => {
  const [event, setEvent] = useState<Event | null>(null);
  let { id } = useParams<{ id: string }>();
  useEffect(() => {
    axios.get(`http://localhost:3002/events/byId/${id}`).then((response) => {
      console.log(response.data);
      setEvent(response.data);
    });
  }, [id]);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <h2 className=' font-normal  text-3xl mb-7 mt-7'>
        Event Registration for:
        <span className='ml-2 font-semibold text-3xl'>{event?.title}</span>
      </h2>
      <RegisterFrom eventId={id} />
    </div>
  );
};
export default EventRegistration;
