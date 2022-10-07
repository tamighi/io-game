const CAT_ASSETS: string[] = [
  'cat/Idle (1).png'
];

const DOG_ASSETS: string[] = [
];

const assets = new Map<string, HTMLImageElement>();

const downloadAsset = (assetName : string): Promise<void> => {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
          console.log(`Downloaded ${assetName}`);
          assets.set(assetName, asset);
          resolve();
        };
        asset.src = `/assets/${assetName}`;
    });
}

const downloadPromise = Promise.all([CAT_ASSETS.map(downloadAsset), DOG_ASSETS.map(downloadAsset)]);

export const downloadAssets = () => downloadPromise;

export const getAsset = (assetName: string) => assets.get(assetName);