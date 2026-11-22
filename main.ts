import{readFileSync as r,readdirSync as e,mkdirSync as m,writeFileSync as w}from'node:fs';
import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output',u=new Uint8Array(65536);
let l=0;
for(const k of e(I).sort()){
const P=r(j(I,k,'program.bin')),N=r(j(I,k,'input.bin'));
l=0;const x=R(P,N);
m(j(O,k),{recursive:!0});
w(j(O,k,'stdout.bin'),u.subarray(0,l));
w(j(O,k,'exit.txt'),x+'\n');
}
function R(P,N){
const S=[],C=[],M=new Int32Array(256),n=P.length;
let p=0,g=0,s=0;
for(;;){
if(s==1e6)return 10;
if(p<0||p>=n)return 9;
const o=P[p];
if(!(o<8||o>15&&o<31||o>31&&o<35||o>47&&o<53||o>63&&o<66||o>79&&o<84))return 5;
const i=o==1?1:o==2?4:o>47&&o<52?2:0;
if(p+i>=n)return 9;
s++;
const q=p+1+i;
p=q;
if(!o)return 0;
if(o==1){if(S.length>255)return 3;S.push(P[q-1]<<24>>24)}
else if(o==2){if(S.length>255)return 3;S.push(P.readInt32LE(q-4))}
else if(o<8){
if(o==3){if(!S.length)return 2;S.pop()}
else if(o==4){if(!S.length)return 2;if(S.length>255)return 3;S.push(S.at(-1))}
else if(o==5){if(S.length<2)return 2;S.push(S.pop(),S.pop())}
else if(o==6){if(S.length<2)return 2;if(S.length>255)return 3;S.push(S.at(-2))}
else{if(S.length<3)return 2;let x=S.pop(),y=S.pop(),z=S.pop();S.push(y,x,z)}
}
else if(o<35){
if(o==23||o==27){if(!S.length)return 2;S.push(o==23?-S.pop()|0:~S.pop())}
else{
if(S.length<2)return 2;
const b=S.pop(),a=S.pop();
if(o>18&&o<23&&!b)return 4;
S.push(o==16?(a+b)|0:o==17?(a-b)|0:o==18?Math.imul(a,b):o==19?(a/b)|0:o==20?b==-1?0:a%b|0:o==21?Math.floor((a>>>0)/(b>>>0))|0:o==22?(a>>>0)%(b>>>0)|0:o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<(b&31):o==29?a>>(b&31):o==30?a>>>(b&31)|0:o==32?a==b?1:0:o==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0);
}
}
else if(o<53){
const t=o<51?P.readInt16LE(q-2):0;
if(o==48)p=q+t;
else if(o==51){if(C.length==64)return 7;C.push(q);p=P[q-2]|P[q-1]<<8}
else if(o==52){if(!C.length)return 8;p=C.pop()}
else{if(!S.length)return 2;if((o==49)==!S.pop())p=q+t}
}
else if(o==64){if(!S.length)return 2;const a=S.at(-1);if(a<0||a>255)return 6;S[S.length-1]=M[a]}
else if(o==65){if(S.length<2)return 2;const a=S.at(-1);if(a<0||a>255)return 6;M[S.pop()]=S.pop()}
else if(o==80){if(!S.length)return 2;const t=Buffer.from(''+S.at(-1));if(l+t.length>65536)return 11;S.pop();u.set(t,l);l+=t.length}
else if(o==81){if(!S.length)return 2;if(l>65535)return 11;u[l++]=S.pop()&255}
else if(o==82){if(S.length>255)return 3;S.push(g<N.length?N[g++]:-1)}
else{if(!S.length)return 2;return S.pop()&255}
}
}
