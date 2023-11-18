const fs = require('fs').promises
const events = require('events')
const { createHash } = require('crypto')

// values
const apos = { // airport latlon from https://ourairports.com/data/
  '稚内':     {latlon: [45.4042015076, 141.800994873], cs:'RJCW'},
  '釧路':     {latlon: [43.0410003661, 144.192993164], cs:'RJCK'},
  '函館':     {latlon: [41.77        , 140.822006],    cs:'RJCH'},
  '旭川':     {latlon: [43.670799    , 142.447006],    cs:'RJEC'},
  '利尻':     {latlon: [45.2420005798, 141.186004639], cs:'RJER'},
  '帯広':     {latlon: [42.7332992554, 143.216995239], cs:'RJCB'},
  '中標津':   {latlon: [43.5774993896, 144.960006714], cs:'RJCN'},
  '紋別':     {latlon: [44.3039016724, 143.404006958], cs:'RJEB'},
  '女満別':   {latlon: [43.8805999756, 144.164001465], cs:'RJCM'},
  '奥尻':     {latlon: [42.0717010498, 139.432998657], cs:'RJEO'},
  '新千歳':   {latlon: [42.7752      , 141.692001],    cs:'RJCC'},
  '丘珠':     {latlon: [43.117447    , 141.38134],     cs:'RJCO'},
  '青森':     {latlon: [40.7346992492, 140.690994262], cs:'RJSA'},
  '三沢':     {latlon: [40.703201    , 141.367996],    cs:'RJSM'},
  '花巻':     {latlon: [39.4286      , 141.134995],    cs:'RJSI'},
  '仙台':     {latlon: [38.139702    , 140.917007],    cs:'RJSS'},
  '秋田':     {latlon: [39.6156005859, 140.218994140], cs:'RJSK'},
  '大館':     {latlon: [40.191898    , 140.371002],    cs:'RJSR'},
  '山形':     {latlon: [38.4119      , 140.371002],    cs:'RJSC'},
  '庄内':     {latlon: [38.812199    , 139.787003],    cs:'RJSY'},
  '福島':     {latlon: [37.2274017333, 140.430999755], cs:'RJSF'},
  '百里':     {latlon: [36.183333    , 140.420556,],   cs:'RJAH'},
  '成田':     {latlon: [35.764702    , 140.386002],    cs:'RJAA'},
  '羽田':     {latlon: [35.552299    , 139.779999],    cs:'RJTT'},
  '大島':     {latlon: [34.7820014954, 139.36000061],  cs:'RJTO'},
  '三宅島':   {latlon: [34.073600769 , 139.559997559], cs:'RJTQ'},
  '八丈島':   {latlon: [33.1150016785, 139.785995483], cs:'RJTH'},
  '調布':     {latlon: [35.6717      , 139.528],       cs:'RJTF'},
  '新島':     {latlon: [34.3694000244, 139.268997192], cs:'RJAN'},
  '神津島':   {latlon: [34.1899986267, 139.134002686], cs:'RJAZ'},
  '青ヶ島':   {latlon: [32.4678643934, 139.7602383154], cs:''},
  '御蔵島':   {latlon: [33.8977595944, 139.5949356505], cs:''},
  '利島':     {latlon: [34.5306557300, 139.2738734515], cs:''},
  '新潟':     {latlon: [37.9558982849, 139.121002197], cs:'RJSN'},
  '佐渡':     {latlon: [38.0601997375, 138.414001465], cs:'RJSD'},
  '富山':     {latlon: [36.6483001708, 137.188003540], cs:'RJNT'},
  '小松':     {latlon: [36.3946      , 136.406998],    cs:'RJNK'},
  '能登':     {latlon: [37.293098    , 136.962006],    cs:'RJNW'},
  '松本':     {latlon: [36.166801    , 137.923004],    cs:'RJAF'},
  '静岡':     {latlon: [34.796043    , 138.187752],    cs:'RJNS'},
  '名古屋':   {latlon: [35.255759    , 136.924095],    cs:'RJNA'},
  '中部':     {latlon: [34.8583984375, 136.804992675], cs:'RJGG'},
  '大阪':     {latlon: [34.7854995727, 135.438003540], cs:'RJOO'},
  '関西':     {latlon: [34.427299    , 135.244003],    cs:'RJBB'},
  '神戸':     {latlon: [34.6328010559, 135.223999023], cs:'RJBE'},
  '但馬':     {latlon: [35.512798    , 134.787003],    cs:'RJBT'},
  '南紀白浜': {latlon: [33.6622009277, 135.363998413], cs:'RJBD'},
  '鳥取':     {latlon: [35.530102    , 134.167007],    cs:'RJOR'},
  '美保':     {latlon: [35.492199    , 133.235992],    cs:'RJOH'},
  '隠岐':     {latlon: [36.178388    , 133.323566],    cs:'RJNO'},
  '出雲':     {latlon: [35.413601    , 132.889999],    cs:'RJOC'},
  '石見':     {latlon: [34.676399231 , 131.789993286], cs:'RJOW'},
  '岡山':     {latlon: [34.756901    , 133.854996],    cs:'RJOB'},
  '広島':     {latlon: [34.4361      , 132.919006],    cs:'RJOA'},
  '広島西':   {latlon: [34.371451    , 132.417666],    cs:'RJBH'},
  '山口宇部': {latlon: [33.9300003052, 131.279006958], cs:'RJDC'},
  '岩国':     {latlon: [34.146333    , 132.247238],    cs:'RJOI'},
  '徳島':     {latlon: [27.836399    , 128.880997],    cs:'RJKN'},
  '高松':     {latlon: [34.2141990661, 134.01600647],  cs:'RJOT'},
  '松山':     {latlon: [33.8272018432, 132.699996948], cs:'RJOM'},
  '高知':     {latlon: [33.546101    , 133.669006],    cs:'RJOK'},
  '福岡':     {latlon: [33.5858993530, 130.451004028], cs:'RJFF'},
  '北九州':   {latlon: [33.845901    , 131.035004],    cs:'RJFR'},
  '佐賀':     {latlon: [33.1497001648, 130.302001953], cs:'RJFS'},
  '長崎':     {latlon: [32.9169006348, 129.914001465], cs:'RJFU'},
  '福江':     {latlon: [32.6663017273, 128.832992554], cs:'RJFE'},
  '壱岐':     {latlon: [33.7490005493, 129.785003662], cs:'RJDB'},
  '対馬':     {latlon: [34.2849006653, 129.330993652], cs:'RJDT'},
  '上五島':   {latlon: [33.0130996704, 129.192001343], cs:'RJDK'},
  '小値賀':   {latlon: [33.1907997131, 129.089996338], cs:'RJDO'},
  '熊本':     {latlon: [32.8372993469, 130.854995727], cs:'RJFT'},
  '天草':     {latlon: [32.482498    , 130.158997],    cs:'RJDA'},
  '大分':     {latlon: [32.8372993469, 130.854995727], cs:'RJFO'},
  '宮崎':     {latlon: [32.8372993469, 130.854995727], cs:'RJFM'},
  '鹿児島':   {latlon: [31.8034000396, 130.718994140], cs:'RJFK'},
  '種子島':   {latlon: [30.6051006317, 130.990997314], cs:'RJFG'},
  '屋久島':   {latlon: [30.3855991364, 130.658996582], cs:'RJFC'},
  '奄美':     {latlon: [28.4305992126, 129.712997436], cs:'RJKA'},
  '喜界島':   {latlon: [28.3213005066, 129.927993774], cs:'RJKI'},
  '沖永良部': {latlon: [27.425501    , 128.701004],    cs:'RJKB'},
  '与論':     {latlon: [27.044001    , 128.401993],    cs:'RORY'},
  '徳之島':   {latlon: [27.836399    , 128.880997],    cs:'RJKN'},
  '那覇':     {latlon: [26.195801    , 127.646004],    cs:'ROAH'},
  '南大東島': {latlon: [25.8465      , 131.263],       cs:'ROMD'},
  '久米島':   {latlon: [26.363445    , 126.71384],     cs:'ROKJ'},
  '宮古島':   {latlon: [24.7828006744, 125.294998169], cs:'ROMY'},
  '石垣':     {latlon: [24.396389    , 124.245],       cs:'ISG'},
  '与那国':   {latlon: [24.467298    , 122.979827],    cs:'ROYN'},
  '多良間':   {latlon: [24.6539001465, 124.675003052], cs:'RORT'},
  '北大東島': {latlon: [25.9447002411, 131.32699585],  cs:'RORK'},
  '波照間':   {latlon: [24.059751    , 123.80558],     cs:'RORH'},
  '粟国':     {latlon: [26.592755    , 127.240335],    cs:'RORA'},
  '下地島':   {latlon: [24.8267      , 125.144997],    cs:'RORS'},
  '慶良間':   {latlon: [26.168337    , 127.293423],    cs:'ROKR'}
}

