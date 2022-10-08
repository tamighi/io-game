const CAT_ASSETS: string[] = [
  ...Array.from({length: 10}, (x, i) => `cat/Dead (${i + 1}).png`),
  ...Array.from({length: 8}, (x, i) => `cat/Fall (${i + 1}).png`),
  ...Array.from({length: 10}, (x, i) => `cat/Hurt (${i + 1}).png`),
  ...Array.from({length: 10}, (x, i) => `cat/Idle (${i + 1}).png`),
  ...Array.from({length: 8}, (x, i) => `cat/Jump (${i + 1}).png`),
  ...Array.from({length: 8}, (x, i) => `cat/Run (${i + 1}).png`),
  ...Array.from({length: 10}, (x, i) => `cat/Slide (${i + 1}).png`),
  ...Array.from({length: 10}, (x, i) => `cat/Walk (${i + 1}).png`),
];

const DOG_ASSETS: string[] = [
  ...Array.from({length: 10}, (x, i) => `dog/Idle (${i + 1}).png`),
];

const assets = new Map<string, HTMLImageElement>();

const downloadAsset = (assetName : string): Promise<void> => {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
          assets.set(assetName, asset);
          resolve();
        };
        asset.src = `/assets/${assetName}`;
    });
}

const downloadPromise = Promise.all([
  CAT_ASSETS.map(downloadAsset), 
  DOG_ASSETS.map(downloadAsset)
]);

export const downloadAssets = () => downloadPromise;

export const getAsset = (assetName: string) => assets.get(assetName);