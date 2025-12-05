import { useEventContext } from '../context/EventContext';

export const useEventLog = () => {
  const { addEvent, clearEvents, events } = useEventContext();

  return {
    addEvent,
    clearEvents,
    events,
  };
};


