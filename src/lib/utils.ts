export const sleep = async (time: number) => {
  return new Promise<void>((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => {
      resolve();
    }, time)
  );
};