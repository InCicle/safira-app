import { IEmitter } from "app/types/emitter";
import { hash } from "app/utils/hash";

export function createEmitter<EventsType = any>() {
  const Emitter: IEmitter<EventsType> = {
    events: null,

    addNewEventsInList(name, eventList) {
      // @ts-ignore
      const events = Emitter.events![name]?.filter(event => {
        const keys = eventList.map(item => item?.key);
        return !keys.includes(event?.key);
      });

      // @ts-ignore
      Emitter.events![name] = eventList.concat(events) as any;
    },

    createNewEventList(name, eventList) {
      const isEmptyEventList = !Emitter.events;

      if (isEmptyEventList) {
        Emitter.events = {} as any;
      }

      Emitter.events![name] = [...eventList] as any;
    },

    on(name, ...eventList) {
      const { events, addNewEventsInList, createNewEventList } = Emitter;
      const isNotEmptyEventList = Boolean(events);
      const eventAlreadyExist = events && name in events;
      const calls = eventList.map(event => ({
        key: hash({ amount: 20 }),
        execute: event,
      }));
      const callsIds = calls.map(item => item.key);

      if (isNotEmptyEventList && eventAlreadyExist) {
        addNewEventsInList(name, calls);
        return callsIds;
      }

      createNewEventList(name, calls);

      return callsIds;
    },

    emit: (name, args) => {
      if (!Emitter.events || !(name in Emitter.events)) return;

      const arr = Emitter.events![name];

      arr.forEach(eventItem => eventItem.execute(args || ([] as any)));
    },

    remove: (eventName, eventItemName) => {
      if (!eventItemName) {
        delete Emitter.events![eventName];
        return;
      }

      const event = Emitter.events![eventName];
      // @ts-ignore
      const newEventList: any = event.filter(eventItem => eventItem?.key !== eventItemName);

      Emitter.events![eventName] = newEventList;
    },
  };

  return Emitter;
}