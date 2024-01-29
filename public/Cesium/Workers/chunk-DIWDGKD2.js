/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.113
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as b}from"./chunk-UQA7A4FU.js";import{a as u}from"./chunk-TI5V2UQQ.js";import{a as O}from"./chunk-UUWY23O5.js";import{b as w,c as h,d as x}from"./chunk-3DQAB6YL.js";import{d}from"./chunk-HXYTWA7P.js";import{a as y}from"./chunk-JJLMPDRL.js";import{a as i}from"./chunk-T4TQMW7B.js";import{a as p}from"./chunk-XQTMMRVI.js";import{a as z,b as c}from"./chunk-QHDGFGBI.js";import{e as A}from"./chunk-MVZBAA6W.js";var D=new i;function f(r){r=p(r,p.EMPTY_OBJECT);let o=r.minimum,m=r.maximum;if(c.typeOf.object("min",o),c.typeOf.object("max",m),A(r.offsetAttribute)&&r.offsetAttribute===b.TOP)throw new z("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");let a=p(r.vertexFormat,u.DEFAULT);this._minimum=i.clone(o),this._maximum=i.clone(m),this._vertexFormat=a,this._offsetAttribute=r.offsetAttribute,this._workerName="createBoxGeometry"}f.fromDimensions=function(r){r=p(r,p.EMPTY_OBJECT);let o=r.dimensions;c.typeOf.object("dimensions",o),c.typeOf.number.greaterThanOrEquals("dimensions.x",o.x,0),c.typeOf.number.greaterThanOrEquals("dimensions.y",o.y,0),c.typeOf.number.greaterThanOrEquals("dimensions.z",o.z,0);let m=i.multiplyByScalar(o,.5,new i);return new f({minimum:i.negate(m,new i),maximum:m,vertexFormat:r.vertexFormat,offsetAttribute:r.offsetAttribute})};f.fromAxisAlignedBoundingBox=function(r){return c.typeOf.object("boundingBox",r),new f({minimum:r.minimum,maximum:r.maximum})};f.packedLength=2*i.packedLength+u.packedLength+1;f.pack=function(r,o,m){return c.typeOf.object("value",r),c.defined("array",o),m=p(m,0),i.pack(r._minimum,o,m),i.pack(r._maximum,o,m+i.packedLength),u.pack(r._vertexFormat,o,m+2*i.packedLength),o[m+2*i.packedLength+u.packedLength]=p(r._offsetAttribute,-1),o};var _=new i,g=new i,k=new u,F={minimum:_,maximum:g,vertexFormat:k,offsetAttribute:void 0};f.unpack=function(r,o,m){c.defined("array",r),o=p(o,0);let a=i.unpack(r,o,_),s=i.unpack(r,o+i.packedLength,g),n=u.unpack(r,o+2*i.packedLength,k),e=r[o+2*i.packedLength+u.packedLength];return A(m)?(m._minimum=i.clone(a,m._minimum),m._maximum=i.clone(s,m._maximum),m._vertexFormat=u.clone(n,m._vertexFormat),m._offsetAttribute=e===-1?void 0:e,m):(F.offsetAttribute=e===-1?void 0:e,new f(F))};f.createGeometry=function(r){let o=r._minimum,m=r._maximum,a=r._vertexFormat;if(i.equals(o,m))return;let s=new O,n,e;if(a.position&&(a.st||a.normal||a.tangent||a.bitangent)){if(a.position&&(e=new Float64Array(6*4*3),e[0]=o.x,e[1]=o.y,e[2]=m.z,e[3]=m.x,e[4]=o.y,e[5]=m.z,e[6]=m.x,e[7]=m.y,e[8]=m.z,e[9]=o.x,e[10]=m.y,e[11]=m.z,e[12]=o.x,e[13]=o.y,e[14]=o.z,e[15]=m.x,e[16]=o.y,e[17]=o.z,e[18]=m.x,e[19]=m.y,e[20]=o.z,e[21]=o.x,e[22]=m.y,e[23]=o.z,e[24]=m.x,e[25]=o.y,e[26]=o.z,e[27]=m.x,e[28]=m.y,e[29]=o.z,e[30]=m.x,e[31]=m.y,e[32]=m.z,e[33]=m.x,e[34]=o.y,e[35]=m.z,e[36]=o.x,e[37]=o.y,e[38]=o.z,e[39]=o.x,e[40]=m.y,e[41]=o.z,e[42]=o.x,e[43]=m.y,e[44]=m.z,e[45]=o.x,e[46]=o.y,e[47]=m.z,e[48]=o.x,e[49]=m.y,e[50]=o.z,e[51]=m.x,e[52]=m.y,e[53]=o.z,e[54]=m.x,e[55]=m.y,e[56]=m.z,e[57]=o.x,e[58]=m.y,e[59]=m.z,e[60]=o.x,e[61]=o.y,e[62]=o.z,e[63]=m.x,e[64]=o.y,e[65]=o.z,e[66]=m.x,e[67]=o.y,e[68]=m.z,e[69]=o.x,e[70]=o.y,e[71]=m.z,s.position=new x({componentDatatype:y.DOUBLE,componentsPerAttribute:3,values:e})),a.normal){let t=new Float32Array(72);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=1,t[9]=0,t[10]=0,t[11]=1,t[12]=0,t[13]=0,t[14]=-1,t[15]=0,t[16]=0,t[17]=-1,t[18]=0,t[19]=0,t[20]=-1,t[21]=0,t[22]=0,t[23]=-1,t[24]=1,t[25]=0,t[26]=0,t[27]=1,t[28]=0,t[29]=0,t[30]=1,t[31]=0,t[32]=0,t[33]=1,t[34]=0,t[35]=0,t[36]=-1,t[37]=0,t[38]=0,t[39]=-1,t[40]=0,t[41]=0,t[42]=-1,t[43]=0,t[44]=0,t[45]=-1,t[46]=0,t[47]=0,t[48]=0,t[49]=1,t[50]=0,t[51]=0,t[52]=1,t[53]=0,t[54]=0,t[55]=1,t[56]=0,t[57]=0,t[58]=1,t[59]=0,t[60]=0,t[61]=-1,t[62]=0,t[63]=0,t[64]=-1,t[65]=0,t[66]=0,t[67]=-1,t[68]=0,t[69]=0,t[70]=-1,t[71]=0,s.normal=new x({componentDatatype:y.FLOAT,componentsPerAttribute:3,values:t})}if(a.st){let t=new Float32Array(48);t[0]=0,t[1]=0,t[2]=1,t[3]=0,t[4]=1,t[5]=1,t[6]=0,t[7]=1,t[8]=1,t[9]=0,t[10]=0,t[11]=0,t[12]=0,t[13]=1,t[14]=1,t[15]=1,t[16]=0,t[17]=0,t[18]=1,t[19]=0,t[20]=1,t[21]=1,t[22]=0,t[23]=1,t[24]=1,t[25]=0,t[26]=0,t[27]=0,t[28]=0,t[29]=1,t[30]=1,t[31]=1,t[32]=1,t[33]=0,t[34]=0,t[35]=0,t[36]=0,t[37]=1,t[38]=1,t[39]=1,t[40]=0,t[41]=0,t[42]=1,t[43]=0,t[44]=1,t[45]=1,t[46]=0,t[47]=1,s.st=new x({componentDatatype:y.FLOAT,componentsPerAttribute:2,values:t})}if(a.tangent){let t=new Float32Array(72);t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=1,t[7]=0,t[8]=0,t[9]=1,t[10]=0,t[11]=0,t[12]=-1,t[13]=0,t[14]=0,t[15]=-1,t[16]=0,t[17]=0,t[18]=-1,t[19]=0,t[20]=0,t[21]=-1,t[22]=0,t[23]=0,t[24]=0,t[25]=1,t[26]=0,t[27]=0,t[28]=1,t[29]=0,t[30]=0,t[31]=1,t[32]=0,t[33]=0,t[34]=1,t[35]=0,t[36]=0,t[37]=-1,t[38]=0,t[39]=0,t[40]=-1,t[41]=0,t[42]=0,t[43]=-1,t[44]=0,t[45]=0,t[46]=-1,t[47]=0,t[48]=-1,t[49]=0,t[50]=0,t[51]=-1,t[52]=0,t[53]=0,t[54]=-1,t[55]=0,t[56]=0,t[57]=-1,t[58]=0,t[59]=0,t[60]=1,t[61]=0,t[62]=0,t[63]=1,t[64]=0,t[65]=0,t[66]=1,t[67]=0,t[68]=0,t[69]=1,t[70]=0,t[71]=0,s.tangent=new x({componentDatatype:y.FLOAT,componentsPerAttribute:3,values:t})}if(a.bitangent){let t=new Float32Array(72);t[0]=0,t[1]=1,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=1,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=1,t[14]=0,t[15]=0,t[16]=1,t[17]=0,t[18]=0,t[19]=1,t[20]=0,t[21]=0,t[22]=1,t[23]=0,t[24]=0,t[25]=0,t[26]=1,t[27]=0,t[28]=0,t[29]=1,t[30]=0,t[31]=0,t[32]=1,t[33]=0,t[34]=0,t[35]=1,t[36]=0,t[37]=0,t[38]=1,t[39]=0,t[40]=0,t[41]=1,t[42]=0,t[43]=0,t[44]=1,t[45]=0,t[46]=0,t[47]=1,t[48]=0,t[49]=0,t[50]=1,t[51]=0,t[52]=0,t[53]=1,t[54]=0,t[55]=0,t[56]=1,t[57]=0,t[58]=0,t[59]=1,t[60]=0,t[61]=0,t[62]=1,t[63]=0,t[64]=0,t[65]=1,t[66]=0,t[67]=0,t[68]=1,t[69]=0,t[70]=0,t[71]=1,s.bitangent=new x({componentDatatype:y.FLOAT,componentsPerAttribute:3,values:t})}n=new Uint16Array(6*2*3),n[0]=0,n[1]=1,n[2]=2,n[3]=0,n[4]=2,n[5]=3,n[6]=6,n[7]=5,n[8]=4,n[9]=7,n[10]=6,n[11]=4,n[12]=8,n[13]=9,n[14]=10,n[15]=8,n[16]=10,n[17]=11,n[18]=14,n[19]=13,n[20]=12,n[21]=15,n[22]=14,n[23]=12,n[24]=18,n[25]=17,n[26]=16,n[27]=19,n[28]=18,n[29]=16,n[30]=20,n[31]=21,n[32]=22,n[33]=20,n[34]=22,n[35]=23}else e=new Float64Array(8*3),e[0]=o.x,e[1]=o.y,e[2]=o.z,e[3]=m.x,e[4]=o.y,e[5]=o.z,e[6]=m.x,e[7]=m.y,e[8]=o.z,e[9]=o.x,e[10]=m.y,e[11]=o.z,e[12]=o.x,e[13]=o.y,e[14]=m.z,e[15]=m.x,e[16]=o.y,e[17]=m.z,e[18]=m.x,e[19]=m.y,e[20]=m.z,e[21]=o.x,e[22]=m.y,e[23]=m.z,s.position=new x({componentDatatype:y.DOUBLE,componentsPerAttribute:3,values:e}),n=new Uint16Array(6*2*3),n[0]=4,n[1]=5,n[2]=6,n[3]=4,n[4]=6,n[5]=7,n[6]=1,n[7]=0,n[8]=3,n[9]=1,n[10]=3,n[11]=2,n[12]=1,n[13]=6,n[14]=5,n[15]=1,n[16]=2,n[17]=6,n[18]=2,n[19]=3,n[20]=7,n[21]=2,n[22]=7,n[23]=6,n[24]=3,n[25]=0,n[26]=4,n[27]=3,n[28]=4,n[29]=7,n[30]=0,n[31]=1,n[32]=5,n[33]=0,n[34]=5,n[35]=4;let v=i.subtract(m,o,D),L=i.magnitude(v)*.5;if(A(r._offsetAttribute)){let t=e.length,T=r._offsetAttribute===b.NONE?0:1,E=new Uint8Array(t/3).fill(T);s.applyOffset=new x({componentDatatype:y.UNSIGNED_BYTE,componentsPerAttribute:1,values:E})}return new h({attributes:s,indices:n,primitiveType:w.TRIANGLES,boundingSphere:new d(i.ZERO,L),offsetAttribute:r._offsetAttribute})};var l;f.getUnitBox=function(){return A(l)||(l=f.createGeometry(f.fromDimensions({dimensions:new i(1,1,1),vertexFormat:u.POSITION_ONLY}))),l};var R=f;export{R as a};
