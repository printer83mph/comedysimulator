export let minSize: number = Math.min(innerWidth, innerHeight);
export let maxSize: number = Math.max(innerWidth, innerHeight);

export function onResize() {
  minSize = Math.min(innerWidth, innerHeight);
  maxSize = Math.max(innerWidth, innerHeight);
}