import { useRef } from 'react';

export type RenderController = {
  firstRender: boolean;
  count: number;
  records: string[];
};

export function useRender() {
  const controller = useRef<RenderController>({
    firstRender: true,
    count: 1,
    records: [],
  });

  const isFirstRender = controller.current.firstRender;
  const currentStage = controller.current.count;

  controller.current.firstRender = false;
  controller.current.count = currentStage + 1;

  function afterTheFirstLoad(cb: () => void) {
    if (isFirstRender) return;

    cb();
  }

  function uniqueCall(shortName: string, cb: () => void) {
    if (controller.current.records.includes(shortName)) return;

    controller.current.records = controller.current.records.concat(shortName);

    cb();
  }

  return {
    isFirstRender,
    currentStage,
    afterTheFirstLoad,
    uniqueCall,
  };
}
