export default function delay(delayInMs: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delayInMs);
  });
}
