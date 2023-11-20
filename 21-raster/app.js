// node ./node_modules/browserify/bin/cmd.js -o viz/app.js
const geojsonvt = require('geojson-vt')
const vtpbf = require('vt-pbf')

app = {}

// add protocol
maplibregl.addProtocol('custom', (params, callback) => {
  const [z, x, y] = params.url.split('/').slice(2, 5).map(a=>parseInt(a.replace(/[^0-9]/g, ''), 10))
  const image = new Image()
  image.crossOrigin = "Anonymous"
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0)
    const imgd = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pc = imgd.data
    const fn  = yy => 2*Math.atan(Math.tanh(Math.PI*yy/360))*180/Math.PI
    const ipz = 1/Math.pow(2, z)
    const coe = ipz*2*180
    const lat = coe*-y + 180
    const lon = coe*x  - 180
    const r = 4
    const n = 256/r
    const gj = {
      "type": "FeatureCollection",
      "features": [...Array(n*n)].map((a, i)=>{
        const ix = i%n
        const iy = Math.floor(i/n)
        const ic = iy*r*r*n + ix*r
        return {
          "type": "Feature",
          "properties": {
            "color": `rgb(${pc[4*ic+1]},${pc[4*ic+1]},${pc[4*ic+2]})`
          },
          "geometry": {
            "coordinates": [lon+(ix+.5)*coe/n, fn(lat-(iy+.5)*coe/n)],
            "type": "Point"
          }
        }
      })
    }
    const tileindex = geojsonvt(gj, {maxZoom: z, indexMaxZoom: z})
    const tile = tileindex.getTile(z, x, y)
    if(tile){ callback(null, vtpbf.fromGeojsonVt({ 'custom': tile }), null, null) }
  }
  image.src = `https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/${z}/${x}/${y}.jpg`
  return { cancel: () => { } }
})

// map init
app.map = new maplibregl.Map({
  container: 'map',
  style: {
    "version": 8,
    "glyphs":"https://maps.gsi.go.jp/xyz/noto-jp/{fontstack}/{range}.pbf",
    "sources": {
      "gsi": {
        "type": "vector",
        "tiles": [ "custom://{z}/{x}/{y}.pbf" ],
        "minzoom": 4,
        "maxzoom": 18,
        "attribution": "<a href=\"https://maps.gsi.go.jp/vector/\" target=\"_blank\">地理院地図Vector（仮称）</a>"
      }
    },
    "layers": [
      {
        "id": "custom",
        "type": "circle",
        "source": "gsi",
        "source-layer": "custom",
        "minzoom": 4,
        "maxzoom": 18,
        "paint": {
          "circle-radius": 12,
          "circle-color": ["get", "color"],
          "circle-blur": .5
        }
      }
    ]
  },
  center: [139.7, 35.6],
  maxZoom: 17.9,
  maxBounds: [[122, 20], [154, 46]],
  zoom: 4
})
app.map.on('load', ()=>{
  app.map.addControl(new maplibregl.NavigationControl('top-right'))
})
