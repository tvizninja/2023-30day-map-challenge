// node ./node_modules/browserify/bin/cmd.js -o viz/app.js
const geojsonvt = require('geojson-vt')
const vtpbf = require('vt-pbf')

app = {}

// image loader
function loader(items, thingToDo, allDone) {
  if (!items) { return }
  if ("undefined" === items.length) { items = [items] }
  let count = items.length
  let thingToDoCompleted = function (items, i) {
    count--
    if (0 == count) { allDone(items) }
  }
  for (let i = 0; i < items.length; i++) {
    thingToDo(items, i, thingToDoCompleted)
  }
}

// add protocol
maplibregl.addProtocol('custom', (params, callback) => {
  const [z, x, y] = params.url.split('/').slice(2, 5).map(a=>parseInt(a.replace(/[^0-9]/g, ''), 10))
  const imgs = [
    `https://cyberjapandata.gsi.go.jp/xyz/dem_png/${z}/${x}/${y}.png`,
    `https://cyberjapandata.gsi.go.jp/xyz/dem_png/${z}/${x}/${y+1}.png`
  ]
  const imgd = []
  function loadImage(items, i, onComplete) {
    const onLoad = e => {
      const size = 256
      e.target.removeEventListener("load", onLoad)
      e.target.removeEventListener("error", onLoad)
      if(e.type=='load'){
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        imgd[i] = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      }else{
        imgd[i] = new Uint8Array(size * size * 4)
      }
      onComplete(items, i)
    }
    let img = new Image()
    img.crossOrigin = "Anonymous"
    img.addEventListener("load", onLoad, false)
    img.addEventListener("error", onLoad, false)
    img.src = items[i]
  }
  loader(imgs, loadImage, ()=>{
    const pc = new Uint8Array(imgd[0].length + imgd[1].length)
    pc.set(imgd[0])
    pc.set(imgd[1], imgd[0].length)
    const mlim = Math.asin(Math.tanh(Math.PI))/Math.PI * 180
    const fn  = yy => 2*Math.atan(Math.tanh(Math.PI*yy/360))*180/Math.PI
    const ipz = 1/Math.pow(2, z)
    const coe = ipz*2*180
    const lat = coe*-y + 180
    const lon = coe*x  - 180
    const r = 4
    const n = 256/r
    const h = ha => (Math.pow(0.002*z/r,2))*((128<=ha[0])?0:(256*256*ha[0] + 256*ha[1] + ha[2]))
    const gj = {
      "type": "FeatureCollection",
      "features": [...Array(n+Math.floor(n/4))].map((a, i)=>{
        return {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": 
            [...Array(r*n)].map((b, j)=>[
              lon+(j+j/(r*n))*coe/(r*n),
              fn(lat-(i-h(pc.slice(4*(j+256*i*r), 4*(j+256*i*r)+3)))*coe/n)
            ]),
            "type": "LineString"
          }
        }
      })
    }
    const tileindex = geojsonvt(gj, {maxZoom: z, indexMaxZoom: z})
    const tile = tileindex.getTile(z, x, y)
    if(tile){ callback(null, vtpbf.fromGeojsonVt({ 'lines': tile }), null, null) }

  })
  return { cancel: () => {} }
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
        "maxzoom": 14,
        "attribution": "<a href=\"https://maps.gsi.go.jp/vector/\" target=\"_blank\">地理院地図Vector（仮称）</a>"
      }
    },
    "layers": [
      {
        "id": "lines",
        "type": "line",
        "source": "gsi",
        "source-layer": "lines",
        "minzoom": 4,
        "maxzoom": 14,
        "paint": {
          "line-color": "#eee",
          "line-width": 2
        }
      }
    ]
  },
  center: [135, 35],
  maxZoom: 13.9,
  maxBounds: [[122, 20], [154, 46]],
  zoom: 4
})
app.map.on('load', ()=>{
  app.map.addControl(new maplibregl.NavigationControl('top-right'))
})
