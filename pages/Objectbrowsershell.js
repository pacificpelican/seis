import Objectbrowser from "./Objectbrowser";

let dataChunk = `{ 
  "src": "Images/Sun.png",
  "name": "sun1",
  "hOffset": 250,
  "vOffset": 250,
  "alignment": "center"}`;

export default () => (
  <div>
    <Objectbrowser dataArray={dataChunk} dataTable='secondTable' dataBase='secondDB' />
  </div>
)
