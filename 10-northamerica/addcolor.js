const fs = require('fs')
const { createHash } = require('crypto')

const cdict = {}
fs.readFile('./onlylocal/river.geojson', 'utf8', (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`)
  } else {
    const gj = JSON.parse(data)
    gj.features.map(f=>{
      const ri = f.properties['MAIN_RIV']
      if(!cdict[ri]){
        cdict[ri] = Buffer.from(createHash('sha256').update(ri.toString()).digest('hex')).toString().slice(0,6)
      }
      f.properties.color = `#${cdict[ri]}`
      delete f.properties['MAIN_RIV']
      return f
    })
    fs.writeFile('./onlylocal/riverc.geojson', JSON.stringify(gj), console.error)
  }
})