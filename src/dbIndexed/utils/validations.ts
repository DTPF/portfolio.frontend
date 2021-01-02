export function isDBValid() {
  return "indexedDB" in window && !/iPad|iPhone|iPod/.test(navigator.platform);
}
