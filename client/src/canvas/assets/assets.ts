const ASSETS: string[] = [
  'ship.svg'
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

const downloadPromise = Promise.all(ASSETS.map(downloadAsset));

export const downloadAssets = () => downloadPromise;

export const getAsset = (assetName: string) => assets.get(assetName);