const ASSET_NAMES: string[] = [
];

const assets = new Map<string, HTMLImageElement>();

const downloadAsset = (assetName : string): Promise<void> => {
    return new Promise(resolve => {
        const asset = new Image();
        console.log(assetName)
        asset.onload = () => {
          console.log(`Downloaded ${assetName}`);
          assets.set(assetName, asset);
          resolve();
        };
        asset.src = `${assetName}`;
    });
}

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

export const downloadAssets = () => downloadPromise;

export const getAsset = (assetName: string) => assets.get(assetName);