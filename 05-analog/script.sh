#!/bin/bash
docker run --rm -v $(pwd):/home ghcr.io/osgeo/gdal:ubuntu-full-latest gdal2tiles.py --xyz /home/digidepo_1286636_noBundleName_2f662a12-9a0a-486e-9cde-6ad038ca3eb7_modified.tif /home/viz/digidepo_1286636_noBundleName_2f662a12-9a0a-486e-9cde-6ad038ca3eb7/
