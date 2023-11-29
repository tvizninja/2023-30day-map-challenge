import numpy as np
import rasterio

with rasterio.open('pop2020.tif') as src:
    dem = src.read(1)
    meta = src.meta

r = np.zeros(dem.shape).astype(rasterio.uint8)
g = np.zeros(dem.shape).astype(rasterio.uint8)
b = np.zeros(dem.shape).astype(rasterio.uint8)
g += np.floor_divide(dem, 256).astype(rasterio.uint8)
b += np.floor(dem - g * 256).astype(rasterio.uint8)

meta['dtype']=rasterio.uint8
meta['nodata']=None
meta['count']=3
#meta(dtype=rasterio.uint8, nodata=0, count=3)
with rasterio.open('pop2020c.tif', 'w', **meta) as dst:
    dst.write_band(1, r.astype(rasterio.uint8))
    dst.write_band(2, g.astype(rasterio.uint8))
    dst.write_band(3, b.astype(rasterio.uint8))