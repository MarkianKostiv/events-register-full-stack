import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../../interfaces/Event";
import { Participant } from "../../interfaces/Participant";
import { filterParticipants } from "../../functions/filterParticipants";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EventParticipants = () => {
  let { id } = useParams<{ id: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [originalParticipants, setOriginalParticipants] = useState<
    Participant[]
  >([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [registrationData, setRegistrationData] = useState<
    { date: string; count: number }[]
  >([]);

  useEffect(() => {
    axios.get(`http://localhost:3002/participants/${id}`).then((response) => {
      console.log(response.data);
      setParticipants(response.data);
      setOriginalParticipants(response.data);
      const dateCounts: { [key: string]: number } = {};

      response.data.forEach((participant: Participant) => {
        const date = new Date(participant.createdAt).toLocaleDateString();
        dateCounts[date] = (dateCounts[date] || 0) + 1;
      });

      const data = Object.keys(dateCounts).map((date) => ({
        date,
        count: dateCounts[date],
      }));

      setRegistrationData(data);
    });

    axios.get(`http://localhost:3002/events/byId/${id}`).then((response) => {
      console.log(response.data);
      setEvent(response.data);
    });
  }, [id]);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-center pr-9 pl-9 pt-6 pb-6'>
        <h2 className='font-medium text-2xl'>"{event?.title}" participants</h2>
      </div>
      <div className='flex gap-4'>
        <input
          className='w-64 border-black border-2 rounded-xl pt-1 pb-1 pr-2 pl-2'
          type='text'
          placeholder='find by Name or Email'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value);
          }}
        ></input>
        <button
          className='font-semibold text-xl pt-3 pb-3 pr-5 pl-5 duration-400 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl transform transition-transform active:scale-95 shadow-md hover:shadow-lg active:shadow-none focus:outline-none'
          onClick={() => {
            filterParticipants(
              originalParticipants,
              filterValue,
              setParticipants,
              setFilterValue
            );
          }}
        >
          Find
        </button>
      </div>
      <div className='w-full flex flex-col gap-5 items-start justify-center pr-9 pl-9 pt-6 pb-6'>
        <h3 className='font-medium text-xl ml-3'>Registration statistics:</h3>
        <ResponsiveContainer
          width='50%'
          height={200}
        >
          <BarChart
            data={registrationData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='count'
              fill='#8884d8'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ul className='w-full pr-9 pl-9 pt-6 pb-6 flex flex-wrap gap-4'>
        {participants.map((participant) => (
          <li
            className='flex flex-col items-start pt-2 pb-2 pl-4 pr-4 border-solid border-2 border-black w-1/5 gap-2'
            key={participant.id}
          >
            <h3 className='text-base font-normal break-words'>
              {participant.fullName}
            </h3>
            <h4
              className='text-base font-normal break-words'
              style={{ wordBreak: "break-all" }}
            >
              {participant.email}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventParticipants;
