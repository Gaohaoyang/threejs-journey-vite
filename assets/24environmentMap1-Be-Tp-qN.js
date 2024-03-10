import"./modulepreload-polyfill-B5Qt9EMX.js";import{G as S,W as y,S as x,s as i,C as G,K as L,r as k,a as T,M as j,T as f,b as C,P as N,A as H,O as I,c as F,l as K,d,e as z}from"./index-Bx9CeBaI.js";const l=new S,p={envMapIntensity:3},a={width:window.innerWidth,height:window.innerHeight},g=document.querySelector("canvas.webgl");if(g===null)throw new Error("Cannot find the canvas element");const t=new y({canvas:g,antialias:!0});t.setSize(a.width,a.height);t.setPixelRatio(Math.min(window.devicePixelRatio,2));t.autoClear=!1;const e=new x,h=()=>{e.traverse(n=>{if(n.isMesh&&n.material.isMeshStandardMaterial){const M=n.material;M.envMapIntensity=p.envMapIntensity}})},E=i({title:"environment map"}),P=i({title:"gltf"}),R=i({title:"ktx2"}),A=new G(E),B=["https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/px.png","https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/nx.png","https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/py.png","https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/ny.png","https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/pz.png","https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/environmentMap/cobbleStoneStreetNight/nz.png"],m=A.load(B);e.environment=m;e.background=m;e.backgroundBlurriness=0;e.backgroundIntensity=1;const O=new L(R).setTranscoderPath(`${k}/jsm_libs_basis/`).detectSupport(t),b=new T(P);b.setKTX2Loader(O);b.load("https://cdn.jsdelivr.net/gh/Gaohaoyang/pics/models/FlightHelmet/glTF-KTX-BasisU/FlightHelmet.gltf",n=>{n.scene.scale.set(10,10,10),n.scene.position.set(0,-3,0),e.add(n.scene),h()});const v=new j(new f(1,.4,100,16),new C({roughness:.3,metalness:1,color:11184810}));v.position.set(-4,0,0);e.add(v);const s=new N(70,a.width/a.height,.1,1e3);s.position.set(1.3,3,8);const u=new H(5);u.position.set(0,-3,0);e.add(u);const r=new I(s,t.domElement);r.enableDamping=!0;const o=F(s,t.domElement),W=new z,w=()=>{d.begin(),t.clear(),r.update();const n=W.getDelta();o.animating&&o.update(n),t.render(e,s),o.render(t),d.end(),requestAnimationFrame(w)};w();K(a,s,t);l.add(r,"autoRotate");const c=l.addFolder("Environment");c.add(e,"backgroundBlurriness").min(0).max(.2).step(.001);c.add(e,"backgroundIntensity").min(0).max(5).step(.001);c.add(p,"envMapIntensity").min(0).max(10).step(.001).onChange(h);
