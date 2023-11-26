# 2023-30day-map-challenge

* <https://30daymapchallenge.com/>
* My log about 30 day map challenge

## Theme

- 1. Points, A map with points
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/01-points/viz/)
  - <https://geoshape.ex.nii.ac.jp/nrct/> の歴史地名の末尾一文字漢字に着目してプロット
- 2. Lines, A map with lines
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/02-lines/viz/)
  - ボドゲ [TicketToRide](https://boardgamegeek.com/boardgame/9209/ticket-ride) の都市と路線を実際の地図にマッピング
- 3. Polygons, A map with polygons
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/03-polygons/viz/)
  - 国土数値情報より空港データ。クリックした地点の最寄り(直線距離)の空港をポップアップ。空港の地点データからボロノイ分割でポリゴン作成。
- 4. A bad map, Let's get this over with
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/04-badmap/viz/)
  - 約3秒に一度カラースキーマがランダムな色に変更されてしまう地図。とても見づらい！stopボタンで停止。
- 5. Analog Map, Non-digital maps
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/05-analog/viz/)
  - 伊能忠敬地図の一部(東京周辺)を私がジオリファレンスしたもの(位置ずれの責は私にあり)を、現代の地図(GSI/OSM)と重ねて見る。
- 6. Asia, Largest of the continents
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/06-asia/viz/)
  - Asiaと言えばシルクロード…ただプロットしただけになってしまった。Mapbox SatelliteでflyToして見せたかったな。
- 7. Navigation, A map that helps you to navigate
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/07-navigation/viz/)
  - 節分に必要な、現在地から恵方を確認するナビゲータ。そもそも4方向しかなくて、5年(名称上は10年)で1周すること知らなかった。
- 8. Africa, Second-largest and second-most populous continent
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/08-africa/viz/)
  - アフリカを見るとき、緯度の感覚がイマイチつかめないので、日本と南半球ミラー日本を同時に表示し、日本のココとアフリカのココが同緯度なのか～と感じるための地図。
- 9. Hexagons, 6 sides, 6 angles, and 6 vertices
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/09-hexagon/viz/hex-japan.svg)
  - やりたかったことに手こずってしまったので、過去ネタの再掲…紅に染まれっ！Hex Japan！
- 10. North America, Northern part of the American continent
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/10-northamerica/viz/)
  - [hydrosheds.org](https://www.hydrosheds.org/products/hydrorivers)のデータから。同じMAIN_RIVを同じ色で。美し～
- 11. Retro, A blast from the past
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/11-retro/viz/)
  - 昔のゲーム機をイメージして、解像度と色数を落とした地理院Seamlessphoto地図。
- 12. South America, Southern part of the American continent
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/12-southamerica/viz/)
  - [hydrosheds.org](https://www.hydrosheds.org/products/hydrorivers)のデータから。10日目と同じに見えるけど、前回はpmtiles、今回はベクトルタイルで…
- 13. Choropleth, Classic thematic map: a choropleth
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/13-choropleth/viz/)
  - シンプルに、国のcentroidの緯度が高い所ほど暗く塗分け。
- 14. Europe, The westernmost peninsulas of Eurasia
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/14-europe/viz/)
  - 全ての道はローマに…。AWMC(Ancient World Mapping Center)のデータより、ヨーロッパの歴史的道路。
- 15. OpenStreetMap, The greatest of the datasets. Remember to give credit.
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/15-osm/viz/)
  - OSMをデータソースに、Mapbox pencilスタイルを引用し、自分で少しマップスタイルをカスタマイズした、鉛筆風地図。
- 16. Oceania Region, made up of thousands of islands throughout the Central and South Pacific
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/16-oceania/viz/)
  - 日本をニュージーランド付近に置いてみた。ニュージーランドは日本の7割程度の面積。思ったより緯度高いのだな、と。
- 17. Flow, Flow of transport, people
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/17-flow/viz/)
  - 航空輸送統計調査、国内定期航空空港間旅客流動表より。データの加工に時間がかかった…。Arc表現がよさそうだったので、deck.glで。
- 18. Atmosphere Conditions, of the atmosphere can be either weather or climate
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/18-atmosphere/viz/)
  - ECMWFから、地表(海上)のNO2濃度データ、2023/11/18の予測値。海上に見える線は、船がよく通る航路なんだとか。
- 19. 5-minute map, Spend no more than 5 minutes to prepare this map
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/19-5min/viz/)
  - 5分で制作。海を緑、陸を青で。海と陸があべこべの地球を想像してみる。イースター島が砂漠のオアシスになりそう。
- 20. Outdoors, Map of mountains, trails, or something completely different
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/20-outdoors/viz/)
  - インドア派につきOutdoorsのリアルデータを持ち合わせないため、完全ランダムウォークによる富士山散歩。一万回の酔歩。
- 21. Raster, Pixels, please
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/21-raster/viz/)
  - 地理院のラスタ写真を読み込み、そこからベクトルタイルをオンザフライで生成表示…特に意味はないけど、いつか何かに役立つだろう…
- 22. North, is not always up ⬆️
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/22-north/viz/)
  - 大阪と東京が似ている？と話題になっていたので、動かせる地図にしてみた。が、関西の土地勘がなくイマイチ分からん。
- 23. 3D, The third dimension
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/23-3d/viz/)
  - いろいろ試しているうちに迷走してしまって、気づいたらアヒルが富士山を襲撃していた…
- 24. Black & white, Only two colors allowed
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/24-blackwhite/viz/)
  - Joy Division風？ラスタタイルからベクトルタイルを動的生成する技術を活用。多分GLのレンダラを書く方が効率的なんだろうが…
- 25. Antarctica, A cold continent that can't be reached with Web Mercator
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/25-antarctica/viz/)
  - 南の磁極の歴史的変遷をプロット(データ from NOAA)。1960年代から、南極大陸を飛び出している。南極点とは結構違うんですね。
- 26. Minimal, Less is more
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/26-minimal/viz/)
  - なんて地名だい？贅沢な地名だね！地名なんて最初の一文字があれば十分…か？…OSMの日本国内のname(place)から最初の一文字だけを抽出。
- 27. Dot, Dot density, a single dot in space or something different
  - [viz](https://tvizninja.github.io/2023-30day-map-challenge/27-dot/viz/)
  - deck.gl、このdotScreenなどのエフェクトが気になっていて、一度触ってみたかった。質感のある地図良いな～
- 28. Is this a chart or a map?, In thematic maps, you can't always tell. Try to stretch the limits
- 29. Population, A classic theme for a map
- 30. "My favorite..", You choose!
