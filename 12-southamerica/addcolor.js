const fs = require('fs')
const readline = require('readline')
const { createHash } = require('crypto')

const cdict = {}
const fileStream = fs.createReadStream('./onlylocal/river.geojson');
const rd = readline.createInterface({ input: fileStream, crlfDelay: Infinity })

rd.on('line', function(line) {
  if(line.match('MAIN_RIV')){
    if(line.match(/,$/)){line=line.slice(0,-1)}
    const f = JSON.parse(line)
    const ri = f.properties['MAIN_RIV']
    if(!cdict[ri]){
      cdict[ri] = Buffer.from(createHash('sha256').update(ri.toString()).digest('hex')).toString().slice(0,6)
    }
    f.properties.color = `#${cdict[ri]}`
    delete f.properties['MAIN_RIV']
    line = JSON.stringify(f)+","
  }
  fs.appendFile('onlylocal/riverc.geojson', line+"\n", function (err) {
    err?console.error(err):0
  })
});

rd.on('close', function() {
    console.log('all done, son');
});
