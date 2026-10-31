import {deflateSync,crc32} from 'node:zlib';
import {createHash} from 'node:crypto';

// Deterministic fixture artwork. The Demo never downloads third-party images:
// each picture is a small generated PNG published under /article-media/.
function chunk(type,data){
  const head=Buffer.alloc(8);head.writeUInt32BE(data.length,0);head.write(type,4,'ascii');
  const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4),data]))>>>0,0);
  return Buffer.concat([head,data,crc]);
}
const hex=value=>[1,3,5].map(i=>parseInt(value.slice(i,i+2),16));
export function fixturePng({width=640,height=400,from='#2b6e52',to='#f4efe3',bands=0}){
  const a=hex(from),b=hex(to),rows=[];
  for(let y=0;y<height;y++){
    const row=Buffer.alloc(1+width*3);
    for(let x=0;x<width;x++){
      const t=(x/width*.6+y/height*.4),stripe=bands&&Math.floor(x/(width/bands))%2?.12:0;
      for(let c=0;c<3;c++)row[1+x*3+c]=Math.round(a[c]+(b[c]-a[c])*Math.min(1,t+stripe));
    }
    rows.push(row);
  }
  const header=Buffer.alloc(13);header.writeUInt32BE(width,0);header.writeUInt32BE(height,4);header[8]=8;header[9]=2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',deflateSync(Buffer.concat(rows),{level:9})),chunk('IEND',Buffer.alloc(0))]);
}
export function fixtureAsset(options){
  const bytes=fixturePng(options),sha=createHash('sha256').update(bytes).digest('hex');
  return {path:`/article-media/${sha}.png`,data:bytes.toString('base64'),bytes};
}
