import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../interfaces/Event";
import { sortEvents } from "../../functions/sortEvents";
import { parseDateString } from "../../functions/parseDateString";
import InfiniteScroll from "react-infinite-scroll-component";

const Events = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [sortBy, setSortBy] = useState("");

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:3002/events?page=${page}`).then((response) => {
      if (page === 0) {
        setEventsList(response.data.events);
      } else {
        setEventsList((prevEvents) => [...prevEvents, ...response.data.events]);
      }
      setHasMore(response.data.nextPage !== null);
    });
  }, [page]);

  let navigate = useNavigate();

  const fetchData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (sortBy) {
      sortEvents(eventsList, parseDateString, setEventsList, sortBy);
    }
  }, [sortBy]);
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col gap-4 items-start justify-start pt-10 pr-8 pl-8 pb-14'>
        <h2 className='font-medium text-2xl'>Events</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='p-2 border border-gray-300 rounded-md w-48'
        >
          <option value=''>Sort Events List</option>
          <option value='title'>By title</option>
          <option value='eventDate'>By date</option>
          <option value='organizer'>By organizer</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={eventsList.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p
            className='p-6'
            style={{ textAlign: "center" }}
          >
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ul className='flex flex-wrap items-center justify-center gap-11  pt-16 pb-10 pr-5 pl-5'>
          {eventsList.map((eventItem) => {
            return (
              <li
                className='border-solid border-2 border-black bg-[#fff] p-5 w-80'
                key={eventItem.id}
              >
                <h3 className='text-xl font-bold break-words'>
                  {eventItem.title}
                </h3>
                <p>{eventItem.description}</p>
                <div className='flex gap-4 items-center justify-between'>
                  <button
                    onClick={() => {
                      navigate(`/event/register/${eventItem.id}`);
                    }}
                    className='text-[#009DDC]'
                  >
                    Register
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/event/view/${eventItem.id}`);
                    }}
                    className='text-[#009DDC]'
                  >
                    View
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default Events;