// load tsv file
const dataloader = new events()
fs.readFile('./airplanes.tsv') // data from https://www.e-stat.go.jp/dbview?sid=0003173907
.then(data => {
  const lines = data.toString().split("\n").map(line=>line.replace(/\r/g, '').split("\t")).filter(l=>l!='')
  dataloader.emit('loaded', lines)
}).catch(console.error)

dataloader.on('loaded', lines=>{
  const data = {}
  //const toap = lines.shift().filter(ap=>Object.keys(apos).includes(ap)) // to airport
  const header = lines.shift()
  lines.forEach(line => {
    year = parseInt(line.shift().replace(/年/, ''), 10)
    frap = line.shift()
    line.forEach((val, i) => {
      const toap = header[i]
      if((Object.keys(apos).includes(toap))&&(val.match(/[0-9]+/))){
        if(!data[frap]){data[frap] = {}}
        if(!data[frap][toap]){data[frap][toap] = {}}
        data[frap][toap][year] = parseInt(val, 10)
      }
    })
  })
  const cdict = {}
  Object.keys(apos).forEach(ap=>{
    if(!cdict[ap]){
      const rgb = Buffer.from(createHash('sha256').update(ap).digest('hex')).toString().slice(0,6)
      cdict[ap] = rgb.match(/[0-9a-f]{2}/gi).map(a=>parseInt(a,16)/2+63)
    }
  })
  const gj = {
    type: 'FeatureCollection',
    features: []
  }
  const arr = []
  Object.keys(data).forEach(frap => {
    Object.keys(data[frap]).forEach(toap => {
      const total = Object.keys(data[frap][toap]).reduce((a,b)=>a+data[frap][toap][b],0)
      gj.features.push({
        type: 'Feature',
        properties:{
          from: frap,
          to: toap,
          total: total,
          byyear: data[frap][toap]
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [apos[frap].latlon[1], apos[frap].latlon[0]],
            [apos[toap].latlon[1], apos[toap].latlon[0]]
          ]
        }
      })
      arr.push({
        frcolor: cdict[frap],
        tocolor: cdict[toap],
        total: total,
        byyear: data[frap][toap],
        from: {
          name: frap,
          coordinates: [apos[frap].latlon[1], apos[frap].latlon[0]]
        },
        to: {
          name: toap,
          coordinates: [apos[toap].latlon[1], apos[toap].latlon[0]]
        }
      })
    })
  })
  fs.writeFile('viz/data.geojson', JSON.stringify(gj)).then().catch(console.error)
  fs.writeFile('viz/deckarc.geojson', JSON.stringify(arr)).then().catch(console.error)
})
