var On=Object.defineProperty;var Vn=(s,e,t)=>e in s?On(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var F=(s,e,t)=>(Vn(s,typeof e!="symbol"?e+"":e,t),t);import{f as Ws,s as Ke,n as me,h as Ut,i as zl,r as lt,c as ke,o as ot,b as St,j as Hn,k as Ci,l as zn}from"../chunks/scheduler.05185c5f.js";import{S as Xe,i as Qe,g as _,s as k,e as De,h as b,j as C,f as m,c as I,y as Y,k as f,l as ae,a as P,x as c,z as B,A as yt,m as ee,n as te,B as R,o as _e,H as Fl,C as Gl,d as q,t as ie,r as Ne,u as xe,v as Re,w as Ue,p as Fe,b as Ge,D as Ys,E as Yo,F as ii,G as Vs,I as Hs,J as jl,K as Bl}from"../chunks/index.2e86b85f.js";import{V as gi,E as Fn,O as fs,G as We,a as ne,A as hs,I as Le,M as st,L as Ko,T as Je,b as Gt,S as Al,D as Gn,c as $i,d as Di,e as jn,l as jt,f as At,g as Es,h as Oi,C as As,i as Js,n as Xo,j as ql,N as Bn,k as qn,m as Wn,o as Wl,p as _i,q as Kt,r as Qo,B as Yl,F as es,s as Yn,t as Zo,P as Kn,R as kr,u as Xn,v as Qn,W as Zn,w as Jn,x as ti,y as Kl,z as Jo,H as $o,J as en,K as $n,Q as Tl,U as Xl,X as tn,Y as sn,Z as ln,_ as rn,$ as an,a0 as Ql,a1 as Pl,a2 as Li,a3 as Ks,a4 as _s,a5 as ed,a6 as td,a7 as id,a8 as sd,a9 as ld,aa as rd,ab as on,ac as nn,ad as dn,ae as ad,af as od,ag as nd,ah as Ir,ai as dd}from"../chunks/conifers.26f84295.js";import{C as Ae,P as xi,u as Mr,F as tt,I as cd,N as hd,R as cn,a as hn,T as Er,H as fd,O as ud,D as vd,b as Ar,c as Ai,S as zs,d as Xi,e as Mi,f as md}from"../chunks/SettingsManager.a31845d6.js";import{V as H,a as ys,C as hi,G as pe,L as fi,c as fn,E as Tr,M as Ee,I as un,b as Ye,R as Fs,S as Nl,i as Zl,d as Jl,e as Dl,s as xl,f as Rl,P as qe,W as Ve,g as vn,h as mn,j as gn,u as Ss,k as us,p as gd,v as pd,l as _d,m as $s,H as bd,A as wd,n as yd,o as Sd,D as Dd,q as bs,r as mi,U as Pr,t as Ei,w as Ts,x as Ld,y as Cd,z as $l,B as Ri,F as Jt,J as Nr,K as si,N as Xs,O as pn,Q as kd,T as Id,X as Qs,Y as _n,Z as Ul,_ as bn,$ as xr,a0 as Rr,a1 as et,a2 as Bs,a3 as Ll,a4 as Md,a5 as Ds,a6 as Ed,a7 as Ad,a8 as Ol,a9 as Vl,aa as Td,ab as ei,ac as Pd,ad as wt,ae as Ni,af as Nd,ag as Ur,ah as Qi,ai as xd,aj as Rd,ak as Ud,al as Od,am as wn,an as Or}from"../chunks/DevMidlineGenerator.7013ef99.js";import{Q as yn,a as ts}from"../chunks/DriftmasMidlineGenerator.13fc1bad.js";import"../chunks/IsStaticRoute.ed7acde0.js";import{w as Vd}from"../chunks/index.205d685d.js";import{e as Oe}from"../chunks/each.e59479a4.js";const Vr=["Chase","ChaseFar","FirstPerson","Bonnet","Bumper"],Hr={pitch:{near:.25,far:.15},yOffset:{near:1,far:2},posOffset:new gi(0,0,0),range:{min:2,near:7,far:10,max:50},hasCollisions:!1,farSpeed:45,smoothFactor:1.25,nearPlane:.35,yawLimit:0,minPitch:0,maxPitch:1.57,invertDrag:!1,firstPerson:!1},Hd=new gi(-4,3,0),zd=68;let Ti=.95,Zi=1-Ti,ws=Zi/4,Cl=1-ws;const zr=()=>{};class Fd{constructor(e){F(this,"container");F(this,"cameraWrapper");F(this,"seatPosition",0);F(this,"seatHeight",0);F(this,"orientation",new Fn(0,0,0,"YXZ"));F(this,"vCenter",new gi);F(this,"camFwd",new gi);F(this,"uLerpA",0);F(this,"uLerpB",0);F(this,"uDist",0);F(this,"uSmoothA",0);F(this,"uSmoothB",0);F(this,"uH",0);F(this,"w",1);F(this,"h",1);F(this,"driverSide",1);F(this,"mode",Hr);F(this,"minGroundPitch",0);F(this,"groundPitchUpdateTimer",0);F(this,"vehicleYaw",0);F(this,"vehiclePitch",0);F(this,"vehicleTargets",{x:0,y:0,z:0});F(this,"userYaw",0);F(this,"userYawTarget",0);F(this,"userPitch",0);F(this,"userPitchTarget",0);F(this,"userSmooth",.8);F(this,"userSmoothA",1-this.userSmooth);F(this,"userZoom",0);F(this,"userZoomTarget",0);F(this,"groundPitch",0);F(this,"dragSense",2.5);F(this,"tppDragSense",2);F(this,"fppDragSense",.8);F(this,"yawSense",3);F(this,"pitchSense",2);F(this,"isCinecam",!1);F(this,"cinecam",{targetPos:new gi,targetRot:new gi,uiWasHidden:!1,baseSpeed:120,boostFactor:2,speed:20,verticalSpeed:20,smoothMode:!1,sense:.001,zoomSense:4,targetZoom:1,curZoom:1,maxZoom:Math.sqrt(8),minZoom:Math.sqrt(.75)});F(this,"profileGeneration",0);F(this,"tHeading");F(this,"tDif");F(this,"smoothSpeed",0);F(this,"isRotated",!1);F(this,"fovTarget",0);F(this,"fovLerped",0);F(this,"lockChangeAlertBound",this.lockChangeAlert.bind(this));F(this,"onMouseMoveBound",this.onMouseMove.bind(this));F(this,"onDriverSideBound",this.onDriverSide.bind(this));F(this,"onNextCameraModeBound",this.onNextCameraMode.bind(this));this.cameraWrapper=new fs,this.camera=Ae,this.cameraWrapper.add(this.camera),this.camera.zoom=1,this.camera.updateProjectionMatrix(),this.camera.rotation.y=Math.PI,this.container=new fs,this.container.add(this.cameraWrapper),this.container.rotation.order="ZYX",Ae.rotation.order="ZYX",e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock,document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||zr,this.cinecam.canvas=e,H.addListener(ys.Reset,this.reset.bind(this)),H.addListener(ys.Ready,this.refreshSettings.bind(this)),H.addListener(ys.ModelChanged,this.onVehicleChanged.bind(this)),We.addListener("verticalFov",this.setFov.bind(this)),We.addListener("fovEffectStrength",this.setFovEffectStrength.bind(this)),ne.addListener("cameraMode",this.onCameraModeChanged.bind(this)),ne.addListener("hideUI",()=>this.onToggleUI()),ne.addListener("touchscreen",()=>this.setSize(this.w,this.h)),ne.addListener("seatPosition",this.onSeatPosChanged.bind(this)),ne.addListener("seatHeight",this.onSeatPosChanged.bind(this)),ne.addListener("driverSide",this.onDriverSideBound),xi.addListener(this.refreshSettings.bind(this)),hi.set("isCinecam",!1),pe.addListener("CameraMode",this.onNextCameraModeBound),pe.addListener("ToggleCinecam",this.onCinecamChanged.bind(this)),fi.addListener(t=>{t==1&&this.refreshSettings(!0)}),fn.subscribe(t=>{t>0&&this.onNextCameraMode()})}init(){this.reset(),hs.hasInit?this.initAudio():hs.addInitListener(this.initAudio.bind(this))}initAudio(){this.camera.add(hs.listener)}refreshSettings(e=!1){!e&&this.profileGeneration==xi.value||(this.profileGeneration=xi.value,this.setFov(We.verticalFov),this.setFovEffectStrength(We.verticalFov),this.onCameraModeChanged(ne.cameraMode),this.onToggleUI(ne.hideUI),this.setSize(this.w,this.h),this.onSeatPosChanged(),this.onDriverSide(ne.driverSide),this.isCinecam&&this.onCinecamChanged())}reset(){let e=0;isNaN(this.vehicleYaw+this.vehicleTargets.y)||(e=this.vehicleTargets.y-this.vehicleYaw),e%=Math.TAU,this.smoothSpeed=H.speed,this.uLerpA=this.smoothLerp(H.speed/this.mode.farSpeed),this.uLerpB=1-this.uLerpA,this.vehicleTargets.x=this.mode.pitch.near*this.uLerpA+this.mode.pitch.far*this.uLerpB-H.pitch,this.vehiclePitch=this.vehicleTargets.x,this.vehicleTargets.y=H.heading+Math.HALFPI,this.vehicleYaw=this.vehicleTargets.y,this.vehicleTargets.y-=e,this.vehicleTargets.z=0,this.mode.rollFactor&&(this.vehicleTargets.z=H.roll*this.mode.rollFactor),this.orientation.x=this.vehiclePitch,this.orientation.y=this.vehicleYaw,this.orientation.z=this.vehicleTargets.z,this.updateVehicleVisibility(),this.updateFov(!0),this.updateNear(),fi.value>=1&&this.update(.1),this.orientation.x-=this.groundPitch,this.groundPitch=0,this.camera.updateProjectionMatrix()}updateVehicleVisibility(){H.container.visible=!this.mode.hideVehicle||hi.isCinecam}handleInput(e){(pe.signal.CameraLeft>0||pe.signal.CameraRight>0)&&(this.mode.isInterior?this.userYawTarget+=(pe.signal.CameraLeft-pe.signal.CameraRight)*this.yawSense*e*.5:this.userYawTarget+=(pe.signal.CameraLeft-pe.signal.CameraRight)*this.yawSense*e),(pe.signal.CameraUp>0||pe.signal.CameraDown>0)&&(this.mode.isInterior?this.userPitchTarget+=(pe.signal.CameraDown-pe.signal.CameraUp)*this.pitchSense*e*.3:this.userPitchTarget+=(pe.signal.CameraDown-pe.signal.CameraUp)*this.pitchSense*e,this.userPitchTarget=Math.min(Math.max(this.mode.minPitch+this.minGroundPitch,this.userPitchTarget),this.mode.maxPitch)),Le.drag.x!=0&&(this.userYawTarget!==0||Math.abs(Le.drag.x)>.003)&&(this.mode.static||(document.body.style.cursor="grabbing"),this.mode.isInterior?this.userYawTarget+=Le.drag.x*this.yawSense*this.dragSense:this.userYawTarget-=Le.drag.x*this.yawSense*this.dragSense),this.userYawTarget<-Math.PI?(this.userYawTarget+=Math.TAU,this.userYaw+=Math.TAU):this.userYawTarget>Math.PI&&(this.userYawTarget-=Math.TAU,this.userYaw-=Math.TAU),Le.drag.y!=0&&(this.userPitchTarget!==0||Math.abs(Le.drag.y)>.005)&&(this.mode.static||(document.body.style.cursor="grabbing"),this.mode.isInterior?this.userPitchTarget-=Le.drag.y*this.pitchSense*this.dragSense:this.userPitchTarget+=Le.drag.y*this.pitchSense*this.dragSense,this.userPitchTarget=Math.min(Math.max(this.mode.minPitch+this.minGroundPitch,this.userPitchTarget),this.mode.maxPitch)),Le.mouseEnabled&&Le.scroll!==0&&Le.scrollLock=="cam"&&(this.userZoomTarget+=Le.scrollDelta*Math.max(.1,Math.sqrt((this.userZoomTarget-this.mode.range.min)/(this.mode.range.max-this.mode.range.min))*3),this.userZoomTarget=Math.min(Math.max(this.mode.range.min,this.userZoomTarget),this.mode.range.max)),this.mode.yawLimit>=0&&(this.userYawTarget=Math.min(Math.max(-this.mode.yawLimit,this.userYawTarget),this.mode.yawLimit)),this.userYaw=this.userYaw*this.userSmooth+this.userYawTarget*this.userSmoothA,this.userPitch=this.userPitch*this.userSmooth+this.userPitchTarget*this.userSmoothA,this.userZoom=this.userZoom*this.userSmooth+this.userZoomTarget*this.userSmoothA}update(e){if(fi.value<1)return;if(hi.isCinecam)return this.updateCinecam(e);if(st.useMouse||this.handleInput(e),this.mode.isInterior)return this.updateFirstPerson(e);this.smoothSpeed=this.smoothSpeed*.9+H.speed*.1,this.uLerpA=this.smoothLerp(this.smoothSpeed/this.mode.farSpeed),this.uLerpB=1-this.uLerpA,this.uSmoothA=Math.min(e/(We.cameraSmoothing*this.mode.smoothFactor),1),this.uSmoothC=this.uSmoothA/2,this.uSmoothB=1-this.uSmoothA,this.uSmoothD=1-this.uSmoothC,this.vCenter.set(this.mode.posOffset.x,this.mode.posOffset.y,this.mode.posOffset.z*this.driverSide).applyQuaternion(H.quaternion).add(H.position),this.vCenter.y+=this.mode.yOffset.near*this.uLerpA+this.mode.yOffset.far*this.uLerpB,this.cameraWrapper.position.copy(this.vCenter),this.tHeading=H.heading+Math.HALFPI,this.tHeading>Math.PI&&(this.tHeading-=Math.TAU),this.mHeading=Math.atan2(H.motionDir.z,-H.motionDir.x)-Math.HALFPI,this.mHeading<-Math.PI&&(this.mHeading+=Math.TAU);let t=this.mHeading-this.tHeading;if(t<-Math.PI?t+=Math.TAU:t>Math.PI&&(t-=Math.TAU),H.speed<2){if(H.speed>1){let i=(H.speed-1)*We.motionDirBlend;this.tHeading=this.mHeading*i+(1-i)*this.tHeading,this.tHeading-=t*We.steerDirBlend*(H.speed-1)}}else this.tHeading-=t*We.steerDirBlend,this.tHeading=this.tHeading*(1-We.motionDirBlend)+We.motionDirBlend*this.mHeading;if(this.tDif=this.tHeading-this.vehicleTargets.y,this.tDif<-Math.PI?(this.vehicleTargets.y-=Math.TAU,this.vehicleYaw-=Math.TAU):this.tDif>Math.PI&&(this.vehicleTargets.y+=Math.TAU,this.vehicleYaw+=Math.TAU),this.vehicleTargets.y=this.tHeading,this.vehicleYaw=this.vehicleTargets.y*this.uSmoothA+this.vehicleYaw*this.uSmoothB,this.vehicleTargets.x=this.mode.pitch.near*this.uLerpA+this.mode.pitch.far*this.uLerpB-H.pitch,this.vehiclePitch=this.vehicleTargets.x*this.uSmoothC+this.vehiclePitch*this.uSmoothD,this.vehicleTargets.z=H.roll*this.mode.rollFactor,this.orientation.z=this.vehicleTargets.z*this.uSmoothA+this.orientation.z*this.uSmoothB,this.orientation.x=this.vehiclePitch+this.userPitch,this.orientation.y=this.vehicleYaw+this.userYaw,this.uDist=this.mode.range.near*this.uLerpA+this.mode.range.far*this.uLerpB+this.userZoom,this.mode.hasCollisions){let l=Tr.getXZ(Ae.worldPos.x,Ae.worldPos.z,Ee.vehicleNode)-this.vCenter.y+1+this.uDist/10;this.minGroundPitch=Math.atan(l/this.uDist),this.groundContact=!1,this.orientation.x<this.minGroundPitch?(this.groundContact=!0,this.groundPitch=this.groundPitch*.9+.1*(this.minGroundPitch-this.orientation.x)):this.groundPitch*=.9,this.orientation.x+=this.groundPitch}this.updateWrapperState(),this.cameraWrapper.position.add(this.camFwd.multiplyScalar(-this.uDist)),this.cameraWrapper.getWorldDirection(this.camFwd),!this.isCinecam&&We.fovEffectStrength>0&&this.updateFov(),this.updateCamState()}updateCinecam(e){this.cinecam.dx=Math.cos(-Ae.rotation.y-Math.PI/2),this.cinecam.dz=Math.sin(-Ae.rotation.y-Math.PI/2),this.cinecam.useVehicleHeading&&(this.cinecam.dx=Math.cos(-H.rotation.y),this.cinecam.dz=Math.sin(-H.rotation.y));let t=Tr.getXZ(Ae.worldPos.x,Ae.worldPos.z),l=(Ae.worldPos.y-t)/100;l<.01&&(l=.01),l>1&&(l=1),Le.key.Digit1?(this.cinecam.baseSpeed/=2,Le.key.Digit1=!1,this.cinecam.useVehicleSpeed=!1):Le.key.Digit3?(this.cinecam.baseSpeed*=2,Le.key.Digit3=!1,this.cinecam.useVehicleSpeed=!1):Le.key.CapsLock?(Le.key.CapsLock=!1,this.cinecam.useVehicleSpeed=!this.cinecam.useVehicleSpeed):Le.key.Tab&&(Le.key.Tab=!1,this.cinecam.smoothMode=!this.cinecam.smoothMode,this.cinecam.smoothMode?Ti=.95:Ti=.8,Zi=1-Ti,ws=Zi/2,Cl=1-ws),this.cinecam.useVehicleSpeed?(this.cinecam.baseSpeed=H.speed,this.cinecam.speed=this.cinecam.baseSpeed):this.cinecam.speed=Math.max(.1,l)*this.cinecam.baseSpeed,this.cinecam.smoothMode?this.cinecam.verticalSpeed=this.cinecam.speed/2:this.cinecam.verticalSpeed=this.cinecam.speed,pe.signal.Boost&&(this.cinecam.speed*=this.cinecam.boostFactor);let a=0,r=0;pe.signal.Forward&&(a=this.cinecam.dx,r=this.cinecam.dz),pe.signal.Backward&&(a-=this.cinecam.dx,r-=this.cinecam.dz),pe.signal.Left&&(this.cinecam.useVehicleHeading?(a+=this.cinecam.dz*.4,r-=this.cinecam.dx*.4):(a+=this.cinecam.dz,r-=this.cinecam.dx)),pe.signal.Right&&(this.cinecam.useVehicleHeading?(a-=this.cinecam.dz*.4,r+=this.cinecam.dx*.4):(a-=this.cinecam.dz,r+=this.cinecam.dx));let o=Math.sqrt(a*a+r*r);o>0&&(a=a/o,r=r/o,this.cinecam.targetPos.x+=a*e*this.cinecam.speed,this.cinecam.targetPos.z+=r*e*this.cinecam.speed),pe.signal.CinecamUp&&(this.cinecam.targetPos.y+=e*this.cinecam.verticalSpeed),pe.signal.CinecamDown&&(this.cinecam.targetPos.y-=e*this.cinecam.verticalSpeed),Ae.rotation.x=Ae.rotation.x*Ti+this.cinecam.targetRot.x*Zi,Ae.rotation.y=Ae.rotation.y*Ti+this.cinecam.targetRot.y*Zi,pe.signal.CameraZoom!=0&&(this.cinecam.targetZoom-=this.cinecam.zoomSense*e*pe.signal.CinecamZoom,this.cinecam.targetZoom=Math.max(Math.min(this.cinecam.maxZoom,this.cinecam.targetZoom),this.cinecam.minZoom)),this.cinecam.curZoom=this.cinecam.curZoom*.95+this.cinecam.targetZoom*.05,this.cinecam.curZoom!=Ae.zoom&&(Ae.zoom=this.cinecam.curZoom*this.cinecam.curZoom,Ae.near=.1+(Ae.zoom-.75),Ae.updateProjectionMatrix()),Ae.position.x=Ae.position.x*Ti+this.cinecam.targetPos.x*Zi,this.cinecam.useVehicleHeading?Ae.position.y=Ae.position.y*Cl+(H.position.y+this.cinecam.targetPos.y)*ws:Ae.position.y=Ae.position.y*Cl+this.cinecam.targetPos.y*ws,Ae.position.z=Ae.position.z*Ti+this.cinecam.targetPos.z*Zi,this.updateWrapperState(),this.updateCamState()}updateFirstPerson(e){this.vCenter.set(this.mode.posOffset.x+this.seatPosition,this.mode.posOffset.y+this.seatHeight,this.mode.posOffset.z*this.driverSide-H.roll*this.mode.rollFactor*.5).applyQuaternion(H.quaternion).add(H.position),this.cameraWrapper.position.copy(this.vCenter),this.tHeading=H.heading+Math.HALFPI,this.tDif=this.tHeading-this.vehicleTargets.y,this.tDif<-Math.PI?(this.vehicleTargets.y-=Math.TAU,this.vehicleYaw-=Math.TAU):this.tDif>Math.PI&&(this.vehicleTargets.y+=Math.TAU,this.vehicleYaw+=Math.TAU),this.vehicleTargets.y=this.tHeading,this.vehicleTargets.x=-H.pitch+this.mode.pitch.near,this.vehicleYaw=this.vehicleTargets.y*.2+this.vehicleYaw*.8,this.vehiclePitch=this.vehicleTargets.x*.1+this.vehiclePitch*.9,this.orientation.x=this.vehiclePitch+this.userPitch,this.orientation.y=this.vehicleYaw+this.userYaw,this.orientation.z=this.orientation.z*.9+H.roll*this.mode.rollFactor*.1,this.updateWrapperState(),this.updateCamState()}updateWrapperState(){this.cameraWrapper.setRotationFromEuler(this.orientation),this.cameraWrapper.getWorldDirection(this.camFwd)}updateCamState(){Ae.fwd.copy(this.camFwd).normalize().negate(),Ae.speed=H.speed,Ae.updateMatrixWorld(),Ae.worldPos.setFromMatrixPosition(Ae.matrixWorld)}setSize(e,t){this.w=e,this.h=t,e<t&&ne.touchscreen?(this.camera.rotation.z=-Math.PI/2,this.isRotated=!0):(this.isRotated=!1,this.camera.rotation.z=0),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}setFovEffectStrength(e){e==0&&this.setFov(We.verticalFov)}updateFov(e=!1){We.fovEffectStrength==0||un?this.fovLerped=0:(this.fovTarget=(1-this.smoothLerp(H.speedLerp))*H.tuning.topSpeed*this.mode.fovFactor,e?this.fovLerped=this.fovTarget:this.fovLerped=this.fovLerped*.95+this.fovTarget*.05),this.setFov(We.verticalFov+this.fovLerped*We.fovEffectStrength)}setFov(e){this.camera.aspect<1?(e*=Math.D2R,e=2*Math.atan(Math.tan(e/2)/this.camera.aspect),e*=Math.R2D,Mr(e,this.camera.far,1/this.camera.aspect)):Mr(e,this.camera.far,this.camera.aspect),this.camera.fov=e,this.updateNear(),this.camera.updateProjectionMatrix()}updateNear(){this.mode.isInterior?this.camera.near=this.mode.nearPlane+(100-this.camera.fov)/1e3:this.camera.near=this.mode.nearPlane+(100-this.camera.fov)/200}onToggleUI(){this.isCinecam&&!ne.hideUI&&document.exitPointerLock(),ne.hideUI&&this.isCinecam&&this.cinecam.canvas.requestPointerLock()}onCinecamChanged(){this.isCinecam=!this.isCinecam,hi.set("isCinecam",this.isCinecam),Ae.isCinecam=this.isCinecam,this.isCinecam?(this.hadMouseControl=st.useMouse,st.set("useMouse",!1)):this.hadMouseControl&&st.set("useMouse",!0),this.isCinecam?(this.setFov(zd),this.cameraWrapper.remove(Ae),this.container.add(Ae),this.cinecam.uiWasHidden=ne.hideUI,ne.set("hideUI",!0),this.cinecam.curZoom=1,this.cinecam.targetZoom=1,this.cinecam.targetPos.copy(Hd).applyQuaternion(H.quaternion).add(H.position),this.cinecam.targetRot.x=-.25,this.cinecam.targetRot.y=H.heading-1.57,this.cinecam.useVehicleSpeed=!1,this.cinecam.useVehicleHeading=!1,Ae.position.copy(this.cinecam.targetPos),Ae.rotation.x=this.cinecam.targetRot.x,Ae.rotation.y=this.cinecam.targetRot.y,this.cinecam.canvas.onclick=e=>{e.target.id=="ui-fixed"&&this.cinecam.canvas.requestPointerLock()},document.addEventListener("pointerlockchange",this.lockChangeAlertBound,!1)):(this.setFov(We.verticalFov),this.cinecam.uiWasHidden||ne.set("hideUI",!1),document.exitPointerLock(),this.cinecam.canvas.onclick=zr,document.removeEventListener("pointerlockchange",this.lockChangeAlertBound),document.removeEventListener("mousemove",this.onMouseMoveBound),this.container.remove(Ae),this.cameraWrapper.add(Ae),this.camera.zoom=1,this.camera.updateProjectionMatrix(),Ae.position.set(0,0,0),Ae.rotation.set(0,Math.PI,0),this.reset()),this.updateVehicleVisibility()}lockChangeAlert(){document.pointerLockElement===this.cinecam.canvas||document.mozPointerLockElement===this.cinecam.canvas?document.addEventListener("mousemove",this.onMouseMoveBound,!1):document.removeEventListener("mousemove",this.onMouseMoveBound,!1)}onMouseMove(e){this.cinecam.targetRot.y-=e.movementX*this.cinecam.sense/this.cinecam.curZoom,this.cinecam.targetRot.x-=e.movementY*this.cinecam.sense*Ae.aspect/this.cinecam.curZoom}onCameraModeChanged(){let e=H.cameras[Vr[ne.cameraMode]];e?this.mode={...e}:this.mode={...Hr},this.mode.posOffset=new gi().fromArray(this.mode.posOffset),this.mode.isInterior?(hi.set("isInterior",!0),this.dragSense=this.fppDragSense):(hi.set("isInterior",!1),this.dragSense=this.tppDragSense),this.mode.firstPerson&&(this.dragSense=this.fppDragSense),this.mode.invertDrag&&(this.dragSense*=-1),this.mode.range.max?Le.lockScroll("cam"):Le.unlockScroll("cam"),this.updateFov(),this.updateNear(),this.camera.updateProjectionMatrix(),this.reset()}onVehicleChanged(){this.onCameraModeChanged()}onSeatPosChanged(){this.seatHeight=(ne.seatHeight-.5)*.1,this.seatPosition=(ne.seatPosition-.5)*.2}onDriverSide(){this.driverSide=ne.driverSide*2-1}onNextCameraMode(){if(!hi.isCinecam){if(this.userPitchTarget!==0||this.userYawTarget!==0||this.userZoomTarget!==0){this.userPitchTarget=0,this.userYawTarget=0,this.userZoomTarget=0;return}ne.set("cameraMode",(ne.cameraMode+1)%Vr.length)}}smoothLerp(e){return e=Math.min(1,e),-1*(3-e*2)*e*e+1}}const Te={None:0,Intro:1,Reset:2,Boost:3,UTurn:4,Onward:5};let qs=!!localStorage.getItem("skip-controls");localStorage.setItem("skip-controls",!1);const $e=new Ko(qs?Te.None:Te.Intro);function Sn(s,e=5e3){setTimeout(()=>{$e.value==s&&$e.set(Te.None)},e)}qs||fi.addListener(s=>{!qs&&s==1&&($e.set(Te.Intro),Sn(Te.Intro,7e3),qs=!0)});const Gd=20*20,jd=120*120,gt={};class Bd{constructor(){F(this,"targetVehicleNodeIndex",0);F(this,"wrongWay",!1);F(this,"isRogue",!1);F(this,"hasAutodrive",!1);F(this,"prompts",{reset:{timerStarted:!1,didPrompt:!1,startTime:null},boost:{didPrompt:!1}});F(this,"profileGeneration",0);F(this,"hasInit",!1);F(this,"sceneReady",!1);F(this,"maxPhysDT",.05);F(this,"minPhysDT",.001);F(this,"physDT",0);F(this,"canDisableAutodrive",!0);F(this,"nodeCheckFrame",0);F(this,"reversingTooFar",!1);F(this,"update",this.updatePending);Je.addSlowListener(this.updateUI.bind(this)),H.addListener(ys.Reset,this.onReset.bind(this)),H.addListener(ys.Ready,this.onVehicleReady.bind(this)),Ye.addListener("mode",H.setDriveMode.bind(H),!0),Ye.addListener("speedControl",this.updateSpeedControl.bind(this)),Ye.addListener("speedControlTarget",this.updateSpeedControl.bind(this)),Ye.addListener("speedControlMode",this.updateSpeedControl.bind(this)),Gt.addListener(this.onAutodrive.bind(this)),hi.addListener("isInterior",H.onCameraInteriorChangedBound),hi.addListener("isCinecam",H.onCameraInteriorChangedBound),ne.addListener("touchscreen",this.updateSpeedControl.bind(this)),ne.addListener("units",this.updateSpeedControl.bind(this)),ne.addListener("showWheel",H.setShowWheel.bind(H)),ne.addListener("driverSide",H.setDriverSide.bind(H)),ne.addListener("gripFactor",this.updateGripFactor.bind(this)),ne.addListener("speedFactor",this.updateSpeedFactor.bind(this)),ne.addListener("driveLane",this.updateDriveLane.bind(this)),Fs.addListener("lanes",this.updateDriveLane.bind(this))}applySettings(){this.profileGeneration!=xi.value&&(this.profileGeneration=xi.value,H.setDriveMode(Ye.mode),this.updateSpeedControl(),H.onCameraInteriorChanged(),H.setShowWheel(ne.showWheel),H.setDriverSide(ne.driverSide),console.log("Apply settings",ne.driverSide),this.updateGripFactor(ne.gripFactor),this.updateSpeedFactor(ne.speedFactor),this.updateDriveLane())}updateGripFactor(e){H.setGripFactor(e)}updateSpeedFactor(e){H.setSpeedFactor(e)}updateSpeedControl(){H.hasSpeedControl=Ye.speedControl&&!ne.touchscreen,H.hasCruiseTarget=H.hasSpeedControl&&Ye.speedControlMode==Nl.Cruise,H.hasSpeedLimit=H.hasSpeedControl&&Ye.speedControlMode==Nl.Max,H.speedControlTarget=Ye.speedControlTarget/3.6,H.speedControlTarget*=Al[ne.units],H.speedControlTarget/=5,H.speedControlTarget=Math.round(H.speedControlTarget),H.speedControlTarget*=5,H.speedControlTarget/=Al[ne.units],Ye.set("speedControlTargetMS",H.speedControlTarget)}updateDriveLane(){Fs.lanes<=1||ne.driveLane==Gn.CENTER?H.driveLaneOffset=0:H.driveLaneOffset=(ne.driveLane*2-1)*Fs.width/2,Fs.lanes>1&&H.inAutodrive&&Ee.vehicleNode&&this.reset()}onAutodrive(e){this.hasAutodrive=e,H.setAutodrive(this.hasAutodrive)}init(){this.targetVehicleNodeIndex=Ee.vehicleIndex,this.hasInit?(this.applySettings(),this.reset()):(Ye.addListener("type",H.setVehicle.bind(H)),this.sceneReady=!0,this.hasInit=!0)}onSceneLoading(){this.sceneReady=!1,this.update=this.updatePending}onSceneReady(){this.sceneReady=!0,H.setVehicle(Ye.type)}onVehicleReady(){this.applySettings()}updatePending(e,t){H.hasInit&&this.sceneReady&&(this.update=this.updateLive,this.update(e,t))}updateLive(e,t){pe.signal.Reset&&(tt.hasUsedReset||(tt.set("hasUsedReset",!0),$e.value==Te.Reset&&$e.set(Te.None)),this.reset()),pe.signal.Headlights&&H.setHeadlights(!H.headlights,!0),pe.signal.Autodrive?Le.key.ShiftLeft||Le.key.ShiftRight?ne.set("autodriveMode",(ne.autodriveMode+1)%3):(Gt.set(!this.hasAutodrive),this.canDisableAutodrive=!1):this.hasAutodrive&&(!pe.hasScreenInput&&!hi.isCinecam&&(ne.autodriveMode==$i.STEER&&(pe.signal.Left||pe.signal.Right)||ne.autodriveMode==$i.FULL&&(pe.gamepadSignal.Forward||pe.gamepadSignal.Backward||pe.signal.Forward||pe.signal.Backward||pe.signal.Left||pe.signal.Right))?this.canDisableAutodrive&&(this.hasAutodrive=!1,Gt.set(this.hasAutodrive),H.setAutodrive(this.hasAutodrive)):this.canDisableAutodrive||(this.canDisableAutodrive=!0)),pe.signal.ToggleSpeedControl&&Ye.set("speedControl",!Ye.speedControl),H.hasSpeedControl&&Le.scrollDelta!=0&&Le.scrollLock==null&&(Le.scrollDelta<0?Zl():Jl(),Le.scrollDelta=0),!tt.hasUsedReset&&!H.onRoad?this.prompts.reset.timerStarted?!this.prompts.reset.didPrompt&&Je.appTime-this.prompts.reset.startTime>3&&(this.prompts.reset.didPrompt=!0,$e.set(Te.Reset)):(this.prompts.reset.timerStarted=!0,this.prompts.reset.startTime=Je.appTime):this.prompts.reset.timerStarted&&(this.prompts.reset.timerStarted=!1,this.prompts.reset.didPrompt=!1),$e.value==Te.None?!H.inAutodrive&&!tt.hasUsedBoost&&H.pitch>.12&&H.onRoad&&H.speed>5&&!this.prompts.boost.didPrompt&&(this.prompts.boost.didPrompt=!0,$e.set(Te.Boost),Sn(Te.Boost,3e3)):$e.value==Te.Reset&&H.onRoad&&H.onRoad&&$e.set(Te.None),H.update(e,t),this.updateProgress(),this.updateVehicleState(e),this.updateUI()}updateProgress(){if(Ee.vehicleNodeDidChange=!1,Ee.vehicleNode.i<this.targetVehicleNodeIndex){this.wrongWay=!1,Ee.vehicleNode=Ee.vehicleNode.next,Ee.vehicleIndex=Ee.vehicleNode.i,Ee.vehicleNodeDidChange=!0;return}gt.d1=H.position.distanceToSquared(Ee.vehicleNode.p),gt.d2=H.position.distanceToSquared(Ee.vehicleNode.next.next.p),H.isRogue=!1,gt.d2>jd?(H.isRogue=!0,this.nodeCheckFrame--,this.nodeCheckFrame<=0&&(this.nodeCheckFrame=60,gt.closest=Dl(H.position.x,H.position.z,Ee.vehicleNode),gt.closest.n.i>Ee.vehicleNode.i&&gt.closest.n.i<Ee.vehicleNode.i+100&&(this.targetVehicleNodeIndex!==gt.closest.n.i&&Di.add("VEHICLE: Leaping ahead to node "+gt.closest.n.i),this.targetVehicleNodeIndex=gt.closest.n.i))):gt.d2<gt.d1?(this.wrongWay=!1,($e.value==Te.UTurn||$e.value==Te.Onward)&&$e.set(Te.None),Ee.vehicleNode=Ee.vehicleNode.next,Ee.vehicleIndex=Ee.vehicleNode.i,Ee.vehicleNodeDidChange=!0):gt.d1>Gd&&H.onRoad?(H.isRogue=!0,gt.closest=Dl(H.position.x,H.position.z,Ee.vehicleNode),gt.alignment=Math.abs(gt.closest.n.a+H.heading),this.wrongWay?gt.alignment<.5&&(this.wrongWay=!1,$e.value==Te.UTurn&&$e.set(Te.None)):gt.alignment>1.8&&(this.wrongWay=!0,$e.set(Te.UTurn)),!this.wrongWay&&gt.alignment<1&&H.direction<0&&H.speed>5&&(this.reversingTooFar=!0,$e.set(Te.Onward)),this.reversingTooFar&&H.direction>0&&(this.reversingTooFar=!1,$e.set(Te.None))):this.wrongWay?(gt.closest=Dl(H.position.x,H.position.z,Ee.vehicleNode),gt.alignment=Math.abs(gt.closest.n.a+H.heading),gt.alignment<1?(this.wrongWay=!1,$e.value==Te.UTurn&&$e.set(Te.None)):H.isRogue=!0):this.reversingTooFar&&(this.reversingTooFar=!1,$e.value==Te.Onward&&$e.set(Te.None))}updateVehicleState(e){H.dS=Math.sqrt((H.pPosition.x-H.position.x)**2+(H.pPosition.z-H.position.z)**2),H.speed=H.dS/e,H.speedLerp=Math.min(H.speed/H.tuning.topSpeed),H.velocity.subVectors(H.position,H.pPosition).multiplyScalar(1/e),H.accel.subVectors(H.velocity,H.pVelocity).multiplyScalar(1/e),H.motionDir.copy(H.velocity).normalize(),H.motionHeading=Math.atan2(H.motionDir.z,H.motionDir.x),H.pitch=H.rotation.z,H.roll=H.rotation.x,H.pPosition.copy(H.position),H.pVelocity.copy(H.velocity)}updateUI(){H.hasSpeedControl&&Math.abs(H.speed-H.speedControlTarget)<Math.max(.1,H.speed*.004)?xl.set(H.speedControlTarget):xl.set(H.speed),ne.odomMode==jn.TOTAL?Rl.set((qe.totalDist+qe.sr1Distance)/1e3):Rl.set((Ee.vehicleNode.i-Ee.initIndex)/100+Ve.accumulatedDistance),vn.set(H.hasBoost),!tt.hasUsedBoost&&H.hasBoost&&(tt.set("hasUsedBoost",!0),$e.value==Te.Boost&&$e.set(Te.None)),mn.set(pe.toggled.Handbrake),gn.set(pe.toggled.StickySteer),Ee.vehicleNodeDidChange&&Ss(Ee.vehicleNode.i),st.useMouse&&st.set("currentSteer",pe.gamepadSignal.Left-pe.gamepadSignal.Right)}onCrash(){}reset(){H.reset()}onReset(){this.wrongWay=!1,$e.set(Te.None),Ss(Ee.vehicleNode.i,!0),this.updateVehicleState(1)}}var Ls=function(){var s=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(h){h.preventDefault(),i(++s%e.children.length)},!1);function t(h){return e.appendChild(h.dom),h}function i(h){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===h?"block":"none";s=h}var l=(performance||Date).now(),a=l,r=0,o=t(new Ls.Panel("FPS","#0ff","#002")),n=t(new Ls.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var d=t(new Ls.Panel("MB","#f08","#201"));return i(0),{REVISION:16,dom:e,addPanel:t,showPanel:i,begin:function(){l=(performance||Date).now()},end:function(){r++;var h=(performance||Date).now();if(n.update(h-l,200),h>=a+1e3&&(o.update(r*1e3/(h-a),100),a=h,r=0,d)){var u=performance.memory;d.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return h},update:function(){l=this.end()},domElement:e,setMode:i}};Ls.Panel=function(s,e,t){var i=1/0,l=0,a=Math.round,r=a(window.devicePixelRatio||1),o=80*r,n=48*r,d=3*r,h=2*r,u=3*r,g=15*r,p=74*r,v=30*r,w=document.createElement("canvas");w.width=o,w.height=n,w.style.cssText="width:80px;height:48px";var y=w.getContext("2d");return y.font="bold "+9*r+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=t,y.fillRect(0,0,o,n),y.fillStyle=e,y.fillText(s,d,h),y.fillRect(u,g,p,v),y.fillStyle=t,y.globalAlpha=.9,y.fillRect(u,g,p,v),{dom:w,update:function(D,L){i=Math.min(i,D),l=Math.max(l,D),y.fillStyle=t,y.globalAlpha=1,y.fillRect(0,0,o,g),y.fillStyle=e,y.fillText(a(D)+" "+s+" ("+a(i)+"-"+a(l)+")",d,h),y.drawImage(w,u+r,g,p-r,v,u,g,p-r,v),y.fillRect(u+p-r,g,r,v),y.fillStyle=t,y.globalAlpha=.9,y.fillRect(u+p-r,g,r,a((1-D/L)*v))}}};const qd=Ls,Wd=`
    uniform float time;
    uniform vec3 camPos;
    uniform float shelfHeight0;
    uniform float shelfHeight1;
    uniform float skyScale0;
    uniform float skyScale1;
    uniform float altitude;

    varying vec4 wPos;
    varying vec2 vUv;
    varying vec2 vUUv;
    varying vec2 vUUUv;
    varying vec2 vUUUUv;

    varying float dist;

`,Yd=`
    wPos = modelMatrix * vec4( position, 1.0 );

    // Distance (height) from camera to virtual plane
    // Big hmm here, these values may intersect with road on rare occasions, could min them
    float h0 = shelfHeight0 - camPos.y;

    // Distance from camera to image plane
    float h1 = shelfHeight1 - camPos.y;

    vUv = uv;

    // First shelf...
    vUUv.x = wPos.x + time;
    vUUv.y = wPos.z + time;
    vUUv /= skyScale0 * altitude;

    float scale1 = skyScale1 * altitude;
    float lowerScale = scale1 * h1 / h0;
    float motionScale = (h1 - h0) / h0;

    // Second shelf
    vUUUv.x = ((wPos.x + camPos.x * motionScale ) / lowerScale) + time / scale1;
    vUUUv.y = ((wPos.z + camPos.z * motionScale ) / lowerScale) + time / scale1;


    // Offset copy of second shelf used for shading?
    vUUUUv.x = vUUUv.x + 0.001;
    vUUUUv.y = vUUUv.y - 0.001;


    //// EXPERIMENT
    // float h2 = ((shelfHeight0 + shelfHeight1) / 2.0) - camPos.y;
    // float scale2 = ((skyScale0 + skyScale1) / 2.0) * altitude;
    // float midScale = scale2 * h2 / h0;
    // float motionScale2 = (h2 - h0) / h0;
    // vUUUUv.x = ((wPos.x + camPos.x * motionScale2 ) / midScale);// + (time) / scale1;
    // vUUUUv.y = ((wPos.z + camPos.z * motionScale2 ) / midScale);// + (time) / scale1;


    // Mid-point experimentation
    // vUUUUv.x = (vUUUv.x + vUUv.x) / 2.0;
    // vUUUUv.y = (vUUUv.y + vUUv.y) / 2.0);


    // Use UVs to  look up  distance from camera...
    float vX = (uv.x - 0.5) * 2.0;
    float vY = (uv.y - 0.5) * 2.0;
    dist = max(0.0, 1.0 - sqrt((vX * vX) + (vY * vY)));
`,Kd=`

    transformed.z += (1.0 - dist)*(1.0 - dist) * altitude;

    vec4 mvPosition = vec4( transformed, 1.0 );

    #ifdef USE_BATCHING

        mvPosition = batchingMatrix * mvPosition;

    #endif

    #ifdef USE_INSTANCING

        mvPosition = instanceMatrix * mvPosition;

    #endif

    mvPosition = modelViewMatrix * mvPosition;

    gl_Position = projectionMatrix * mvPosition;
`,Xd=`
#ifdef USE_FOG

	varying float vFogDepth;
    varying float vFogBlend;
    varying vec3 vFogPos;
    uniform float fogFar;
    varying float vHaze;

    #ifdef FOG_EXP2
        uniform float fogDensity;
    #endif

    uniform float fogNear;
    uniform float hazeHeight;
    uniform float hazeIntensity;

#endif
`,Qd=`
    #ifdef USE_FOG

        vFogDepth = fogFar;

        vFogPos = (modelMatrix * vec4(transformed, 1.0)).xyz;

        vHaze = 0.0;

        vFogBlend = 1.0;
        float fogAvg = (fogFar + fogNear) / 2.0;
        if(fogAvg < 500.0) {
            if(fogAvg <  50.0) {
                vFogBlend = 0.0;
            } else {
                vFogBlend = (fogAvg-50.0) / 450.0;
            }
        }
        if(hazeHeight < 0.0) {
            vFogBlend *= (1.0 - hazeIntensity);
        }

        #ifdef FOG_EXP2
            vFogDepth = max(0.0, (vFogDepth - fogNear) * (fogFar / (fogFar - fogNear)));
        #endif

        #ifdef FOG_EXP2

            vFogDepth = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

        #else

            vFogDepth = smoothstep( fogNear, fogFar, vFogDepth );

        #endif

    #endif
`,Zd=`
    uniform vec3 highlight;
    uniform vec3 lowlight;
    uniform float mode;

    varying vec2 vUv;
    varying vec2 vUUv;
    varying vec2 vUUUv;
    varying vec2 vUUUUv;
    varying float dist;

    highp float random(vec2 coords) {
        return (fract(sin(dot(coords.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.2) - 0.1;
    }

    float remap(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }
`,Jd=`

    vec4 c1 = texture2D(map, vUUv);
    vec4 c2 = texture2D(map, vUUUv);

    vec4 cloudCol = c1;

    //////////////////////////// BLEND MODES ///////////////////////////

    //// MAX

    // vec4 cloudCol = max(c1, c2);

    //// MIN

    // vec4 cloudCol = min(c1, c2);

    //// MULTIPLY

    // vec4 cloudCol = c1 * c2;

    /// ADD

    // vec4 cloudCol = c1 + c2;

    //// AVERAGE

    // vec4 cloudCol = (c1 + c2) / 2.0;

    //// SCREEN

    // vec4 ic1 = vec4(1.0) - c1;
    // vec4 ic2 = vec4(1.0) - c2;
    // cloudCol = vec4(1.0) - (ic1 * ic2);

    // gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * dist * (1.0-fogDepth));

    ///////////////////// ITERATIONS /////////////////////////

    if(mode == 0.0) {

        vec4 c3 = texture2D(map, vUUUUv);

        // Remapping makes them a little sharper
        // c1.a = remap(c1.a, 0.0, 0.9, 0.0, 1.0);
        // c1.a = min(1.0, max(c1.a, 0.0));
        // c1.a = sqrt(c1.a);
        // c2.a = remap(c2.a, 0.0, 0.9, 0.0, 1.0);
        // c2.a = min(1.0, max(c2.a, 0.0));
        // c2.a = sqrt(c2.a);

        // Testing density

        // Density works like this kind of - might need to transition lowlight into highlighy as density lowers though
        // Also should use this to affect the blend between fog/cloud colour. At -1 density, should be full cloud.
        // float density = -0.5;

        // if(density > 0.0) {
        //     c1.a = remap(c1.a, density, 1.0, 0.0, 1.0);
        //     c1.a = min(1.0, max(c1.a, 0.0));

        //     c2.a = remap(c2.a, density, 1.0, 0.0, 1.0);
        //     c2.a = min(1.0, max(c2.a, 0.0));

        //     c3.a = remap(c3.a, density, 1.0, 0.0, 1.0);
        //     c3.a = min(1.0, max(c3.a, 0.0));
        // } else {
        //     c1.a = remap(c1.a, 0.0, 1.0, -density, 1.0);
        //     c1.a = min(1.0, max(c1.a, 0.0));

        //     c2.a = remap(c2.a, 0.0, 1.0, -density, 1.0);
        //     c2.a = min(1.0, max(c2.a, 0.0));

        //     c3.a = remap(c3.a, 0.0, 1.0, -density, 1.0);
        //     c3.a = min(1.0, max(c3.a, 0.0));
        // }


        float ic1 = 1.0 - c1.a;
        float ic2 = 1.0 - c2.a;
        float ic = 1.0 - ic1 * ic2;

        // ic *= c1.a * c3.a;// * c2.a;
        ic *= c3.a;

        cloudCol = vec4(lowlight, ic);

        cloudCol.rgb = mix(cloudCol.rgb, highlight, c3.a * ic);

        gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * min(1.0,fogBlend)*dist);

    } else if(mode == 1.0)  {

        vec4 c3 = texture2D(map, vUUUUv);

        cloudCol.rgb = lowlight;

        // Screen alpha
        cloudCol.a = 1.0 - (1.0 - c1.a) * (1.0 - c2.a);

        cloudCol.rgb = mix(lowlight, highlight,  c1.a * cloudCol.a * c3.a);

        gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * dist * dist);

    } else if(mode == 2.0) {
        vec4 c3 = texture2D(map, vUUUUv);

        // Two-tone

        c1.a = remap(c1.a, 0.0, 1.0, 0.0, 1.0);
        c2.a = remap(c2.a, 0.0, 1.0, 0.25, 1.0);
        c3.a = remap(c3.a, 0.0, 1.0, 0.0, 0.5);

        c2.a *= c1.a;
        c3.a *= c1.a;

        cloudCol.rgb = lowlight;

        // Screen blend the initial alpha
        float ic1 = 1.0 - c1.a;
        float ic2 = 1.0 - c2.a;
        cloudCol.a = 1.0 - (ic1 * ic2);

        cloudCol.rgb = mix(cloudCol.rgb, highlight*1.5, c3.a * (dist * 2.0)); // More pink above


        gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * min(1.0,fogBlend)*dist);

    } else if(mode == 3.0) {

        vec4 c3 = texture2D(map, vUUUUv);

        float c23 = 1.0 - (1.0 - c3.a) * (1.0 - c2.a);

        cloudCol.rgb = mix(lowlight, highlight, min(c2.a, c3.a));

        cloudCol.a = max(c2.a, c1.a * c3.a);


        gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * dist * dist);
    } else if(mode == 4.0) {


    }



    //// FAR HIGHLIGHT THING SUNSET

    /*

        vec4 highlight = vec4(1.0,0.7,0.4,1.0);

        c1 *= highlight;
        c2 *= highlight;

        c1.a = remap(c1.a, 0.0, 1.0, 0.0, 1.0);
        c2.a = remap(c2.a, 0.0, 1.0, 0.0, 1.0);

        vec4 cloudCol = (c1 + c2) / 2.0;

        if(cloudCol.a > 0.25) {
            cloudCol = mix(cloudCol, highlight*8.0, (cloudCol.a - 0.25) * (0.5 - (dist*dist)));
            cloudCol.a = min(1.0, cloudCol.a);
        }

        gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb, cloudCol.a * dist);

    */

    //// CIRRUS/MIN

    // c1 = remap(c1, 0.0, 1.0, 0.0, 1.0);
    // c2 = remap(c2, 0.0, 1.0, 0.0, 1.0);

    // cloudCol = max(vec4(c1), vec4(c2));
    // cloudCol /= 2;

    // cloudCol2.a = cloudCol.a;
    // if(cloudCol.a > 0.75) {
    //     // cloudCol = mix(cloudCol, cloudCol2, (cloudCol.a - 0.75) * 4.0);
    // }

    // vec4 cloudCol = texture2D( map, vUUv ) * texture2D(map, vUUUv); // MULTIPLY
    // vec4 cloudCol = (texture2D(map, vUUv) + texture2D( map, vUUUv )) / 2.0; // AVERAGE

    // Apply colour if we have it?

    /////////////////////// FINAL COLOUR APPLICATION //////////////////////////////////

    // gl_FragColor.rgb = mix(gl_FragColor.rgb, cloudCol.rgb * vec3(1.0,0.7,0.4) * 1.0 * cloudCol.a, cloudCol.a * dist);


    // diffuseColor = vec4(0.5,0.6,0.8,);

`,$d=`

attribute float roadProximity;
attribute float treeMask;
attribute vec2 roadUv;
attribute float overlap;

varying float height;
varying float steepness;
varying float roadProx;
varying float vTreeMask;
varying vec2 vUv;
varying vec2 vUUv;
varying vec2 vWv;
varying vec2 vWWv;
varying vec2 rUv;
varying float vLightGrass;
varying float vDarkGrass;
varying float vShadow;
varying float vCamDepth;

float wuvSize = 800.0;

uniform sampler2D displacementMap;
uniform sampler2D fadeFine;
uniform float sinkDist;
uniform float vehicleIndex;
uniform float shadowFactor;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

float screen(float a, float b) {
  return 1.0 - ((1.0 - a) * (1.0 - b));
}

float distSquared( vec3 A, vec3 B ) {
    vec3 C = A - B;
    return dot( C, C );
}

vec3 upvec = vec3(0.0,1.0,0.0);

`,ec=`

vec4 wPos = modelMatrix * vec4( position, 1.0 );

vFresnelPos = wPos.xyz;
vFresnelNorm = normalize( vec3( vec4( normal, 0.0) * modelMatrix ) );

height = wPos.y;

// Set UVs from world pos
vUv.x = wPos.x / 10.0;
vUv.y = wPos.z / 10.0;

vUUv.x = vUv.x / 8.0;
vUUv.y = vUv.y / 8.0;

// 0 is perfectly flat, 1 is 90 degrees
steepness = 1.0 - dot(normal, upvec);
steepness = clamp(steepness * 1.25, 0.0, 1.0); // was multiplied by 2 before..?

vWv.x = wPos.x / wuvSize;
vWv.y = wPos.z / wuvSize;

vWWv.x = vWv.x / 8.0;
vWWv.y = vWv.y / 8.0;

rUv = roadUv;


//// GET FADES

float fade0 = texture2D(fadeFine, vWv).r;
float fade1 = texture2D(fadeFine, vWWv).r;



//// GRASSES

float heightVal = min(1.0, max(0.0, (height - (20.0 + fade1 * 40.0))/160.0));

vLightGrass = min(1.0, heightVal * (fade0 + heightVal * 0.5));

// Keep it green close to road?
if(roadProximity > 0.0 && roadProximity < 0.5 + fade1) {
  vLightGrass *= roadProximity / (0.5 + fade1);
}

vDarkGrass = min(max(0.0,(fade1 - 0.25) * 2.0), 1.0);

//// ROAD PROX

roadProx = roadProximity;

// Prevent rocks forming below the road, e.g. at bridges.
// Not perfect...
if(roadProx < 0.0) {
  steepness = 0.0;
}



//// SHADOW

vShadow = min(1.0, treeMask * min(1.0, max(0.0, height / 4.0)));


//// TREE MASK

vTreeMask = vShadow;

if(vTreeMask > 0.1) {
  vTreeMask = max(0.2, vTreeMask);
} else {
  vTreeMask = 0.0;
}

// if(roadProx > 0.0 && roadProx < 2.0) {
//   vTreeMask *= roadProx / 2.0;
// } else if(roadProx < 0.0) {
//   vTreeMask = 0.0;
// }

// Experimenting with displacement map
if(roadProx > 0.0 && roadProx < 20.0) {
  transformed += normalize( objectNormal ) * ( (texture2D( displacementMap, vUv ).x - 0.3) * steepness * 3.0 );
}

//// MV POSITION

vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );

//// OVERLAP SINK

// TODO Use actual distance probably?

//// Curvature
// float ddist = -mvPosition.z;
// float ssink = ddist / 1000.0;
// ssink *= ssink;
// transformed.y -= ssink * 50.0;
// // Recalc mvPosition
//   mvPosition = modelViewMatrix * vec4( transformed, 1.0 );

if(overlap > 0.0) {

    float overlapDist = overlap - vehicleIndex;

    if(overlapDist > 0.0) {

      if(overlapDist < sinkDist) {

          float halfSinkDist = sinkDist * 0.75;

          if(overlapDist < halfSinkDist) {
            transformed.y -= 20.0;
          } else {
            transformed.y -= 20.0 * (sinkDist - overlapDist) / (sinkDist - halfSinkDist);
          }
      }

    } else {

      float fSinkDist = -sinkDist/2.0;

      if(overlapDist > fSinkDist) {

        float halfSinkDist = fSinkDist / 2.0;

        if(overlapDist > halfSinkDist) {
          transformed.y -= 20.0;
        } else {
          transformed.y -= 20.0 * (fSinkDist - overlapDist) / halfSinkDist;
        }

      }

    }

    // Recalc mvPosition
    mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
}

gl_Position = projectionMatrix * mvPosition;

vCamDepth = -mvPosition.z;

// vLightGrass = 0.0;
// vDarkGrass = 0.0;

 vShadow *= shadowFactor;


`,tc=`

varying float height;
varying float steepness;
varying float roadProx;
varying float vTreeMask;
varying vec2 vUv;
varying vec2 vUUv;
varying vec2 vWv;
varying vec2 vWWv;
varying vec2 rUv;
varying float vLightGrass;
varying float vDarkGrass;
varying float vShadow;
varying float vCamDepth;

uniform int seasonIndex;

uniform sampler2D grassMap;
uniform sampler2D sandMap;
uniform sampler2D rockMap;
uniform sampler2D rockMapBump;
uniform sampler2D gravelMap;
uniform sampler2D forestMap;
uniform sampler2D roadMap;

uniform sampler2D fadeFine;

uniform vec3 roadCol;

uniform vec3 grassColA;
uniform vec3 grassColB;
uniform vec3 peakColA;
uniform vec3 peakColB;

uniform vec3 fieldDiscolouration;

uniform float radiance;

vec4 rockTex;

vec4 terrainBlend(vec4 tx1, float w1, vec4 tx2, float w2, float depth) {

  // Perform the blending

  float ma = max(tx1.a + w1, tx2.a + w2) - depth;
  float b1 = max(tx1.a + w1 - ma, 0.0);
  float b2 = max(tx2.a + w2 - ma, 0.0);

  return ((tx1 * b1) + (tx2 * b2)) / (b1 + b2);
}

// the ws are the height of that texture; biggest w wins
// The depth is the transition between them? maybe?

// The height goes in the alpha channel of the textures 1 and 2
// the w is the weight? the weight should be the transition?
// depth is.. I don't know, a weird offset? No idea tbh

float screen(float a, float b) {
  return 1.0 - ((1.0 - a) * (1.0 - b));
}

`,ic=`

// if(vFresnelPos.y < 0.0) {
//   discard;
// }

// TODO Pack multiple resolutions into one to prevent this nonsense
float fade0 = texture2D(fadeFine, vUv).r;
float fade1 = texture2D(fadeFine, vUUv).r;
float fade2 = texture2D(fadeFine, vWv).r;

//// PREP MAP

vec4 texelColor = texture2D( grassMap, vUv );

//// SCALED TEXTURE

float blendVal = fade2 * (0.5 + vLightGrass);

float depthLerp = 0.0;
if(vCamDepth > 500.0) {
  depthLerp = 1.0;
} else {
  depthLerp = 0.5 + (vCamDepth / 2.0) / 500.0;
}

texelColor *= 1.0 - (blendVal * depthLerp);

//// GRASS BASE

// Blend them into two colours

float grassBlend = (screen(fade1, fade0) + vDarkGrass) / 2.0;

vec3 grassCol = mix(
  mix(grassColA, grassColB, grassBlend),
  mix(peakColA, peakColB, grassBlend),
  vLightGrass
);

//// APPLY GRASS COLOUR

texelColor.rgb *= grassCol;

texelColor.r = max(0.0, min(1.0, texelColor.r));
texelColor.g = max(0.0, min(1.0, texelColor.g));
texelColor.b = max(0.0, min(1.0, texelColor.b));

//// TREE MASK

vec4 forestCol = texture2D(forestMap, vUv);
forestCol.a = forestCol.r * 2.0 * fade2;

float fTreeMask = min(1.0, vTreeMask);

if(fTreeMask > 0.0) {
  // texelColor.a = texelColor.g - 0.2;
  texelColor = terrainBlend(
    texelColor,
    1.0-fTreeMask,
    forestCol,
    fTreeMask,
    0.1 + (1.0 - fTreeMask) * fade0 * 0.9
  );
  // texelColor = mix(texelColor, forestCol, fTreeMask);

  texelColor.a = 1.0;
}


//// SAND BLEND

float vHeight = height + min(1.0, height+0.5) * (fade2 * 2.0 + (fade0 + fade2) * 0.5);

if(vHeight < 4.0) {

  float dark = 1.0;

  if(vHeight < 0.0) {
    texelColor = texture2D(sandMap, vUv) * 0.75;
  } else {

    if(vHeight < 2.0) {

      // Darken toward water
      dark = min(dark, 1.0 - (2.0 - vHeight) / 8.0);

    } else if(vHeight > 2.5) {

      // Darken into the grass
      dark = 1.0 - (vHeight-2.5) / 2.0;

    }

    // Lerp from grass to thingy
    float lerp = max(0.0, (vHeight - 1.0) / 3.0);

    vec4 sandCol = texture2D(sandMap, vUv);

    texelColor.a = texelColor.r;

    sandCol.a = sandCol.r;

    // Apply shading based on water/grass proximity
    sandCol.rgb *= dark;

    texelColor = terrainBlend(
      texelColor,
      lerp,
      sandCol,
      1.0 - lerp,
      0.05
    );


    // texelColor = mix(texture2D(sandMap, vUv) * dark, texelColor, height / 4.0);

    // texelColor = terrainBlend(
    //   texture2D(sandMap, vUv) * dark,
    //   dark,
    //   texelColor,
    //   texelColor.g,
    //   height / 4.0
    // );
  }
}

//// ROAD GRAVEL

if(seasonIndex < 3) {

  if(roadProx != 0.0 && roadProx < 0.25 + fade0 * 2.0) {

    float rp = roadProx / (0.25 + fade0 * 2.0);

    // Mix into forest colour if we're under trees
    if(seasonIndex == 2 && vShadow > 0.0) {

      texelColor = mix(

        mix(texture2D(gravelMap, vUv*2.0), forestCol, min(1.0, vShadow * 2.0)),

        texelColor,
        smoothstep(
          rp + 0.35,
          rp - 0.35,
          1.0 - texelColor.g
        )
      );

    } else {

      texelColor = mix(
        texture2D(gravelMap, vUv*2.0),
        texelColor,
        smoothstep(
          0.0,
          1.0,
          rp
        )
      );

    }

  }

}

//// ROAD SURFACE?

if(roadProx < 0.0) {

  vec4 roadSurface = texture2D(roadMap, rUv);

  if(roadProx < -1.0) {
    texelColor = mix(texelColor, roadSurface, roadSurface.a);
  } else {
    texelColor = mix(texelColor, roadSurface, roadSurface.a * abs(roadProx));//roadSurface.a * (abs(roadProx)); / -0.5));
  }
}

//// STEEPNESS CLIFF


// Oh here's where I do the distance thing?
if(roadProx == 0.0) {
  rockTex = texture2D(rockMap, vWv) * (1.0 - fTreeMask * 0.5);
  rockTex.a = (1.0 - texture2D(rockMapBump, vWv).r) * 0.95;
} else {
  rockTex = texture2D(rockMap, vUv) * (1.0 - fTreeMask * 0.5);
  rockTex.a = texture2D(rockMapBump, vUv).r;
}


  texelColor.a = 0.2 + fade2 * 0.2;
texelColor = terrainBlend(texelColor,0.6, rockTex, steepness, 0.05);
texelColor.a = 1.0;

//// PREP EMISSIVE?

// NOTE this must match the grass sprites. Ideally share a chunk?


totalEmissiveRadiance = texelColor.rgb * radiance;

//// FINAL COMPOSITION

diffuseColor *= texelColor;

// DEBUG COLOURS
// diffuseColor.rgb = vNormal.rgb;

// Clamp to reduce glittering pixels? Needs a better fix though... this is a last resort

// diffuseColor.r = min(max(0.0, diffuseColor.r), 1.0);
// diffuseColor.g = min(max(0.0, diffuseColor.g), 1.0);
// diffuseColor.b = min(max(0.0, diffuseColor.b), 1.0);



`,sc=`
    uniform sampler2D noiseMap;
	uniform float dissolveFar;
    uniform float dissolveNear;
    uniform float dissolveInterval;
	uniform float shadowFactor;
	uniform float discolourationFactor;
    // uniform float time;

    varying float discolouration;
    varying float vShadow;
    varying float vDissolve;
    varying vec3 vCenterNormal;

    float distanceSq(vec3 a, vec3 b) {
        return (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y) + (b.z - a.z)*(b.z - a.z);
    }

    float distanceSqFlat(vec3 a, vec3 b) {
        return (b.x - a.x)*(b.x - a.x) + (b.z - a.z)*(b.z - a.z);
    }

    // vec2 getRotatePivot2d(vec2 uv, float rotation, vec2 pivot) {
    //     return vec2(
    //         cos(rotation) * (uv.x - pivot.x) + sin(rotation) * (uv.y - pivot.y) + pivot.x,
    //         cos(rotation) * (uv.y - pivot.y) - sin(rotation) * (uv.x - pivot.x) + pivot.y
    //     );
    // }

`,lc=`
    discolouration = 1.0 + (texture2D(noiseMap, vec2(wPos.x/256.0,wPos.z/256.0)).r - 0.5) * discolourationFactor;

	// SPECIAL HANDLING FOR CYPRESS TO AVOID IT BEING TOO DARK
	if(vMapUv.x > 0.76) {
	  discolouration = (discolouration / 2.0) + 0.5;
	}
`,rc=`

	// Cone effect on the shadow
	// TODO - set up different parameters for different trees, they have different coniness.

	// Heightlerp controls how high up the effect takes hold
	float shadowRadius = 3.2 - max(0.2,heightLerp*1.4) * 1.8;
	vShadow = shadowRadius - centerDist;

	// Assume trunk sunk, handle it specially
	if(heightLerp < 0.0 && centerDist < 0.5) {
		vShadow = 0.5;
	}

	// vShadow *= shadowFactor;
`,ac=`

	// Note - can use instance matrix 1, 1 for scale proxy?

    vec4 wPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);

    // Assumes trees are 10m tall
    // float heightLerp = min(1.0, (position.y - instanceMatrix[1][1]) / 10.0);
	float heightLerp = position.y / 10.0;

    float centerDist = sqrt(position.x*position.x + position.z*position.z);

	// Angled upwards in a constant cone
	if(centerDist < 0.0001) {
		// Trunk
		vCenterNormal = normalize(normalMatrix * mat3(instanceMatrix) * vec3(position.x, 1.0, position.z));
	} else {
	    if(position.y < 0.0) {
			vCenterNormal = normalize(normalMatrix * mat3(instanceMatrix) * vec3(position.x,0.0, position.z));
		} else {
			vCenterNormal = normalize(normalMatrix * mat3(instanceMatrix) * vec3(position.x, max(0.5, heightLerp*1.5)*centerDist, position.z));
		}
	}

	if(heightLerp > 1.0) { heightLerp = 1.0; }

	// Straight up
	// vCenterNormal = normalize(normalMatrix * mat3(instanceMatrix) * vec3(0.0,1.0,0.0));


`+rc+`



`+lc+`

    // IF WEIGHED DOWN BY SNOW UNCOMMENT THIS!?
	// if(centerDist > 0.1) {
	// 	transformed.y -= centerDist / 2.0 + heightLerp * 1.0;
	// }

    // Need to get mvPosition here
    #include <project_vertex>



    if(-mvPosition.z < dissolveNear) {
        vDissolve = 0.0;
    } else {
        if(-mvPosition.z > dissolveFar) {
            vDissolve = 1.0;
        } else {
            vDissolve = (-mvPosition.z - dissolveNear) / dissolveInterval;
        }

    }

`,oc=`

    uniform sampler2D noiseMap;

    varying float discolouration;
    varying float vShadow;
    varying float vDissolve;

    varying vec3 vCenterNormal;

    float fShadow;

`,nc=`

if(vMapUv.x > 0.125) {
	diffuseColor.g *= discolouration;
	// if(diffuseColor.g > diffuseColor.r) {
}

`,dc=`

	diffuseColor.g *= discolouration;

`,cc=`

	if(vDissolve == 1.0 || texture2D(noiseMap, vMapUv).r < vDissolve) {
		discard;
	}

    fShadow = max(0.0, min(1.0, vShadow));

	fShadow = sqrt(fShadow) * 0.65;


`+nc+`

	diffuseColor.rgb *= 1.0 - fShadow;
	// totalEmissiveRadiance = vec3(0.5, diffuseColor.gb * 8.0);//diffuseColor.rgb;

`,hc=`
GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef USE_CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometry.viewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

        // TODO Could have some fun here to improve the night lighting?
		getSpotLightInfo( spotLight, geometry, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		// spot lights shine through the shadow
		directLight.color *= 1.0 + fShadow;

		RE_DirectSpot( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, geometry, directLight );

		//// MAGIC LINE TO OVERRIDE DIRECTIONAL LIGHT SHADOW ////

        // if(fShadow > 0.5) {
            // directLight.color *= 1.0 - fShadow;
        // }

        // Normal dot comparison

        //// Even normal (bit weak)
        // directLight.color *= max(0.0, 1.0-((dot(directLight.direction, vCenterNormal) + 1.0) / 2.0));

        //// 1.2x normal (about right?)
        // float dotDirLightFactor = min(1.0, max(0.0, -dot(directLight.direction, vCenterNormal) + 0.2));
        // directLight.color *= min(1.0, dotDirLightFactor + 0.0);


        //// Cross vecs - idea is to mix to tangent by dot factor
        // vec3 cross1 = cross(vCenterNormal, geometry.normal);
        // vec3 cross2 = cross(cross1, vCenterNormal);
        // geometry.normal = mix(geometry.normal, cross2, min(1.0, max(0.0, ddot * -2.0)));


        //// WORKING SQUASH - ONLY IF DOT < 0
        // When the dot is 1, it's in shadow
        // When the dot is -1, it's in full light
        // So when the dot is > 0.0 we want to reduce the amount of light by dot * 2.0
        // which means multiplying by 1.0 - dot * 2.0
        // Oh -- If we use the cylinder test for centernormal, with overhead light, the dot here will never be > 0

        // Problem is we still want it lit up to like -0.1 dot

        // directLight.color *= min(1.0, max(0.25, dot(directLight.direction, vCenterNormal) * -2.0));

        // directLight.color *= max(0.0, min(1.0, dot(directLight.direction, vCenterNormal) + 0.25));


        // Direct normal (bit severe)
        directLight.color *= max(0.0, dot(directLight.direction, vCenterNormal));

        /////////////////////////////////////////////////////////

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );

		}
		#pragma unroll_loop_end

	#endif

    //// SHADOW EFFECT ON AMBIENT

	if(fShadow > 0.25) {
		// irradiance *= 1.25 - fShadow;
	}

	////

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,fc=`

float faceDirection = gl_FrontFacing ? 1.0 :  1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vCenterNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 geometryNormal = normal;
`,uc=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_Direct_Lambert_Spot( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( min(1.0, dot( geometry.normal, directLight.direction ) + 0.25) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}


void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_DirectSpot           RE_Direct_Lambert_Spot
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert

`,vc=`
    uniform sampler2D noiseMap;
    uniform float dissolveFar;
    uniform float dissolveNear;
    uniform float dissolveInterval;
    uniform float shadowFactor;
    uniform float discolourationFactor;
    uniform float alphaTest;
    // uniform float time;

    varying float discolouration;
    varying float vShadow;
    varying float vDissolve;
    varying vec3 vCenterNormal;
    varying vec3 vCameraUp;
    varying float vAlphaTest;

    float distanceSq(vec3 a, vec3 b) {
        return (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y) + (b.z - a.z)*(b.z - a.z);
    }

    // vec2 getRotatePivot2d(vec2 uv, float rotation, vec2 pivot) {
    //     return vec2(
    //         cos(rotation) * (uv.x - pivot.x) + sin(rotation) * (uv.y - pivot.y) + pivot.x,
    //         cos(rotation) * (uv.y - pivot.y) - sin(rotation) * (uv.x - pivot.x) + pivot.y
    //     );
    // }

`,Dn=`
    discolouration = 1.0 + (texture2D(noiseMap, vec2(wPos.x/256.0,wPos.z/256.0)).r - 0.5) * discolourationFactor;
`,mc=`
    // Get the direction to the center, in a pill shape to preserve the trunk normals?

    #if defined(USE_INSTANCING)

        // INSTANCED VERSION USED FOR LIVE

        if(vMapUv.y > 0.25) {
            vCenterNormal =  normalMatrix * mat3(modelMatrix * instanceMatrix) * normalize(position - vec3(0.0, min(position.y, 5.0), 0.0));
        } else {
            vCenterNormal = normalMatrix * mat3(instanceMatrix) * normalize(position - vec3(0.0, 7.0, 0.0));
        }

    #else

        // NON-INSTANCE VERSION USED FOR IMPOSTER GENERATION

        if(vMapUv.y > 0.25) {
            vCenterNormal = normalMatrix * normalize(vec3(0.0, 5.0, 0.0) - position);
        } else {
            // Trunk - test against leaf center
        }

    #endif

    vCameraUp = normalMatrix * vec3(0.0, 1.0, 0.0);


`,gc=`

    vec4 wPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);

    vShadow = 0.0;
    // What if we say all trees are 10m tall by default? center at 5.0?

    // Fake shadow by testing against direction to center..?
    // Works nicely but not great for directional light and normal light

    float distToCenter = distanceSq(position, vec3(0.0, 5.0, 0.0));//min(position.y, 5.0), 0.0));

    if(distToCenter < 36.0) {
        if(distToCenter < 8.0) {
            vShadow = 1.0;
        } else {
            // distToCenter = sqrt(distToCenter);
            // vShadow = 1.0 - (distToCenter - 3.0) / 3.0;
            vShadow = 1.0 - (distToCenter - 8.0) / 28.0;
        }
    }
    if(position.y < 1.0) {
        vShadow = min(1.0, 1.0 - position.y);
    }


`+mc+`
`+Dn+`


    // if(uv.y > 0.25) {
    //     vec4 wPos2 = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    //     float angleToCamera = atan(wPos2.x - cameraPosition.x, wPos2.z - cameraPosition.z);
    //     transformed.xz = getRotatePivot2d(transformed.xz, angleToCamera, vec2(0.0,0.0));
    // }

    // ANIMATION TESTING
    // vec4 wPos2 = modelMatrix * instanceMatrix * vec4(position, 1.0);
    // float tt = time * 0.01;
    // vec2 blowUV = vec2(wPos2.x / 20.0 + tt, wPos2.z / 80.0 + tt / 4.0);
    // if(uv.y > 0.26) {
    //     float blow = texture2D(noiseMap, blowUV).r;
    //     transformed.x += sin(blow) * 2.0 * uv.x;//sin(blow) * 0.2;
    //     transformed.y += sin(blow) * 2.0;
    //     transformed.z += cos(blow) * 2.0 * (1.0 - uv.x);//cos(blow) * 0.2;
    // }

    // Need to get mvPosition here
    #include <project_vertex>


    if(-mvPosition.z < dissolveNear) {
        vDissolve = 0.0;
    } else {

        if(-mvPosition.z > dissolveFar) {
            vDissolve = 1.0;
        } else {
            vDissolve = (-mvPosition.z - dissolveNear) / dissolveInterval;
        }
    }

    // Dynamic alpha test... just testing for now? can't decide if it's worthwhile
    vAlphaTest = alphaTest;
    if(dissolveFar > 200.0) {
        if(-mvPosition.z < dissolveFar) {
            // Second term is 0 at dissolveFar, 0.5 at half way to dissolve...
            vAlphaTest = max(0.3, alphaTest * (1.0 + mvPosition.z / (dissolveFar + dissolveInterval)));
        }
    } else {
        if(-mvPosition.z < 200.00) {
            // Second term is 0 at dissolveFar, 0.5 at half way to dissolve...
            vAlphaTest = max(0.3, alphaTest * (1.0 + mvPosition.z / (300.0)));
        }
    }


    float vShadowFade = 0.0;

    if(-mvPosition.z < 25.0) {
        vShadowFade = 1.0;
    } else {
        vShadowFade = 1.0 - (-mvPosition.z - 25.0) / 125.0;
    }

    vShadow *= vShadowFade * shadowFactor;



`,pc=`

    uniform sampler2D noiseMap;
    uniform float radiance;
    uniform bool hasSnow;

    varying float discolouration;
    varying float vShadow;
    varying float vDissolve;

    varying vec3 vCenterNormal;
    varying vec3 vCameraUp;
    varying float vAlphaTest;


`,_c=`

    if(vDissolve == 1.0 || texture2D(noiseMap, vMapUv).r < vDissolve) {
        discard;
    }

    if(diffuseColor.g > diffuseColor.b * 1.5) {
        // We have a leaf? Not very reliable.. might need a leafmap eventually

        // Recolour...
        diffuseColor.rg *= discolouration;

        // Emissive...
        totalEmissiveRadiance = vec3(diffuseColor.rg * 8.0, 0.5) * radiance;
    }
`,bc=`
    if(diffuseColor.a < vAlphaTest) discard;
`,wc=`

    // Use the normal to blend with snow colours

    // ONLY DO THIS ON SNOW VIBES
    if(hasSnow) {
        float dotUp = dot(normal, vCameraUp );
        if(dotUp > 0.1) {
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(min(1.0, 0.5 + dotUp)), min(1.0, (dotUp - 0.1) * 8.0));
        }
    }


`,yc=`

    if(vType < 0.5) {
        // We have a leaf
        // if(diffuseColor.g > diffuseColor.b * 1.5) { // For some reason it looks better if it's darker than regular tree?
            diffuseColor.rg *= discolouration;
            // Emissive... unclear why this needs to be different to the regular tree emissive. Suspicious. Just a shadowmap diff?
            totalEmissiveRadiance = vec3(diffuseColor.rg * 8.0, 0.5) * radiance;
        // }
    } else {
        `+dc+`
    }
`,Sc=`
GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef USE_CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometry.viewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

    geometry.normal = normalize((normal));// + vCenterNormal) / 2.0);

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

        // TODO Could have some fun here to improve the night lighting?
		getSpotLightInfo( spotLight, geometry, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

        // if(vShadow > 0.5) {
            directLight.color *= vShadow;
        // }

		RE_DirectSpot( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

    geometry.normal = normal;

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, geometry, directLight );

		//// MAGIC LINE TO OVERRIDE DIRECTIONAL LIGHT SHADOW ////

        if(vMapUv.y > 0.25) {
            directLight.color *= 1.0 - vShadow * 0.5;
        }

        // Normal dot comparison

        //// Even normal (bit weak)
        // directLight.color *= max(0.0, 1.0-((dot(directLight.direction, vCenterNormal) + 1.0) / 2.0));

        //// 1.2x normal (about right?)
        // float dotDirLightFactor = min(1.0, max(0.0, -dot(directLight.direction, vCenterNormal) + 0.2));
        // directLight.color *= min(1.0, dotDirLightFactor + 0.0);


        //// Cross vecs - idea is to mix to tangent by dot factor
        // vec3 cross1 = cross(vCenterNormal, geometry.normal);
        // vec3 cross2 = cross(cross1, vCenterNormal);
        // geometry.normal = mix(geometry.normal, cross2, min(1.0, max(0.0, ddot * -2.0)));



        //// WORKING SQUASH - ONLY IF DOT < 0
        // When the dot is 1, it's in shadow
        // When the dot is -1, it's in full light
        // So when the dot is > 0.0 we want to reduce the amount of light by dot * 2.0
        // which means multiplying by 1.0 - dot * 2.0
        // Oh -- If we use the cylinder test for centernormal, with overhead light, the dot here will never be > 0


        directLight.color *= min(1.0, max(0.25, dot(directLight.direction, vCenterNormal) * 2.0));


        // Direct normal (bit severe)
        // directLight.color *= max(0.0, -dot(directLight.direction, vCenterNormal));

        /////////////////////////////////////////////////////////

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif


		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );

		}
		#pragma unroll_loop_end

	#endif

    //// SHADOW EFFECT ON AMBIENT
	if(vShadow > 0.5) {
		irradiance *= 1.5 - vShadow;
	}
	////

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,Dc=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_Direct_Lambert_Spot( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

    // Scale and square to keep the txture and detail in the leaves in headlights

    float dotty = (max(-0.5, -0.5 + dot( geometry.normal, directLight.direction )));// / 2.0 ) + 0.25;
	float dotNL = saturate( dotty );
    dotNL = max(0.1, dotNL);
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}


void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_DirectSpot           RE_Direct_Lambert_Spot
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert

`,Lc=`

    uniform sampler2D noiseMap;

    attribute float variant;
    attribute float type;
    attribute float orientation;
    attribute float dissolve;

    varying vec2 vUv;
    varying vec2 vUvOffset;
    varying float vDissolve;
    varying float vAngleBlend;
    varying vec3 vCameraUp;
    varying float vType;
    // varying float vDist;

    varying float discolouration;

    uniform float dissolveFar;
    uniform float dissolveNear;
    uniform float dissolveInterval;
    uniform float discolourationFactor;

    vec2 getRotatePivot2d(vec2 uv, float rotation, vec2 pivot) {
        return vec2(
            cos(rotation) * (uv.x - pivot.x) + sin(rotation) * (uv.y - pivot.y) + pivot.x,
            cos(rotation) * (uv.y - pivot.y) - sin(rotation) * (uv.x - pivot.x) + pivot.y
        );
    }
`,Cc=`
    // Use the world position of the camera to derive the angle
    vec4 wPos = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float angleToCamera = atan(wPos.x - cameraPosition.x, wPos.z - cameraPosition.z);
`,kc=`

    vUv = uv;

    vType = type;

`+Dn,Ic=`

    vec3 objectNormal = normalize(vec3( (cameraPosition.x - wPos.x), 0.0, (cameraPosition.z - wPos.z)));

`,Mc=`


    // Rotate the vertices to face the camera
    transformed.xz = getRotatePivot2d(transformed.xz, angleToCamera, vec2(0.0,0.0));

    // Account for rotational offset in model
    angleToCamera -= orientation;

    // Normalise to inverval [-PI, PI]
    if(angleToCamera > PI) {
        angleToCamera -= PI*2.0;
    } else if(angleToCamera < -PI) {
        angleToCamera += PI*2.0;
    }

    // Choose tile from texture based on angle
    float tileIndex = (angleToCamera + PI) / (PI * 2.0 / 16.0);

    // Should be 0 when angle is exactly face-on, 1 when exactly betwen tiles
    // Note that this should be scaled to the alphaTest value?



    vUvOffset.x = (1.0 / 16.0) * floor(tileIndex);

    // Set vertical offset by variant type
    vUvOffset.y = variant / 4.0;

    // Need to get mvPosition here
    #include <project_vertex>

    if(-mvPosition.z > 500.0) {
        vAngleBlend = 0.0;
    } else {
        vAngleBlend = (tileIndex - floor(tileIndex));
    }


    if(-mvPosition.z < dissolveNear) {
        vDissolve = 1.0;
    } else {
        if(-mvPosition.z > dissolveFar) {
            vDissolve = 0.0;
        } else {
            vDissolve = 1.0 - (-mvPosition.z - dissolveNear) / dissolveInterval;
        }
    }

    // vDist = min(0.75, max(0.4, 1.0 - -mvPosition.z / 1000.0));

    vDissolve *= dissolve;

    vCameraUp = normalMatrix * vec3(0.0, 1.0, 0.0);
`,Ec=`

    varying vec2 vUv;
    varying vec2 vUvOffset;
    varying float vDissolve;
    varying float vAngleBlend;
    varying vec3 vCameraUp;
    varying float vType;
    // varying float vDist;

    varying float discolouration;

    uniform sampler2D noiseMap;
    uniform sampler2D mapB;
    uniform sampler2D normalMapB;
    uniform float radiance;
    uniform bool hasSnow;
`,Ac=`


    vec4 texelColor;

    if(vType < 0.5) {
        texelColor = texture2D( map, vUv + vUvOffset );
    } else {
        // Map B
        texelColor = texture2D( mapB, vUv + vUvOffset );
    }

    // Transform uvs to square to  sample from noise texture
    float blendNoise = texture2D(noiseMap, vec2(vUv.x*5.33*4.0, vUv.y*4.0)).r;

    // Blend to next texture by angle offset?
    if(blendNoise < vAngleBlend) {
        vec2 blendUV = vUv + vUvOffset + vec2(1.0 / 16.0, 0.0);
        if(blendUV.x > 1.0) {
            blendUV.x -= 1.0;
        }

        if(vType < 0.5) {
            texelColor = textureGrad(map, blendUV, dFdx(vUv), dFdy(vUv));
        } else {
            texelColor = textureGrad(mapB, blendUV, dFdx(vUv), dFdy(vUv));
        }
    }

    if(blendNoise < vDissolve) {
        texelColor.a = 0.0;
    }

    diffuseColor *= texelColor;

`+yc,Tc=`
    vec2 vNormalMapUvOffset = vNormalMapUv + vUvOffset;

    #ifdef USE_NORMALMAP_OBJECTSPACE

        if(blendNoise <= vAngleBlend) {
            vNormalMapUvOffset.x += 1.0/16.0;
            if(vNormalMapUvOffset.x > 1.0) {
                vNormalMapUvOffset.x -= 1.0;
            }
        }

        // vNormalMapUvOffset.x = min(max(vNormalMapUvOffset.x, 0.0), 1.0);

        // normal = texture2D( normalMap, vNormalMapUvOffset ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

        if(vType < 0.5) {
            normal = textureGrad(normalMap, vNormalMapUvOffset, dFdx(vNormalMapUv), dFdy(vNormalMapUv)).xyz * 2.0 - 1.0;
        } else {
            normal = textureGrad(normalMapB, vNormalMapUvOffset, dFdx(vNormalMapUv), dFdy(vNormalMapUv)).xyz * 2.0 - 1.0;
        }

        #ifdef DOUBLE_SIDED
            normal = normal * faceDirection;
        #endif

        normal = normalize( normal );

        diffuseColor.rgb = vec3(normal.x);

    #elif defined( USE_NORMALMAP_TANGENTSPACE )

        if(blendNoise <= vAngleBlend) {
            vNormalMapUvOffset.x += 1.0/16.0;
            if(vNormalMapUvOffset.x > 1.0) {
                vNormalMapUvOffset.x -= 1.0;
            }
        }


        vec3 mapN;

        if(vType < 0.5) {
            mapN = textureGrad(normalMap, vNormalMapUvOffset, dFdx(vNormalMapUv), dFdy(vNormalMapUv)).xyz * 2.0 - 1.0;
        } else {
            mapN = textureGrad(normalMapB, vNormalMapUvOffset, dFdx(vNormalMapUv), dFdy(vNormalMapUv)).xyz * 2.0 - 1.0;
        }

        mapN.xy *= normalScale;

        normal = normalize( tbn * mapN );

    #elif defined( USE_BUMPMAP )

        normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

    #endif

    // SNOW
    if(vType < 0.5 && hasSnow) {
        float dotUp = dot(normal, vCameraUp );
        // Note that we use different parameters to the regular trees
        if(dotUp > 0.0) {
            diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0), min(1.0, dotUp * 8.0));
        }
    }
`,Pc=`
GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef USE_CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometry.viewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

        reflectedLight.directSpecular = reflectedLight.directDiffuse;

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometry, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

        //// SR EDIT - FAKE DIM SPOTLIGHTS ON IMPOSTERS
        directLight.color *= 0.2;
        ////

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,Nc=`
    // attribute float variant;
    attribute vec3 groundNormal;
    attribute float shadow;
    attribute float roadProx;

    uniform float sproutNear;
    uniform float sproutFar;
    uniform sampler2D noiseMap;
    uniform float shadowFactor;
    // uniform float time;

    varying vec2 vUv;

    varying vec2 vGv;
    varying vec2 vGGv;
    varying vec2 vWv;
    varying vec2 vWWv;

    varying float doDiscard;
    varying float doColor;
    varying float vShadow;
    varying float vRoadProx;

    varying float vLightGrass;
    varying float vDarkGrass;

    varying vec2 vUvOffset;

    // Must match the ground shader
    float wuvSize = 800.0;

    float screen(float a, float b) {
        return 1.0 - ((1.0 - a) * (1.0 - b));
    }
`,xc=`

    vUv = uv;

    vec4 wPos = modelMatrix * instanceMatrix * vec4(1.0);

    vFresnelPos = wPos.xyz;
    vFresnelPos.y -= 1.5; // Subtract the sprite midpoint to get the ground position?

    vFresnelNorm = groundNormal;

    // Grass colouration UVs
    vGv.x = wPos.x / 10.0;
    vGv.y = wPos.z / 10.0;

    vGGv.x = vGv.x / 16.0;
    vGGv.y = vGv.y / 16.0;

    vWv.x = wPos.x / wuvSize;
    vWv.y = wPos.z / wuvSize;

    vWWv.x = vWv.x / 8.0;
    vWWv.y = vWv.y / 8.0;



    // objectNormal = groundNormal;
    vNormal = normalMatrix * groundNormal; // mat3(inverse(transpose(modelMatrix * instanceMatrix)));

    vRoadProx = roadProx;

    vShadow = min(1.0, shadow * min(1.0, max(0.0, wPos.y / 4.0)));

    // Get uvLookup  from variant
    /* Indexed into the texture as such:

        2 | 3
        - + -
        0 | 1

    */

    //// VARIANT SELECTION

    float fade0 = texture2D(noiseMap, vWv).r;
    float fade1 = texture2D(noiseMap, vWWv).r;
    float v = texture2D(noiseMap, vGGv).r;

    float variant = 1.0;

    // CHECK HEATHER - has to match the ground function
    // Might want to find something cheaper to do here?
    float heather = smoothstep(0.4, 1.0, ((wPos.y + fade1 * 350.0) - 60.0) / 500.0);
    heather *= screen(fade1, fade0);
    // heather = smoothstep(0.3, 0.6, heather);
    if(vShadow < 0.1 && heather > 0.4 + v / 5.0 ) {
        variant = 3.0;

        if(roadProx > 1.0) {
            transformed.y -= v * 0.2;
        } else {
            transformed.y -= v * 0.2 * roadProx;
        }
    }


    if(vRoadProx < v * 2.0 + 0.2) {
        // Little grass
        variant = 0.0;
    } else if(variant < 3.0 && ( wPos.y > 100.0 && v + fade0 > 1.75 - (wPos.y - 50.0) / 250.0 ) || vShadow > v * 2.0 ) {

       // big grass

        variant = 2.0;
    } else if(variant == 3.0) {
        transformed.xyz *= 0.5 + fade0 * 1.5;
    }



    doDiscard = 0.0;
    doColor = 0.0;
    if(variant < 3.0) {
        doColor = 1.0;

        // SET UP GRASS COLOURATION PARAMS


        float heightVal = min(1.0, max(0.0, (wPos.y - (20.0 + fade1 * 40.0))/160.0));

        vLightGrass = min(1.0, heightVal * (fade0 + heightVal * 0.5));

        vDarkGrass =  min( max( 0.0, (fade1 - 0.25) * 2.0), 1.0);

        if(vRoadProx < 0.5 + fade1) {
            vLightGrass *= max(0.5, vRoadProx / (0.5 + fade1));
        }
    }

    vUvOffset.x = variant * 0.25;
    vUvOffset.y = 0.0;

    // Need to replace projectVertex here so we can get mvPosition




    // Limit darkness by thingy
    // darkness = min(0.5, -tPos.z / sproutNear);

    //// MODIFY MV POSITION

    float dist = (wPos.x - cameraPosition.x)*(wPos.x - cameraPosition.x) + (wPos.z - cameraPosition.z)*(wPos.z - cameraPosition.z);

    if(dist > sproutNear) {

        transformed.y -= (dist - sproutNear) / (sproutFar - sproutNear) * 0.5;

        if(dist > sproutFar) {
            doDiscard = 1.0;
        }
    }

    #include <project_vertex>


    // ANIMATION TESTING
    // float tt = time * 0.05;
    // vec2 blowUV = vec2(vGGv.x + tt, vGGv.y + tt);
    // if(uv.y > 0.5) {
    //     float blow = texture2D(noiseMap, blowUV).r;
    //     transformed.x += blow * 0.2;//sin(blow) * 0.2;
    //     transformed.z += blow * 0.2;//cos(blow) * 0.2;
    // }

    vShadow *= shadowFactor;

`,Rc=`

    uniform sampler2D noiseMap;

    varying vec2 vUv;

    varying vec2 vGv;
    varying vec2 vGGv;
    varying vec2 vWv;
    varying vec2 vWWv;

    varying float doDiscard;
    varying float doColor;
    varying float vShadow;
    varying float vRoadProx;

    varying float vLightGrass;
    varying float vDarkGrass;

    varying vec2 vUvOffset;

    uniform vec3 grassColA;
    uniform vec3 grassColB;
    uniform vec3 peakColA;
    uniform vec3 peakColB;

    uniform float radiance;

    float screen(float a, float b) {
        return 1.0 - ((1.0 - a) * (1.0 - b));
    }


`,Uc=`
    float faceDirection = 1.0;
    vec3 normal = normalize(vNormal);
`,Oc=`

    // Don't draw grass beyond view dist
    if(doDiscard > 0.0) {
        discard;
    }

    // Need to alter vLightGrass
    vec4 texelColor = texture2D( map, vUv + vUvOffset );// * (1.0 - vLightGrass * 0.25);

    // Limit darkness by distance?
    // texelColor.rgb = vec3(max(texelColor.r, darkness));

    if(doColor > 0.5) {

        // Shared with ground.glsl - TODO share a chunk instead?

        float grassBlend = (screen(texture2D(noiseMap, vGv).r, texture2D(noiseMap, vGGv).r) + vDarkGrass) / 2.0;

        vec3 grassCol = mix(
            mix(grassColA, grassColB, grassBlend),
            mix(peakColA, peakColB, grassBlend),
            vLightGrass
        );

        texelColor.rgb *= grassCol;

    } else if(texelColor.a < 0.98) {
        // Lazy fix for heather white pixels
        discard;
        // texelColor.rgb = vec3(0.05, 0.04, 0.03);
    }

    diffuseColor *= texelColor;


    //// PREP EMISSIVE?

    // NOTE this must match the ground. Ideally share a chunk?
    totalEmissiveRadiance = texelColor.rgb * radiance;


`,Vc=`
    attribute vec3 groundNormal;
    attribute float shadow;
    attribute float variant;
    // attribute float roadProx;

    uniform float sproutNear;
    uniform float sproutFar;
    uniform float sproutMargin;
    uniform sampler2D noiseMap;
    uniform float shadowFactor;
    // uniform float time;

    varying vec2 vUv;
    varying vec2 vWv;


    varying float vAlphaTest;
    varying float vShadow;
    varying float doDiscard;

    varying float vAO;

    varying vec2 vUvOffset;

    float wuvSize = 512.0;

    float screen(float a, float b) {
        return 1.0 - ((1.0 - a) * (1.0 - b));
    }
`,Hc=`

    vUv = uv;

    vec4 wPos = modelMatrix * instanceMatrix * vec4(1.0);

    vWv.x = wPos.x / wuvSize;
    vWv.y = wPos.z / wuvSize;

    // objectNormal = groundNormal;
    vNormal = normalMatrix * groundNormal; // mat3(inverse(transpose(modelMatrix * instanceMatrix)));

    vShadow = min(1.0, shadow * min(1.0, max(0.0, wPos.y / 4.0)));

    vAO = max(0.0, min(0.5, position.y)) * 2.0;

    // Get uvLookup  from variant

    //// VARIANT SELECTION

    float fade0 = texture2D(noiseMap, vWv).r;

    // The fade is normally distributed; look up the variant from type thingy whatsit
    float vVariant = variant;

    // If variant is unset in the buffer, set it procedurally
    if(vVariant == 0.0) {
        if(vShadow > 0.1) {
            // Higher chance of fern
            if(fade0 > 0.41) {
                if(fade0 > 0.52) {
                    vVariant = 2.0;
                } else {
                    vVariant = 1.0;
                }
            }
        } else {
            // Lower chance for ferns
            if(fade0 > 0.46) {
                if(fade0 > 0.54) {
                    vVariant = 1.0;
                } else {
                    vVariant = 2.0;
                }
            }

            // Also check for gorse
            // if(wPos.y > 150.0) {
            //     if(wPos.y > 200.0) {
            //         if(wPos.y > 230.0) {
            //             vVariant = 3.0;
            //         } else {
            //             // Really high up, bushes must be gorse or generic?
            //             if(vVariant < 2.0) {
            //                 vVariant = 0.0;
            //             } else {
            //                 vVariant = 3.0;
            //             }
            //         }
            //     } else if(vVariant == 2.0) {
            //         vVariant = 3.0;
            //     }
            // }
        }
    }

    vShadow *= shadowFactor;

    // Thinking about rules...
    //  - Gorse higher up
    //  - Soft things alongside the road regardless of elevation
    //  - Ferns only close to trees

    // Should I add more variants?
    //  - nettles and brambles
    //  - cow parsley and generic
    //  - ferns
    //  - two types of gorse
    //  - dock
    //  - ..?

    // Could do variant-specific things here like flattening ferns?
    if(vVariant == 2.0) {
        transformed.y -= 0.1;
    }

    vUvOffset.x = vVariant * 0.25;
    vUvOffset.y = 0.0;

    // Need to replace projectVertex here so we can get mvPosition

    //// MODIFY MV POSITION

    doDiscard = 0.0;

    // TODO can this be done once somewhere?
    float dist = (wPos.x - cameraPosition.x)*(wPos.x - cameraPosition.x) + (wPos.z - cameraPosition.z)*(wPos.z - cameraPosition.z);
    if(dist > sproutNear) {

        transformed.y -= (dist - sproutNear) / sproutMargin;

        if(dist > sproutFar) {
            doDiscard = 1.0;
        }
    }


    #include <project_vertex>

    // Keeping this here as a maybe.
    if(-mvPosition.z < 10.0) {
        vAlphaTest = 0.5;
    } else {
        vAlphaTest = max(0.2, 0.5 - (-mvPosition.z-10.0) / 110.0);
    }

    // ANIMATION TESTING
    // float tt = time * 0.05;
    // vec2 blowUV = vec2(vGGv.x + tt, vGGv.y + tt);
    // if(uv.y > 0.5) {
    //     float blow = texture2D(noiseMap, blowUV).r;
    //     transformed.x += blow * 0.2;//sin(blow) * 0.2;
    //     transformed.z += blow * 0.2;//cos(blow) * 0.2;
    // }


`,zc=`

    uniform sampler2D noiseMap;
    uniform float radiance;

    varying vec2 vUv;
    varying vec2 vUvOffset;
    varying float vAlphaTest;

    varying float vShadow;
    varying float vAO;
    varying float doDiscard;

    float screen(float a, float b) {
        return 1.0 - ((1.0 - a) * (1.0 - b));
    }


`,Fc=`
    float faceDirection = 1.0;
    vec3 normal = normalize(vNormal);
`,Gc=`

    // Don't draw beyond view dist?
    if(doDiscard > 0.0) {
        discard;
    }

    // Need to alter vLightGrass
    vec4 texelColor = texture2D( map, vUv + vUvOffset );// * (1.0 - vLightGrass * 0.25);

    if(texelColor.a < vAlphaTest) {
        discard;
    }

    diffuseColor *= texelColor;

    //// PREP EMISSIVE?

    totalEmissiveRadiance = texelColor.rgb * radiance * vAO;//texelColor.rgb * 2.0; // * (1.0 - vLightGrass * 0.8);

`,er=`
    varying vec3 vFresnelPos;
    varying vec3 vFresnelNorm;
`,jc=`
    vFresnelPos = vec4(modelMatrix * vec4( position, 1.0 )).xyz;
    vFresnelNorm = normalize( vec3( vec4( normal, 0.0) * modelMatrix ) );

`,tr=`

    uniform float fresnelIntensity;

    varying vec3 vFresnelPos;
    varying vec3 vFresnelNorm;

`,ir=`
    float fresnel = 1.0 - max( 0.0, dot( normalize(cameraPosition - vFresnelPos), vFresnelNorm ) );

    if(fresnel > 0.75) {

        // Highlights

        fresnel = (fresnel - 0.75) * 4.0;
        fresnel *= fresnel * fresnel;

        diffuseColor.rgb *= 1.0 + fresnel * fresnelIntensity * (1.0 - vShadow);

    } else {

        // Lowlights

        // fresnel = 1.0 - max(0.0, (fresnel - 0.25) * 2.0);

        fresnel = 1.0 - fresnel * 1.3333;

        // fresnel *= fresnel;

        fresnel *= fresnelIntensity;

        if(fresnel > 0.25) {
            fresnel = 0.25 + (fresnel - 0.25) * 0.5;
            if(fresnel > 0.5) {
                fresnel = 0.5;
            }
        }

        diffuseColor.rgb *= 1.0 - fresnel;

    }
`,Bc=`
    attribute float bridge;
    varying float vBridge;
`,qc=`
    vBridge = bridge;
`,Wc=`
    uniform sampler2D shadowMap;
    uniform bool useShadowBlend;
    uniform sampler2D bridgeMap;
    uniform bool useBridgeBlend;

    varying float vBridge;
`,Yc=`

#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vMapUv );

    if(useBridgeBlend && vBridge > 0.0) {
        texelColor = mix(texelColor, texture2D( bridgeMap, vMapUv), vBridge);
    }

    if(useShadowBlend && vShadow > 0.0) {
        texelColor = mix(texelColor, texture2D(shadowMap, vMapUv), vShadow);
    }

    totalEmissiveRadiance = texelColor.rgb * radiance;

	diffuseColor *= texelColor;

#endif
`,Ln=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_Direct_Lambert_Spot( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight, float blend ) {

	// Might be something more intelligent I could do here?

	//saturate( (0.1 - abs(dot( geometry.normal, directLight.direction )) * 0.1 ) * blend );

	float dotNL = 0.1 + (1.0 - abs(dot( geometry.normal, directLight.direction ))) * 0.1;
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_Direct_Spot          RE_Direct_Lambert_Spot
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`,Cn=`

GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef USE_CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometry.viewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometry, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		// Could darken it at the bottom...
		// directLight.color *= vUv.y*2.0;

		// Could also pass this in so we know what to do with the normal?

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		// - max(0.0, (1.0 - vRoadProx)) * (1.0 - vUv.y)
		RE_Direct_Spot( directLight, geometry, material, reflectedLight, 1.0);

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, geometry, directLight );

        //// MAGIC LINE TO OVERRIDE DIRECTIONAL LIGHT SHADOW ////

        // TODO - might be best to change the underlying fragment for the scene?

        directLight.color *= 1.0 - vShadow;

        /////////////////////////////////////////////////////////

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,Kc=""+new URL("../assets/noise_fine.9cdaf478.webp",import.meta.url).href,Xc=""+new URL("../assets/noise_finer.56c77b62.webp",import.meta.url).href,Ui="data:image/webp;base64,UklGRowAAABXRUJQVlA4WAoAAAAAAAAAAAAAAAAAVlA4IBgAAABQAQCdASoBAAEAAUAmJaQABAAAAJrDyABQU0FJTgAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBEMAAAAAAA5QYmVXARAABgBQAAAAAA==",Qc=""+new URL("../assets/sea_waves.63ff8729.webp",import.meta.url).href,Fr=""+new URL("../assets/signs.c90afd62.webp",import.meta.url).href,Zc="data:image/webp;base64,UklGRlgBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSMQAAAANgGPb2rHnPO/7f7/tKlZnlU6mmiH8bezKSWnbH97fGUNETAD1IiCmTGN/vqcn9X57fXHn1MUnZnK/tj8Vu1o8tkFPzv2Vwe9P9vct7/2SnrfLgDL4Z/pKJ1JMGk+EsnLN64J/u6yEMmBEBbWEH3mRuAYoG239eAHeLnpFKc8nLr6HR833fmcsiMZWnn85DM6mmfNALPPFsQWcb420aLzf8M9SVAB7bXu2zTJvKycRP/VvpSUrgolZQuPvs5M3pfh3uUxTVlA4IBgAAAAwAQCdASoQABAAAUAmJaQAA3AA/vz0AABQU0FJTgAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBEMAAAAAAA5QYmVXARAABgBQAAAAAA==",Jc=`

uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	#if defined ( LEGACY_LIGHTS )

		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

		}

		return 1.0;

	#else

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	#endif

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometry.position;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometry.position;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`,Rt=jt(Ui),Ms=jt(Kc,4,void 0,ql),$c=jt(Xc,4,void 0,ql);jt(Zc,1);const Ie=new At({map:jt(Ui),displacementMap:jt(Ui),fog:!0});Ie.needsCameraPosition=!0;Ie.userData.grassMap={value:null};Ie.userData.sandMap={value:null};Ie.userData.rockMap={value:null};Ie.userData.rockMapBump={value:null};Ie.userData.gravelMap={value:null};Ie.userData.roadMap={value:null};Ie.userData.forestMap={value:null};Ie.userData.fadeFine={value:Ms};Ie.userData.roadCol={value:[]};Ie.userData.fresnelIntensity={value:.5};Ie.userData.radiance={value:0};Ie.userData.grassColA={value:[]};Ie.userData.grassColB={value:[]};Ie.userData.peakColA={value:[]};Ie.userData.peakColB={value:[]};Ie.userData.vehicleIndex={value:0};Ie.userData.sinkDist={value:400};Ie.userData.seasonIndex={value:1};Ie.onBeforeCompile=s=>(s.uniforms.grassMap=Ie.userData.grassMap,s.uniforms.sandMap=Ie.userData.sandMap,s.uniforms.rockMap=Ie.userData.rockMap,s.uniforms.rockMapBump=Ie.userData.rockMapBump,s.uniforms.gravelMap=Ie.userData.gravelMap,s.uniforms.roadMap=Ie.userData.roadMap,s.uniforms.forestMap=Ie.userData.forestMap,s.uniforms.fadeFine=Ie.userData.fadeFine,s.uniforms.grassColA=Ie.userData.grassColA,s.uniforms.grassColB=Ie.userData.grassColB,s.uniforms.peakColA=Ie.userData.peakColA,s.uniforms.peakColB=Ie.userData.peakColB,s.uniforms.roadCol=Ie.userData.roadCol,s.uniforms.fresnelIntensity=Ie.userData.fresnelIntensity,s.uniforms.radiance=Ie.userData.radiance,s.uniforms.sinkDist=Ie.userData.sinkDist,s.uniforms.vehicleIndex=Ie.userData.vehicleIndex,s.uniforms.shadowFactor=us,s.uniforms.seasonIndex=Ie.userData.seasonIndex,s.vertexShader=s.vertexShader.replace("#include <displacementmap_pars_vertex>",$d+er),s.vertexShader=s.vertexShader.replace("#include <displacementmap_vertex>",ec),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",""),s.fragmentShader=s.fragmentShader.replace("#include <lights_fragment_begin>","#include <lights_fragment_begin_shadow>"),s.fragmentShader=s.fragmentShader.replace("#include <map_pars_fragment>",tc+tr),s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",ic+ir),s.fragmentShader=s.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;"),s);const pi=new At({map:jt(Ui),alphaTest:.75});pi.needsCameraPosition=!0;pi.userData.shadowMap={value:Rt};pi.userData.bridgeMap={value:Rt};pi.userData.useShadowBlend={value:!1};pi.userData.useBridgeBlend={value:!1};pi.onBeforeCompile=s=>(s.uniforms.fresnelIntensity=Ie.userData.fresnelIntensity,s.uniforms.radiance=Ie.userData.radiance,s.uniforms.shadowMap=pi.userData.shadowMap,s.uniforms.useShadowBlend=pi.userData.useShadowBlend,s.uniforms.bridgeMap=pi.userData.bridgeMap,s.uniforms.useBridgeBlend=pi.userData.useBridgeBlend,s.uniforms.shadowFactor=us,s.vertexShader=s.vertexShader.replace("#include <displacementmap_pars_vertex>",`#include <displacementmap_pars_vertex>
`+Bc+gd+er),s.vertexShader=s.vertexShader.replace("#include <displacementmap_vertex>",`#include <displacementmap_vertex>
`+qc+pd+jc),s.fragmentShader=s.fragmentShader.replace("#include <map_pars_fragment>",`#include <map_pars_fragment>
uniform float radiance;
`+Wc+_d+tr),s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",Yc+ir),s.fragmentShader=s.fragmentShader.replace("#include <lights_fragment_begin>","#include <lights_fragment_begin_shadow>"),s.fragmentShader=s.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;"),s);const eh=new Es({depthTest:!0,fog:!0,wireframe:!1,toneMapped:!0});eh.needsCameraPosition=!0;const at=new Es({depthTest:!1,fog:!0,map:Rt,toneMapped:!0,side:Oi});at.needsCameraPosition=!0;at.userData.highlight={value:new As(16777215)};at.userData.lowlight={value:new As(15658734)};at.userData.hasClouds={value:!0};at.userData.camPos={value:new gi};at.userData.time={value:0};at.userData.shelfHeight0={value:1e3};at.userData.shelfHeight1={value:1200};at.userData.skyScale0={value:6e3};at.userData.skyScale1={value:3e3};at.userData.mode={value:0};at.userData.altitude={value:200};at.customProgramCacheKey=()=>"clouds";at.onBeforeCompile=s=>(s.uniforms.highlight=at.userData.highlight,s.uniforms.lowlight=at.userData.lowlight,s.uniforms.hasClouds=at.userData.hasClouds,s.uniforms.camPos=at.userData.camPos,s.uniforms.time=at.userData.time,s.uniforms.shelfHeight0=at.userData.shelfHeight0,s.uniforms.shelfHeight1=at.userData.shelfHeight1,s.uniforms.skyScale0=at.userData.skyScale0,s.uniforms.skyScale1=at.userData.skyScale1,s.uniforms.mode=at.userData.mode,s.uniforms.altitude=at.userData.altitude,s.vertexShader=s.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
`+Wd),s.vertexShader=s.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
`+Yd),s.vertexShader=s.vertexShader.replace("#include <fog_pars_vertex>",Xd),s.vertexShader=s.vertexShader.replace("#include <fog_vertex>",Qd),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",Kd),s.fragmentShader=s.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
`+Zd),s.fragmentShader=s.fragmentShader.replace("#include <fog_fragment>",`#include <fog_fragment>
`+Jd),s);let ms=new Es({});ms.userData.camPos={value:new gi};ms.userData.waves={value:jt(Qc,4,void 0,Bn)};ms.userData.body={value:new As};ms.userData.highlight={value:new As};ms.userData.time={value:0};ms.needsCameraPosition=!0;const Qt={dissolveNear:{value:175},dissolveFar:{value:250},dissolveInterval:{value:75},radiance:{value:.5},discolourationFactor:{value:1},hasSnow:{value:!1}};function Gr(s=!1){let e=new At({map:Rt,normalMap:s?null:Rt,alphaMap:s?Rt:null,alphaTest:s?.4:.5,side:Oi,normalMapType:s?null:Js,forceSinglePass:!0,customProgramCacheKey:()=>"tree"});return e.needsCameraPosition=!0,s?e.onBeforeCompile=t=>(t.uniforms.noiseMap={value:Ms},t.uniforms.dissolveNear=Qt.dissolveNear,t.uniforms.dissolveFar=Qt.dissolveFar,t.uniforms.dissolveInterval=Qt.dissolveInterval,t.uniforms.discolourationFactor=Qt.discolourationFactor,t.uniforms.shadowFactor=us,t.vertexShader=t.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
`+sc),t.vertexShader=t.vertexShader.replace("#include <project_vertex>",ac),t.fragmentShader=t.fragmentShader.replace("#include <normal_fragment_begin>",fc),t.fragmentShader=t.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
`+oc),t.fragmentShader=t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+cc),t.fragmentShader=t.fragmentShader.replace("#include <lights_lambert_pars_fragment>",uc),t.fragmentShader=t.fragmentShader.replace("#include <lights_fragment_begin>",hc),t.fragmentShader=t.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;"),t):e.onBeforeCompile=t=>(t.uniforms.noiseMap={value:Ms},t.uniforms.dissolveNear=Qt.dissolveNear,t.uniforms.dissolveFar=Qt.dissolveFar,t.uniforms.dissolveInterval=Qt.dissolveInterval,t.uniforms.radiance=Qt.radiance,t.uniforms.discolourationFactor=Qt.discolourationFactor,t.uniforms.shadowFactor=us,t.uniforms.hasSnow=Qt.hasSnow,t.vertexShader=t.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
`+vc),t.vertexShader=t.vertexShader.replace("#include <project_vertex>",gc),t.fragmentShader=t.fragmentShader.replace("#include <normal_fragment_begin>",Xo),t.fragmentShader=t.fragmentShader.replace("#include <alphatest_fragment>",bc),t.fragmentShader=t.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
`+pc),t.fragmentShader=t.fragmentShader.replace("#include <map_fragment>",`#include <map_fragment>
`+_c),t.fragmentShader=t.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
`+wc),t.fragmentShader=t.fragmentShader.replace("#include <lights_lambert_pars_fragment>",Dc),t.fragmentShader=t.fragmentShader.replace("#include <lights_fragment_begin>",Sc),t.fragmentShader=t.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;"),t),e}Gr(),Gr(!0);new At({map:Rt,alphaTest:.25,side:Oi,forceSinglePass:!0});new At({color:110832});const Ft=new At({map:jt(Ui,0,qn),normalMap:jt(Ui,0,void 0,ql),normalMapType:Js,alphaTest:.5,forceSinglePass:!0});Ft.needsCameraPosition=!0;Ft.userData.noiseMap={value:Ms};Ft.userData.mapB={value:jt(Ui)};Ft.userData.normalMapB={value:jt(Ui)};Ft.userData.dissolveNear={value:100};Ft.userData.dissolveFar={value:200};Ft.userData.dissolveInterval={value:100};Ft.onBeforeCompile=s=>{s.uniforms.noiseMap=Ft.userData.noiseMap,s.uniforms.mapB=Ft.userData.mapB,s.uniforms.normalMapB=Ft.userData.normalMapB,s.uniforms.dissolveNear=Ft.userData.dissolveNear,s.uniforms.dissolveFar=Ft.userData.dissolveFar,s.uniforms.dissolveInterval=Ft.userData.dissolveInterval,s.uniforms.radiance=Qt.radiance,s.uniforms.discolourationFactor=Qt.discolourationFactor,s.uniforms.hasSnow=Qt.hasSnow,s.vertexShader=s.vertexShader.replace("#define LAMBERT",`#define LAMBERT
`+Lc),s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
`+kc),s.vertexShader=s.vertexShader.replace("#include <beginnormal_vertex>",Cc+`
`+Ic),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",Mc),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_begin>",Xo),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_maps>",Tc),s.fragmentShader=s.fragmentShader.replace("#define LAMBERT",`#define LAMBERT
`+Ec),s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",Ac),s.fragmentShader=s.fragmentShader.replace("#include <lights_fragment_begin>",Pc),s.fragmentShader=s.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular * totalEmissiveRadiance;")};let th=.25;const bi=new At({map:Rt,alphaTest:th,side:Oi,forceSinglePass:!0});bi.needsCameraPosition=!0;bi.userData.noiseMap={value:Ms};bi.userData.sproutNear={value:100*100};bi.userData.sproutFar={value:200*200};bi.customProgramCacheKey=()=>"grass";bi.onBeforeCompile=s=>{s.uniforms.noiseMap=bi.userData.noiseMap,s.uniforms.sproutNear=bi.userData.sproutNear,s.uniforms.sproutFar=bi.userData.sproutFar,s.uniforms.grassColA=Ie.userData.grassColA,s.uniforms.grassColB=Ie.userData.grassColB,s.uniforms.peakColA=Ie.userData.peakColA,s.uniforms.peakColB=Ie.userData.peakColB,s.uniforms.fresnelIntensity=Ie.userData.fresnelIntensity,s.uniforms.radiance=Ie.userData.radiance,s.uniforms.shadowFactor=us,s.vertexShader=s.vertexShader.replace("#include <common>","#include <common>"+Nc+er),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",""+xc),s.fragmentShader=s.fragmentShader.replace("#include <common>","#include <common>"+Rc+tr),s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",Oc+`
`+ir),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_begin>",Uc),s.fragmentShader=s.fragmentShader.replace("#include <lights_lambert_pars_fragment>",Ln),s.fragmentShader=s.fragmentShader.replace("#include <lights_fragment_begin>",Cn),s.fragmentShader=s.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;")};let ih=.5;const Zt=new At({map:Rt,alphaTest:ih,side:Oi,forceSinglePass:!0});Zt.needsCameraPosition=!0;Zt.userData.noiseMap={value:$c};Zt.userData.sproutNear={value:100*100};Zt.userData.sproutFar={value:200*200};Zt.userData.sproutMargin={value:Zt.userData.sproutFar.value-Zt.userData.sproutNear.value};Zt.onBeforeCompile=s=>{s.uniforms.noiseMap=Zt.userData.noiseMap,s.uniforms.sproutNear=Zt.userData.sproutNear,s.uniforms.sproutFar=Zt.userData.sproutFar,s.uniforms.sproutMargin=Zt.userData.sproutMargin,s.uniforms.radiance=Ie.userData.radiance,s.uniforms.shadowFactor=us,s.vertexShader=s.vertexShader.replace("#include <common>","#include <common>"+Vc),s.vertexShader=s.vertexShader.replace("#include <project_vertex>",""+Hc),s.fragmentShader=s.fragmentShader.replace("#include <common>","#include <common>"+zc),s.fragmentShader=s.fragmentShader.replace("#include <map_fragment>",Gc),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_begin>",Fc),s.fragmentShader=s.fragmentShader.replace("#include <lights_lambert_pars_fragment>",Ln),s.fragmentShader=s.fragmentShader.replace("#include <lights_fragment_begin>",Cn),s.fragmentShader=s.fragmentShader.replace("vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;","vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directDiffuse * totalEmissiveRadiance;")};const kn=new At({map:Rt,normalMap:Rt,alphaTest:.5,side:Oi,normalMapType:Js,forceSinglePass:!0,customProgramCacheKey:()=>"barrier"});kn.onBeforeCompile=$s();kn.needsCameraPosition=!0;const In=new At({map:Rt,flatShading:!0});In.onBeforeCompile=$s();In.needsCameraPosition=!0;const Mn=new At({map:Rt,normalMap:Rt,flatShading:!0,alphaTest:.25,side:Oi,normalMapType:Js,forceSinglePass:!0,customProgramCacheKey:()=>"fence"});Mn.onBeforeCompile=$s();Mn.needsCameraPosition=!0;const En=new At({map:Rt,flatShading:!0});En.onBeforeCompile=$s();En.needsCameraPosition=!0;const sh=new At({map:Rt,flatShading:!0,side:Oi});sh.needsCameraPosition=!0;const sr={white:new At({color:16777215,emissive:16777215,emissiveIntensity:.2}),black:new At({color:3355443,flatShading:!0}),reflect:new At({color:16720418,emissive:16720418,emissiveIntensity:.2})};sr.white.needsCameraPosition=!0;sr.black.needsCameraPosition=!0;sr.reflect.needsCameraPosition=!0;const lr=new At({map:jt(Fr,4),flatShading:!0,alphaTest:.75,emissive:16777215,emissiveMap:jt(Fr,4),emissiveIntensity:0});lr.onBeforeCompile=s=>(s.fragmentShader=s.fragmentShader.replace("#include <lights_pars_begin>",Jc),s);lr.needsCameraPosition=!0;const lh=new At({map:Rt,color:12303291,flatShading:!0});lh.needsCameraPosition=!0;const rh=new Es({color:0,transparent:!0,opacity:.4});rh.needsCameraPosition=!0;let jr,Br=16,ah=0,Ki=5e3,kl=11,qr=4,oh=2,gs=1e4,Il=.8,ps=4e3;const S={id:0},Ct={},kt={};class nh extends bd{constructor(t={}){super(t);F(this,"debug",!0);F(this,"config",{seed:"a",scale:1,offset:0,resolution:5,upresFactor:2,depth:3,depthHeightFactor:1,layerResolutions:[],squared:!1,temper:!1,temperBelow:100,temperMin:.25,spiralise:!0,maxCached:32,tileScaleRandom:0,tileSize:3e3,repeated:!1});F(this,"distortMap");this.config={...this.config,...t},this.config.layerResolutions.length?this.config.depth=this.config.layerResolutions.length:this.generateLayerResolutions()}generateLayerResolutions(){let t=this.config.resolution;for(let i=0;i<this.config.depth;i++)this.layerResolutions.push(t),t=t+this.config.upresFactor*(i+1)}generateTile(t,i){let l=[],a=new window.alea(this.config.seed+"#"+this.curLayer[t<0?0:1]+"#"+t+"#"+i),r=1+a()*this.config.tileScaleRandom-this.config.tileScaleRandom/2,o,n,d,h=this.config.depthHeightFactor;for(o=0;o<this.config.depth;o++){n=this.config.layerResolutions[o],d=this.config.resolution/n*h,h*=this.config.depthHeightFactor;let u=[],g=1/n,p;for(Ct.i=0;Ct.i<n;Ct.i++){for(p=[],Ct.j=0;Ct.j<n;Ct.j++)Ct.h=a()*2-1,this.config.squared&&(Ct.h<0?Ct.h*=-(Ct.h*(1+Ct.h))*4:Ct.h*=Ct.h*(1-Ct.h)*4),Ct.h*=d,p.push({x:(Ct.i+.5)/n,y:Ct.h*this.config.scale*r,z:(Ct.j+.5)/n,r:g,r2:g*g});u.push(p)}l.push(u)}return l}getRoadBlendedXZ(t,i,l){return kt.h=0,l.h=l.n.h+l.t*(l.n.next.h-l.n.h),l.gfa=l.n.gfa+l.t*(l.n.next.gfa-l.n.gfa),l.ga=Math.max(Math.abs(l.g),Math.abs(l.h))/3.6,l.w=jr+ah+l.ga,l.y-=.01+.01*l.gfa,l.ga=1-l.ga*l.ga,kt.rm=Br*.25+Br*Math.min(.75,Math.max(.4,l.ga)),l.d<l.w+S.rm?l.d<jr&&!l.n.bridge?l.y:(kt.lt=Math.max(0,Math.min(1,2*(l.d-l.w)/S.rm)),kt.lt=this.roadLerp(kt.lt),kt.h=this.getXZ(t,i),l.n.bridge&&kt.h<0&&(kt.h>-l.y?kt.lt=Math.max(kt.lt,kt.h/-l.y):kt.lt=1),kt.h*kt.lt+l.y*(1-kt.lt)):this.getXZ(t,i)}roadLerp(t){return t>.3333?(kt.lerp=1-(t-.3333)/.6667,1-kt.lerp*kt.lerp*.5):t*1.5}getCurvature(t,i){return 0}getTile(t,i){return this.config.repeated?super.getTile(0,0):super.getTile(t,i)}getXZ(t,i,l=null,a=!1){S.d=0,S.h=0,S.heightFactor=1,S.sq=this.config.layerResolutions[0],S.sqb=S.sq-1,S.wx=t/this.config.tileSize,S.wz=i/this.config.tileSize,S.ox=Math.floor(S.wx),S.oz=Math.floor(S.wz),S.px=S.wx-S.ox,S.pz=S.wz-S.oz,S.tile=this.getTile(S.ox,S.oz),l=l||this.config.depth,S.depth=0;for(S.layer of S.tile){if(S.depth==l)break;S.ix=Math.floor(S.px*S.sq-.5),S.iz=Math.floor(S.pz*S.sq-.5),S.th=0,S.ix>=0?(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix][S.iz]):S.th+=this.lerpHeight(S.d,S.px,S.pz+1,this.getTile(S.ox,S.oz-1)[S.depth][S.ix][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px,S.pz-1,this.getTile(S.ox,S.oz+1)[S.depth][S.ix][0])):(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px+1,S.pz,this.getTile(S.ox-1,S.oz)[S.depth][S.sqb][S.iz]):S.th+=this.lerpHeight(S.d,S.px+1,S.pz+1,this.getTile(S.ox-1,S.oz-1)[S.depth][S.sqb][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px+1,S.pz,this.getTile(S.ox-1,S.oz)[S.depth][S.sqb][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px+1,S.pz-1,this.getTile(S.ox-1,S.oz+1)[S.depth][S.sqb][0])),S.ix<S.sqb?(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix+1][S.iz]):S.th+=this.lerpHeight(S.d,S.px,S.pz+1,this.getTile(S.ox,S.oz-1)[S.depth][S.ix+1][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix+1][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px,S.pz-1,this.getTile(S.ox,S.oz+1)[S.depth][S.ix+1][0])):(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px-1,S.pz,this.getTile(S.ox+1,S.oz)[S.depth][0][S.iz]):S.th+=this.lerpHeight(S.d,S.px-1,S.pz+1,this.getTile(S.ox+1,S.oz-1)[S.depth][0][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px-1,S.pz,this.getTile(S.ox+1,S.oz)[S.depth][0][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px-1,S.pz-1,this.getTile(S.ox+1,S.oz+1)[S.depth][0][0])),S.temper=1,this.config.temper&&S.depth>0&&(S.temper=Math.min(Math.max(this.config.temperMin,(S.h+this.config.offset+this.config.temperBase)/this.config.temperBelow),1)),S.h+=S.th*S.temper,S.depth++,S.sq=this.config.layerResolutions[S.depth],S.sqb=S.sq-1}return S.h+this.config.offset}getXZLayer(t,i,l,a=this.config.depth){S.d=0,S.h=0,S.heightFactor=1,S.sq=this.config.layerResolutions[0],S.sqb=S.sq-1,S.wx=t/this.config.tileSize,S.wz=i/this.config.tileSize,S.ox=Math.floor(S.wx),S.oz=Math.floor(S.wz),S.px=S.wx-S.ox,S.pz=S.wz-S.oz,S.tile=this.getTile(S.ox,S.oz),a=a||this.config.depth,S.depth=0,S.i=0;for(S.layer of S.tile){if(S.depth==a)break;if(S.i++!==l){S.depth++,S.sq=this.config.layerResolutions[S.depth],S.sqb=S.sq-1;continue}S.ix=Math.floor(S.px*S.sq-.5),S.iz=Math.floor(S.pz*S.sq-.5),S.th=0,S.ix>=0?(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix][S.iz]):S.th+=this.lerpHeight(S.d,S.px,S.pz+1,this.getTile(S.ox,S.oz-1)[S.depth][S.ix][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px,S.pz-1,this.getTile(S.ox,S.oz+1)[S.depth][S.ix][0])):(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px+1,S.pz,this.getTile(S.ox-1,S.oz)[S.depth][S.sqb][S.iz]):S.th+=this.lerpHeight(S.d,S.px+1,S.pz+1,this.getTile(S.ox-1,S.oz-1)[S.depth][S.sqb][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px+1,S.pz,this.getTile(S.ox-1,S.oz)[S.depth][S.sqb][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px+1,S.pz-1,this.getTile(S.ox-1,S.oz+1)[S.depth][S.sqb][0])),S.ix<S.sqb?(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix+1][S.iz]):S.th+=this.lerpHeight(S.d,S.px,S.pz+1,this.getTile(S.ox,S.oz-1)[S.depth][S.ix+1][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px,S.pz,S.layer[S.ix+1][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px,S.pz-1,this.getTile(S.ox,S.oz+1)[S.depth][S.ix+1][0])):(S.iz>=0?S.th+=this.lerpHeight(S.d,S.px-1,S.pz,this.getTile(S.ox+1,S.oz)[S.depth][0][S.iz]):S.th+=this.lerpHeight(S.d,S.px-1,S.pz+1,this.getTile(S.ox+1,S.oz-1)[S.depth][0][S.sqb]),S.iz<S.sqb?S.th+=this.lerpHeight(S.d,S.px-1,S.pz,this.getTile(S.ox+1,S.oz)[S.depth][0][S.iz+1]):S.th+=this.lerpHeight(S.d,S.px-1,S.pz-1,this.getTile(S.ox+1,S.oz+1)[S.depth][0][0])),S.h+=S.th*S.temper;break}return S.h+this.config.offset}lerpHeight(t,i,l,a){return t=(a.x-i)*(a.x-i)+(a.z-l)*(a.z-l),t<a.r2?this.smootherLerp(t/a.r2)*a.y:0}}const vi=new Wn,ks=class ks extends cd{constructor(t){super(t);F(this,"container",new fs);F(this,"treeMesh");F(this,"instanceVariant");F(this,"instanceOrientation");F(this,"instanceDissolve");F(this,"maxCount",Ki);F(this,"curIndex",0);F(this,"isFull",!1);this.treeMesh=new Wl(ks.protoGeo.clone(),Ft,Ki),this.treeMesh.renderOrder=20,this.treeMesh.geometry.setAttribute("variant",new _i(new Float32Array(Ki),1)),this.treeMesh.geometry.setAttribute("orientation",new _i(new Float32Array(Ki),1)),this.treeMesh.geometry.setAttribute("dissolve",new _i(new Float32Array(Ki),1)),this.treeMesh.geometry.setAttribute("type",new _i(new Float32Array(Ki),1)),this.instanceVariant=this.treeMesh.geometry.attributes.variant,this.instanceVariant.setUsage(Kt),this.instanceOrientation=this.treeMesh.geometry.attributes.orientation,this.instanceOrientation.setUsage(Kt),this.instanceDissolve=this.treeMesh.geometry.attributes.dissolve,this.instanceDissolve.setUsage(Kt),this.instanceType=this.treeMesh.geometry.attributes.type,this.instanceType.setUsage(Kt),this.instanceMatrix=this.treeMesh.instanceMatrix,this.treeMesh.instanceMatrix.setUsage(Kt),this.treeMesh.boundingSphere=new Qo,this.treeMesh.computeBoundingSphere=()=>{},this.treeMesh.geometry.computeBoundingSphere=()=>{},this.container.add(this.treeMesh)}reset(){this.curIndex=0,this.treeMesh.count=0,this.isFull=!1}retire(){super.retire(),this.reset()}destroy(){super.destroy(),this.treeMesh.geometry.dispose(),delete this.instanceVariant,delete this.instanceOrientation,delete this.instanceDissolve,delete this.instanceType,delete this.instanceMatrix}setBoundingSphere(t){this.treeMesh.boundingSphere.center.copy(t.center),this.treeMesh.boundingSphere.radius=t.radius}addInstance(t,i,l,a=0,r=0){this.isFull||(this.treeMesh.setMatrixAt(this.curIndex,t),this.instanceVariant.array[this.curIndex]=i,this.instanceOrientation.array[this.curIndex]=l,this.instanceType.array[this.curIndex]=a,this.instanceDissolve.array[this.curIndex]=r,this.curIndex++,this.isFull=this.curIndex>=Ki)}hideInstance(t){this.treeMesh.getMatrixAt(t,vi),vi.setPosition(vi.elements[12],-1e5,vi.elements[14]),this.treeMesh.setMatrixAt(t,vi),this.instanceMatrix.needsUpdate=!0}prepCellInstance(t,i,l){this.treeMesh.getMatrixAt(t,vi),vi.setPosition(vi.elements[12],i,vi.elements[14]),this.treeMesh.setMatrixAt(t,vi),l?this.instanceDissolve.array[t]=1:this.instanceDissolve.array[t]=0}finalise(){this.instanceMatrix.needsUpdate=!0,this.instanceVariant.needsUpdate=!0,this.instanceOrientation.needsUpdate=!0,this.instanceType.needsUpdate=!0,this.instanceDissolve.needsUpdate=!0,this.treeMesh.count=Math.min(this.maxCount,Math.max(0,this.curIndex)),this.treeMesh.count==0?this.treeMesh.visible=!1:this.treeMesh.visible=!0}finaliseChunk(){this.instanceMatrix.needsUpdate=!0,this.instanceDissolve.needsUpdate=!0}static makeProtoGeo(){let t=new Yl,i=new Float32Array([-.5,0,0,-.5,1,0,.5,1,0,.5,0,0]);t.setAttribute("position",new es(i,3));let l=new Float32Array([.0625,0,.0625,1/qr-.002,0,1/qr-.002,0,0]);t.setAttribute("uv",new es(l,2));let a=[0,1,2,0,2,3];return t.setIndex(a),t.scale(kl,kl,kl),t}};F(ks,"protoGeo",ks.makeProtoGeo());let Wr=ks;const dh=3,ch=20,hh=Math.PI*2,Yr=2,fe={};class fh{constructor(e=dh,t=ch,i="perlin"){F(this,"layers",[]);F(this,"amplitudeFactor",1);this.depth=e,this.res=t;let l=new wd(i);for(let o=0;o<e;o++){let n=[];for(let d=0;d<t;d++){let h=[];for(let u=0;u<t;u++){let g=l.next()*hh;h.push({x:Math.cos(g),y:Math.sin(g)})}h.push({...h[0]}),n.push(h)}n.push([...n[0]]),this.layers.push(n),t*=Yr}let a=0,r=1;for(let o=0;o<e;o++)a+=r,r/=2;this.amplitudeFactor=1/a,this.amplitudeFactor=.5+this.amplitudeFactor*.5}get(e,t){fe.x=e-Math.floor(e),fe.z=t-Math.floor(t),fe.res=this.res,fe.v=0,fe.a=this.amplitudeFactor;for(fe.l of this.layers)fe.sx=fe.x*fe.res,fe.sz=fe.z*fe.res,fe.ix=Math.floor(fe.sx),fe.ix1=fe.ix+1,fe.iz=Math.floor(fe.sz),fe.iz1=fe.iz+1,fe.qx=fe.sx-fe.ix,fe.qz=fe.sz-fe.iz,fe.n0=this.dotGridGradient(fe.l[fe.ix][fe.iz],fe.ix,fe.iz,fe.sx,fe.sz),fe.n1=this.dotGridGradient(fe.l[fe.ix1][fe.iz],fe.ix1,fe.iz,fe.sx,fe.sz),fe.int0=this.smoothLerp(fe.n0,fe.n1,fe.qx),fe.n2=this.dotGridGradient(fe.l[fe.ix][fe.iz1],fe.ix,fe.iz1,fe.sx,fe.sz),fe.n3=this.dotGridGradient(fe.l[fe.ix1][fe.iz1],fe.ix1,fe.iz1,fe.sx,fe.sz),fe.int1=this.smoothLerp(fe.n2,fe.n3,fe.qx),fe.v+=this.smoothLerp(fe.int0,fe.int1,fe.qz)*fe.a,fe.a/=2,fe.res*=Yr;return fe.v+.5}dotGridGradient(e,t,i,l,a){return(l-t)*e.x+(a-i)*e.y}smootherLerp(e,t,i){return(t-e)*((i*(i*6-15)+10)*i*i*i)+e}smoothLerp(e,t,i){return e+(t-e)*(i*i*(3-2*i))}}const Kr=new Ko([0,0]);let Xr=[[[5.28,8.81],[4.07,4.7],[8.36,8.29],[.73,6.62]],[[4.81,3.69],[2.11,6.46],[8.58,2.78],[7.66,8.88]],[[2.04,2.85],[5.76,7.39],[6.07,2.44],[3.46,5.57]],[[3.91,7.36],[3.93,2.11],[7.27,9.11],[7.9,4.54]],[[4.81,7.08],[1.42,8.06],[1.36,4.91],[8.31,7.76]],[[4.77,4.89],[1.14,2.74],[7.4,2.45],[7.49,9.23]],[[1.64,8.36],[5.85,2.37],[6.85,7.86],[2.42,2.18]],[[7.25,6.91],[3.67,4.08],[7.77,2.79],[2.88,6.94]]],Qr=[[[.97,1.21],[4.37,1.4],[3.03,1.17],[.33,1.77]],[[1.91,1.11],[5.23,1.17],[5.35,1.08],[2.88,1.51]],[[4.78,1.12],[5.24,1.27],[.42,1.48],[1.46,1.51]],[[3.26,1.16],[1.42,1.3],[6.06,1.34],[.08,1.48]]],Zr=[[1,3,0,0],[0,2,1,0],[2,3,1,2],[3,1,3,2],[2,0,3,0],[3,3,0,1]];const uh=[[[0,0,1,0],[0,3,0,0],[0,0,0,0],[0,0,2,0]],[[1,3,1,1],[1,3,1,0],[3,1,0,1],[0,1,1,1]],[[2,2,0,2],[1,2,2,2],[2,3,2,2],[2,2,2,2]],[[3,1,3,3],[0,3,3,3],[3,0,2,3],[1,3,3,3]]];let vh=[[[2,2,2,1],[2,0,2,2],[2,2,2,2],[0,2,2,2]],[[3,0,3,3],[3,3,3,0],[1,3,3,3],[3,3,3,3]],[[0,0,1,0],[1,0,0,0],[2,0,0,0],[0,0,0,0]],[[1,0,1,0],[0,1,3,1],[1,1,3,1],[1,1,1,1]]],mh=.46,gh=.58,ph=.7,_h=.46,bh=.58,wh=.7,yh=4;const Cs=[];for(let s=0;s<oh;s++){let e=[];for(let t=0;t<Xr.length;t++)for(let i=0;i<Qr.length;i++)for(let l=0;l<Zr.length;l++)e.push({t:Xr[t],p:Qr[i],v:Zr[l]});Cs.push(e)}const Jr=Cs[0].length,$r=new fh(4,4),ea=new yn("slowroads",Jr*3,Jr),ta=new yn("slowroads",31,yh),Sh=new ts("slowroads",101),Se={get:{i:0,a:[],c:0,t:0},vs:[0,0,0,0]};class Dh{constructor(){F(this,"map");F(this,"onHeightmapLayersChangedBound",this.onHeightmapLayersChanged.bind(this));Kr.addListener(this.onHeightmapLayersChangedBound)}onHeightmapLayersChanged(e){this.map&&this.map.setLayers(e)}init(e,t){this.map=new nh({seed:e,...t}),this.map.setLayers(Kr.value),this.typeMap=new yd({seed:e,scale:1,resolution:11,depth:4,upscale:2,offset:.45})}getDensityAt(e,t){return 1-Math.max(Math.min(1,this.map.getXZ(e,t)),0)}getShadowDensityAt(e,t){return Se.d=1-Math.max(Math.min(1,this.map.getXZ(e,t)),0),Se.d>.05?Math.min(1,Se.d*1.5+.3):0}getTypeAt(e,t){return Math.max(Math.min(1,Math.round(this.typeMap.getXZ(e,t))),0)}getTreesAt(e,t){return Se.get.d=this.getDensityAt(e,t),Se.dd=(Se.get.d-.001)*4,Se.ddd=Se.dd%1,Se.dd*=.8,Se.dd=Math.floor(Se.dd),Sh.next()<Se.ddd&&Se.dd++,Se.get.c=Se.dd,Se.get.c<=0?(Se.get.c=0,Se.get):(We.detail<2&&Se.get.c>2?Se.get.c=2:Se.get.c>3&&(Se.get.c=3),Se.get.i=ea.next(),Se.get.y=this.getTypeAt(e,t),Se.get.a=Cs[Se.get.y][Se.get.i],Se.get.y==0?(Se.pn=$r.get(e/1e3,t/1e3),Se.vn=0,Se.pn>mh&&(Se.pn<gh?Se.vn=1:Se.pn<ph?Se.vn=2:Se.vn=3),Se.get.v=uh[Se.vn][ta.next()]):(Se.pn=$r.get(e/2e3,t/2e3),Se.get.c<2&&We.detail>0&&(Se.get.c=2),Se.vn=0,Se.pn>_h&&(Se.pn<bh?Se.vn=1:Se.pn<wh?Se.vn=2:Se.vn=3),Se.get.v=vh[Se.vn][ta.next()]),Se.get.t=0,Se.get)}getArrangementIndex(e,t){return 0}getArrangement(e,t=0){return Cs[t][e]}getTreesForDensity(e,t=0){return e<.2?[]:Cs[t][ea.next()]}addExtraTree(e,t,i,l,a,r,o){return-1}removeExtraTree(e,t,i){}}new Dh;new ts("slowroads",119,Math.PI*2);new ts("slowroads",97,.4,-.8);new hd;const Pi=new fs;Pi.rotation.order="XZY";const Ji=class Ji extends cn{constructor(){super(...arguments);F(this,"matrixNeedsUpdate",!1)}init(t){this.maxCount=gs,this.mesh=new Wl(Ji.protoGeo.clone(),bi,gs),this.mesh.matrixAutoUpdate=!1,this.mesh.geometry.setAttribute("groundNormal",new _i(new Float32Array(gs*3),3)),this.instanceNormal=this.mesh.geometry.attributes.groundNormal,this.instanceNormal.setUsage(Kt),this.mesh.geometry.setAttribute("shadow",new _i(new Float32Array(gs*1),1)),this.instanceShadow=this.mesh.geometry.attributes.shadow,this.instanceShadow.setUsage(Kt),this.mesh.geometry.setAttribute("roadProx",new _i(new Float32Array(gs*1),1)),this.instanceRoadProx=this.mesh.geometry.attributes.roadProx,this.instanceRoadProx.setUsage(Kt),this.mesh.instanceMatrix.setUsage(Kt),this.mesh.receiveShadow=!0,t.add(this.mesh),this.reset(),this.postInit()}addGrass(t,i,l,a,r,o,n,d,h,u,g){this.curIndex==0&&(this.matrixNeedsUpdate=!0,this.ox=t,this.oz=l),g>this.retireIndex&&(this.retireIndex=g),Pi.position.set(t-this.ox,i,l-this.oz),this.instanceNormal.array[this.curIndex*3]=a,this.instanceNormal.array[this.curIndex*3+1]=r,this.instanceNormal.array[this.curIndex*3+2]=o,this.instanceShadow.array[this.curIndex]=h,this.instanceRoadProx.array[this.curIndex]=u,Pi.rotation.y=n,Pi.rotation.z=-Math.asin(a),Pi.rotation.x=Math.asin(o),Pi.scale.set(d,d,d),Pi.updateMatrix(),this.mesh.setMatrixAt(this.curIndex,Pi.matrix),this.curIndex++,this.isFull=this.curIndex>=this.maxCount,this.updateBounds(t-this.ox,i,l-this.oz)}update(){super.update(),this.instanceNormal.needsUpdate=!0,this.instanceShadow.needsUpdate=!0,this.instanceRoadProx.needsUpdate=!0,this.matrixNeedsUpdate&&(this.matrixNeedsUpdate=!1,this.mesh.position.x=this.ox,this.mesh.position.z=this.oz,this.mesh.updateMatrix())}static makeProtoGeo(){let t=new Yl,i=new Float32Array([-.5,0,0,-.5,1,0,.5,1,0,.5,0,0,0,0,.5,0,1,.5,0,1,-.5,0,0,-.5]);t.setAttribute("position",new es(i,3));let l=new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]);t.setAttribute("normal",new es(l,3));let a=new Float32Array([.01,0,.01,.99,.24,.99,.24,0,.01,0,.01,.99,.24,.99,.24,0]);t.setAttribute("uv",new es(a,2));let r=[0,1,2,0,2,3,4,5,6,4,6,7];return t.setIndex(r),t.scale(Il,Il,Il),t.computeBoundingSphere=()=>{},t.boundingSphere=new Qo,t}destroy(){Ji.protoGeo&&Ji.protoGeo.dispose(),this.mesh.geometry.dispose()}};F(Ji,"protoGeo",Ji.makeProtoGeo());let Hl=Ji;class Lh extends hn{addGrass(e,t,i,l,a,r,o,n,d,h,u){this.curInstance.addGrass(e,t,i,l,a,r,o,n,d,h,u),this.checkCycleInstances()}}new Lh(Hl,3,"grass");const Ch="data:model/obj;base64,IyBCbGVuZGVyIDMuNi4yCiMgd3d3LmJsZW5kZXIub3JnCm8gQ3ViZQp2IDAuMDAwMDAwIC0wLjI1OTQ1MiAtMC4wMDQwNjcKdiAtMC41MDY4ODcgMS4wNzIzOTIgLTAuNzE5MTk1CnYgMC41MDkzMDMgMS4yMTM2NTYgMC43MTU5ODYKdiAwLjAwMDAwMCAtMC4yMzE4ODggLTAuMDA0MDY4CnYgLTAuNjg5MjEyIDEuMDY4NjAxIDAuNTc1ODA0CnYgMC42ODkyMTIgMS4wNjg2MDAgLTAuNTgzOTM5CnYgMC40ODU3MDggMS4wMzYzNDQgMC40MDA5MDIKdiAtMC4wNDY2MTkgMC44OTM1ODMgLTAuNjMxODEzCnYgMC4wNzgwMjAgLTAuMjg5ODA3IC0wLjEwMzM5Nwp2IC0wLjUzNjYzOCAwLjg4MzQ0OSAwLjI1MTQwNwp2IDAuMDUwMTA0IDAuODc2MDc5IC0wLjYyODgwNgp2IC0wLjEzMjYxNCAtMC4yMjQ3NjkgLTAuMDIxODc5CnYgLTAuNjc5MDg2IDAuOTI3NDgwIDAuMjg0ODUzCnYgMC42Njc2MTYgMS4wNTI2NDEgMC4yODU3NjcKdiAwLjA0NDc4MyAtMC4zNzk2MTQgMC4wNTkyODkKdm4gLTAuODE2MSAtMC4wMDAzIDAuNTc3OQp2biAwLjY0MzggLTAuMDAwMCAwLjc2NTIKdm4gMC44ODk4IC0wLjEwNDYgLTAuNDQ0Mgp2biAwLjgyMTMgMC4xNjQ4IDAuNTQ2MQp2biAwLjAxNDQgLTAuMTYyMyAwLjk4NjYKdnQgMC4wMzIzOTggMC44NzA2NjkKdnQgMC4wMDAxMTQgMC4wMDE1NTYKdnQgMC4yMTc3NjUgMC4xMjkyODUKdnQgMC4wNjg5NjQgMC43MjQwNjkKdnQgMC4xODA2NDQgMC4yNzQ4NTgKdnQgMC4yNTEzNjQgMS4wMDI3MDEKcyAwCmYgMi8xLzEgMS8yLzEgMy8zLzEKZiA1LzEvMiA0LzIvMiA2LzMvMgpmIDgvNC8zIDcvNS8zIDkvNi8zCmYgMTEvNC80IDEwLzUvNCAxMi82LzQKZiAxNC80LzUgMTMvNS81IDE1LzYvNQo=",ds=new fs;ds.rotation.order="XZY";const kh=new Yn;let Ih=0;const ci=class ci extends cn{constructor(){super();F(this,"matrixNeedsUpdate",!1);F(this,"parent");F(this,"hasInit",!1);this.id=Ih++,ci.protoGeo===void 0&&ci.makeProtoGeo()}init(t){this.parent=t,this.hasInit&&(this.maxCount=ps,this.mesh=new Wl(ci.protoGeo.clone(),Zt,ps),this.mesh.matrixAutoUpdate=!1,this.mesh.geometry.setAttribute("variant",new _i(new Float32Array(ps),1)),this.instanceVariant=this.mesh.geometry.attributes.variant,this.instanceVariant.setUsage(Kt),this.mesh.geometry.setAttribute("groundNormal",new _i(new Float32Array(ps*3),3)),this.instanceNormal=this.mesh.geometry.attributes.groundNormal,this.instanceNormal.setUsage(Kt),this.mesh.geometry.setAttribute("shadow",new _i(new Float32Array(ps*1),1)),this.instanceShadow=this.mesh.geometry.attributes.shadow,this.instanceShadow.setUsage(Kt),this.mesh.instanceMatrix.setUsage(Kt),t.add(this.mesh),this.reset(),this.postInit())}addBush(t,i,l,a,r,o,n,d,h,u,g=0){this.hasInit||(this.hasInit=!0,this.init(this.parent)),this.curIndex==0&&(this.matrixNeedsUpdate=!0,this.ox=t,this.oz=l),u>this.retireIndex&&(this.retireIndex=u),ds.position.set(t-this.ox,i,l-this.oz),this.instanceNormal.array[this.curIndex*3]=a,this.instanceNormal.array[this.curIndex*3+1]=r,this.instanceNormal.array[this.curIndex*3+2]=o,this.instanceShadow.array[this.curIndex]=h,this.instanceVariant.array[this.curIndex]=g,ds.rotation.y=n,ds.scale.set(d,d,d),ds.updateMatrix(),this.mesh.setMatrixAt(this.curIndex,ds.matrix),this.curIndex++,this.isFull=this.curIndex>=this.maxCount,this.updateBounds(t-this.ox,i,l-this.oz)}update(){this.hasInit&&(this.instanceNormal.needsUpdate=!0,this.instanceShadow.needsUpdate=!0,this.instanceVariant.needsUpdate=!0,this.matrixNeedsUpdate&&(this.matrixNeedsUpdate=!1,this.mesh.position.x=this.ox,this.mesh.position.z=this.oz,this.mesh.updateMatrix()),super.update())}static makeProtoGeo(){ci.protoGeo===void 0&&(ci.protoGeo=null,kh.load(Ch,t=>{let i=t.children[0].geometry;i.computeBoundingSphere(),ci.protoGeo=i}))}destroy(){ci.protoGeo&&ci.protoGeo.dispose(),this.mesh&&this.mesh.geometry.dispose()}};F(ci,"protoGeo");let Zs=ci;class Mh extends hn{constructor(){super(...arguments);F(this,"bushesAwaiting",[]);F(this,"addBush",this.addBushLoading)}addBushLoading(...t){if(this.bushesAwaiting.push(t),Zs.protoGeo){this.addBush=this.addBushLive;for(let i of this.bushesAwaiting)this.addBush(...i);delete this.bushesAwaiting}}addBushLive(t,i,l,a,r,o,n,d,h,u,g){this.curInstance.addBush(t,i,l,a,r,o,n,d,h,u,g),this.checkCycleInstances()}}new Mh(Zs,3,"bush");new ts(Ve.seed,251);new ts;const ia={Left:0,Right:1,LeftDouble:2,RightDouble:3,Uphill15:4,Uphill20:5,Downhill15:6,Downhill20:7,ChevronLeft:8,ChevronRight:9},Yt=1/6,It=1/2,Gs=.7,oi=.7/2,Ml=-.2,ni=1.8,Mt=.04,Is=class Is{constructor(){F(this,"mesh");this.geo=Is.protoGeo.clone(),this.uvs=this.geo.attributes.uv.array,this.mesh=new Zo(this.geo,lr),this.curVariant=null}static makeProtoGeo(){let e=[-oi,ni+Gs,Mt,oi,ni+Gs,Mt,-oi,ni,Mt,oi,ni,Mt,oi,ni+Gs,Mt,-oi,ni+Gs,Mt,oi,ni,Mt,-oi,ni,Mt,Mt,ni+oi,Mt-.01,-Mt,ni+oi,Mt-.01,0,ni+oi,-Mt,Mt,Ml,Mt-.01,-Mt,Ml,Mt-.01,0,Ml,-Mt],t=[Yt,It*2,Yt*2,It*2,Yt,It,Yt*2,It,0,It*2,Yt,It*2,0,It,Yt,It,.06,.48,.08,.48,.1,.48,.06,0,.08,0,.1,0],i=[0,2,1,1,2,3,4,6,5,5,6,7,8,9,11,11,9,12,9,10,12,12,10,13,10,8,13,13,8,11],l=new Yl;return l.setAttribute("position",new es(e,3)),l.setAttribute("uv",new es(t,2)),l.attributes.uv.setUsage(Kt),l.setIndex(i),l}setVariant(e){if(e==this.curVariant)return;let t,i;e%2==0?i=1:i=0,t=1+Math.floor(e/2),this.uvs[0]=Yt*t,this.uvs[1]=It*(i+1),this.uvs[2]=Yt*(t+1),this.uvs[3]=It*(i+1),this.uvs[4]=Yt*t,this.uvs[5]=It*i,this.uvs[6]=Yt*(t+1),this.uvs[7]=It*i,e==ia.ChevronLeft||e==ia.ChevronRight?(this.uvs[8]=0,this.uvs[9]=It,this.uvs[10]=Yt,this.uvs[11]=It,this.uvs[12]=0,this.uvs[13]=0,this.uvs[14]=Yt,this.uvs[15]=0):(this.uvs[8]=0,this.uvs[9]=It*2,this.uvs[10]=Yt,this.uvs[11]=It*2,this.uvs[12]=0,this.uvs[13]=It,this.uvs[14]=Yt,this.uvs[15]=It),this.curVariant=e,this.geo.attributes.uv.needsUpdate=!0}};F(Is,"protoGeo",Is.makeProtoGeo());let sa=Is;new ts;new ts("wall",31,.2,.1);new gi;new As(0);const An=new Vd,Eh=""+new URL("../assets/noentry.71ff3d6f.webp",import.meta.url).href;class Ah extends fs{constructor(){super();F(this,"d");F(this,"opacity",0);hi.addListener("isCinecam",()=>{})}init(){this.matrixAutoUpdate=!1,this.mesh=new Zo(new Kn(2.4,2.4,1,1),new Es({map:jt(Eh),transparent:!0,opacity:0})),this.mesh.material.needsCameraPosition=!0,this.mesh.position.y=1.3,this.add(this.mesh),this.mesh.matrixAutoUpdate=!1,this.mesh.updateMatrix()}update(){this.position.copy(Ee.head.p),this.rotation.y=-Ee.head.a+Math.PI/2,this.updateMatrix()}updateVisibility(){this.visible&&(this.d=this.position.distanceToSquared(H.position),this.d<1e4?this.d<2500?(this.mesh.material.opacity=1,this.opacity=1):(this.mesh.material.opacity=Math.max(0,1-(Math.sqrt(this.d)-50)/50),this.opacity=this.mesh.material.opacity):this.mesh.material.opacity!=this.opacity&&(this.mesh.material.opacity=0,this.opacity=0))}}const js=new Ah,cs=new Sd({fps:!1,hwa:!1});function Tn(){return(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR"))!=-1?"Opera":navigator.userAgent.indexOf("Edg")!=-1?"Edge":navigator.userAgent.indexOf("Chrome")!=-1?"Chrome":navigator.userAgent.indexOf("Safari")!=-1?"Safari":navigator.userAgent.indexOf("Firefox")!=-1?"Firefox":navigator.userAgent.indexOf("MSIE")!=-1||document.documentMode?"IE":"Unknown"}const la=[fd,ud,vd];class Th{constructor(){F(this,"canvas");F(this,"dom");F(this,"renderScene");F(this,"renderer");F(this,"debug",!1);F(this,"scene");F(this,"curSettings",{});F(this,"subs",[]);F(this,"stats");F(this,"hasInit",!1);F(this,"confirmHWA",!1);F(this,"updatePixelRatio",()=>{We.useNativeRenderScale?(this.renderer.setPixelRatio(window.devicePixelRatio),Di.add("Setting device pixel ratio "+window.devicePixelRatio)):(this.renderer.setPixelRatio(kr[We.renderScale]),Di.add("Setting device pixel ratio "+kr[We.renderScale]))});F(this,"updateMaxFramerate",()=>{We.maxFramerate>0&&(this.targetFrameTime=1e3/Xn[We.maxFramerate])});F(this,"pausedInterval",null);F(this,"onTickerStateBound",this.onTickerState.bind(this));F(this,"onWorldSettingsChangedBound",this.onWorldSettingsChanged.bind(this));F(this,"frameCounter",0);F(this,"targetFrameTime",1e3/60);F(this,"updateBound",this.rawUpdate.bind(this));F(this,"update",()=>{});F(this,"maxPhysDT",.05);F(this,"minPhysDT",.001);F(this,"physDT",0);F(this,"debugUpdateTimer",.1);F(this,"debugFrameTimer",1);F(this,"debugFrame",0);F(this,"lastTimeCheck",Date.now());F(this,"lastVehicleIndexCheck",0);F(this,"driveTimer",0);F(this,"driveStartIndex",0);F(this,"onSceneInit");F(this,"profileGeneration",0);Math.TAU=Math.PI*2,Math.HALFPI=Math.PI/2,Math.D2R=Math.PI/180,Math.R2D=180/Math.PI,Math.getHeading=(e,t)=>{}}onMount(e,t,i){var l,a;this.canvas=e,this.dom=t,this.uiDom=i,this.renderScene=new Qn,this.renderScene.add(Dd),this.cameraController=new Fd(t),this.camera=Ae,this.renderScene.add(this.cameraController.container),this.vehicleManager=new Bd,this.renderScene.add(H),this.stats=new qd,this.stats.dom.style.left="282px",this.stats.dom.style.zIndex="9999",document.body.appendChild(this.stats.dom),ne.addListener("showDebug",r=>{this.stats&&(this.stats.dom.style.display=r?"block":"none")}),ne.addListener("roadWidth",r=>{var o;if(this.initLoad(),Ws(bs)){this.setScene(Ve.scene);return}(o=this.scene)==null||o.onRoadWidthChanged(),this.vehicleManager.reset()},!0),ne.addListener("fullscreen",r=>{r?t.requestFullscreen&&t.requestFullscreen():document.fullscreenElement&&document.exitFullscreen()},!0),ne.set("fullscreen",!1),this.renderer=new Zn({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",stencil:!1,logarithmicDepthBuffer:!1}),this.renderer.setClearColor(4473924),this.toneMapped=!0,this.renderer.toneMapping=Jn,this.renderer.shadowMap.enabled=!0,We.addListener("renderScale",this.updatePixelRatio),We.addListener("useNativeRenderScale",this.updatePixelRatio),We.addListener("viewDistance",this.onGraphicsSettingsChanged.bind(this),!0),We.addListener("detail",this.onGraphicsSettingsChanged.bind(this),!0),We.addListener("maxFramerate",this.updateMaxFramerate),Je.init(),Je.addListener(this.updateBound),Le.init(t,e,i),pe.initialise(),pe.addListener(mi.NextScene,()=>{var r;(r=this.scene)==null||r.nextStyle()}),pe.addListener(mi.PrevScene,()=>{var r;(r=this.scene)==null||r.prevStyle()}),pe.addListener(mi.ToggleUI,()=>{ne.set("hideUI",!ne.hideUI)}),pe.addListener(mi.Pause,()=>{Je.toggle()}),pe.addListener(mi.IncSpeedControl,()=>Zl()),pe.addListener(mi.DecSpeedControl,()=>Jl()),pe.addListener(mi.ToggleSpeedControlMode,()=>{Ye.set("speedControlMode",(Ye.speedControlMode+1)%2)}),pe.addListener(mi.AutodriveMode,()=>{ne.set("autodriveMode",(ne.autodriveMode+1)%3)}),Je.addStateListener(this.onTickerStateBound),Pr.onMount(),Pr.registerAction(this.onBeforeUnload.bind(this)),fi.addListener(r=>{r<1?Le.lockKeys("load"):(Le.unlockKeys("load"),this.vehicleManager.onSceneReady(),this.prevRender=performance.now(),this.update=this.updateLive,this.render=this.renderLive,bs.set(!1))}),Ei.onInitialiseFinished=()=>{this.prevRender=performance.now(),this.renderer.render(this.renderScene,this.camera),!ti&&!tt.hasSeenHWAWarning&&(this.confirmHWA=!0,this.confirmHWATime=performance.now(),this.confirmHWACount=5),tt.hasSeenSettings||this.initFPSCheck(),Ei.addJob(()=>Je.initSample(),0,"Ticket.initSample")},Ve.addListener("any",this.onWorldSettingsChangedBound),Ss(Ve.startNode),js.init(),this.renderScene.add(js),setInterval(this.onMinutePassed.bind(this),6e4),this.hasInit=!0,Ts.set(!0),Di.add("HW: Browser is "+Tn()),Di.add("HW: Screen res is "+((l=window.screen)==null?void 0:l.width)+" x "+((a=window.screen)==null?void 0:a.height))}initComp(){this.initLoad(),this.setScene(Ld.Driftmas)}initFPSCheck(){clearTimeout(this.fpsTimeout),this.fpsTimeout=setTimeout(()=>{Je.paused||Je.blurred||tt.hasSeenSettings||this.fps*Je.speedFactor<40&&cs.set("fps",!0)},1e4)}onTickerState(e){clearInterval(this.pausedInterval),e&&(this.pausedInterval=setInterval(()=>{pe.update(.01)},10)),this.fpsTimeout&&(clearTimeout(this.fpsTimeout),this.initFPSCheck())}onWorldSettingsChanged(e){this.hasInit&&this.onCheckJourney(),this.initLoad(),bs.set(!0),this.curSettings.scene!=e.scene?this.setScene(Ve.scene):this.curSettings.roadStyle!=e.roadStyle||this.curSettings.seed!=e.seed?this.setScene(Ve.scene):this.curSettings.startNode!=e.startNode&&this.setScene(Ve.scene),this.curSettings={...e}}onGraphicsSettingsChanged(){var e;if(this.initLoad(),Ws(bs)){this.setScene(Ve.scene);return}(e=this.scene)==null||e.onGraphicsSettingsChanged()}initLoad(){this.update=this.updateLoad,this.render=this.renderLoad,Ei.reset(),clearTimeout(this.fpsTimeout)}setScene(e){if(e>=la.length){console.error("Attempting to load unknown scene ",e);return}let t=la[e];this.scene&&(this.scene.destroy(),Cd(this.scene.container),this.renderScene.remove(this.scene.container),delete this.scene),this.scene=new t(this.renderer,this.renderScene),this.renderScene.add(this.scene.container),this.scene.initialise(this.onMidlineReady.bind(this),this.onSceneReady.bind(this)),this.vehicleManager.onSceneLoading(),Ss(Ve.startNode)}render(){}renderLive(){if(We.maxFramerate>0){if(this.renderDT=performance.now()-this.prevRender,this.frameCounter+this.renderDT<this.targetFrameTime)return;this.frameCounter=this.frameCounter+this.renderDT-this.targetFrameTime,this.frameCounter%=this.targetFrameTime}this.prevRender=performance.now(),this.renderer.render(this.renderScene,this.camera)}renderLoad(){}rawUpdate(e){this.update(Je.smoothDT),ne.showDebug&&this.stats.update()}updateLoad(e){try{Ei.update(e*1e3),this.scene.updateLoad(e)}catch(t){this.onCrash("SCENE LOAD",t)}}updateScene(e){this.scene.update(e)}onCrash(e,t){this.update=()=>{},Je.destroy(),this.vehicleManager.onCrash(),console.error(e),console.error(t),console.log(Di.get()),An.set({type:e,msg:t.message,log:Di.get()})}updateLive(e,t){if(this.confirmHWA){let i=performance.now()-this.confirmHWATime;i>100?(this.confirmHWACount++,i>250&&this.confirmHWACount++):(this.confirmHWACount--,i<30&&this.confirmHWACount--),this.confirmHWACount<0?(this.confirmHWA=!1,tt.set("hasSeenHWAWarning",!0)):this.confirmHWACount>10&&(this.confirmHWA=!1,tt.set("hasSeenHWAWarning",!0),cs.set("hwa",!0),Je.lock()),this.confirmHWATime=performance.now()}pe.update(e);try{this.vehicleManager.update(e,t)}catch(i){this.onCrash("VEHICLE UPDATE",i);return}try{this.cameraController.update(e)}catch(i){this.onCrash("CAMERA UPDATE",i);return}try{this.updateScene(e)}catch(i){this.onCrash("SCENE UPDATE",i);return}if(this.render(),this.debugFrameTimer-=e,this.debugFrameTimer<0&&(this.fps=this.renderer.info.render.frame-this.debugFrame,this.vehicleManager.fps=this.fps,Kl.set(this.renderer.info.render.frame-this.debugFrame),this.debugFrame=this.renderer.info.render.frame,this.debugFrameTimer+=1),this.debugUpdateTimer-=e,this.debugUpdateTimer<0){Jo.set(this.renderer.info.render.calls),$o.set(Math.floor(this.renderer.info.render.triangles)),en.set(this.renderer.info.memory.geometries),$n.set(this.renderer.info.memory.textures),Tl.set(Ei.priority.length),Xl.set(Ee.vehicleNode),tn.set(Ee.tail),sn.set(Ee.head),ln.set(H.position.x.toFixed(1)+", "+H.position.y.toFixed(1)+", "+H.position.z.toFixed(1));let i=H.position.x/Er,l=Math.floor(i),a=Math.floor((i-l)*Ar),r=H.position.z/Er,o=Math.floor(r),n=Math.floor((r-o)*Ar);rn.set(l+", "+o),an.set(a+", "+n),Ql.set(Ei.queue.length),Tl.set(Ei.priority.length),this.debugUpdateTimer=.1}try{Ei.update(e*1e3)}catch(i){this.onCrash("SCENE LOAD",i)}this.postUpdate()}postUpdate(){Le.resetState(),Ee.vehicleNodeDidChange&&this.onVehicleNodeChanged(),(!H.onRoad||H.isRogue)&&js.updateVisibility(),Ee.vehicleNodeDidChange=!1}onMinutePassed(){let e=Math.min(61e4,Date.now()-this.lastTimeCheck);H.speed>0&&(Gt.value?qe.set("autodriveTime",qe.autodriveTime+e):qe.set("manualTime",qe.manualTime+e),qe.set("totalTime",qe.autodriveTime+qe.manualTime),this.driveTimer+=e),this.lastTimeCheck=Date.now()}onVehicleNodeChanged(){Gt.value?qe.set("autodriveDist",qe.autodriveDist+(Ee.vehicleNode.i-this.lastVehicleIndexCheck)*10):qe.set("manualDist",qe.manualDist+(Ee.vehicleNode.i-this.lastVehicleIndexCheck)*10),qe.set("totalDist",qe.manualDist+qe.autodriveDist),this.onCheckJourney(),Ss(Ee.vehicleNode.i),js.update(),this.lastVehicleIndexCheck=Ee.vehicleNode.i}onCheckJourney(){let e=this.driveTimer,t=(this.lastVehicleIndexCheck-this.driveStartIndex)*10;e>qe.longestDrive&&qe.set("longestDrive",e),t>qe.furthestDrive&&qe.set("furthestDrive",t)}onBeforeUnload(){this.onCheckJourney()}onMidlineReady(){return Di.add("Midline ready"),!0}onSceneReady(){return this.vehicleManager.init(),this.cameraController.init(),this.update=this.updateLive,localStorage.removeItem("loading-flag"),this.profileGeneration!==xi.value&&(this.updatePixelRatio(),this.updateMaxFramerate(),this.profileGeneration=xi.value),this.driveStartTime=Date.now(),this.driveStartIndex=Ve.startNode,this.driveTimer=0,this.lastVehicleIndexCheck=Ve.startNode,!0}setSize(e,t){this.cameraController.setSize(e,t),this.renderer.setSize(e,t),Le.setSize(e,t),this.render()}onDestroy(){for(;this.renderScene.children.length;)this.renderScene.remove(this.renderScene.children[this.renderScene.children.length-1]);for(this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss());this.subs.length;)this.subs.pop()();Je.destroy(),Le.destroy()}}function Ph(s,e,t){const i=s.slice();return i[3]=e[t],i[5]=t,i}function Nh(s,e,t){const i=s.slice();return i[6]=e[t],i}function xh(s){let e=s[3].version+"",t;return{c(){t=ee(e)},l(i){t=te(i,e)},m(i,l){P(i,t,l)},d(i){i&&m(t)}}}function Rh(s){let e,t=s[3].version+"",i;return{c(){e=_("a"),i=ee(t),this.h()},l(l){e=b(l,"A",{class:!0,href:!0});var a=C(e);i=te(a,t),a.forEach(m),this.h()},h(){f(e,"class","changelog-version-number-link svelte-bsztam"),f(e,"href",s[3].permalink)},m(l,a){P(l,e,a),c(e,i)},d(l){l&&m(e)}}}function Uh(s){let e,t,i="-",l,a,r,o;return{c(){e=_("div"),t=_("span"),t.textContent=i,l=k(),a=_("span"),r=ee(s[6]),o=k(),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);t=b(d,"SPAN",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-zrnetw"&&(t.textContent=i),l=I(d),a=b(d,"SPAN",{});var h=C(a);r=te(h,s[6]),h.forEach(m),o=I(d),d.forEach(m),this.h()},h(){f(t,"class","list-dot svelte-bsztam"),f(e,"class","changelog-list-item svelte-bsztam")},m(n,d){P(n,e,d),c(e,t),c(e,l),c(e,a),c(a,r),c(e,o)},p:me,d(n){n&&m(e)}}}function Oh(s){let e,t,i,l,a,r=s[3].date+"",o,n,d,h;function u(y,D){return y[3].permalink&&!Pl?Rh:xh}let p=u(s)(s),v=Oe(s[3].changes),w=[];for(let y=0;y<v.length;y+=1)w[y]=Uh(Nh(s,v,y));return{c(){e=_("div"),t=_("div"),i=_("div"),p.c(),l=k(),a=_("div"),o=ee(r),n=k(),d=_("div");for(let y=0;y<w.length;y+=1)w[y].c();h=k(),this.h()},l(y){e=b(y,"DIV",{class:!0});var D=C(e);t=b(D,"DIV",{class:!0});var L=C(t);i=b(L,"DIV",{class:!0});var T=C(i);p.l(T),T.forEach(m),l=I(L),a=b(L,"DIV",{class:!0});var A=C(a);o=te(A,r),A.forEach(m),L.forEach(m),n=I(D),d=b(D,"DIV",{class:!0});var E=C(d);for(let x=0;x<w.length;x+=1)w[x].l(E);E.forEach(m),h=I(D),D.forEach(m),this.h()},h(){f(i,"class","changelog-version-number svelte-bsztam"),R(i,"changelog-version-new",Ri&&s[5]==0),f(a,"class","changelog-date svelte-bsztam"),f(t,"class","changelog-title svelte-bsztam"),f(d,"class","changelog-list svelte-bsztam"),f(e,"class","changelog "+(Ri&&s[5]==0?"new-version":"")+" svelte-bsztam")},m(y,D){P(y,e,D),c(e,t),c(t,i),p.m(i,null),c(t,l),c(t,a),c(a,o),c(e,n),c(e,d);for(let L=0;L<w.length;L+=1)w[L]&&w[L].m(d,null);c(e,h)},p:me,d(y){y&&m(e),p.d(),yt(w,y)}}}function ra(s){let e,t,i;return{c(){e=_("div"),this.h()},l(l){e=b(l,"DIV",{class:!0}),C(e).forEach(m),this.h()},h(){f(e,"class","splash-changelog-close svelte-bsztam")},m(l,a){P(l,e,a),t||(i=B(e,"mousedown",s[1]),t=!0)},p:me,d(l){l&&m(e),t=!1,i()}}}function Vh(s){let e,t,i,l,a="Close",r,o,n,d,h=Oe($l),u=[];for(let p=0;p<h.length;p+=1)u[p]=Oh(Ph(s,h,p));let g=s[0]&&ra(s);return{c(){e=_("div"),t=_("div");for(let p=0;p<u.length;p+=1)u[p].c();i=k(),l=_("div"),l.textContent=a,r=k(),g&&g.c(),o=De(),this.h()},l(p){e=b(p,"DIV",{id:!0,style:!0,class:!0});var v=C(e);t=b(v,"DIV",{class:!0});var w=C(t);for(let y=0;y<u.length;y+=1)u[y].l(w);w.forEach(m),i=I(v),l=b(v,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-1la5l1i"&&(l.textContent=a),v.forEach(m),r=I(p),g&&g.l(p),o=De(),this.h()},h(){f(t,"class","changelog-scrollable svelte-bsztam"),f(l,"class","changelog-close svelte-bsztam"),f(e,"id","splash-changelog"),ae(e,"transform","translateX("+(s[0]?0:100)+"%)"),f(e,"class","svelte-bsztam")},m(p,v){P(p,e,v),c(e,t);for(let w=0;w<u.length;w+=1)u[w]&&u[w].m(t,null);c(e,i),c(e,l),P(p,r,v),g&&g.m(p,v),P(p,o,v),n||(d=B(l,"click",s[1]),n=!0)},p(p,[v]){v&1&&ae(e,"transform","translateX("+(p[0]?0:100)+"%)"),p[0]?g?g.p(p,v):(g=ra(p),g.c(),g.m(o.parentNode,o)):g&&(g.d(1),g=null)},i:me,o:me,d(p){p&&(m(e),m(r),m(o)),yt(u,p),g&&g.d(p),n=!1,d()}}}function Hh(s,e,t){let{showChangelog:i=!1}=e,{onShowChangelog:l=()=>{}}=e;function a(){t(0,i=!1),l(!1)}return s.$$set=r=>{"showChangelog"in r&&t(0,i=r.showChangelog),"onShowChangelog"in r&&t(2,l=r.onShowChangelog)},[i,a,l]}class Pn extends Xe{constructor(e){super(),Qe(this,e,Hh,Vh,Ke,{showChangelog:0,onShowChangelog:2})}}function zh(s){let e;return{c(){e=ee("-")},l(t){e=te(t,"-")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function Fh(s){let e,t="+";return{c(){e=_("span"),e.textContent=t,this.h()},l(i){e=b(i,"SPAN",{style:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1y249x7"&&(e.textContent=t),this.h()},h(){ae(e,"transform","rotate(45deg)")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function aa(s){let e,t;return{c(){e=_("div"),t=new Fl(!1),this.h()},l(i){e=b(i,"DIV",{class:!0});var l=C(e);t=Gl(l,!1),l.forEach(m),this.h()},h(){t.a=null,f(e,"class","faq-a svelte-1ka7nal")},m(i,l){P(i,e,l),t.m(s[1],e)},p(i,l){l&2&&t.p(i[1])},d(i){i&&m(e)}}}function Gh(s){let e,t,i,l,a,r,o;function n(g,p){return g[2]?Fh:zh}let d=n(s),h=d(s),u=!s[2]&&aa(s);return{c(){e=_("div"),t=_("div"),i=ee(s[0]),l=_("div"),h.c(),a=k(),u&&u.c(),this.h()},l(g){e=b(g,"DIV",{class:!0});var p=C(e);t=b(p,"DIV",{class:!0});var v=C(t);i=te(v,s[0]),l=b(v,"DIV",{class:!0});var w=C(l);h.l(w),w.forEach(m),v.forEach(m),a=I(p),u&&u.l(p),p.forEach(m),this.h()},h(){f(l,"class","faq-expand svelte-1ka7nal"),f(t,"class","faq-q svelte-1ka7nal"),f(e,"class","faq-qa svelte-1ka7nal")},m(g,p){P(g,e,p),c(e,t),c(t,i),c(t,l),h.m(l,null),c(e,a),u&&u.m(e,null),r||(o=B(t,"mousedown",s[3]),r=!0)},p(g,[p]){p&1&&_e(i,g[0]),d!==(d=n(g))&&(h.d(1),h=d(g),h&&(h.c(),h.m(l,null))),g[2]?u&&(u.d(1),u=null):u?u.p(g,p):(u=aa(g),u.c(),u.m(e,null))},i:me,o:me,d(g){g&&m(e),h.d(),u&&u.d(),r=!1,o()}}}function jh(s,e,t){let{q:i="Question?"}=e,{a:l="Answer"}=e,a=!0;const r=()=>t(2,a=!a);return s.$$set=o=>{"q"in o&&t(0,i=o.q),"a"in o&&t(1,l=o.a)},[i,l,a,r]}class Bh extends Xe{constructor(e){super(),Qe(this,e,jh,Gh,Ke,{q:0,a:1})}}const qh=[{q:"Why do I get such a poor performance?",a:"Make sure you have hardware acceleration enabled in your browser, and in your OS settings if necessary. If you're on a laptop, check power settings to make sure your browser performance isn't being throttled."},{q:"Will the web version remain available and receive updates?",a:"Yes! The Steam version will have extra features and higher-quality assets, but the web version will remain freely available and continue to get the same core updates."},{q:"Can I transfer my progress from the web version to the Steam version?",a:"Not currently, but I'm hoping to work out a convenient way to do this in future."},{q:"Is there an offline version of the web game that I can play without an internet connection?",a:"Yes, it's called Slow Roads: Web Edition and is available on itch.io for a small price. Find it on the <a style='color: #418fa4' href='https://topographinteractive.itch.io/slow-roads'>Slow Roads itch.io page</a>"},{q:"What's the background on the game's development?",a:"I wanted a simple, relaxing driving game to play while listening to podcasts or music, but the existing options were too serious and ended too soon. At the time I had been working on a vehicle physics engine in a separate project, and at some point became interested in the idea of procedurally-generated environments. I realised I could combine the two, and within a week I had a basic version of Slow Roads working."},{q:"Who's the developer?",a:"Hi, I'm Anslo, a creative generalist developer interested in graphics programming, procedural generation, and 3D design. Slow Roads began as one of my hobby projects, and I'm developing it solo. You can find some details on my other projects at anslo.dev. The Slow Roads property is owned by my independent, solo-owned company, Topograph Interactive Ltd, for the purpose of publishing via Steam."},{q:"How and why is the web version free, and without ads?",a:"Slow Roads is a game about escapism and peace, letting you take a break from the stress of the modern world, and intrusive ads don't belong in this context. In general I think web advertising has spiralled into something of a capitalist hellscape which makes everyone's experience online worse, all in the name of greed. It's unfortunate that so many talented creators depend on these broken systems to earn revenue for their work, and I think there's a lot of room for reform in online advertising. I want to use this small platform to remind people that there is a better way - it can be a choice, and there can be a simpler, more human-centric approach. If you'd like to support me, aside from wishlisting/purchasing the Steam version you can also pay an optional price for the Web Edition on itch.io"},{q:"Have you thought about adding a competitive or rally mode?",a:"Yes, I've run multiple community rally events over the past few winters - check out driftmas.slowroads.io. I may bring more competitive modes in future, especially to the Steam version."},{q:"Why can I drive through trees, or glitch into the sky by going backwards?",a:"The game engine only really works on the assumption that you stay on the road and follow it in the correct direction. Making that assumption allows for critical performance savings for rendering, environment generation, and physics calculations. I decided it would be no fun to force-reset people for driving offroad, though; sometimes glitches are the best part of a game."},{q:"Why are all the cars electric?",a:"They're a lot more peaceful and simple to drive, which suits the context of the game. That said, combustion engines are a highly-requested feature, so are available as an option in the Steam version."},{q:"Can you add a radio or music player, or connect to Spotify etc.?",a:"The Steam version has a player for local files and radio streams, and I can likely support radio streams in the web version eventually too - but I can't estimate when. Integrations with services like Spotify are tricky, but may be possible in the future."},{q:"I have a great idea for a feature, how can I tell you?",a:"It's probably already on the list - I have a lot of things I want to work on already, so it's unlikely I'll be adding new things to the list now, sorry. If you think it's something I truly haven't thought of, you can mention it in the Discord and I'm sure someone will let you know."},{q:"Can I contribute to the development of the game?",a:"This is still mostly a hobby project for me, so I'm not looking for contributors at this stage. In the future I might be looking for certain specialists, so make sure you follow on social media for updates there."},{q:"Can I have permission to host the game on my own site, make an app of the game with a web-view, or otherwise distribute the game myself?",a:"No, sorry. Unfortunately many are abusing the BY-NC-ND license and I now prefer people not to rehost the game in any context. However, if you would like to purchase a commercial license, please email hello@topograph.io"},{q:"Will you make it open-source?",a:"There are no plans at this stage to open-source the game, but I may look into supporting mods for the Steam version in future."},{q:"Which tech/language was used to make Slow Roads?",a:"The whole thing is written in plain JavaScript, using Three.js as a rendering library and SvelteKit as an SPA framework. It all runs client-side, in a WebGL canvas. The core engine is custom-written to be optimised for efficient environment generation, realistic road generation, and minimal physics computation. As for why - I think the browser is underrated as a platform for interactive 3D apps, and I wanted to make a point of that with Slow Roads. Plus JS dev is super accessible and flexible, and that suits my style."},{q:"How does the environment generation algorithm work?",a:"It uses a modified noise generator, similar to Perlin Noise, and then traces a road in 10m increments by testing gradients and choosing the best direction to go at each step. That decision is weighted by a lot of factors, like curvature, gradient, progress, water avoidance, self-intersection avoidance, and so on. There's a lot more complexity to it, but that's the gist - one day I'll get around to writing some proper devlogs!"},{q:"I miss the old slow roads - is there a way to still play it?",a:"Yes, it's still live at old.slowroads.io"},{q:"I miss a specific previous version - is there a way to still play it?",a:"Yes, click the version number in the lower-right of the main splash page to open the changelog, then click the version number for the version you wish to play. It will link to the specific version on slowroads-io.pages.dev. You may receive a warning from your browser about navigating to this page, but it is safe to do so."},{q:"Will there ever be an SR3?",a:"Right now I don't plan to make any significant changes to the underlying engine, so updates for the foreseeable future will simple be expansions of version 2."}];function Wh(s,e,t){const i=s.slice();return i[19]=e[t],i}function oa(s,e,t){const i=s.slice();return i[22]=e[t],i}function na(s){let e,t="Failed to initialise - please ensure your system supports WebGL2";return{c(){e=_("div"),e.textContent=t,this.h()},l(i){e=b(i,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-jv3955"&&(e.textContent=t),this.h()},h(){f(e,"id","splash-error"),f(e,"class","svelte-1lrjs3m")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function Yh(s){let e,t,i,l,a,r,o,n,d,h,u="See full details",g,p,v=Oe(s[3]),w=[];for(let y=0;y<v.length;y+=1)w[y]=da(oa(s,v,y));return{c(){e=_("div"),t=ee("New version - "),i=ee(Jt),l=k(),a=_("hr"),r=k();for(let y=0;y<w.length;y+=1)w[y].c();o=k(),n=_("hr"),d=k(),h=_("div"),h.textContent=u,this.h()},l(y){e=b(y,"DIV",{class:!0});var D=C(e);t=te(D,"New version - "),i=te(D,Jt),l=I(D),a=b(D,"HR",{class:!0}),r=I(D);for(let L=0;L<w.length;L+=1)w[L].l(D);o=I(D),n=b(D,"HR",{class:!0}),d=I(D),h=b(D,"DIV",{class:!0,"data-svelte-h":!0}),Y(h)!=="svelte-5v1n0f"&&(h.textContent=u),D.forEach(m),this.h()},h(){f(a,"class","svelte-1lrjs3m"),f(n,"class","svelte-1lrjs3m"),f(h,"class","splash-version-see-more svelte-1lrjs3m"),f(e,"class","splash-new-version svelte-1lrjs3m")},m(y,D){P(y,e,D),c(e,t),c(e,i),c(e,l),c(e,a),c(e,r);for(let L=0;L<w.length;L+=1)w[L]&&w[L].m(e,null);c(e,o),c(e,n),c(e,d),c(e,h),g||(p=B(h,"click",s[10]),g=!0)},p(y,D){if(D&8){v=Oe(y[3]);let L;for(L=0;L<v.length;L+=1){const T=oa(y,v,L);w[L]?w[L].p(T,D):(w[L]=da(T),w[L].c(),w[L].m(e,o))}for(;L<w.length;L+=1)w[L].d(1);w.length=v.length}},d(y){y&&m(e),yt(w,y),g=!1,p()}}}function da(s){let e,t=s[22]+"",i;return{c(){e=_("div"),i=ee(t),this.h()},l(l){e=b(l,"DIV",{class:!0});var a=C(e);i=te(a,t),a.forEach(m),this.h()},h(){f(e,"class","splash-version-change svelte-1lrjs3m")},m(l,a){P(l,e,a),c(e,i)},p(l,a){a&8&&t!==(t=l[22]+"")&&_e(i,t)},d(l){l&&m(e)}}}function ca(s){let e,t=`<div style="opacity: 1; padding-bottom: 0.5rem;"><div class="splash-steam-promo-title svelte-1lrjs3m">Now on Steam</div> <div class="splash-steam-promo-bullet svelte-1lrjs3m" style="margin-top: 1rem">- New <span style="color: var(--sr-white); font-weight: 400;">California location</span></div> <div class="splash-steam-promo-bullet svelte-1lrjs3m">- New <span style="color: var(--sr-white); font-weight: 400;">vehicles</span></div> <div class="splash-steam-promo-bullet svelte-1lrjs3m">- Configurable <span style="color: var(--sr-white); font-weight: 400;">traffic</span></div> <div class="splash-steam-promo-bullet svelte-1lrjs3m" style="margin-bottom: 1rem"><span style="color: var(--sr-white); font-weight: 400;">...and more</span></div></div> <a class="splash-steam-promo-visit svelte-1lrjs3m" target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/bundle/91034/over_the_hill__Slow_Roads/" alt=""><div class="splash-steam-promo-bullet svelte-1lrjs3m" style="text-align: center"><span style="color: var(--sr-white); font-weight: 400;">Save 10%</span> on Slow Roads <br/> with the <span style="color: var(--sr-white); font-weight: 400;">over the hill</span> bundle</div> <div class="splash-steam-bundle-bottom svelte-1lrjs3m"><img class="splash-bundle-thumb svelte-1lrjs3m" src="/img/oth_bundle.webp"/></div> <div class="splash-bundle-view svelte-1lrjs3m"><img src="/img/icon_steam_white.svg" alt="" class="splash-steam-promo-visit-icon svelte-1lrjs3m"/>
                                View on Steam</div></a>`;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-t9r13j"&&(e.innerHTML=t),this.h()},h(){f(e,"class","splash-steam-promo svelte-1lrjs3m")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function Kh(s){let e,t;return e=new Pn({props:{showChangelog:s[2],onShowChangelog:s[11]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&4&&(a.showChangelog=i[2]),l&4&&(a.onShowChangelog=i[11]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Xh(s){let e,t='<span style="font-size: 1.2rem; color: var(--sr-primary)">Prefer the old version?</span> <br/> <span style="font-size: 0.9rem">Find it at <a class="splash-smallprint-link svelte-1lrjs3m" href="https://old.slowroads.io">old.slowroads.io</a></span>',i,l;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(a){e=b(a,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-fgyrc"&&(e.innerHTML=t),this.h()},h(){f(e,"class","splash-old svelte-1lrjs3m")},m(a,r){P(a,e,r),i||(l=B(e,"mouseover",s[12]),i=!0)},p:me,d(a){a&&m(e),i=!1,l()}}}function Qh(s){let e,t=`<a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TNf9bBrZmR" alt="" class="splash-main-button svelte-1lrjs3m"><img src="/img/icon_discord_white.svg" alt="" class="splash-main-button-icon svelte-1lrjs3m"/> <br/>
                    Join the Discord</a> <a href="#about" class="splash-main-button svelte-1lrjs3m" style="padding-top: 2rem;"><span style="font-size: 1.5rem">About</span> <br/> <span style="font-size: 2rem">▾</span></a> <a target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/3431300/Slow_Roads/" alt="" class="splash-main-button svelte-1lrjs3m"><img src="/img/icon_steam_white.svg" alt="" class="splash-main-button-icon svelte-1lrjs3m"/> <br/>
                    Now on Steam</a>`;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-spm7h8"&&(e.innerHTML=t),this.h()},h(){f(e,"class","splash-main-buttons svelte-1lrjs3m")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function Zh(s){let e,t;return e=new Bh({props:{q:s[19].q,a:s[19].a}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function ha(s){let e,t,i;return{c(){e=_("div"),t=k(),i=_("div"),this.h()},l(l){e=b(l,"DIV",{id:!0,class:!0}),C(e).forEach(m),t=I(l),i=b(l,"DIV",{id:!0,style:!0,class:!0});var a=C(i);a.forEach(m),this.h()},h(){f(e,"id","splash-bg-overlay"),f(e,"class","svelte-1lrjs3m"),R(e,"splash-bg-overlay-corner",s[7]),f(i,"id","splash-bg"),ae(i,"background-image","url("+s[6]+")"),f(i,"class","svelte-1lrjs3m")},m(l,a){P(l,e,a),P(l,t,a),P(l,i,a)},p:me,d(l){l&&(m(e),m(t),m(i))}}}function Jh(s){let e,t,i,l,a,r,o,n,d="endless driving zen",h,u,g=s[5]?"continue":"begin",p,v,w,y,D,L,T,A,E,x,W="CC BY-NC-ND 4.0 International License",X,U,J,Z,O,j,V=`from <a class="splash-smallprint-link svelte-1lrjs3m" href="https://topograph.io" target="_blank" rel="noopener noreferrer">topograph.io</a> © 2026 	
                <span style="margin: 0 0.5rem;">·</span> <a class="splash-smallprint-link svelte-1lrjs3m" href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> <span style="margin: 0 0.5rem;">·</span> <a class="splash-smallprint-link svelte-1lrjs3m" href="https://topograph.io/slowroads" target="_blank" rel="noopener noreferrer">press kit</a>`,z,M,N,G,se='<div class="splash-body-wrapper svelte-1lrjs3m" style="margin: 5rem 0"><div class="splash-blurb-corner-tl svelte-1lrjs3m"></div> <div class="splash-blurb-corner-tr svelte-1lrjs3m"></div> <div class="splash-blurb svelte-1lrjs3m"><strong>Slow Roads</strong> is a casual driving game designed for long, cathartic journeys on quiet, scenic roads. Simply chase the horizon through endless, procedurally-generated landscapes, with no ads, distractions, or goals. Set the weather to suit your mood, throw on some music, and <strong>just drive.</strong></div> <div class="splash-blurb-corner-bl svelte-1lrjs3m"></div> <div class="splash-blurb-corner-br svelte-1lrjs3m"></div></div>',oe,re,be=`<div class="splash-body-wrapper svelte-1lrjs3m" style="color: var(--sr-secondary)"><div class="splash-body-header svelte-1lrjs3m" style="color: #6dcff6; text-shadow: 0 0 1rem #6dcff688">Available now on Steam
                        <a class="splash-visit-steam svelte-1lrjs3m" target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/3431300/Slow_Roads/"><img src="/img/icon_steam_white.svg" class="splash-body-steam-icon svelte-1lrjs3m" alt=""/>
                            Visit store page</a></div> <video src="/img/letterbox-general.mp4" class="steam-banner svelte-1lrjs3m" autoplay="" muted="" loop=""></video> <div class="splash-body-text svelte-1lrjs3m">For those who want a little more than the web version, Slow Roads is now available in an expanded edition on Steam - there you&#39;ll find dozens of new features and improved quality, with all the elements that have been most highly-requested over the years. The web version will remain freely available, and will continue to get small updates, but will stay as a more minimal representation of the game. Sales on Steam will help to fund ongoing development and keep the web version free and ad-free for all. Read on to find out more.</div> <div class="splash-body-subheader svelte-1lrjs3m" style="color: #6dcff6; position: relative">Steam-exclusive features:
                        <a class="splash-try-demo svelte-1lrjs3m" target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/3431300/Slow_Roads/"><img src="/img/icon_steam_white.svg" class="splash-body-steam-icon svelte-1lrjs3m" alt=""/>
                            Try the demo</a></div> <div class="splash-body-bullets svelte-1lrjs3m"><div class="splash-body-bullet svelte-1lrjs3m">More locations, starting with the new California Coast</div> <div class="splash-body-bullet svelte-1lrjs3m">More road styles, including off-road trails and multi-lane highways</div> <div class="splash-body-bullet svelte-1lrjs3m">More vehicles, starting with a sports car and rally hatchback</div> <video src="/img/letterbox-vehicles.mp4" autoplay="" muted="" loop="" class="steam-banner svelte-1lrjs3m"></video> <div class="splash-body-bullet svelte-1lrjs3m">Combustion engines and manual transmission for all vehicles</div> <div class="splash-body-bullet svelte-1lrjs3m">Vehicle tuning</div> <div class="splash-body-bullet svelte-1lrjs3m">Vehicle customisation</div> <video src="/img/letterbox-customisation.mp4" autoplay="" muted="" loop="" class="steam-banner svelte-1lrjs3m"></video> <div class="splash-body-bullet svelte-1lrjs3m">A music interface for playing local tracks or public radio streams</div> <div class="splash-body-bullet svelte-1lrjs3m">Improved graphics options and detail</div> <div class="splash-body-bullet svelte-1lrjs3m">Configurable traffic modes</div> <video src="/img/letterbox-cockpit.mp4" autoplay="" muted="" loop="" class="steam-banner svelte-1lrjs3m"></video> <div class="splash-body-bullet svelte-1lrjs3m">Achievements and profile stats</div> <div class="splash-body-bullet svelte-1lrjs3m">High definition assets</div> <div class="splash-body-bullet svelte-1lrjs3m">...and more to be added in future updates</div></div> <div class="splash-body-text svelte-1lrjs3m">The Steam version is now live! Please consider purchasing if you&#39;d like to support the project and enjoy the bonus features. I&#39;ll be continuing with content updates for both versions into the future - the main focus for the coming months will be adding weather effects and a new location to the Steam version. Join the Discord for the latest news and updates.</div> <a class="splash-visit-store svelte-1lrjs3m" target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/3431300/Slow_Roads/">Visit the store page for full details</a> <div class="splash-body-subheader svelte-1lrjs3m" style="color: #6dcff6;">Targets for upcoming updates</div> <div class="splash-body-bullets svelte-1lrjs3m"><div class="splash-body-bullet svelte-1lrjs3m">Force feedback support for controllers</div> <div class="splash-body-bullet svelte-1lrjs3m">Rain and dynamic weather effects</div> <div class="splash-body-bullet svelte-1lrjs3m">Day-night cycle and time sync features</div> <div class="splash-body-bullet svelte-1lrjs3m">New locations, e.g. a mountainous Alps location (see WIP below)</div> <div class="splash-body-bullet svelte-1lrjs3m">A world config tool giving control over procedural generation parameters</div> <div class="splash-body-bullet svelte-1lrjs3m">...and more</div></div> <img src="/img/about_dev_04.jpg" class="steam-banner svelte-1lrjs3m"/> <div class="splash-body-text svelte-1lrjs3m">If this sounds good to you, please support the project&#39;s future development by <a class="splash-body-link svelte-1lrjs3m" href="https://store.steampowered.com/app/3431300/Slow_Roads/" target="_blank" rel="noopener noreferrer">purchasing Slow Roads on Steam!</a></div> <div class="splash-body-header svelte-1lrjs3m" style="text-align: left; position: relative; color: #6dcff6; margin-top: 2rem; text-shadow: 0 0 1rem #6dcff688">Slow Roads: Web Edition
                        <a class="splash-visit-steam svelte-1lrjs3m" style="top:-0.5rem;" target="_blank" rel="noopener noreferrer" href="https://topographinteractive.itch.io/slow-roads"><img src="/img/icon_itch_white.svg" class="splash-body-steam-icon svelte-1lrjs3m" style="width: 1.5rem; margin-left: 0.5rem;" alt=""/>
                            Purchase here</a></div> <div class="splash-body-text svelte-1lrjs3m">If you only want to play the web version offline without the extra expense, you can find the downloadable Slow Roads: Web Edition available for a small price on the <a class="splash-body-link svelte-1lrjs3m" href="https://topographinteractive.itch.io/slow-roads" target="_blank" rel="noopener noreferrer">Slow Roads page on itch.io</a>. This version won&#39;t receive the Steam-exclusive features, but does include the high-resolution textures unavailable on the web. Available for Windows, Linux, and MacOS.
                        <br/> <br/>
                        Note that if you want to transfer your progress and settings from slowroads.io to the Web Edition, you can download your save file from the Profile settings and upload that in the app.</div></div>`,we,he,Q='<div class="splash-body-wrapper svelte-1lrjs3m"><div class="splash-body-header svelte-1lrjs3m">Background</div> <div class="splash-body-text svelte-1lrjs3m">Hey, I&#39;m <a class="splash-body-link svelte-1lrjs3m" href="https://anslo.dev">Anslo</a>, a creative generalist interested in 3D graphics and procedural generation. Slow Roads began as my hobby project to generate endless scenic landscapes, packaged as a chill driving game. I made it partly as an experiment in procedural generation, partly to show how capable browsers can be with 3D, and partly to scratch a very specific itch to mindlessly drive forever, as a kind of active meditation.</div> <div class="splash-body-text svelte-1lrjs3m">I started the project in July 2021, released a rough version 1.0 in October 2022, rewrote the whole engine over the next two years, and am now busy developing all sorts of new features. The original goal has always been to support dozens of different locations, I expect to keep working on the game until I fulfil that. But, ultimately, my hope is that those in need of a simple escape will find it here.</div> <div class="splash-body-text svelte-1lrjs3m">You can read a few more details on the <a href="https://topograph.io/slowroads" target="_blank" rel="noopener noreferrer" class="splash-body-link svelte-1lrjs3m">press kit page here</a></div></div>',le,de,K='<div class="splash-body-wrapper svelte-1lrjs3m"><div class="splash-body-header svelte-1lrjs3m">Development Roadmap</div> <div class="splash-body-text svelte-1lrjs3m">Slow Roads is a living project under continuous development. Here&#39;s a look at where the focus will be for the next little while. As a solo developer, it&#39;s impossible to estimate when or whether these features will be finished, but know that I&#39;m now working on the game full-time. I post regular updates to the #dev-log channel in the <a class="splash-body-link svelte-1lrjs3m" href="https://discord.gg/TNf9bBrZmR" target="_blank" rel="noopener noreferrer">Discord server</a>, so check there for the latest.</div> <div class="splash-body-subheader svelte-1lrjs3m">Near-term goals:</div> <div class="splash-body-bullets svelte-1lrjs3m"><div class="splash-body-bullet svelte-1lrjs3m">Post-release support and updates for the Steam version</div> <div class="splash-body-bullet svelte-1lrjs3m">Rain and dynamic weather (Steam feature)</div> <div class="splash-body-bullet svelte-1lrjs3m">Time-of-day cycle controls (Steam feature)</div> <div class="splash-body-bullet svelte-1lrjs3m">Web version 2.5 upgrades, e.g. new UI and improved graphics (will not include Steam-exclusive features)</div> <div class="splash-body-bullet svelte-1lrjs3m">Driftmas 2026</div></div> <div class="splash-body-subheader svelte-1lrjs3m">Future goals:</div> <div class="splash-body-bullets svelte-1lrjs3m"><div class="splash-body-bullet svelte-1lrjs3m">New locations, including mountains, tunnels, forests, and more</div> <div class="splash-body-bullet svelte-1lrjs3m">Improved environmental detail with wildlife, structures, etc.</div> <div class="splash-body-bullet svelte-1lrjs3m">Development of new vehicles</div> <div class="splash-body-bullet svelte-1lrjs3m">Regular community events</div> <div class="splash-body-bullet svelte-1lrjs3m">Gradual development of both the Steam and Web version in parallel</div></div> <div class="splash-body-text svelte-1lrjs3m"><a class="splash-body-link svelte-1lrjs3m" href="https://discord.gg/TNf9bBrZmR" target="_blank" rel="noopener noreferrer">Join the Discord</a> or <a class="splash-body-link svelte-1lrjs3m" href="https://bsky.app/profile/slowroads.io" target="_blank" rel="noopener noreferrer">follow slowroads.io on Bluesky</a> to keep updated and share feedback!</div></div>',ce,$,ge,Ce,je="FAQ",He,ct,ze,ht=`<div class="splash-body-wrapper svelte-1lrjs3m"><div class="splash-body-header svelte-1lrjs3m">Contact</div> <div class="splash-body-text svelte-1lrjs3m" style="text-align:center; user-select: default;">Email
                        <br/> <span style="font-size: 1.2rem; font-weight: 400; color: var(--sr-white); user-select: all;">hello@slowroads.io</span> <br/> <br/>
                        Discord
                        <br/> <span style="font-size: 1.2rem; font-weight: 400; color: var(--sr-white)"><a class="splash-body-link svelte-1lrjs3m" href="https://discord.gg/TNf9bBrZmR" target="_blank" rel="noopener noreferrer">Join the server here</a></span> <br/> <br/>
                        Bluesky
                        <br/> <span style="font-size: 1.2rem; font-weight: 400; color: var(--sr-white)"><a class="splash-body-link svelte-1lrjs3m" href="https://bsky.app/profile/slowroads.io" target="_blank" rel="noopener noreferrer">Follow slowroads.io here</a></span></div></div>`,ut,Ot,Bt=`<div class="splash-body-wrapper svelte-1lrjs3m"><div class="splash-body-header svelte-1lrjs3m">Attributions</div> <div class="splash-body-text svelte-1lrjs3m" style="text-align: center">Rendering library - <a class="splash-body-link svelte-1lrjs3m" href="https://threejs.org/">three.js</a> <br/>
                        Brand design - <a class="splash-body-link svelte-1lrjs3m" href="https://benj-design.com">benj-design.com</a> <br/>
                        Off-world textures - <a class="splash-body-link svelte-1lrjs3m" href="https://mars.nasa.gov/mars2020/multimedia/raw-images/">Nasa Perseverance</a> <br/>
                        Brake audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/WavJunction.com/sounds/456764/">WavJunction.com on freesound.org</a> <br/>
                        Ambient audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/InspectorJ/sounds/401543/">InspectorJ on freesound.org</a> <br/>
                        Tyre audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/fractanimal/sounds/614627/">fractanimal on freesound.org</a> <br/>
                        Gravel audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/seth-m/sounds/341069/">seth-m on freesound.org</a> <br/>
                        Boost audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/YleArkisto/sounds/342892/">YleArkisto on freesound.org</a> <br/>
                        Suspension audio - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/ingudios/sounds/119468/">ingudios on freesound.org</a> <br/>
                        Collision sounds - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/jakobthiesen/sounds/174836/">jakobthiesen on freesound.org</a> <br/>
                        Collision sounds - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/jakobthiesen/sounds/174837/">jakobthiesen on freesound.org</a> <br/>
                        Collision sounds - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/SubwaySandwitch420/sounds/538947/">SubwaySandwitch420 on freesound.org</a> <br/>
                        Barrier scrape sound - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/eyenorth/sounds/464846/">eyenorth on freesound.org</a> <br/>
                        Misc sound effects - <a class="splash-body-link svelte-1lrjs3m" href="https://freesound.org/people/HECKFRICKER/sounds/625312/">HECKFRICKER on freesound.org</a> <br/></div></div>`,ye,Be,Vt='<div class="splash-body-wrapper svelte-1lrjs3m"><div class="splash-body-header svelte-1lrjs3m" style="font-size: 1rem">Thank you for playing</div></div>',Pt,ui,Ht,li,wi,rt=s[1]&&na(),_t=!ti&&Ri&&Yh(s),bt=!s[4]&&s[7]&&ca(),pt=!ti&&Kh(s),zt=Nr&&Xh(s),qt=!ti&&Qh(),yi=Oe(qh),nt=[];for(let dt=0;dt<yi.length;dt+=1)nt[dt]=Zh(Wh(s,yi,dt));let it=!s[5]&&ha(s);return{c(){e=_("div"),t=_("div"),i=_("div"),l=_("div"),a=_("img"),o=k(),n=_("div"),n.textContent=d,h=k(),u=_("div"),p=ee(g),v=k(),rt&&rt.c(),w=k(),y=_("div"),D=_("span"),L=ee(Jt),T=k(),A=_("br"),E=ee(`\r
                This work is licensed under a `),x=_("a"),x.textContent=W,X=k(),_t&&_t.c(),U=k(),bt&&bt.c(),J=k(),pt&&pt.c(),Z=k(),zt&&zt.c(),O=k(),j=_("div"),j.innerHTML=V,z=k(),qt&&qt.c(),M=k(),N=_("div"),G=_("div"),G.innerHTML=se,oe=k(),re=_("div"),re.innerHTML=be,we=k(),he=_("div"),he.innerHTML=Q,le=k(),de=_("div"),de.innerHTML=K,ce=k(),$=_("div"),ge=_("div"),Ce=_("div"),Ce.textContent=je,He=k();for(let dt=0;dt<nt.length;dt+=1)nt[dt].c();ct=k(),ze=_("div"),ze.innerHTML=ht,ut=k(),Ot=_("div"),Ot.innerHTML=Bt,ye=k(),Be=_("div"),Be.innerHTML=Vt,Pt=k(),it&&it.c(),this.h()},l(dt){e=b(dt,"DIV",{id:!0,class:!0});var Ze=C(e);t=b(Ze,"DIV",{id:!0,class:!0});var Dt=C(t);i=b(Dt,"DIV",{id:!0,class:!0});var vt=C(i);l=b(vt,"DIV",{id:!0,class:!0});var Lt=C(l);a=b(Lt,"IMG",{class:!0,src:!0,alt:!0}),o=I(Lt),n=b(Lt,"DIV",{class:!0,"data-svelte-h":!0}),Y(n)!=="svelte-1fl8x43"&&(n.textContent=d),h=I(Lt),u=b(Lt,"DIV",{id:!0,class:!0});var $t=C(u);p=te($t,g),$t.forEach(m),v=I(Lt),rt&&rt.l(Lt),Lt.forEach(m),w=I(vt),y=b(vt,"DIV",{class:!0});var ri=C(y);D=b(ri,"SPAN",{class:!0});var ai=C(D);L=te(ai,Jt),ai.forEach(m),T=I(ri),A=b(ri,"BR",{}),E=te(ri,`\r
                This work is licensed under a `),x=b(ri,"A",{rel:!0,class:!0,href:!0,target:!0,"data-svelte-h":!0}),Y(x)!=="svelte-u8p6bq"&&(x.textContent=W),ri.forEach(m),X=I(vt),_t&&_t.l(vt),U=I(vt),bt&&bt.l(vt),J=I(vt),pt&&pt.l(vt),Z=I(vt),zt&&zt.l(vt),O=I(vt),j=b(vt,"DIV",{class:!0,"data-svelte-h":!0}),Y(j)!=="svelte-1os97po"&&(j.innerHTML=V),z=I(vt),qt&&qt.l(vt),vt.forEach(m),M=I(Dt),N=b(Dt,"DIV",{id:!0,class:!0});var ft=C(N);G=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(G)!=="svelte-pdwk63"&&(G.innerHTML=se),oe=I(ft),re=b(ft,"DIV",{class:!0,"data-svelte-h":!0}),Y(re)!=="svelte-1sgbrm"&&(re.innerHTML=be),we=I(ft),he=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(he)!=="svelte-vhfs9x"&&(he.innerHTML=Q),le=I(ft),de=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(de)!=="svelte-1c5onoy"&&(de.innerHTML=K),ce=I(ft),$=b(ft,"DIV",{class:!0,style:!0});var ki=C($);ge=b(ki,"DIV",{class:!0});var Wt=C(ge);Ce=b(Wt,"DIV",{class:!0,"data-svelte-h":!0}),Y(Ce)!=="svelte-1oguvct"&&(Ce.textContent=je),He=I(Wt);for(let Xt=0;Xt<nt.length;Xt+=1)nt[Xt].l(Wt);Wt.forEach(m),ki.forEach(m),ct=I(ft),ze=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(ze)!=="svelte-164ar8c"&&(ze.innerHTML=ht),ut=I(ft),Ot=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(Ot)!=="svelte-1krubna"&&(Ot.innerHTML=Bt),ye=I(ft),Be=b(ft,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(Be)!=="svelte-omq68c"&&(Be.innerHTML=Vt),ft.forEach(m),Pt=I(Dt),it&&it.l(Dt),Dt.forEach(m),Ze.forEach(m),this.h()},h(){f(a,"class","splash-logo svelte-1lrjs3m"),Ut(a.src,r="/img/logo-stacked-white.svg")||f(a,"src",r),f(a,"alt",""),f(n,"class","splash-subtitle svelte-1lrjs3m"),f(u,"id","splash-begin"),f(u,"class","svelte-1lrjs3m"),f(l,"id","splash-title"),f(l,"class","svelte-1lrjs3m"),f(D,"class","splash-smallprint-link svelte-1lrjs3m"),f(x,"rel","license noopener noreferrer"),f(x,"class","splash-smallprint-link svelte-1lrjs3m"),f(x,"href","http://creativecommons.org/licenses/by-nc-nd/4.0/"),f(x,"target","_blank"),f(y,"class","splash-smallprint splash-lr svelte-1lrjs3m"),f(j,"class","splash-smallprint splash-ll svelte-1lrjs3m"),f(i,"id","splash-main"),f(i,"class","svelte-1lrjs3m"),f(G,"class","splash-body-section svelte-1lrjs3m"),ae(G,"background","var(--sr-black)"),f(re,"class","splash-body-section splash-steam-bg svelte-1lrjs3m"),f(he,"class","splash-body-section svelte-1lrjs3m"),ae(he,"background","none"),f(de,"class","splash-body-section svelte-1lrjs3m"),ae(de,"background","var(--sr-black)"),f(Ce,"class","splash-body-header svelte-1lrjs3m"),f(ge,"class","splash-body-wrapper svelte-1lrjs3m"),f($,"class","splash-body-section svelte-1lrjs3m"),ae($,"background","none"),f(ze,"class","splash-body-section svelte-1lrjs3m"),ae(ze,"background","var(--sr-black)"),f(Ot,"class","splash-body-section svelte-1lrjs3m"),ae(Ot,"background","none"),f(Be,"class","splash-body-section svelte-1lrjs3m"),ae(Be,"background","var(--sr-black)"),f(N,"id","about"),f(N,"class","svelte-1lrjs3m"),f(t,"id",ui=s[4]?"splash-dynamic":"splash-fixed"),f(t,"class","svelte-1lrjs3m"),f(e,"id","splash"),f(e,"class","svelte-1lrjs3m")},m(dt,Ze){P(dt,e,Ze),c(e,t),c(t,i),c(i,l),c(l,a),c(l,o),c(l,n),c(l,h),c(l,u),c(u,p),c(l,v),rt&&rt.m(l,null),c(i,w),c(i,y),c(y,D),c(D,L),c(y,T),c(y,A),c(y,E),c(y,x),c(i,X),_t&&_t.m(i,null),c(i,U),bt&&bt.m(i,null),c(i,J),pt&&pt.m(i,null),c(i,Z),zt&&zt.m(i,null),c(i,O),c(i,j),c(i,z),qt&&qt.m(i,null),c(t,M),c(t,N),c(N,G),c(N,oe),c(N,re),c(N,we),c(N,he),c(N,le),c(N,de),c(N,ce),c(N,$),c($,ge),c(ge,Ce),c(ge,He);for(let Dt=0;Dt<nt.length;Dt+=1)nt[Dt]&&nt[Dt].m(ge,null);c(N,ct),c(N,ze),c(N,ut),c(N,Ot),c(N,ye),c(N,Be),c(t,Pt),it&&it.m(t,null),Ht=!0,li||(wi=[B(u,"touchstart",s[8],{passive:!0}),B(u,"click",function(){zl(s[0])&&s[0].apply(this,arguments)}),B(D,"click",s[9])],li=!0)},p(dt,[Ze]){s=dt,(!Ht||Ze&32)&&g!==(g=s[5]?"continue":"begin")&&_e(p,g),s[1]?rt||(rt=na(),rt.c(),rt.m(l,null)):rt&&(rt.d(1),rt=null),!ti&&Ri&&_t.p(s,Ze),!s[4]&&s[7]?bt||(bt=ca(),bt.c(),bt.m(i,J)):bt&&(bt.d(1),bt=null),ti||pt.p(s,Ze),Nr&&zt.p(s,Ze),s[5]?it&&(it.d(1),it=null):it?it.p(s,Ze):(it=ha(s),it.c(),it.m(t,null)),(!Ht||Ze&16&&ui!==(ui=s[4]?"splash-dynamic":"splash-fixed"))&&f(t,"id",ui)},i(dt){if(!Ht){q(pt);for(let Ze=0;Ze<yi.length;Ze+=1)q(nt[Ze]);Ht=!0}},o(dt){ie(pt),nt=nt.filter(Boolean);for(let Ze=0;Ze<nt.length;Ze+=1)ie(nt[Ze]);Ht=!1},d(dt){dt&&m(e),rt&&rt.d(),_t&&_t.d(),bt&&bt.d(),pt&&pt.d(),zt&&zt.d(),qt&&qt.d(),yt(nt,dt),it&&it.d(),li=!1,lt(wi)}}}function $h(s,e,t){let i,l;ke(s,si,E=>t(4,i=E)),ke(s,Ts,E=>t(5,l=E));let{toggleSplash:a=()=>{}}=e,{webglError:r=!1}=e,o=!1,n=[],d=Ri&&Xs[2]==Jt[2];for(let E of $l)if(pn(E.version,Xs)>0)E.quickChanges&&(E.version[4]==0||d)&&n.push(...E.quickChanges);else break;n.length>12&&(n=n.slice(0,12));const h=["/img/about_zen_01.jpg","/img/about_road.jpg","/img/about_veh_05.jpg","/img/about_traffic.jpg","/img/about_dev_04.jpg"],u=["/img/autumn_01b.webp","/img/autumn_02b.webp","/img/autumn_03b.webp","/img/autumn_04b.webp","/img/autumn_05b.webp","/img/autumn_06b.webp","/img/autumn_07b.webp","/img/autumn_08b.webp","/img/autumn_09b.webp"];let g=Math.floor(Math.random()*h.length);h[g];let p=kd?8:Math.floor(Math.random()*u.length),v=u[p],w=Id;setInterval(()=>{g=(g+1)%h.length,h[g]},2e3);const y=()=>{ne.set("touchscreen",!0)},D=()=>t(2,o=!o),L=()=>t(2,o=!o),T=E=>t(2,o=E),A=()=>{localStorage.setItem("hasSeenOld",!0)};return s.$$set=E=>{"toggleSplash"in E&&t(0,a=E.toggleSplash),"webglError"in E&&t(1,r=E.webglError)},[a,r,o,n,i,l,v,w,y,D,L,T,A]}class ef extends Xe{constructor(e){super(),Qe(this,e,$h,Jh,Ke,{toggleSplash:0,webglError:1})}}function tf(s){let e,t,i,l,a,r,o,n,d,h,u,g,p,v,w,y="RESET",D,L;return{c(){e=_("div"),t=_("div"),i=k(),l=_("div"),a=k(),r=_("div"),o=k(),n=_("div"),d=_("div"),h=k(),u=_("div"),g=k(),p=_("div"),v=k(),w=_("div"),w.textContent=y,this.h()},l(T){e=b(T,"DIV",{class:!0});var A=C(e);t=b(A,"DIV",{class:!0,style:!0});var E=C(t);E.forEach(m),i=I(A),l=b(A,"DIV",{class:!0}),C(l).forEach(m),a=I(A),r=b(A,"DIV",{class:!0,style:!0}),C(r).forEach(m),A.forEach(m),o=I(T),n=b(T,"DIV",{class:!0});var x=C(n);d=b(x,"DIV",{class:!0,style:!0});var W=C(d);W.forEach(m),h=I(x),u=b(x,"DIV",{class:!0}),C(u).forEach(m),g=I(x),p=b(x,"DIV",{class:!0,style:!0}),C(p).forEach(m),x.forEach(m),v=I(T),w=b(T,"DIV",{class:!0,"data-svelte-h":!0}),Y(w)!=="svelte-jv83gf"&&(w.textContent=y),this.h()},h(){f(t,"class","steer-slider-thumb svelte-1fln1t4"),ae(t,"top",s[0]*100+"%"),R(t,"steer-dragging",s[4]),f(l,"class","steer-slider-track svelte-1fln1t4"),f(r,"class","steer-slider-zero svelte-1fln1t4"),ae(r,"top",Et*100+"%"),f(e,"class","steer-slider left-steer svelte-1fln1t4"),f(d,"class","steer-slider-thumb svelte-1fln1t4"),ae(d,"top",s[1]*100+"%"),R(d,"steer-dragging",s[5]),f(u,"class","steer-slider-track svelte-1fln1t4"),f(p,"class","steer-slider-zero svelte-1fln1t4"),ae(p,"top",Et*100+"%"),f(n,"class","steer-slider right-steer svelte-1fln1t4"),f(w,"class","touch-reset svelte-1fln1t4")},m(T,A){P(T,e,A),c(e,t),c(e,i),c(e,l),c(e,a),c(e,r),s[12](e),P(T,o,A),P(T,n,A),c(n,d),c(n,h),c(n,u),c(n,g),c(n,p),s[15](n),P(T,v,A),P(T,w,A),D||(L=[B(e,"mousedown",s[13]),B(e,"touchstart",s[14]),B(n,"mousedown",s[16]),B(n,"touchstart",s[17]),B(w,"click",s[18])],D=!0)},p(T,A){A[0]&1&&ae(t,"top",T[0]*100+"%"),A[0]&16&&R(t,"steer-dragging",T[4]),A[0]&2&&ae(d,"top",T[1]*100+"%"),A[0]&32&&R(d,"steer-dragging",T[5])},i:me,o:me,d(T){T&&(m(e),m(o),m(n),m(v),m(w)),s[12](null),s[15](null),D=!1,lt(L)}}}const Et=.9;function fa(s=[],e){for(let t of s)if(t.target==e)return t;return null}function sf(s,e,t){let{enabled:i=!0}=e,l=null,a=null,r=0,o=0,n=!1,d=!1,h=Et,u=Et,g,p,v=window.innerWidth<window.innerHeight;function w(){v=window.innerWidth<window.innerHeight}function y(V){fa(V.changedTouches,l)&&(t(4,n=!0),g=l.getBoundingClientRect(),A(V))}function D(V){fa(V.changedTouches,a)&&(t(5,d=!0),p=a.getBoundingClientRect(),A(V))}function L(V,z){}function T(V){t(4,n=!1),h>Et&&t(0,h=Et),t(5,d=!1),u>Et&&t(1,u=Et)}function A(V){if(i){for(let z of V.changedTouches)n&&z.target==l&&(v?t(0,h=Math.max(Math.min(1,(g.right-z.clientX)/g.width),0)):t(0,h=Math.max(Math.min(1,(z.clientY-g.top)/g.height),0))),d&&z.target==a&&(v?t(1,u=Math.max(Math.min(1,(p.right-z.clientX)/p.width),0)):t(1,u=Math.max(Math.min(1,(z.clientY-p.top)/p.height),0)));V.preventDefault(),V.stopImmediatePropagation()}}function E(V){for(let z of V.changedTouches)n&&z.target==l&&(t(4,n=!1),h>Et&&t(0,h=Et)),d&&z.target==a&&(t(5,d=!1),u>Et&&t(1,u=Et))}function x(V){n?t(0,h=Math.max(Math.min(1,(V.clientY-g.top)/g.height),0)):d&&t(1,u=Math.max(Math.min(1,(V.clientY-p.top)/p.height),0))}ot(()=>(window.addEventListener("mousemove",x),window.addEventListener("mouseup",T),window.addEventListener("touchmove",A,{passive:!1}),window.addEventListener("touchend",E),window.addEventListener("resize",w),Qs.set(!0),()=>{window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",T),window.removeEventListener("touchmove",A),window.removeEventListener("touchend",E),window.removeEventListener("resize",w),Qs.set(!1)}));function W(V){St[V?"unshift":"push"](()=>{l=V,t(2,l)})}const X=V=>{},U=V=>{y(V)};function J(V){St[V?"unshift":"push"](()=>{a=V,t(3,a)})}const Z=V=>{},O=V=>{D(V)},j=()=>{t(0,h=Et),t(1,u=Et),bn.update(V=>V+1)};return s.$$set=V=>{"enabled"in V&&t(9,i=V.enabled)},s.$$.update=()=>{s.$$.dirty[0]&3075&&(t(10,r=(Et-h)/Et),t(11,o=(Et-u)/Et),_n.set((r+o)/2),Ul.set(r-o))},[h,u,l,a,n,d,y,D,L,i,r,o,W,X,U,J,Z,O,j]}class lf extends Xe{constructor(e){super(),Qe(this,e,sf,tf,Ke,{enabled:9},null,[-1,-1])}}function rf(s){let e,t,i,l,a,r,o,n,d,h,u,g='<div class="steer-thumb svelte-if0uoq"></div>',p,v,w="",y,D,L="RESET",T,A,E="BRAKE",x,W,X="BOOST",U,J,Z="CAM",O,j;return{c(){e=_("div"),t=_("div"),i=_("div"),l=k(),a=_("div"),r=k(),o=_("div"),n=k(),d=_("div"),h=_("div"),u=_("div"),u.innerHTML=g,p=k(),v=_("div"),v.innerHTML=w,y=k(),D=_("div"),D.textContent=L,T=k(),A=_("div"),A.textContent=E,x=k(),W=_("div"),W.textContent=X,U=k(),J=_("div"),J.textContent=Z,this.h()},l(V){e=b(V,"DIV",{class:!0});var z=C(e);t=b(z,"DIV",{class:!0});var M=C(t);i=b(M,"DIV",{class:!0,style:!0});var N=C(i);N.forEach(m),l=I(M),a=b(M,"DIV",{class:!0}),C(a).forEach(m),r=I(M),o=b(M,"DIV",{class:!0,style:!0}),C(o).forEach(m),M.forEach(m),n=I(z),d=b(z,"DIV",{class:!0});var G=C(d);h=b(G,"DIV",{class:!0});var se=C(h);u=b(se,"DIV",{class:!0,"data-svelte-h":!0}),Y(u)!=="svelte-htckc0"&&(u.innerHTML=g),p=I(se),v=b(se,"DIV",{class:!0,"data-svelte-h":!0}),Y(v)!=="svelte-1npfju5"&&(v.innerHTML=w),se.forEach(m),G.forEach(m),y=I(z),D=b(z,"DIV",{class:!0,"data-svelte-h":!0}),Y(D)!=="svelte-leux23"&&(D.textContent=L),T=I(z),A=b(z,"DIV",{class:!0,"data-svelte-h":!0}),Y(A)!=="svelte-10pe3fz"&&(A.textContent=E),x=I(z),W=b(z,"DIV",{class:!0,"data-svelte-h":!0}),Y(W)!=="svelte-6q7fx7"&&(W.textContent=X),U=I(z),J=b(z,"DIV",{class:!0,"data-svelte-h":!0}),Y(J)!=="svelte-cjqwr0"&&(J.textContent=Z),z.forEach(m),this.h()},h(){f(i,"class","slider-thumb svelte-if0uoq"),ae(i,"top",s[0]*100+"%"),R(i,"slider-dragging",s[4]),f(a,"class","accel-slider-track svelte-if0uoq"),f(o,"class","accel-slider-zero svelte-if0uoq"),ae(o,"top",di*100+"%"),f(t,"class","accel-slider svelte-if0uoq"),f(u,"class","steer-thumb-container svelte-if0uoq"),f(v,"class","steer-bar-zero svelte-if0uoq"),f(h,"class","steer-bar svelte-if0uoq"),f(d,"class","steer svelte-if0uoq"),f(D,"class","touch-btn touch-reset svelte-if0uoq"),f(A,"class","touch-btn touch-brake svelte-if0uoq"),f(W,"class","touch-btn touch-boost svelte-if0uoq"),f(J,"class","touch-btn touch-cam svelte-if0uoq"),f(e,"class","touch-visible svelte-if0uoq"),R(e,"touch-hidden",s[5])},m(V,z){P(V,e,z),c(e,t),c(t,i),c(t,l),c(t,a),c(t,r),c(t,o),s[13](t),c(e,n),c(e,d),c(d,h),c(h,u),s[16](u),c(h,p),c(h,v),s[17](d),c(e,y),c(e,D),c(e,T),c(e,A),c(e,x),c(e,W),c(e,U),c(e,J),O||(j=[B(t,"mousedown",s[14]),B(t,"touchstart",s[15]),B(d,"mousedown",s[18]),B(d,"touchstart",s[19]),B(D,"click",s[20]),B(A,"touchstart",s[21],{passive:!0}),B(A,"touchend",s[22],{passive:!0}),B(W,"touchstart",s[23],{passive:!0}),B(W,"touchend",s[24],{passive:!0}),B(J,"click",s[25])],O=!0)},p(V,z){z[0]&1&&ae(i,"top",V[0]*100+"%"),z[0]&16&&R(i,"slider-dragging",V[4]),z[0]&32&&R(e,"touch-hidden",V[5])},i:me,o:me,d(V){V&&m(e),s[13](null),s[16](null),s[17](null),O=!1,lt(j)}}}const di=.9;function ua(s=[],e){for(let t of s)if(t.target==e)return t;return null}function af(s,e,t){let{enabled:i=!0}=e;const l=Math.PI/4,a=Math.PI/2;let r=null,o=null,n=null,d=0,h=0,u=!1,g=!1,p=di,v,w,y=window.innerWidth<window.innerHeight;function D(){y=window.innerWidth<window.innerHeight}function L(Q){U(),ua(Q.changedTouches,r)&&(t(4,u=!0),v=r.getBoundingClientRect(),x(Q))}function T(Q){U(),ua(Q.changedTouches,o)&&(g=!0,w=o.getBoundingClientRect(),x(Q))}function A(Q,le){}function E(Q){t(4,u=!1),p>di&&t(0,p=di),g=!1,Ai.sticky||(t(12,h=0),t(3,n.style.transform="rotate(-"+l+"rad)",n))}function x(Q){if(i){for(let le of Q.changedTouches)if(u&&le.target==r&&(y?t(0,p=Math.max(Math.min(1,(v.right-le.clientX)/v.width),0)):t(0,p=Math.max(Math.min(1,(le.clientY-v.top)/v.height),0))),g&&le.target==o){let de,K;y?(de=(w.bottom-le.clientY)/w.width,K=(le.clientX-w.left)/w.width):(de=(w.right-le.clientX)/w.height,K=1-(le.clientY-w.top)/w.height);let ce=Math.atan2(K,de);ce=Math.min(Math.max(0,ce),a),t(12,h=(ce-l)/l),t(3,n.style.transform="rotate(-"+(a-ce)+"rad)",n)}Q.preventDefault(),Q.stopImmediatePropagation()}}function W(Q){for(let le of Q.changedTouches)u&&le.target==r&&(t(4,u=!1),p>di&&t(0,p=di)),g&&le.target==o&&(g=!1,Ai.sticky||(t(12,h=0),t(3,n.style.transform="rotate(-"+l+"rad)",n)))}function X(Q){u&&t(0,p=Math.max(Math.min(1,(Q.clientY-v.top)/v.height),0))}function U(){hs.hasInit||hs.init()}let J=!1;function Z(Q){t(5,J=Gt.value&&ne.autodriveMode==$i.FULL),Gt.value&&ne.autodriveMode!=$i.STEER&&t(0,p=di)}ot(()=>(window.addEventListener("mousemove",X),window.addEventListener("mouseup",E),window.addEventListener("touchmove",x,{passive:!1}),window.addEventListener("touchend",W),window.addEventListener("resize",D),Gt.addListener(Z),ne.addListener("autodriveMode",Z),Qs.set(!0),()=>{window.removeEventListener("mousemove",X),window.removeEventListener("mouseup",E),window.removeEventListener("touchmove",x),window.removeEventListener("touchend",W),window.removeEventListener("resize",D),Gt.removeListener(Z),ne.removeListener("autodriveMode",Z),Qs.set(!1)}));function O(Q){St[Q?"unshift":"push"](()=>{r=Q,t(1,r)})}const j=Q=>{},V=Q=>{L(Q)};function z(Q){St[Q?"unshift":"push"](()=>{n=Q,t(3,n)})}function M(Q){St[Q?"unshift":"push"](()=>{o=Q,t(2,o)})}const N=Q=>{},G=Q=>{T(Q)},se=()=>{U(),Ai.resetMaintainsAccel||t(0,p=di),bn.update(Q=>Q+1)},oe=()=>{U(),xr.set(1)},re=()=>xr.set(0),be=()=>{U(),Rr.set(1)},we=()=>Rr.set(0),he=()=>{U(),fn.update(Q=>Q+1)};return s.$$set=Q=>{"enabled"in Q&&t(10,i=Q.enabled)},s.$$.update=()=>{s.$$.dirty[0]&2049&&(t(11,d=(di-p)/di),d<0?t(11,d*=di*10):t(11,d=d*d),_n.set(d)),s.$$.dirty[0]&4096&&(h<0?Ul.set(h*h*-(1-Ai.linearity)+h*Ai.linearity):Ul.set(h*h*(1-Ai.linearity)+h*Ai.linearity))},[p,r,o,n,u,J,L,T,A,U,i,d,h,O,j,V,z,M,N,G,se,oe,re,be,we,he]}class of extends Xe{constructor(e){super(),Qe(this,e,af,rf,Ke,{enabled:10},null,[-1,-1])}}function va(s,e,t){const i=s.slice();return i[5]=e[t],i}function ma(s){let e,t,i,l,a,r;function o(){return s[3](s[5])}return{c(){e=_("div"),t=_("img"),l=k(),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);t=b(d,"IMG",{class:!0,src:!0}),l=I(d),d.forEach(m),this.h()},h(){f(t,"class","option-icon svelte-lk6ame"),Ut(t.src,i=s[5].icon)||f(t,"src",i),R(t,"option-icon-selected",s[2]==s[5].key),f(e,"class","style-selection-option svelte-lk6ame"),R(e,"style-selection-option-selected",s[2]==s[5].key)},m(n,d){P(n,e,d),c(e,t),c(e,l),a||(r=B(e,"mousedown",o),a=!0)},p(n,d){s=n,d&1&&!Ut(t.src,i=s[5].icon)&&f(t,"src",i),d&5&&R(t,"option-icon-selected",s[2]==s[5].key),d&5&&R(e,"style-selection-option-selected",s[2]==s[5].key)},d(n){n&&m(e),a=!1,r()}}}function nf(s){let e,t=Oe(s[0].options),i=[];for(let l=0;l<t.length;l+=1)i[l]=ma(va(s,t,l));return{c(){e=_("div");for(let l=0;l<i.length;l+=1)i[l].c();this.h()},l(l){e=b(l,"DIV",{class:!0});var a=C(e);for(let r=0;r<i.length;r+=1)i[r].l(a);a.forEach(m),this.h()},h(){f(e,"class","style-selection svelte-lk6ame")},m(l,a){P(l,e,a);for(let r=0;r<i.length;r+=1)i[r]&&i[r].m(e,null)},p(l,[a]){if(a&7){t=Oe(l[0].options);let r;for(r=0;r<t.length;r+=1){const o=va(l,t,r);i[r]?i[r].p(o,a):(i[r]=ma(o),i[r].c(),i[r].m(e,null))}for(;r<i.length;r+=1)i[r].d(1);i.length=t.length}},i:me,o:me,d(l){l&&m(e),yt(i,l)}}}function df(s,e,t){let{meta:i}=e,{live:l}=e,a="";function r(n){t(2,a=n)}ot(()=>(t(2,a=l[i.key]),l.addListener(i.key,r),()=>{l.removeListener(i.key,r)}));const o=n=>l.set(i.key,n.key);return s.$$set=n=>{"meta"in n&&t(0,i=n.meta),"live"in n&&t(1,l=n.live)},[i,l,a,o]}class cf extends Xe{constructor(e){super(),Qe(this,e,df,nf,Ke,{meta:0,live:1})}}function ga(s,e,t){const i=s.slice();return i[5]=e[t],i}function hf(s){let e,t,i=s[5].type+"",l;return{c(){e=_("div"),t=ee("Unrecognised type "),l=ee(i)},l(a){e=b(a,"DIV",{});var r=C(e);t=te(r,"Unrecognised type "),l=te(r,i),r.forEach(m)},m(a,r){P(a,e,r),c(e,t),c(e,l)},p(a,r){r&1&&i!==(i=a[5].type+"")&&_e(l,i)},i:me,o:me,d(a){a&&m(e)}}}function ff(s){let e,t;return e=new cf({props:{meta:s[5],live:s[1]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.meta=i[5]),l&2&&(a.live=i[1]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function pa(s){let e,t,i=s[5].readable+"",l,a,r,o,n,d;const h=[ff,hf],u=[];function g(p,v){return p[5].type==Li.Selection?0:1}return r=g(s),o=u[r]=h[r](s),{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),o.c(),n=k(),this.h()},l(p){e=b(p,"DIV",{class:!0});var v=C(e);t=b(v,"DIV",{class:!0});var w=C(t);l=te(w,i),w.forEach(m),a=I(v),o.l(v),n=I(v),v.forEach(m),this.h()},h(){f(t,"class","style-subtitle svelte-p9ui73"),f(e,"class","style-group svelte-p9ui73")},m(p,v){P(p,e,v),c(e,t),c(t,l),c(e,a),u[r].m(e,null),c(e,n),d=!0},p(p,v){(!d||v&1)&&i!==(i=p[5].readable+"")&&_e(l,i);let w=r;r=g(p),r===w?u[r].p(p,v):(Fe(),ie(u[w],1,1,()=>{u[w]=null}),Ge(),o=u[r],o?o.p(p,v):(o=u[r]=h[r](p),o.c()),q(o,1),o.m(e,n))},i(p){d||(q(o),d=!0)},o(p){ie(o),d=!1},d(p){p&&m(e),u[r].d()}}}function uf(s){let e,t,i=Oe(s[0]),l=[];for(let r=0;r<i.length;r+=1)l[r]=pa(ga(s,i,r));const a=r=>ie(l[r],1,1,()=>{l[r]=null});return{c(){e=_("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=b(r,"DIV",{class:!0});var o=C(e);for(let n=0;n<l.length;n+=1)l[n].l(o);o.forEach(m),this.h()},h(){f(e,"class","style-main svelte-p9ui73")},m(r,o){P(r,e,o);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null);t=!0},p(r,[o]){if(o&3){i=Oe(r[0]);let n;for(n=0;n<i.length;n+=1){const d=ga(r,i,n);l[n]?(l[n].p(d,o),q(l[n],1)):(l[n]=pa(d),l[n].c(),q(l[n],1),l[n].m(e,null))}for(Fe(),n=i.length;n<l.length;n+=1)a(n);Ge()}},i(r){if(!t){for(let o=0;o<i.length;o+=1)q(l[o]);t=!0}},o(r){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)ie(l[o]);t=!1},d(r){r&&m(e),yt(l,r)}}}function vf(s,e,t){let i=[],l;function a(o){let n=[];for(let d in o)d!="presets"&&n.push(o[d]);t(0,i=n)}function r(o){t(1,l=o)}return ot(()=>(zs.addListener("metaConfig",a),zs.addListener("liveConfig",r),()=>{zs.removeListener("metaConfig",a),zs.removeListener("liveConfig",r)})),[i,l]}class mf extends Xe{constructor(e){super(),Qe(this,e,vf,uf,Ke,{})}}function _a(s,e,t){const i=s.slice();return i[9]=e[t],i[11]=t,i}function gf(s){let e=s[9].label+"",t;return{c(){t=ee(e)},l(i){t=te(i,e)},m(i,l){P(i,t,l)},p(i,l){l&1&&e!==(e=i[9].label+"")&&_e(t,e)},d(i){i&&m(t)}}}function pf(s){let e,t;return{c(){e=_("img"),this.h()},l(i){e=b(i,"IMG",{class:!0,src:!0}),this.h()},h(){f(e,"class","enum-option-icon svelte-1ey7984"),Ut(e.src,t=s[9].icon)||f(e,"src",t),R(e,"icon-selected",s[2]==s[11]&&!s[1])},m(i,l){P(i,e,l)},p(i,l){l&1&&!Ut(e.src,t=i[9].icon)&&f(e,"src",t),l&6&&R(e,"icon-selected",i[2]==i[11]&&!i[1])},d(i){i&&m(e)}}}function ba(s){let e,t,i,l;function a(d,h){return d[9].icon?pf:gf}let r=a(s),o=r(s);function n(){return s[7](s[11])}return{c(){e=_("div"),o.c(),t=k(),this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);o.l(h),t=I(h),h.forEach(m),this.h()},h(){f(e,"class","enum-option svelte-1ey7984"),R(e,"selected",s[2]==s[11]&&!s[1])},m(d,h){P(d,e,h),o.m(e,null),c(e,t),i||(l=B(e,"click",n),i=!0)},p(d,h){s=d,r===(r=a(s))&&o?o.p(s,h):(o.d(1),o=r(s),o&&(o.c(),o.m(e,t))),h&6&&R(e,"selected",s[2]==s[11]&&!s[1])},d(d){d&&m(e),o.d(),i=!1,l()}}}function _f(s){let e,t=Oe(s[0]),i=[];for(let l=0;l<t.length;l+=1)i[l]=ba(_a(s,t,l));return{c(){e=_("div");for(let l=0;l<i.length;l+=1)i[l].c();this.h()},l(l){e=b(l,"DIV",{class:!0});var a=C(e);for(let r=0;r<i.length;r+=1)i[r].l(a);a.forEach(m),this.h()},h(){f(e,"class","enum-container svelte-1ey7984")},m(l,a){P(l,e,a);for(let r=0;r<i.length;r+=1)i[r]&&i[r].m(e,null)},p(l,[a]){if(a&15){t=Oe(l[0]);let r;for(r=0;r<t.length;r+=1){const o=_a(l,t,r);i[r]?i[r].p(o,a):(i[r]=ba(o),i[r].c(),i[r].m(e,null))}for(;r<i.length;r+=1)i[r].d(1);i.length=t.length}},i:me,o:me,d(l){l&&m(e),yt(i,l)}}}function bf(s,e,t){let{liveSetting:i}=e,{settingKey:l}=e,{settingLabel:a}=e,{options:r}=e,{disabled:o=!1}=e,n=i[l];const d=g=>{t(2,n=g)},h=g=>{i.set(l,g)};ot(()=>(i.addListener(l,d),()=>{i.removeListener(l,d)}));const u=g=>{h(g)};return s.$$set=g=>{"liveSetting"in g&&t(4,i=g.liveSetting),"settingKey"in g&&t(5,l=g.settingKey),"settingLabel"in g&&t(6,a=g.settingLabel),"options"in g&&t(0,r=g.options),"disabled"in g&&t(1,o=g.disabled)},[r,o,n,h,i,l,a,u]}class wf extends Xe{constructor(e){super(),Qe(this,e,bf,_f,Ke,{liveSetting:4,settingKey:5,settingLabel:6,options:0,disabled:1})}}function yf(s){let e,t,i="▲",l,a,r=(s[3]?"1.0":s[4].toFixed(s[2]))+"",o,n,d,h,u="▼",g,p;return{c(){e=_("div"),t=_("div"),t.textContent=i,l=k(),a=_("div"),o=ee(r),n=ee("x"),d=k(),h=_("div"),h.textContent=u,this.h()},l(v){e=b(v,"DIV",{class:!0});var w=C(e);t=b(w,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-iy1368"&&(t.textContent=i),l=I(w),a=b(w,"DIV",{class:!0});var y=C(a);o=te(y,r),n=te(y,"x"),y.forEach(m),d=I(w),h=b(w,"DIV",{class:!0,"data-svelte-h":!0}),Y(h)!=="svelte-cd1zbb"&&(h.textContent=u),w.forEach(m),this.h()},h(){f(t,"class","range-arrow svelte-zwoxeg"),f(a,"class","range-value svelte-zwoxeg"),f(h,"class","range-arrow svelte-zwoxeg"),f(e,"class","range-container svelte-zwoxeg")},m(v,w){P(v,e,w),c(e,t),c(e,l),c(e,a),c(a,o),c(a,n),c(e,d),c(e,h),g||(p=[B(t,"mousedown",s[8]),B(h,"mousedown",s[9])],g=!0)},p(v,[w]){w&28&&r!==(r=(v[3]?"1.0":v[4].toFixed(v[2]))+"")&&_e(o,r)},i:me,o:me,d(v){v&&m(e),g=!1,lt(p)}}}function Sf(s,e,t){let{liveSetting:i}=e,{settingKey:l}=e,{settingLabel:a}=e,{min:r=0}=e,{max:o=1}=e,{precision:n=1}=e,{disabled:d=!1}=e,h=i[l];const u=v=>{t(4,h=v)};ot(()=>(i.addListener(l,u),()=>{i.removeListener(l,u)}));const g=()=>i.set(l,h+1/Math.pow(10,n)),p=()=>i.set(l,h-1/Math.pow(10,n));return s.$$set=v=>{"liveSetting"in v&&t(0,i=v.liveSetting),"settingKey"in v&&t(1,l=v.settingKey),"settingLabel"in v&&t(5,a=v.settingLabel),"min"in v&&t(6,r=v.min),"max"in v&&t(7,o=v.max),"precision"in v&&t(2,n=v.precision),"disabled"in v&&t(3,d=v.disabled)},[i,l,n,d,h,a,r,o,g,p]}class Df extends Xe{constructor(e){super(),Qe(this,e,Sf,yf,Ke,{liveSetting:0,settingKey:1,settingLabel:5,min:6,max:7,precision:2,disabled:3})}}function wa(s,e,t){const i=s.slice();return i[3]=e[t],i}function Lf(s){let e,t,i=et[s[3]].label+"",l,a,r,o,n;return r=new Df({props:{liveSetting:Ye,settingKey:s[3],settingLabel:et[s[3]].label,min:et[s[3]].min,max:et[s[3]].max,precision:et[s[3]].precision,disabled:et[s[3]].disabledForBike&&s[1]==2}}),{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),Ne(r.$$.fragment),o=k(),this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);t=b(h,"DIV",{class:!0});var u=C(t);l=te(u,i),u.forEach(m),a=I(h),xe(r.$$.fragment,h),o=I(h),h.forEach(m),this.h()},h(){f(t,"class","config-group-title svelte-yoqhax"),f(e,"class","config-group svelte-yoqhax"),R(e,"config-group-disabled",et[s[3]].disabledForBike&&s[1]==2)},m(d,h){P(d,e,h),c(e,t),c(t,l),c(e,a),Re(r,e,null),c(e,o),n=!0},p(d,h){(!n||h&1)&&i!==(i=et[d[3]].label+"")&&_e(l,i);const u={};h&1&&(u.settingKey=d[3]),h&1&&(u.settingLabel=et[d[3]].label),h&1&&(u.min=et[d[3]].min),h&1&&(u.max=et[d[3]].max),h&1&&(u.precision=et[d[3]].precision),h&3&&(u.disabled=et[d[3]].disabledForBike&&d[1]==2),r.$set(u),(!n||h&3)&&R(e,"config-group-disabled",et[d[3]].disabledForBike&&d[1]==2)},i(d){n||(q(r.$$.fragment,d),n=!0)},o(d){ie(r.$$.fragment,d),n=!1},d(d){d&&m(e),Ue(r)}}}function Cf(s){let e,t,i=et[s[3]].label+"",l,a,r,o,n;return r=new wf({props:{liveSetting:Ye,settingKey:s[3],settingLabel:et[s[3]].label,options:et[s[3]].options,disabled:et[s[3]].disabledForBike&&s[1]==2}}),{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),Ne(r.$$.fragment),o=k(),this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);t=b(h,"DIV",{class:!0});var u=C(t);l=te(u,i),u.forEach(m),a=I(h),xe(r.$$.fragment,h),o=I(h),h.forEach(m),this.h()},h(){f(t,"class","config-group-title svelte-yoqhax"),f(e,"class","config-group svelte-yoqhax"),R(e,"config-group-disabled",et[s[3]].disabledForBike&&s[1]==2)},m(d,h){P(d,e,h),c(e,t),c(t,l),c(e,a),Re(r,e,null),c(e,o),n=!0},p(d,h){(!n||h&1)&&i!==(i=et[d[3]].label+"")&&_e(l,i);const u={};h&1&&(u.settingKey=d[3]),h&1&&(u.settingLabel=et[d[3]].label),h&1&&(u.options=et[d[3]].options),h&3&&(u.disabled=et[d[3]].disabledForBike&&d[1]==2),r.$set(u),(!n||h&3)&&R(e,"config-group-disabled",et[d[3]].disabledForBike&&d[1]==2)},i(d){n||(q(r.$$.fragment,d),n=!0)},o(d){ie(r.$$.fragment,d),n=!1},d(d){d&&m(e),Ue(r)}}}function ya(s){let e,t,i,l;const a=[Cf,Lf],r=[];function o(n,d){return et[n[3]].type==Li.Enum?0:et[n[3]].type==Li.Range?1:-1}return~(e=o(s))&&(t=r[e]=a[e](s)),{c(){t&&t.c(),i=De()},l(n){t&&t.l(n),i=De()},m(n,d){~e&&r[e].m(n,d),P(n,i,d),l=!0},p(n,d){let h=e;e=o(n),e===h?~e&&r[e].p(n,d):(t&&(Fe(),ie(r[h],1,1,()=>{r[h]=null}),Ge()),~e?(t=r[e],t?t.p(n,d):(t=r[e]=a[e](n),t.c()),q(t,1),t.m(i.parentNode,i)):t=null)},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),~e&&r[e].d(n)}}}function kf(s){let e,t,i=Oe(s[0]),l=[];for(let r=0;r<i.length;r+=1)l[r]=ya(wa(s,i,r));const a=r=>ie(l[r],1,1,()=>{l[r]=null});return{c(){e=_("div");for(let r=0;r<l.length;r+=1)l[r].c();this.h()},l(r){e=b(r,"DIV",{class:!0});var o=C(e);for(let n=0;n<l.length;n+=1)l[n].l(o);o.forEach(m),this.h()},h(){f(e,"class","config-main svelte-yoqhax")},m(r,o){P(r,e,o);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null);t=!0},p(r,[o]){if(o&3){i=Oe(r[0]);let n;for(n=0;n<i.length;n+=1){const d=wa(r,i,n);l[n]?(l[n].p(d,o),q(l[n],1)):(l[n]=ya(d),l[n].c(),q(l[n],1),l[n].m(e,null))}for(Fe(),n=i.length;n<l.length;n+=1)a(n);Ge()}},i(r){if(!t){for(let o=0;o<i.length;o+=1)q(l[o]);t=!0}},o(r){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)ie(l[o]);t=!1},d(r){r&&m(e),yt(l,r)}}}function If(s,e,t){let i=[],l=0;return ot(()=>{t(0,i=Object.keys(et));const a=r=>{t(1,l=r)};return Ye.addListener("type",a),()=>{Ye.removeListener("type",a)}}),[i,l]}class Mf extends Xe{constructor(e){super(),Qe(this,e,If,kf,Ke,{})}}function Sa(s){let e,t,i;return{c(){e=_("div"),this.h()},l(l){e=b(l,"DIV",{class:!0}),C(e).forEach(m),this.h()},h(){f(e,"class","conf-mouseover svelte-101otrq")},m(l,a){P(l,e,a),t||(i=[B(e,"mouseenter",s[30]),B(e,"mouseleave",s[31])],t=!0)},p:me,d(l){l&&m(e),t=!1,lt(i)}}}function Ef(s){let e,t;return e=new Mf({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Af(s){let e,t;return e=new mf({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Tf(s){let e,t,i,l,a="LOCATION",r,o,n,d,h="◂",u,g,p="▸",v,w=Ol[s[2]]+"",y,D,L,T,A="ROAD STYLE",E,x,W,X,U="◂",J,Z,O="▸",j,V=Vl[s[3]]+"",z,M,N,G,se,oe,re,be="GENERATE",we,he,Q=s[6]&&Da(s),le=s[19]==!1&&La(s);return{c(){e=_("div"),t=_("div"),i=_("div"),l=_("div"),l.textContent=a,r=k(),o=_("div"),n=_("div"),d=_("div"),d.textContent=h,u=k(),g=_("div"),g.textContent=p,v=k(),y=ee(w),D=k(),L=_("div"),T=_("div"),T.textContent=A,E=k(),x=_("div"),W=_("div"),X=_("div"),X.textContent=U,J=k(),Z=_("div"),Z.textContent=O,j=k(),z=ee(V),M=k(),Q&&Q.c(),N=k(),G=_("div"),se=_("div"),le&&le.c(),oe=k(),re=_("div"),re.textContent=be,this.h()},l(de){e=b(de,"DIV",{class:!0});var K=C(e);t=b(K,"DIV",{class:!0});var ce=C(t);i=b(ce,"DIV",{class:!0});var $=C(i);l=b($,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-1qs4nti"&&(l.textContent=a),r=I($),o=b($,"DIV",{class:!0});var ge=C(o);n=b(ge,"DIV",{class:!0});var Ce=C(n);d=b(Ce,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(d)!=="svelte-hdk0bx"&&(d.textContent=h),u=I(Ce),g=b(Ce,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(g)!=="svelte-smravs"&&(g.textContent=p),Ce.forEach(m),v=I(ge),y=te(ge,w),ge.forEach(m),$.forEach(m),D=I(ce),L=b(ce,"DIV",{class:!0});var je=C(L);T=b(je,"DIV",{class:!0,"data-svelte-h":!0}),Y(T)!=="svelte-19ddluq"&&(T.textContent=A),E=I(je),x=b(je,"DIV",{class:!0});var He=C(x);W=b(He,"DIV",{class:!0});var ct=C(W);X=b(ct,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(X)!=="svelte-zkw8xm"&&(X.textContent=U),J=I(ct),Z=b(ct,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(Z)!=="svelte-1bfzabd"&&(Z.textContent=O),ct.forEach(m),j=I(He),z=te(He,V),He.forEach(m),je.forEach(m),M=I(ce),Q&&Q.l(ce),ce.forEach(m),N=I(K),G=b(K,"DIV",{class:!0});var ze=C(G);se=b(ze,"DIV",{class:!0});var ht=C(se);le&&le.l(ht),ht.forEach(m),oe=I(ze),re=b(ze,"DIV",{class:!0,"data-svelte-h":!0}),Y(re)!=="svelte-1usevhp"&&(re.textContent=be),ze.forEach(m),K.forEach(m),this.h()},h(){f(l,"class","wld-option-label svelte-101otrq"),f(d,"class","wld-option-arrow svelte-101otrq"),ae(d,"text-align","left"),f(g,"class","wld-option-arrow svelte-101otrq"),ae(g,"text-align","right"),f(n,"class","wld-option-arrows svelte-101otrq"),f(o,"class","wld-option-tile svelte-101otrq"),R(o,"wld-option-tile-changed",s[14]),f(i,"class","wld-option svelte-101otrq"),f(T,"class","wld-option-label svelte-101otrq"),f(X,"class","wld-option-arrow svelte-101otrq"),ae(X,"text-align","left"),f(Z,"class","wld-option-arrow svelte-101otrq"),ae(Z,"text-align","right"),f(W,"class","wld-option-arrows svelte-101otrq"),f(x,"class","wld-option-tile svelte-101otrq"),R(x,"wld-option-tile-changed",s[13]),f(L,"class","wld-option svelte-101otrq"),f(t,"class","wld-options svelte-101otrq"),f(se,"class","wld-hash-box svelte-101otrq"),f(re,"class","ui-btn"),R(re,"ui-btn-active",s[11]),f(G,"class","wld-generate svelte-101otrq"),f(e,"class","wld-main svelte-101otrq")},m(de,K){P(de,e,K),c(e,t),c(t,i),c(i,l),c(i,r),c(i,o),c(o,n),c(n,d),c(n,u),c(n,g),c(o,v),c(o,y),c(t,D),c(t,L),c(L,T),c(L,E),c(L,x),c(x,W),c(W,X),c(W,J),c(W,Z),c(x,j),c(x,z),c(t,M),Q&&Q.m(t,null),c(e,N),c(e,G),c(G,se),le&&le.m(se,null),c(G,oe),c(G,re),we||(he=[B(d,"click",s[43]),B(g,"click",s[44]),B(X,"click",s[45]),B(Z,"click",s[46]),B(re,"click",s[28])],we=!0)},p(de,K){K[0]&4&&w!==(w=Ol[de[2]]+"")&&_e(y,w),K[0]&16384&&R(o,"wld-option-tile-changed",de[14]),K[0]&8&&V!==(V=Vl[de[3]]+"")&&_e(z,V),K[0]&8192&&R(x,"wld-option-tile-changed",de[13]),de[6]?Q?Q.p(de,K):(Q=Da(de),Q.c(),Q.m(t,null)):Q&&(Q.d(1),Q=null),de[19]==!1?le?le.p(de,K):(le=La(de),le.c(),le.m(se,null)):le&&(le.d(1),le=null),K[0]&2048&&R(re,"ui-btn-active",de[11])},i:me,o:me,d(de){de&&m(e),Q&&Q.d(),le&&le.d(),we=!1,lt(he)}}}function Da(s){let e,t,i,l,a="randomise",r,o,n,d,h=s[5]?"Invalid seed":"",u,g,p;return{c(){e=_("div"),t=_("div"),i=ee("SEED"),l=_("span"),l.textContent=a,r=k(),o=_("input"),n=k(),d=_("div"),u=ee(h),this.h()},l(v){e=b(v,"DIV",{class:!0});var w=C(e);t=b(w,"DIV",{class:!0});var y=C(t);i=te(y,"SEED"),l=b(y,"SPAN",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-nkzfel"&&(l.textContent=a),y.forEach(m),r=I(w),o=b(w,"INPUT",{type:!0,maxlength:!0,onkeydown:!0,class:!0}),n=I(w),d=b(w,"DIV",{class:!0});var D=C(d);u=te(D,h),D.forEach(m),w.forEach(m),this.h()},h(){f(l,"class","wld-option-label-btn svelte-101otrq"),f(t,"class","wld-option-label svelte-101otrq"),f(o,"type","text"),f(o,"maxlength","16"),f(o,"onkeydown","return /[a-z]|[0-9]/i.test(event.key)"),f(o,"class","wld-option-tile wld-option-seed svelte-101otrq"),o.value=s[4],R(o,"wld-option-tile-changed",s[12]),f(d,"class","seed-warn svelte-101otrq"),f(e,"class","wld-option svelte-101otrq")},m(v,w){P(v,e,w),c(e,t),c(t,i),c(t,l),c(e,r),c(e,o),c(e,n),c(e,d),c(d,u),g||(p=[B(l,"click",s[22]),B(o,"input",s[23]),B(o,"focus",s[26]),B(o,"blur",s[27])],g=!0)},p(v,w){w[0]&16&&o.value!==v[4]&&(o.value=v[4]),w[0]&4096&&R(o,"wld-option-tile-changed",v[12]),w[0]&32&&h!==(h=v[5]?"Invalid seed":"")&&_e(u,h)},d(v){v&&m(e),g=!1,lt(p)}}}function La(s){let e,t,i,l,a="COPY",r,o,n,d,h=s[10]&&Ca();return{c(){e=ee(`CODE:\r
                        `),t=_("input"),i=k(),l=_("div"),l.textContent=a,r=k(),h&&h.c(),o=De(),this.h()},l(u){e=te(u,`CODE:\r
                        `),t=b(u,"INPUT",{type:!0,disable:!0,maxlength:!0,class:!0,id:!0,key:!0}),i=I(u),l=b(u,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-1fyfy5j"&&(l.textContent=a),r=I(u),h&&h.l(u),o=De(),this.h()},h(){f(t,"type","text"),f(t,"disable",s[19]),f(t,"maxlength","26"),f(t,"class","wld-hash svelte-101otrq"),f(t,"id",s[7]),f(t,"key",s[7]),t.value=s[7],R(t,"wld-hash-invalid",s[8]),R(t,"wld-hash-changed",s[9]&&!s[8]),f(l,"class","wld-hash-copy svelte-101otrq")},m(u,g){P(u,e,g),P(u,t,g),P(u,i,g),P(u,l,g),P(u,r,g),h&&h.m(u,g),P(u,o,g),n||(d=[B(t,"keydown",s[32]),B(t,"input",s[24]),B(t,"focus",s[26]),B(t,"blur",s[27]),B(l,"click",s[25])],n=!0)},p(u,g){g[0]&524288&&f(t,"disable",u[19]),g[0]&128&&f(t,"id",u[7]),g[0]&128&&f(t,"key",u[7]),g[0]&128&&t.value!==u[7]&&(t.value=u[7]),g[0]&256&&R(t,"wld-hash-invalid",u[8]),g[0]&768&&R(t,"wld-hash-changed",u[9]&&!u[8]),u[10]?h||(h=Ca(),h.c(),h.m(o.parentNode,o)):h&&(h.d(1),h=null)},d(u){u&&(m(e),m(t),m(i),m(l),m(r),m(o)),h&&h.d(u),n=!1,lt(d)}}}function Ca(s){let e,t="copied";return{c(){e=_("div"),e.textContent=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1y72z4c"&&(e.textContent=t),this.h()},h(){f(e,"class","wld-hash-copied svelte-101otrq")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function Pf(s){let e,t,i,l,a,r,o="-",n,d,h="-",u,g,p,v,w,y,D="-",L,T,A="-",E,x,W,X,U,J,Z="-",O,j,V="-",z,M,N,G,se,oe,re,be,we,he=s[19]==!1&&Sa(s);const Q=[Tf,Af,Ef],le=[];function de(K,ce){return K[1]==0?0:K[1]==1?1:K[1]==2?2:-1}return~(se=de(s))&&(oe=le[se]=Q[se](s)),{c(){he&&he.c(),e=k(),t=_("div"),i=_("div"),l=_("div"),a=_("div"),r=_("span"),r.textContent=o,n=ee(" WORLD "),d=_("span"),d.textContent=h,u=k(),g=_("div"),p=k(),v=_("div"),w=_("div"),y=_("span"),y.textContent=D,L=ee(" STYLE "),T=_("span"),T.textContent=A,E=k(),x=_("div"),W=k(),X=_("div"),U=_("div"),J=_("span"),J.textContent=Z,O=ee(" VEHICLE "),j=_("span"),j.textContent=V,z=k(),M=_("div"),N=k(),G=_("div"),oe&&oe.c(),this.h()},l(K){he&&he.l(K),e=I(K),t=b(K,"DIV",{class:!0});var ce=C(t);i=b(ce,"DIV",{class:!0});var $=C(i);l=b($,"DIV",{class:!0});var ge=C(l);a=b(ge,"DIV",{class:!0,style:!0});var Ce=C(a);r=b(Ce,"SPAN",{class:!0,"data-svelte-h":!0}),Y(r)!=="svelte-1rdtb9c"&&(r.textContent=o),n=te(Ce," WORLD "),d=b(Ce,"SPAN",{class:!0,"data-svelte-h":!0}),Y(d)!=="svelte-1rdtb9c"&&(d.textContent=h),Ce.forEach(m),u=I(ge),g=b(ge,"DIV",{class:!0}),C(g).forEach(m),ge.forEach(m),p=I($),v=b($,"DIV",{class:!0});var je=C(v);w=b(je,"DIV",{class:!0,style:!0});var He=C(w);y=b(He,"SPAN",{class:!0,"data-svelte-h":!0}),Y(y)!=="svelte-1krg1xv"&&(y.textContent=D),L=te(He," STYLE "),T=b(He,"SPAN",{class:!0,"data-svelte-h":!0}),Y(T)!=="svelte-1krg1xv"&&(T.textContent=A),He.forEach(m),E=I(je),x=b(je,"DIV",{class:!0}),C(x).forEach(m),je.forEach(m),W=I($),X=b($,"DIV",{class:!0});var ct=C(X);U=b(ct,"DIV",{class:!0,style:!0});var ze=C(U);J=b(ze,"SPAN",{class:!0,"data-svelte-h":!0}),Y(J)!=="svelte-1n9h5xc"&&(J.textContent=Z),O=te(ze," VEHICLE "),j=b(ze,"SPAN",{class:!0,"data-svelte-h":!0}),Y(j)!=="svelte-1n9h5xc"&&(j.textContent=V),ze.forEach(m),z=I(ct),M=b(ct,"DIV",{class:!0}),C(M).forEach(m),ct.forEach(m),$.forEach(m),N=I(ce),G=b(ce,"DIV",{class:!0});var ht=C(G);oe&&oe.l(ht),ht.forEach(m),ce.forEach(m),this.h()},h(){f(r,"class","svelte-101otrq"),R(r,"invisible",!s[17]),f(d,"class","svelte-101otrq"),R(d,"invisible",!s[17]),f(a,"class","conf-tab-header-label svelte-101otrq"),ae(a,"opacity",s[18]?"1":"0"),f(g,"class","conf-tab-pip svelte-101otrq"),R(g,"pip-selected",s[17]),f(l,"class","conf-tab-header svelte-101otrq"),R(l,"tab-selected",s[17]),f(y,"class","svelte-101otrq"),R(y,"invisible",!s[16]),f(T,"class","svelte-101otrq"),R(T,"invisible",!s[16]),f(w,"class","conf-tab-header-label svelte-101otrq"),ae(w,"opacity",s[18]?"1":"0"),f(x,"class","conf-tab-pip svelte-101otrq"),R(x,"pip-selected",s[16]),f(v,"class","conf-tab-header svelte-101otrq"),R(v,"tab-selected",s[16]),f(J,"class","svelte-101otrq"),R(J,"invisible",!s[15]),f(j,"class","svelte-101otrq"),R(j,"invisible",!s[15]),f(U,"class","conf-tab-header-label svelte-101otrq"),ae(U,"opacity",s[18]?"1":"0"),f(M,"class","conf-tab-pip svelte-101otrq"),R(M,"pip-selected",s[15]),f(X,"class","conf-tab-header svelte-101otrq"),R(X,"tab-selected",s[15]),f(i,"class","conf-header svelte-101otrq"),R(i,"conf-header-visible",s[0]),f(G,"class","conf-body svelte-101otrq"),R(G,"conf-body-open",s[0]),f(t,"class","conf-main svelte-101otrq"),R(t,"conf-main-active",s[0])},m(K,ce){he&&he.m(K,ce),P(K,e,ce),P(K,t,ce),c(t,i),c(i,l),c(l,a),c(a,r),c(a,n),c(a,d),c(l,u),c(l,g),c(i,p),c(i,v),c(v,w),c(w,y),c(w,L),c(w,T),c(v,E),c(v,x),c(i,W),c(i,X),c(X,U),c(U,J),c(U,O),c(U,j),c(X,z),c(X,M),c(t,N),c(t,G),~se&&le[se].m(G,null),re=!0,be||(we=[B(l,"mousedown",s[40]),B(v,"mousedown",s[41]),B(X,"mousedown",s[42]),B(t,"mouseenter",s[30]),B(t,"mouseleave",s[31])],be=!0)},p(K,ce){K[19]==!1?he?he.p(K,ce):(he=Sa(K),he.c(),he.m(e.parentNode,e)):he&&(he.d(1),he=null),(!re||ce[0]&131072)&&R(r,"invisible",!K[17]),(!re||ce[0]&131072)&&R(d,"invisible",!K[17]),(!re||ce[0]&262144)&&ae(a,"opacity",K[18]?"1":"0"),(!re||ce[0]&131072)&&R(g,"pip-selected",K[17]),(!re||ce[0]&131072)&&R(l,"tab-selected",K[17]),(!re||ce[0]&65536)&&R(y,"invisible",!K[16]),(!re||ce[0]&65536)&&R(T,"invisible",!K[16]),(!re||ce[0]&262144)&&ae(w,"opacity",K[18]?"1":"0"),(!re||ce[0]&65536)&&R(x,"pip-selected",K[16]),(!re||ce[0]&65536)&&R(v,"tab-selected",K[16]),(!re||ce[0]&32768)&&R(J,"invisible",!K[15]),(!re||ce[0]&32768)&&R(j,"invisible",!K[15]),(!re||ce[0]&262144)&&ae(U,"opacity",K[18]?"1":"0"),(!re||ce[0]&32768)&&R(M,"pip-selected",K[15]),(!re||ce[0]&32768)&&R(X,"tab-selected",K[15]),(!re||ce[0]&1)&&R(i,"conf-header-visible",K[0]);let $=se;se=de(K),se===$?~se&&le[se].p(K,ce):(oe&&(Fe(),ie(le[$],1,1,()=>{le[$]=null}),Ge()),~se?(oe=le[se],oe?oe.p(K,ce):(oe=le[se]=Q[se](K),oe.c()),q(oe,1),oe.m(G,null)):oe=null),(!re||ce[0]&1)&&R(G,"conf-body-open",K[0]),(!re||ce[0]&1)&&R(t,"conf-main-active",K[0])},i(K){re||(q(oe),re=!0)},o(K){ie(oe),re=!1},d(K){K&&(m(e),m(t)),he&&he.d(K),~se&&le[se].d(),be=!1,lt(we)}}}function Nf(s,e,t){let i,l,a,r,o,n,d,h,u;ke(s,si,ye=>t(19,u=ye));let{showConfig:g}=e,{openConfig:p}=e,{closeConfig:v}=e,w=!0,y=!1,D=Ks.value,L=0,T=Ve.scene;function A(ye){Ws(Ll)||(T+ye>1?t(2,T=-1):T+ye<0&&t(2,T=2)),t(2,T=Ve._sanitise("scene",T+ye)),z()}let E=Ve.roadStyle;function x(ye){t(3,E=Ve._sanitise("roadStyle",E+ye)),z()}let W=Ve.seed,X=W,U=!1,J=!1,Z=Ve.startNode,O=Ve.startNode==0?-1:Ve.startNode,j=!1;function V(){t(4,W=Md()),X=W,t(5,U=!1),z()}function z(){var ye,Be,Vt,Pt;(Be=(ye=Ds.history[T])==null?void 0:ye[E])!=null&&Be[W]?(t(38,Z=(Pt=(Vt=Ds.history[T])==null?void 0:Vt[E])==null?void 0:Pt[W].startNode),O=Z):(t(38,Z=0),O=-1),t(7,G=Bs(T,E,W,O)),t(8,oe=!1),t(9,re=!1),t(10,we=!1)}function M(ye){N(ye.target.value)}function N(ye){let Be=Ve._sanitise("seed",ye);if(!Ws(Ll)&&Be.toLowerCase()=="unlockdriftmas"){Ll.set(!0),console.log("Enabling driftmas scene and vehicle");return}if(!Ve._validate("seed",Be)){t(5,U=!0),t(4,W=X),z();return}t(5,U=!1),t(4,W=Be),X=W,z()}let G=Bs(T,E,W,Ee.vehicleIndex),se="",oe=!1,re=!1,be=!1,we=!1;function he(ye){let Be=Td(ye);if(!Be){t(8,oe=!0);return}t(2,T=Be.scene),t(3,E=Be.roadStyle),t(4,W=Be.seed),t(38,Z=Be.startNode)}function Q(ye){let Be=Ed(ye.target.value);t(8,oe=!Be),!oe&&(he(ye.target.value),se=ye.target.value,t(9,re=se!==G))}function le(ye){G&&(navigator.clipboard.writeText(G),t(10,we=!0))}function de(){Le.lockKeys("config")}function K(){Le.unlockKeys("config")}function ce(){U||j||(v(),Ad(),Ve.setMany({...Ve._value,scene:T,seed:W,startNode:Z,roadStyle:E}),pe.unlockMouse(!0))}function $(ye){if(tt.set("hasSeenConfig",!0),ye==L&&g){v();return}tt.set("hasSeenConfig",!0),t(35,w=!1),p(),t(1,L=ye)}ot(()=>{Ve.addListener("any",ye=>{t(4,W=Ve.seed),t(11,h=!1),t(5,U=!1)}),fi.addListener(ye=>{j=ye<1}),ne.addListener("touchscreen",ye=>{t(6,J=!ye)}),Ks.addListener(ye=>{t(37,D=ye)}),setTimeout(()=>{tt.hasSeenConfig&&t(35,w=!1)},1e4)});const ge=()=>{t(36,y=!0),pe.lockMouse()},Ce=()=>{t(36,y=!1),pe.unlockMouse(!1)},je=ye=>{(ye.code=="Enter"||ye.code=="NumpadEnter")&&ce()},He=()=>{$(0)},ct=()=>{$(1)},ze=()=>{$(2)},ht=()=>{A(-1)},ut=()=>{A(1)},Ot=()=>{x(-1)},Bt=()=>{x(1)};return s.$$set=ye=>{"showConfig"in ye&&t(0,g=ye.showConfig),"openConfig"in ye&&t(33,p=ye.openConfig),"closeConfig"in ye&&t(34,v=ye.closeConfig)},s.$$.update=()=>{s.$$.dirty[0]&1&&(g||K()),s.$$.dirty[0]&1|s.$$.dirty[1]&112&&t(18,i=w||y||g||D),s.$$.dirty[0]&3&&t(17,l=L==0&&g),s.$$.dirty[0]&3&&t(16,a=L==1&&g),s.$$.dirty[0]&3&&t(15,r=L==2&&g),s.$$.dirty[0]&1&&g==!1&&(t(4,W=Ve.seed),t(2,T=Ve.scene),t(3,E=Ve.roadStyle),t(5,U=!1)),s.$$.dirty[0]&4&&t(14,o=T!=Ve.scene),s.$$.dirty[0]&8&&t(13,n=E!=Ve.roadStyle),s.$$.dirty[0]&48&&t(12,d=W!=Ve.seed&&!U),s.$$.dirty[0]&60|s.$$.dirty[1]&128&&t(11,h=T!=Ve.scene||W!=Ve.seed&&!U||E!=Ve.roadStyle||Z!==Ve.startNode),s.$$.dirty[0]&29|s.$$.dirty[1]&256&&g&&(be&&(t(7,G=Bs(T,E,W,Ee.vehicleIndex)),t(8,oe=!1),t(9,re=!1)),t(39,be=!1)),s.$$.dirty[0]&1&&(g||t(39,be=!0))},[g,L,T,E,W,U,J,G,oe,re,we,h,d,n,o,r,a,l,i,u,A,x,V,M,Q,le,de,K,ce,$,ge,Ce,je,p,v,w,y,D,Z,be,He,ct,ze,ht,ut,Ot,Bt]}class xf extends Xe{constructor(e){super(),Qe(this,e,Nf,Pf,Ke,{showConfig:0,openConfig:33,closeConfig:34},null,[-1,-1])}}function Tt(s,{delay:e=0,duration:t=400,easing:i=Hn}={}){const l=+getComputedStyle(s).opacity;return{delay:e,duration:t,easing:i,css:a=>`opacity: ${a*l}`}}function Rf(s){let e,t,i,l,a,r,o,n="",d,h;return{c(){e=_("div"),t=_("div"),i=ee(s[2]),l=k(),a=_("div"),r=_("div"),o=_("div"),o.innerHTML=n,this.h()},l(u){e=b(u,"DIV",{class:!0});var g=C(e);t=b(g,"DIV",{class:!0,title:!0});var p=C(t);i=te(p,s[2]),p.forEach(m),l=I(g),a=b(g,"DIV",{class:!0});var v=C(a);r=b(v,"DIV",{class:!0});var w=C(r);o=b(w,"DIV",{class:!0,"data-svelte-h":!0}),Y(o)!=="svelte-1h4l4io"&&(o.innerHTML=n),w.forEach(m),v.forEach(m),g.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(t,"title",s[3]),R(t,"setting-help",!!s[3]),f(o,"class","bool-fill svelte-1ik2n8h"),R(o,"bool-filled",s[5]),f(r,"class","bool-box svelte-1ik2n8h"),f(a,"class","setting-element"),f(e,"class","setting-row"),R(e,"setting-disabled",s[4])},m(u,g){P(u,e,g),c(e,t),c(t,i),c(e,l),c(e,a),c(a,r),c(r,o),d||(h=B(r,"click",s[6]),d=!0)},p(u,[g]){g&4&&_e(i,u[2]),g&8&&f(t,"title",u[3]),g&8&&R(t,"setting-help",!!u[3]),g&32&&R(o,"bool-filled",u[5]),g&16&&R(e,"setting-disabled",u[4])},i:me,o:me,d(u){u&&m(e),d=!1,h()}}}function Uf(s,e,t){let{liveSetting:i}=e,{settingKey:l}=e,{settingLabel:a}=e,{settingDesc:r=""}=e,{disabled:o=!1}=e,n=i[l];const d=u=>{t(5,n=u)};ot(()=>(i.addListener(l,d),()=>{i.removeListener(l,d)}));const h=()=>i.set(l,!n);return s.$$set=u=>{"liveSetting"in u&&t(0,i=u.liveSetting),"settingKey"in u&&t(1,l=u.settingKey),"settingLabel"in u&&t(2,a=u.settingLabel),"settingDesc"in u&&t(3,r=u.settingDesc),"disabled"in u&&t(4,o=u.disabled)},[i,l,a,r,o,n,h]}class Nn extends Xe{constructor(e){super(),Qe(this,e,Uf,Rf,Ke,{liveSetting:0,settingKey:1,settingLabel:2,settingDesc:3,disabled:4})}}function Of(s){let e,t,i,l,a,r,o,n,d,h,u,g,p,v=s[6][s[7]]+"",w,y,D;return{c(){e=_("div"),t=_("div"),i=ee(s[2]),l=k(),a=_("div"),r=_("div"),o=_("div"),n=_("div"),d=ee("◂"),h=k(),u=_("div"),g=ee("▸"),p=k(),w=ee(v),this.h()},l(L){e=b(L,"DIV",{class:!0});var T=C(e);t=b(T,"DIV",{class:!0,title:!0});var A=C(t);i=te(A,s[2]),A.forEach(m),l=I(T),a=b(T,"DIV",{class:!0});var E=C(a);r=b(E,"DIV",{class:!0});var x=C(r);o=b(x,"DIV",{class:!0});var W=C(o);n=b(W,"DIV",{class:!0,style:!0});var X=C(n);d=te(X,"◂"),X.forEach(m),h=I(W),u=b(W,"DIV",{class:!0,style:!0});var U=C(u);g=te(U,"▸"),U.forEach(m),W.forEach(m),p=I(x),w=te(x,v),x.forEach(m),E.forEach(m),T.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(t,"title",s[3]),R(t,"setting-help",!!s[3]),f(n,"class","enum-arrow svelte-71g5t7"),ae(n,"text-align","left"),ae(n,"opacity",!s[5]&&s[7]==0?"0":"1"),f(u,"class","enum-arrow svelte-71g5t7"),ae(u,"text-align","right"),ae(u,"opacity",!s[5]&&s[7]==s[6].length-1?"0":"1"),f(o,"class","enum-arrows svelte-71g5t7"),f(r,"class","enum-container svelte-71g5t7"),f(a,"class","setting-element"),f(e,"class","setting-row"),R(e,"setting-disabled",s[4])},m(L,T){P(L,e,T),c(e,t),c(t,i),c(e,l),c(e,a),c(a,r),c(r,o),c(o,n),c(n,d),c(o,h),c(o,u),c(u,g),c(r,p),c(r,w),y||(D=[B(n,"click",s[8]),B(u,"click",s[9])],y=!0)},p(L,[T]){T&4&&_e(i,L[2]),T&8&&f(t,"title",L[3]),T&8&&R(t,"setting-help",!!L[3]),T&160&&ae(n,"opacity",!L[5]&&L[7]==0?"0":"1"),T&224&&ae(u,"opacity",!L[5]&&L[7]==L[6].length-1?"0":"1"),T&192&&v!==(v=L[6][L[7]]+"")&&_e(w,v),T&16&&R(e,"setting-disabled",L[4])},i:me,o:me,d(L){L&&m(e),y=!1,lt(D)}}}function Vf(s,e,t){let{liveSetting:i}=e,{settingKey:l}=e,{settingLabel:a}=e,{settingDesc:r=""}=e,{disabled:o=!1}=e,{wraparound:n=!0}=e,{labels:d}=e,h=i[l];const u=v=>{t(7,h=v)};ot(()=>(i.addListener(l,u),()=>{i.removeListener(l,u)}));const g=()=>{n?i.set(l,h-1<0?d.length-1:h-1):h>0&&i.set(l,h-1)},p=()=>{n?i.set(l,(h+1)%d.length):h<d.length-1&&i.set(l,h+1)};return s.$$set=v=>{"liveSetting"in v&&t(0,i=v.liveSetting),"settingKey"in v&&t(1,l=v.settingKey),"settingLabel"in v&&t(2,a=v.settingLabel),"settingDesc"in v&&t(3,r=v.settingDesc),"disabled"in v&&t(4,o=v.disabled),"wraparound"in v&&t(5,n=v.wraparound),"labels"in v&&t(6,d=v.labels)},[i,l,a,r,o,n,d,h,g,p]}class xn extends Xe{constructor(e){super(),Qe(this,e,Vf,Of,Ke,{liveSetting:0,settingKey:1,settingLabel:2,settingDesc:3,disabled:4,wraparound:5,labels:6})}}function Hf(s){let e,t,i,l,a,r,o,n,d,h,u,g,p,v,w,y;return{c(){e=_("div"),t=_("div"),i=ee(s[0]),l=k(),a=_("div"),r=_("div"),o=_("input"),n=k(),d=_("div"),h=_("div"),u=k(),g=_("div"),p=k(),v=_("div"),this.h()},l(D){e=b(D,"DIV",{class:!0});var L=C(e);t=b(L,"DIV",{class:!0,title:!0});var T=C(t);i=te(T,s[0]),T.forEach(m),l=I(L),a=b(L,"DIV",{class:!0});var A=C(a);r=b(A,"DIV",{class:!0});var E=C(r);o=b(E,"INPUT",{class:!0,type:!0}),n=I(E),d=b(E,"DIV",{class:!0});var x=C(d);h=b(x,"DIV",{class:!0,style:!0}),C(h).forEach(m),u=I(x),g=b(x,"DIV",{class:!0}),C(g).forEach(m),p=I(x),v=b(x,"DIV",{class:!0,style:!0}),C(v).forEach(m),x.forEach(m),E.forEach(m),A.forEach(m),L.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(t,"title",s[1]),R(t,"setting-help",!!s[1]),o.disabled=s[6],f(o,"class","slider-val svelte-9omzwl"),f(o,"type","number"),f(h,"class","slider-left svelte-9omzwl"),ae(h,"flex-basis",s[5]+"%"),ae(h,"margin-right",s[5]==0?"0":"4px"),R(h,"touch-track",s[6]),f(g,"class","slider-handle svelte-9omzwl"),R(g,"touch-track",s[6]),f(v,"class","slider-right svelte-9omzwl"),ae(v,"flex-basis",100-s[5]+"%"),ae(v,"margin-left",s[5]==100?"0":"4px"),R(v,"touch-track",s[6]),f(d,"class","slider-track svelte-9omzwl"),R(d,"touch-track",s[6]),f(r,"class","slider-cont svelte-9omzwl"),f(a,"class","setting-element"),f(e,"class","setting-row"),R(e,"setting-disabled",s[2])},m(D,L){P(D,e,L),c(e,t),c(t,i),c(e,l),c(e,a),c(a,r),c(r,o),Ys(o,s[3]),c(r,n),c(r,d),c(d,h),c(d,u),c(d,g),c(d,p),c(d,v),s[17](d),w||(y=[B(o,"input",s[16]),B(o,"change",s[10]),B(d,"mousedown",s[7]),B(d,"touchstart",s[8]),B(d,"touchmove",s[9])],w=!0)},p(D,[L]){L&1&&_e(i,D[0]),L&2&&f(t,"title",D[1]),L&2&&R(t,"setting-help",!!D[1]),L&64&&(o.disabled=D[6]),L&8&&Yo(o.value)!==D[3]&&Ys(o,D[3]),L&32&&ae(h,"flex-basis",D[5]+"%"),L&32&&ae(h,"margin-right",D[5]==0?"0":"4px"),L&64&&R(h,"touch-track",D[6]),L&64&&R(g,"touch-track",D[6]),L&32&&ae(v,"flex-basis",100-D[5]+"%"),L&32&&ae(v,"margin-left",D[5]==100?"0":"4px"),L&64&&R(v,"touch-track",D[6]),L&64&&R(d,"touch-track",D[6]),L&4&&R(e,"setting-disabled",D[2])},i:me,o:me,d(D){D&&m(e),s[17](null),w=!1,lt(y)}}}function zf(s,e,t){let i,l;ke(s,si,N=>t(6,l=N));let{liveSetting:a}=e,{settingKey:r}=e,{settingLabel:o}=e,{settingDesc:n=""}=e,{disabled:d=!1}=e,{min:h=0}=e,{max:u=100}=e,{precision:g=1}=e,p=u-h,v=a[r];v.toFixed&&(v=v.toFixed(g));let w,y,D,L,T;const A=N=>{t(3,v=N)};let E=!1;const x=N=>{E=N};ot(()=>{a.addListener(r,A),window.addEventListener("touchend",O);let N=si.subscribe(x);return()=>{a.removeListener(r,A),window.removeEventListener("mousemove",X),window.removeEventListener("touchmove",X),window.removeEventListener("touchend",O),N()}});let W;const X=N=>{let G;!E||window.innerWidth>window.innerHeight?G=Math.max(Math.min(1,(N.clientX-y)/D),0):G=Math.max(Math.min(1,(N.clientY-L)/T),0),G=G*p+h,G=Math.round(G*10**g)/10**g,a.set(r,G)},U=N=>{window.removeEventListener("mousemove",X)},J=N=>{W=w.getBoundingClientRect(),y=W.left,D=W.width-10,L=W.top,T=W.height-10,X(N),window.addEventListener("mousemove",X),window.addEventListener("mouseup",U,{once:!0})},Z=N=>{window.addEventListener("touchmove",j,{passive:!1}),window.addEventListener("touchend",O),W=w.getBoundingClientRect(),y=W.left,D=W.width-10,L=W.top,T=W.height-10,j(N)},O=N=>{window.removeEventListener("touchmove",j),window.removeEventListener("touchend",O)},j=N=>{N.changedTouches.length&&(N.clientX=N.changedTouches[0].clientX,N.clientY=N.changedTouches[0].clientY,N.preventDefault(),N.stopPropagation(),X(N))},V=N=>{let G=N.target.value;G=Math.round(G*10**g)/10**g,G=Math.min(Math.max(h,G),u),G=""+G,G=parseFloat(G.replace(",",".")),a._validate(r,G)?a.set(r,G):N.target.value=Math.min(Math.max(h,v),u)};function z(){v=Yo(this.value),t(3,v)}function M(N){St[N?"unshift":"push"](()=>{w=N,t(4,w)})}return s.$$set=N=>{"liveSetting"in N&&t(11,a=N.liveSetting),"settingKey"in N&&t(12,r=N.settingKey),"settingLabel"in N&&t(0,o=N.settingLabel),"settingDesc"in N&&t(1,n=N.settingDesc),"disabled"in N&&t(2,d=N.disabled),"min"in N&&t(13,h=N.min),"max"in N&&t(14,u=N.max),"precision"in N&&t(15,g=N.precision)},s.$$.update=()=>{s.$$.dirty&24584&&t(5,i=Math.max(Math.min(100,(v-h)/(u-h)*100),0))},[o,n,d,v,w,i,l,J,Z,j,V,a,r,h,u,g,z,M]}class Rn extends Xe{constructor(e){super(),Qe(this,e,zf,Hf,Ke,{liveSetting:11,settingKey:12,settingLabel:0,settingDesc:1,disabled:2,min:13,max:14,precision:15})}}function ka(s,e,t){const i=s.slice();return i[11]=e[t][0],i[12]=e[t][1],i}function Ia(s,e,t){const i=s.slice();return i[7]=e[t][0],i[8]=e[t][1],i}function Ma(s,e,t){const i=s.slice();return i[11]=e[t][0],i[12]=e[t][1],i}function Ff(s){let e,t,i=Oe(Object.entries(s[1])),l=[];for(let r=0;r<i.length;r+=1)l[r]=Aa(ka(s,i,r));const a=r=>ie(l[r],1,1,()=>{l[r]=null});return{c(){for(let r=0;r<l.length;r+=1)l[r].c();e=De()},l(r){for(let o=0;o<l.length;o+=1)l[o].l(r);e=De()},m(r,o){for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(r,o);P(r,e,o),t=!0},p(r,o){if(o&23){i=Oe(Object.entries(r[1]));let n;for(n=0;n<i.length;n+=1){const d=ka(r,i,n);l[n]?(l[n].p(d,o),q(l[n],1)):(l[n]=Aa(d),l[n].c(),q(l[n],1),l[n].m(e.parentNode,e))}for(Fe(),n=i.length;n<l.length;n+=1)a(n);Ge()}},i(r){if(!t){for(let o=0;o<i.length;o+=1)q(l[o]);t=!0}},o(r){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)ie(l[o]);t=!1},d(r){r&&m(e),yt(l,r)}}}function Gf(s){let e,t,i=Oe(Object.entries(s[1])),l=[];for(let r=0;r<i.length;r+=1)l[r]=xa(Ia(s,i,r));const a=r=>ie(l[r],1,1,()=>{l[r]=null});return{c(){for(let r=0;r<l.length;r+=1)l[r].c();e=De()},l(r){for(let o=0;o<l.length;o+=1)l[o].l(r);e=De()},m(r,o){for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(r,o);P(r,e,o),t=!0},p(r,o){if(o&63){i=Oe(Object.entries(r[1]));let n;for(n=0;n<i.length;n+=1){const d=Ia(r,i,n);l[n]?(l[n].p(d,o),q(l[n],1)):(l[n]=xa(d),l[n].c(),q(l[n],1),l[n].m(e.parentNode,e))}for(Fe(),n=i.length;n<l.length;n+=1)a(n);Ge()}},i(r){if(!t){for(let o=0;o<i.length;o+=1)q(l[o]);t=!0}},o(r){l=l.filter(Boolean);for(let o=0;o<l.length;o+=1)ie(l[o]);t=!1},d(r){r&&m(e),yt(l,r)}}}function Ea(s){let e,t,i,l;const a=[qf,Bf,jf],r=[];function o(n,d){return n[12].type==Li.Boolean?0:n[12].type==Li.Enum?1:n[12].type==Li.Range?2:-1}return~(e=o(s))&&(t=r[e]=a[e](s)),{c(){t&&t.c(),i=De()},l(n){t&&t.l(n),i=De()},m(n,d){~e&&r[e].m(n,d),P(n,i,d),l=!0},p(n,d){let h=e;e=o(n),e===h?~e&&r[e].p(n,d):(t&&(Fe(),ie(r[h],1,1,()=>{r[h]=null}),Ge()),~e?(t=r[e],t?t.p(n,d):(t=r[e]=a[e](n),t.c()),q(t,1),t.m(i.parentNode,i)):t=null)},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),~e&&r[e].d(n)}}}function jf(s){let e,t;return e=new Rn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,min:s[12].min,max:s[12].max,precision:s[12].precision,disabled:s[2].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&2&&(a.min=i[12].min),l&2&&(a.max=i[12].max),l&2&&(a.precision=i[12].precision),l&6&&(a.disabled=i[2].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Bf(s){let e,t;return e=new xn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,labels:s[12].labels,wraparound:s[12].wraparound,disabled:s[2].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&2&&(a.labels=i[12].labels),l&2&&(a.wraparound=i[12].wraparound),l&6&&(a.disabled=i[2].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function qf(s){let e,t;return e=new Nn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,disabled:s[2].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&6&&(a.disabled=i[2].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Aa(s){let e,t,i=(!s[4]||!s[12].hideForTouchscreen)&&Ea(s);return{c(){i&&i.c(),e=De()},l(l){i&&i.l(l),e=De()},m(l,a){i&&i.m(l,a),P(l,e,a),t=!0},p(l,a){!l[4]||!l[12].hideForTouchscreen?i?(i.p(l,a),a&18&&q(i,1)):(i=Ea(l),i.c(),q(i,1),i.m(e.parentNode,e)):i&&(Fe(),ie(i,1,1,()=>{i=null}),Ge())},i(l){t||(q(i),t=!0)},o(l){ie(i),t=!1},d(l){l&&m(e),i&&i.d(l)}}}function Ta(s){let e,t=s[7]+"",i,l,a,r="reset",o,n,d,h,u;function g(){return s[6](s[7])}let p=Oe(Object.entries(s[8])),v=[];for(let y=0;y<p.length;y+=1)v[y]=Na(Ma(s,p,y));const w=y=>ie(v[y],1,1,()=>{v[y]=null});return{c(){e=_("div"),i=ee(t),l=k(),a=_("div"),a.textContent=r,o=k();for(let y=0;y<v.length;y+=1)v[y].c();n=De(),this.h()},l(y){e=b(y,"DIV",{class:!0});var D=C(e);i=te(D,t),l=I(D),a=b(D,"DIV",{class:!0,"data-svelte-h":!0}),Y(a)!=="svelte-1buwq7v"&&(a.textContent=r),D.forEach(m),o=I(y);for(let L=0;L<v.length;L+=1)v[L].l(y);n=De(),this.h()},h(){f(a,"class","setting-section-header-reset"),f(e,"class","setting-section-header")},m(y,D){P(y,e,D),c(e,i),c(e,l),c(e,a),P(y,o,D);for(let L=0;L<v.length;L+=1)v[L]&&v[L].m(y,D);P(y,n,D),d=!0,h||(u=B(a,"click",g),h=!0)},p(y,D){if(s=y,(!d||D&2)&&t!==(t=s[7]+"")&&_e(i,t),D&31){p=Oe(Object.entries(s[8]));let L;for(L=0;L<p.length;L+=1){const T=Ma(s,p,L);v[L]?(v[L].p(T,D),q(v[L],1)):(v[L]=Na(T),v[L].c(),q(v[L],1),v[L].m(n.parentNode,n))}for(Fe(),L=p.length;L<v.length;L+=1)w(L);Ge()}},i(y){if(!d){for(let D=0;D<p.length;D+=1)q(v[D]);d=!0}},o(y){v=v.filter(Boolean);for(let D=0;D<v.length;D+=1)ie(v[D]);d=!1},d(y){y&&(m(e),m(o),m(n)),yt(v,y),h=!1,u()}}}function Pa(s){let e,t,i,l;const a=[Kf,Yf,Wf],r=[];function o(n,d){return n[12].type==Li.Boolean?0:n[12].type==Li.Enum?1:n[12].type==Li.Range?2:-1}return~(e=o(s))&&(t=r[e]=a[e](s)),{c(){t&&t.c(),i=De()},l(n){t&&t.l(n),i=De()},m(n,d){~e&&r[e].m(n,d),P(n,i,d),l=!0},p(n,d){let h=e;e=o(n),e===h?~e&&r[e].p(n,d):(t&&(Fe(),ie(r[h],1,1,()=>{r[h]=null}),Ge()),~e?(t=r[e],t?t.p(n,d):(t=r[e]=a[e](n),t.c()),q(t,1),t.m(i.parentNode,i)):t=null)},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),~e&&r[e].d(n)}}}function Wf(s){let e,t;return e=new Rn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,min:s[12].min,max:s[12].max,precision:s[12].precision,disabled:s[2].includes(s[11])||s[3].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&2&&(a.min=i[12].min),l&2&&(a.max=i[12].max),l&2&&(a.precision=i[12].precision),l&14&&(a.disabled=i[2].includes(i[11])||i[3].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Yf(s){let e,t;return e=new xn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,labels:s[12].labels,wraparound:s[12].wraparound,disabled:s[2].includes(s[11])||s[3].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&2&&(a.labels=i[12].labels),l&2&&(a.wraparound=i[12].wraparound),l&14&&(a.disabled=i[2].includes(i[11])||i[3].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Kf(s){let e,t;return e=new Nn({props:{liveSetting:s[0],settingKey:s[11],settingLabel:s[12].readable,settingDesc:s[12].desc,disabled:s[2].includes(s[11])||s[3].includes(s[11])}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&1&&(a.liveSetting=i[0]),l&2&&(a.settingKey=i[11]),l&2&&(a.settingLabel=i[12].readable),l&2&&(a.settingDesc=i[12].desc),l&14&&(a.disabled=i[2].includes(i[11])||i[3].includes(i[11])),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Na(s){let e,t,i=(!s[4]||!s[12].hideForTouchscreen)&&Pa(s);return{c(){i&&i.c(),e=De()},l(l){i&&i.l(l),e=De()},m(l,a){i&&i.m(l,a),P(l,e,a),t=!0},p(l,a){!l[4]||!l[12].hideForTouchscreen?i?(i.p(l,a),a&18&&q(i,1)):(i=Pa(l),i.c(),q(i,1),i.m(e.parentNode,e)):i&&(Fe(),ie(i,1,1,()=>{i=null}),Ge())},i(l){t||(q(i),t=!0)},o(l){ie(i),t=!1},d(l){l&&m(e),i&&i.d(l)}}}function xa(s){let e,t,i=(!s[4]||!s[8].hideForTouchscreen)&&Ta(s);return{c(){i&&i.c(),e=De()},l(l){i&&i.l(l),e=De()},m(l,a){i&&i.m(l,a),P(l,e,a),t=!0},p(l,a){!l[4]||!l[8].hideForTouchscreen?i?(i.p(l,a),a&18&&q(i,1)):(i=Ta(l),i.c(),q(i,1),i.m(e.parentNode,e)):i&&(Fe(),ie(i,1,1,()=>{i=null}),Ge())},i(l){t||(q(i),t=!0)},o(l){ie(i),t=!1},d(l){l&&m(e),i&&i.d(l)}}}function Xf(s){let e,t,i,l;const a=[Gf,Ff],r=[];function o(n,d){return n[1].oneSection?1:0}return t=o(s),i=r[t]=a[t](s),{c(){e=_("div"),i.c(),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);i.l(d),d.forEach(m),this.h()},h(){f(e,"class","settings-list")},m(n,d){P(n,e,d),r[t].m(e,null),l=!0},p(n,[d]){let h=t;t=o(n),t===h?r[t].p(n,d):(Fe(),ie(r[h],1,1,()=>{r[h]=null}),Ge(),i=r[t],i?i.p(n,d):(i=r[t]=a[t](n),i.c()),q(i,1),i.m(e,null))},i(n){l||(q(i),l=!0)},o(n){ie(i),l=!1},d(n){n&&m(e),r[t].d()}}}function Qf(s,e,t){let i;ke(s,si,h=>t(4,i=h));let{liveSetting:l}=e,{settingsMeta:a}=e,r=[],o=[];ot(()=>{let h=[],u=[];for(let g in a)for(let p in a[g]){if(a[g][p].overrides){let v=w=>{t(2,r=w?a[g][p].overrides:[])};h.push([p,v]),l.addListener(p,v)}if(a[g][p].enables){let v=w=>{t(3,o=w?[]:a[g][p].enables)};u.push([p,v]),l.addListener(p,v)}}return()=>{for(let g of h)l.removeListener(g[0],g[1]);h.length=0;for(let g of u)l.removeListener(g[0],g[1]);u.length=0}});function n(h){if(!(h in a)){console.warn("Cannot reset unknown section to default: "+h);return}for(let u in a[h])u!="hideForTouchscreen"&&l.set(u)}const d=h=>n(h);return s.$$set=h=>{"liveSetting"in h&&t(0,l=h.liveSetting),"settingsMeta"in h&&t(1,a=h.settingsMeta)},[l,a,r,o,i,n,d]}class is extends Xe{constructor(e){super(),Qe(this,e,Qf,Xf,Ke,{liveSetting:0,settingsMeta:1})}}function Ra(s){let e,t,i,l,a,r;return{c(){e=_("div"),t=_("div"),i=k(),l=_("div"),this.h()},l(o){e=b(o,"DIV",{class:!0});var n=C(e);t=b(n,"DIV",{class:!0,style:!0}),C(t).forEach(m),i=I(n),l=b(n,"DIV",{class:!0}),C(l).forEach(m),n.forEach(m),this.h()},h(){f(t,"class","audio-slider-handle svelte-1hs4ew6"),ae(t,"right",(100-s[4]*100)*.8+"%"),f(l,"class","audio-slider-track svelte-1hs4ew6"),f(e,"class","audio-slider svelte-1hs4ew6")},m(o,n){P(o,e,n),c(e,t),c(e,i),c(e,l),s[10](e),a||(r=[B(e,"mousedown",s[8]),B(e,"touchstart",s[8]),B(e,"touchmove",s[9])],a=!0)},p(o,n){n&16&&ae(t,"right",(100-o[4]*100)*.8+"%")},d(o){o&&m(e),s[10](null),a=!1,lt(r)}}}function Zf(s){let e,t,i,l,a,r,o=s[1]&&Ra(s);return{c(){e=_("div"),t=_("img"),l=k(),o&&o.c(),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);t=b(d,"IMG",{class:!0,src:!0}),l=I(d),o&&o.l(d),d.forEach(m),this.h()},h(){f(t,"class","ui-settings-bar-icon"),Ut(t.src,i="/img/ico_volume_"+(s[3]?"off":"on")+".svg")||f(t,"src",i),f(e,"class","audio-control svelte-1hs4ew6")},m(n,d){P(n,e,d),c(e,t),c(e,l),o&&o.m(e,null),a||(r=[B(t,"click",s[7]),B(e,"mouseenter",s[11]),B(e,"mouseleave",s[12])],a=!0)},p(n,[d]){d&8&&!Ut(t.src,i="/img/ico_volume_"+(n[3]?"off":"on")+".svg")&&f(t,"src",i),n[1]?o?o.p(n,d):(o=Ra(n),o.c(),o.m(e,null)):o&&(o.d(1),o=null)},i:me,o:me,d(n){n&&m(e),o&&o.d(),a=!1,lt(r)}}}function Jf(s,e,t){let i=!1,l=!1,a=!1,r=.5,o=.5,n=!1,d,h,u=!1;const g=x=>{u=x};let{onHasFocus:p=()=>{}}=e;ot(()=>{_s.addListener("master",W=>{t(3,a=W==0),t(4,o=W)}),pe.addListener(mi.Mute,v);let x=si.subscribe(g);return()=>{pe.removeListener(mi.Mute,v),x()}});const v=()=>{a?_s.set("master",r):(r=o,_s.set("master",0))},w=x=>{h=d.getBoundingClientRect(),t(5,n=!0),y(x),window.addEventListener("mousemove",L),window.addEventListener("mouseup",D,{once:!0})},y=x=>{var W;(W=x.changedTouches)!=null&&W.length&&(x.clientX=x.changedTouches[0].clientX,x.clientY=x.changedTouches[0].clientY),x.preventDefault(),x.stopPropagation(),L(x)},D=x=>{t(5,n=!1),l||t(1,i=!1),p(i),window.removeEventListener("mousemove",L)},L=x=>{let W;!u||window.innerWidth>window.innerHeight?W=(x.clientX-h.left-h.width*.2)/(h.width*.8):W=(x.clientY-h.top-h.height*.2)/(h.height*.8),_s.set("master",W)};function T(x){St[x?"unshift":"push"](()=>{d=x,t(6,d)})}const A=()=>{p(!0),t(2,l=!0),t(1,i=!0)},E=()=>{t(2,l=!1),t(1,i=n),p(i)};return s.$$set=x=>{"onHasFocus"in x&&t(0,p=x.onHasFocus)},[p,i,l,a,o,n,d,v,w,y,T,A,E]}class $f extends Xe{constructor(e){super(),Qe(this,e,Jf,Zf,Ke,{onHasFocus:0})}}const vs={Forward:"Forwards",Backward:"Backwards",Left:"Left",Right:"Right",Boost:"Boost",Handbrake:"Handbrake",ToggleHandbrake:"Toggle handbrake",Autodrive:"Toggle autodrive",AutodriveMode:"Toggle autodrive mode",Reset:"Reset",Headlights:"Toggle headlights",StickySteer:"Locked steering",NextScene:"Next scene",PrevScene:"Prev scene",CameraMode:"Change camera",Mute:"Mute",Pause:"Pause",ToggleUI:"Toggle UI",ToggleCinecam:"Toggle cinecam",ToggleDebug:"Toggle debug overlay",ToggleSpeedControl:"Toggle cruise control",ToggleSpeedControlMode:"Toggle cruise control mode",IncSpeedControl:"Cruise control increase",DecSpeedControl:"Cruise control decrease",CameraLeft:"Camera left",CameraRight:"Camera right",CameraUp:"Camera up",CameraDown:"Camera down"};function Ua(s,e,t){const i=s.slice();return i[11]=e[t][0],i[12]=e[t][1],i}function eu(s){let e;return{c(){e=ee("reset")},l(t){e=te(t,"reset")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function tu(s){let e;return{c(){e=ee("confirm")},l(t){e=te(t,"confirm")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function Oa(s){let e,t="+",i,l;function a(...r){return s[7](s[11],...r)}return{c(){e=_("div"),e.textContent=t,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-14ayu74"&&(e.textContent=t),this.h()},h(){f(e,"class","map-element-delete")},m(r,o){P(r,e,o),i||(l=B(e,"click",a),i=!0)},p(r,o){s=r},d(r){r&&m(e),i=!1,l()}}}function Va(s){let e=(s[11]==s[0]?"Press a key":s[12].replace("Key",""))+"",t;return{c(){t=ee(e)},l(i){t=te(i,e)},m(i,l){P(i,t,l)},p(i,l){l&5&&e!==(e=(i[11]==i[0]?"Press a key":i[12].replace("Key",""))+"")&&_e(t,e)},d(i){i&&m(t)}}}function Ha(s){let e,t,i=vs[s[11]]+"",l,a,r,o,n,d,h,u,g=s[12]&&s[0]!=s[11]&&Oa(s),p=(s[12]||s[0]==s[11])&&Va(s);function v(){return s[8](s[11])}return{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),r=_("div"),o=_("div"),g&&g.c(),n=k(),p&&p.c(),d=k(),this.h()},l(w){e=b(w,"DIV",{class:!0});var y=C(e);t=b(y,"DIV",{class:!0});var D=C(t);l=te(D,i),D.forEach(m),a=I(y),r=b(y,"DIV",{class:!0});var L=C(r);o=b(L,"DIV",{class:!0});var T=C(o);g&&g.l(T),n=I(T),p&&p.l(T),T.forEach(m),L.forEach(m),d=I(y),y.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(o,"class","map-element"),R(o,"map-element-mapping",s[11]==s[0]),f(r,"class","setting-element"),f(e,"class","setting-row")},m(w,y){P(w,e,y),c(e,t),c(t,l),c(e,a),c(e,r),c(r,o),g&&g.m(o,null),c(o,n),p&&p.m(o,null),c(e,d),h||(u=B(r,"click",v),h=!0)},p(w,y){s=w,y&4&&i!==(i=vs[s[11]]+"")&&_e(l,i),s[12]&&s[0]!=s[11]?g?g.p(s,y):(g=Oa(s),g.c(),g.m(o,n)):g&&(g.d(1),g=null),s[12]||s[0]==s[11]?p?p.p(s,y):(p=Va(s),p.c(),p.m(o,null)):p&&(p.d(1),p=null),y&5&&R(o,"map-element-mapping",s[11]==s[0])},d(w){w&&m(e),g&&g.d(),p&&p.d(),h=!1,u()}}}function iu(s){let e,t,i,l,a,r,o;function n(p,v){return p[1]?tu:eu}let d=n(s),h=d(s),u=Oe(Object.entries(s[2])),g=[];for(let p=0;p<u.length;p+=1)g[p]=Ha(Ua(s,u,p));return{c(){e=_("div"),t=_("div"),i=ee(`Mapping\r
        `),l=_("div"),h.c(),a=k();for(let p=0;p<g.length;p+=1)g[p].c();this.h()},l(p){e=b(p,"DIV",{class:!0,style:!0});var v=C(e);t=b(v,"DIV",{class:!0});var w=C(t);i=te(w,`Mapping\r
        `),l=b(w,"DIV",{class:!0});var y=C(l);h.l(y),y.forEach(m),w.forEach(m),a=I(v);for(let D=0;D<g.length;D+=1)g[D].l(v);v.forEach(m),this.h()},h(){f(l,"class","setting-section-header-reset"),f(t,"class","setting-section-header"),f(e,"class","settings-list"),ae(e,"padding-top","1rem")},m(p,v){P(p,e,v),c(e,t),c(t,i),c(t,l),h.m(l,null),c(e,a);for(let w=0;w<g.length;w+=1)g[w]&&g[w].m(e,null);r||(o=B(l,"click",s[6]),r=!0)},p(p,[v]){if(d!==(d=n(p))&&(h.d(1),h=d(p),h&&(h.c(),h.m(l,null))),v&29){u=Oe(Object.entries(p[2]));let w;for(w=0;w<u.length;w+=1){const y=Ua(p,u,w);g[w]?g[w].p(y,v):(g[w]=Ha(y),g[w].c(),g[w].m(e,null))}for(;w<g.length;w+=1)g[w].d(1);g.length=u.length}},i:me,o:me,d(p){p&&m(e),h.d(),yt(g,p),r=!1,o()}}}function su(s,e,t){let i=null;function l(p){if(i!=null){for(let v in ei.mapping)ei.mapping[v]==p.code&&(ei.mapping[v]=null);ei.set("mapping",{...ei.mapping,[i]:p.code}),t(0,i=null),Le.unlockKeys("keymap")}}function a(p){if(i==p){t(0,i=null),window.removeEventListener("keydown",l),Le.unlockKeys("keymap");return}i==null&&(window.addEventListener("keydown",l,{once:!0}),Le.lockKeys("keymap")),t(0,i=p)}function r(p){ei.set("mapping",{...ei.mapping,[p]:null})}let o=!1;function n(){o?(ei.set("mapping",{...Pd}),t(1,o=!1)):t(1,o=!0)}let d=ei.mapping;return ot(()=>(ei.addListener("mapping",p=>{t(2,d=p)}),()=>{window.removeEventListener("keydown",l),Le.unlockKeys("keymap")})),[i,o,d,a,r,n,()=>n(),(p,v)=>{r(p),v.stopPropagation()},p=>a(p)]}class lu extends Xe{constructor(e){super(),Qe(this,e,su,iu,Ke,{})}}function za(s,e,t){const i=s.slice();return i[25]=e[t][0],i[26]=e[t][1],i}function ru(s){let e;return{c(){e=ee("reset")},l(t){e=te(t,"reset")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function au(s){let e;return{c(){e=ee("confirm")},l(t){e=te(t,"confirm")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function ou(s){let e,t=Oe(Object.entries(s[3])),i=[];for(let l=0;l<t.length;l+=1)i[l]=Ba(za(s,t,l));return{c(){for(let l=0;l<i.length;l+=1)i[l].c();e=De()},l(l){for(let a=0;a<i.length;a+=1)i[a].l(l);e=De()},m(l,a){for(let r=0;r<i.length;r+=1)i[r]&&i[r].m(l,a);P(l,e,a)},p(l,a){if(a&32462){t=Oe(Object.entries(l[3]));let r;for(r=0;r<t.length;r+=1){const o=za(l,t,r);i[r]?i[r].p(o,a):(i[r]=Ba(o),i[r].c(),i[r].m(e.parentNode,e))}for(;r<i.length;r+=1)i[r].d(1);i.length=t.length}},d(l){l&&m(e),yt(i,l)}}}function nu(s){let e,t,i=s[4]+1+"",l,a;return{c(){e=_("div"),t=ee("Controller "),l=ee(i),a=ee(" not detected"),this.h()},l(r){e=b(r,"DIV",{style:!0});var o=C(e);t=te(o,"Controller "),l=te(o,i),a=te(o," not detected"),o.forEach(m),this.h()},h(){ae(e,"font-weight","600"),ae(e,"text-align","center"),ae(e,"font-style","italic")},m(r,o){P(r,e,o),c(e,t),c(e,l),c(e,a)},p(r,o){o&16&&i!==(i=r[4]+1+"")&&_e(l,i)},d(r){r&&m(e)}}}function Fa(s){let e,t="+",i,l,a,r;function o(...d){return s[16](s[25],...d)}let n=s[26].type==Ni.Axis&&Ga(s);return{c(){e=_("div"),e.textContent=t,i=k(),n&&n.c(),l=De(),this.h()},l(d){e=b(d,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-14ayu74"&&(e.textContent=t),i=I(d),n&&n.l(d),l=De(),this.h()},h(){f(e,"class","map-element-delete")},m(d,h){P(d,e,h),P(d,i,h),n&&n.m(d,h),P(d,l,h),a||(r=B(e,"click",o),a=!0)},p(d,h){s=d,s[26].type==Ni.Axis?n?n.p(s,h):(n=Ga(s),n.c(),n.m(l.parentNode,l)):n&&(n.d(1),n=null)},d(d){d&&(m(e),m(i),m(l)),n&&n.d(d),a=!1,r()}}}function Ga(s){let e,t,i,l;function a(d,h){return d[26].sign<0?cu:du}let r=a(s),o=r(s);function n(...d){return s[17](s[26],...d)}return{c(){e=_("div"),o.c(),this.h()},l(d){e=b(d,"DIV",{class:!0,title:!0});var h=C(e);o.l(h),h.forEach(m),this.h()},h(){f(e,"class","axis-mode-toggle svelte-6wmc2y"),f(e,"title",t=s[26].sign<0?s[14][s[26].mode??0]:s[13][s[26].mode??0])},m(d,h){P(d,e,h),o.m(e,null),i||(l=B(e,"click",n),i=!0)},p(d,h){s=d,r===(r=a(s))&&o?o.p(s,h):(o.d(1),o=r(s),o&&(o.c(),o.m(e,null))),h&8&&t!==(t=s[26].sign<0?s[14][s[26].mode??0]:s[13][s[26].mode??0])&&f(e,"title",t)},d(d){d&&m(e),o.d(),i=!1,l()}}}function du(s){let e,t=s[11][s[26].mode??0]+"",i;return{c(){e=new Fl(!1),i=De(),this.h()},l(l){e=Gl(l,!1),i=De(),this.h()},h(){e.a=i},m(l,a){e.m(t,l,a),P(l,i,a)},p(l,a){a&8&&t!==(t=l[11][l[26].mode??0]+"")&&e.p(t)},d(l){l&&(m(i),e.d())}}}function cu(s){let e,t=s[12][s[26].mode??0]+"",i;return{c(){e=new Fl(!1),i=De(),this.h()},l(l){e=Gl(l,!1),i=De(),this.h()},h(){e.a=i},m(l,a){e.m(t,l,a),P(l,i,a)},p(l,a){a&8&&t!==(t=l[12][l[26].mode??0]+"")&&e.p(t)},d(l){l&&(m(i),e.d())}}}function ja(s){let e=(s[25]==s[1]?"Press an input":s[9](s[26]))+"",t;return{c(){t=ee(e)},l(i){t=te(i,e)},m(i,l){P(i,t,l)},p(i,l){l&10&&e!==(e=(i[25]==i[1]?"Press an input":i[9](i[26]))+"")&&_e(t,e)},d(i){i&&m(t)}}}function Ba(s){let e,t,i=vs[s[25]]+"",l,a,r,o,n,d,h,u,g,p,v=s[26]&&s[1]!=s[25]&&Fa(s),w=(s[26]||s[1]==s[25])&&ja(s);function y(){return s[18](s[25])}return{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),r=_("div"),o=_("div"),v&&v.c(),n=k(),w&&w.c(),d=k(),h=_("div"),u=k(),this.h()},l(D){e=b(D,"DIV",{class:!0});var L=C(e);t=b(L,"DIV",{class:!0});var T=C(t);l=te(T,i),T.forEach(m),a=I(L),r=b(L,"DIV",{class:!0});var A=C(r);o=b(A,"DIV",{class:!0});var E=C(o);v&&v.l(E),n=I(E),w&&w.l(E),d=I(E),h=b(E,"DIV",{class:!0,style:!0}),C(h).forEach(m),E.forEach(m),A.forEach(m),u=I(L),L.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(h,"class","gamepad-value svelte-6wmc2y"),ae(h,"width",((s[26]&&s[2][s[25]])??0)*100+"%"),f(o,"class","map-element"),R(o,"map-element-mapping",s[25]==s[1]),f(r,"class","setting-element"),f(e,"class","setting-row")},m(D,L){P(D,e,L),c(e,t),c(t,l),c(e,a),c(e,r),c(r,o),v&&v.m(o,null),c(o,n),w&&w.m(o,null),c(o,d),c(o,h),c(e,u),g||(p=B(r,"click",y),g=!0)},p(D,L){s=D,L&8&&i!==(i=vs[s[25]]+"")&&_e(l,i),s[26]&&s[1]!=s[25]?v?v.p(s,L):(v=Fa(s),v.c(),v.m(o,n)):v&&(v.d(1),v=null),s[26]||s[1]==s[25]?w?w.p(s,L):(w=ja(s),w.c(),w.m(o,d)):w&&(w.d(1),w=null),L&12&&ae(h,"width",((s[26]&&s[2][s[25]])??0)*100+"%"),L&10&&R(o,"map-element-mapping",s[25]==s[1])},d(D){D&&m(e),v&&v.d(),w&&w.d(),g=!1,p()}}}function hu(s){let e,t,i,l,a,r,o;function n(v,w){return v[5]?au:ru}let d=n(s),h=d(s);function u(v,w){return v[0]==null?nu:ou}let g=u(s),p=g(s);return{c(){e=_("div"),t=_("div"),i=ee(`Mapping\r
        `),l=_("div"),h.c(),a=k(),p.c(),this.h()},l(v){e=b(v,"DIV",{class:!0,style:!0});var w=C(e);t=b(w,"DIV",{class:!0});var y=C(t);i=te(y,`Mapping\r
        `),l=b(y,"DIV",{class:!0});var D=C(l);h.l(D),D.forEach(m),y.forEach(m),a=I(w),p.l(w),w.forEach(m),this.h()},h(){f(l,"class","setting-section-header-reset"),f(t,"class","setting-section-header"),f(e,"class","settings-list"),ae(e,"padding-top","1rem")},m(v,w){P(v,e,w),c(e,t),c(t,i),c(t,l),h.m(l,null),c(e,a),p.m(e,null),r||(o=B(l,"click",s[15]),r=!0)},p(v,[w]){d!==(d=n(v))&&(h.d(1),h=d(v),h&&(h.c(),h.m(l,null))),g===(g=u(v))&&p?p.p(v,w):(p.d(1),p=g(v),p&&(p.c(),p.m(e,null)))},i:me,o:me,d(v){v&&m(e),h.d(),p.d(),r=!1,o()}}}function fu(s,e,t){let i=[],l=null,a=null,r;function o(O){if(a==O){t(1,a=null);return}t(1,a=O),r={axes:[...l.axes],buttons:l.buttons.map(j=>({pressed:j.pressed,value:j.value}))}}function n(O){wt.set("mapping",{...wt.mapping,[O]:null})}let d={},h=wt.mapping;function u(O,j=!1){t(3,h=O)}let g=wt.controllerIndex;function p(O){t(4,g=O)}let v=!1;function w(){var O;if(i=((O=navigator.getGamepads)==null?void 0:O.call(navigator))||[],!v&&i.length){if(i[g])v=!0;else for(let j=0;j<i.length;j++)if(i[j]){v=!0,wt.controllerIndexWasSet||wt.set("controllerIndex",j);break}}if(t(0,l=i[wt.controllerIndex]),!l){t(1,a=!1);return}if(a){let j;for(j=0;j<l.axes.length;j++)if(r.axes[j]-l.axes[j]>.15){let V=0;r.axes[j]>.5&&(V=2),wt.set("mapping",{...wt.mapping,[a]:{type:Ni.Axis,index:j,sign:-1,max:1,mode:V}}),t(1,a=null);break}else if(r.axes[j]-l.axes[j]<-.15){let V=0;r.axes[j]<-.5&&(V=2),wt.set("mapping",{...wt.mapping,[a]:{type:Ni.Axis,index:j,sign:1,max:1,mode:V}}),t(1,a=null);break}if(a){for(j=0;j<l.buttons.length;j++)if(r.buttons[j].pressed!=l.buttons[j].pressed||Math.abs(r.buttons[j].value-l.buttons[j].value)>.2){wt.set("mapping",{...wt.mapping,[a]:{type:Ni.Button,index:j}}),t(1,a=null);break}}}else{let j={},V,z;for(V in h)if(z=h[V],z)if(z.type==Ni.Axis){let M=l.axes[z.index];z.sign<0?z.mode==2?M=1-Math.max(0,M):z.mode==1?M=1-(M+1)/2:M=Math.min(1,Math.max(0,-M)):z.mode==2?M=Math.max(0,-M):z.mode==1?M=(M+1)/2:M=Math.max(0,Math.min(1,M)),j[V]=M}else z.type==Ni.Button&&(j[V]=l.buttons[z.index].value);else j[V]=0;t(2,d=j)}}ot(()=>{wt.addListener("mapping",u),wt.addListener("controllerIndex",p),pe.lockGamepad();let O=setInterval(w,25);return()=>{clearInterval(O),wt.removeListener("mapping",u),wt.removeListener("controllerIndex",p),pe.unlockGamepad()}});let y=!1;function D(){y?(wt.set("mapping",{...Nd}),t(5,y=!1)):t(5,y=!0)}function L(O){return O.type==Ni.Axis?"Axis "+O.index+(O.sign<0?" [-]":" [+]"):"Button "+O.index}function T(O){O.mode?O.mode=(O.mode+1)%3:O.mode=1,wt.set("mapping",h,!1,!0)}return[l,a,d,h,g,y,o,n,D,L,T,["0 &#9698; 1","-1 &#9698; 1","-1 &#9698; 0"],["0 &#9698; -1","1 &#9698; -1","1 &#9698; 0"],["Axis range begins at 0 and ends at 1","Axis range begins at -1 and ends at 1","Axis range begins at -1 and ends at 0"],["Axis range begins at 0 and ends at -1","Axis range begins at 1 and ends at -1","Axis range begins at 1 and ends at 0"],()=>D(),(O,j)=>{n(O),j.stopPropagation()},(O,j)=>{T(O),j.stopPropagation()},O=>o(O)]}class uu extends Xe{constructor(e){super(),Qe(this,e,fu,hu,Ke,{})}}function qa(s,e,t){const i=s.slice();return i[46]=e[t],i}function Wa(s,e,t){const i=s.slice();return i[49]=e[t][0],i[50]=e[t][1],i}function Ya(s,e,t){const i=s.slice();return i[53]=e[t],i}function Ka(s){let e,t,i,l="+ New profile",a,r,o=Oe(s[1]),n=[];for(let d=0;d<o.length;d+=1)n[d]=Xa(Ya(s,o,d));return{c(){e=_("div");for(let d=0;d<n.length;d+=1)n[d].c();t=k(),i=_("div"),i.textContent=l,this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);for(let u=0;u<n.length;u+=1)n[u].l(h);t=I(h),i=b(h,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(i)!=="svelte-1c7vjvm"&&(i.textContent=l),h.forEach(m),this.h()},h(){f(i,"class","profile-select-list-item svelte-iyvwtm"),ae(i,"font-style","italic"),ae(i,"color","var(--sr-primary-75)"),f(e,"class","profile-select-list svelte-iyvwtm")},m(d,h){P(d,e,h);for(let u=0;u<n.length;u+=1)n[u]&&n[u].m(e,null);c(e,t),c(e,i),a||(r=B(i,"click",s[29]),a=!0)},p(d,h){if(h[0]&262146){o=Oe(d[1]);let u;for(u=0;u<o.length;u+=1){const g=Ya(d,o,u);n[u]?n[u].p(g,h):(n[u]=Xa(g),n[u].c(),n[u].m(e,t))}for(;u<n.length;u+=1)n[u].d(1);n.length=o.length}},d(d){d&&m(e),yt(n,d),a=!1,r()}}}function Xa(s){let e,t=s[53]+"",i,l,a;function r(...o){return s[28](s[53],...o)}return{c(){e=_("div"),i=ee(t),this.h()},l(o){e=b(o,"DIV",{class:!0});var n=C(e);i=te(n,t),n.forEach(m),this.h()},h(){f(e,"class","profile-select-list-item svelte-iyvwtm")},m(o,n){P(o,e,n),c(e,i),l||(a=B(e,"click",r),l=!0)},p(o,n){s=o,n[0]&2&&t!==(t=s[53]+"")&&_e(i,t)},d(o){o&&m(e),l=!1,a()}}}function vu(s){let e,t,i="Error: Please load a valid .roads file",l,a,r="DISMISS",o,n;return{c(){e=_("div"),t=_("div"),t.textContent=i,l=k(),a=_("div"),a.textContent=r,this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);t=b(h,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-fngkdw"&&(t.textContent=i),l=I(h),a=b(h,"DIV",{class:!0,"data-svelte-h":!0}),Y(a)!=="svelte-jftli3"&&(a.textContent=r),h.forEach(m),this.h()},h(){f(t,"class","profile-msg-msg svelte-iyvwtm"),f(a,"class","profile-msg-action svelte-iyvwtm"),f(e,"class","profile-msg svelte-iyvwtm")},m(d,h){P(d,e,h),c(e,t),c(e,l),c(e,a),o||(n=B(a,"click",s[25]),o=!0)},p:me,d(d){d&&m(e),o=!1,n()}}}function mu(s){let e,t,i,l,a,r,o,n,d="OVERWRITE",h,u,g="CANCEL",p,v;return{c(){e=_("div"),t=_("div"),i=ee("Overwrite existing profile "),l=_("span"),a=ee(s[8]),r=ee("?"),o=k(),n=_("div"),n.textContent=d,h=k(),u=_("div"),u.textContent=g,this.h()},l(w){e=b(w,"DIV",{class:!0});var y=C(e);t=b(y,"DIV",{class:!0});var D=C(t);i=te(D,"Overwrite existing profile "),l=b(D,"SPAN",{style:!0});var L=C(l);a=te(L,s[8]),L.forEach(m),r=te(D,"?"),D.forEach(m),o=I(y),n=b(y,"DIV",{class:!0,"data-svelte-h":!0}),Y(n)!=="svelte-ayc6iv"&&(n.textContent=d),h=I(y),u=b(y,"DIV",{class:!0,"data-svelte-h":!0}),Y(u)!=="svelte-1hop0aj"&&(u.textContent=g),y.forEach(m),this.h()},h(){ae(l,"font-weight","1000"),f(t,"class","profile-msg-msg svelte-iyvwtm"),f(n,"class","profile-msg-action svelte-iyvwtm"),f(u,"class","profile-msg-action svelte-iyvwtm"),f(e,"class","profile-msg svelte-iyvwtm")},m(w,y){P(w,e,y),c(e,t),c(t,i),c(t,l),c(l,a),c(t,r),c(e,o),c(e,n),c(e,h),c(e,u),p||(v=[B(n,"click",s[24]),B(u,"click",s[25])],p=!0)},p(w,y){y[0]&256&&_e(a,w[8])},d(w){w&&m(e),p=!1,lt(v)}}}function Qa(s){let e,t,i=s[50].readable+"",l,a,r,o=s[50].convert(s[2][s[49]])+"",n;return{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),r=_("div"),n=ee(o),this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);t=b(h,"DIV",{class:!0});var u=C(t);l=te(u,i),u.forEach(m),a=I(h),r=b(h,"DIV",{class:!0,style:!0});var g=C(r);n=te(g,o),g.forEach(m),h.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(r,"class","setting-value"),ae(r,"font-family","Sono"),f(e,"class","setting-row")},m(d,h){P(d,e,h),c(e,t),c(t,l),c(e,a),c(e,r),c(r,n)},p(d,h){h[0]&4&&o!==(o=d[50].convert(d[2][d[49]])+"")&&_e(n,o)},d(d){d&&m(e)}}}function Za(s){let e,t="Worlds",i,l;function a(n,d){return n[10].length?pu:gu}let r=a(s),o=r(s);return{c(){e=_("div"),e.textContent=t,i=k(),o.c(),l=De(),this.h()},l(n){e=b(n,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1ak7xmu"&&(e.textContent=t),i=I(n),o.l(n),l=De(),this.h()},h(){f(e,"class","setting-section-header")},m(n,d){P(n,e,d),P(n,i,d),o.m(n,d),P(n,l,d)},p(n,d){r===(r=a(n))&&o?o.p(n,d):(o.d(1),o=r(n),o&&(o.c(),o.m(l.parentNode,l)))},d(n){n&&(m(e),m(i),m(l)),o.d(n)}}}function gu(s){let e,t="No worlds yet driven";return{c(){e=_("div"),e.textContent=t,this.h()},l(i){e=b(i,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(e)!=="svelte-viu36h"&&(e.textContent=t),this.h()},h(){f(e,"class","setting-row"),ae(e,"text-align","center"),ae(e,"font-style","italic")},m(i,l){P(i,e,l)},p:me,d(i){i&&m(e)}}}function pu(s){let e,t=Oe(s[10]),i=[];for(let l=0;l<t.length;l+=1)i[l]=Ja(qa(s,t,l));return{c(){e=_("div");for(let l=0;l<i.length;l+=1)i[l].c();this.h()},l(l){e=b(l,"DIV",{class:!0});var a=C(e);for(let r=0;r<i.length;r+=1)i[r].l(a);a.forEach(m),this.h()},h(){f(e,"class","worlds svelte-iyvwtm")},m(l,a){P(l,e,a);for(let r=0;r<i.length;r+=1)i[r]&&i[r].m(e,null)},p(l,a){if(a[0]&4203520){t=Oe(l[10]);let r;for(r=0;r<t.length;r+=1){const o=qa(l,t,r);i[r]?i[r].p(o,a):(i[r]=Ja(o),i[r].c(),i[r].m(e,null))}for(;r<i.length;r+=1)i[r].d(1);i.length=t.length}},d(l){l&&m(e),yt(i,l)}}}function Ja(s){let e,t,i=s[46].key+"",l,a,r=s[46].dist+"",o,n,d,h,u=s[46].hash+"",g,p,v,w;function y(...D){return s[35](s[46],...D)}return{c(){e=_("div"),t=_("div"),l=ee(i),a=ee(" ("),o=ee(r),n=ee(")"),d=k(),h=_("div"),g=ee(u),p=k(),this.h()},l(D){e=b(D,"DIV",{class:!0});var L=C(e);t=b(L,"DIV",{class:!0});var T=C(t);l=te(T,i),a=te(T," ("),o=te(T,r),n=te(T,")"),T.forEach(m),d=I(L),h=b(L,"DIV",{class:!0,style:!0});var A=C(h);g=te(A,u),A.forEach(m),p=I(L),L.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(h,"class","setting-value"),ae(h,"font-family","Sono"),f(e,"class","setting-row copiable svelte-iyvwtm"),R(e,"copied",s[46].i==s[13])},m(D,L){P(D,e,L),c(e,t),c(t,l),c(t,a),c(t,o),c(t,n),c(e,d),c(e,h),c(h,g),c(e,p),v||(w=B(e,"click",y),v=!0)},p(D,L){s=D,L[0]&1024&&i!==(i=s[46].key+"")&&_e(l,i),L[0]&1024&&r!==(r=s[46].dist+"")&&_e(o,r),L[0]&1024&&u!==(u=s[46].hash+"")&&_e(g,u),L[0]&9216&&R(e,"copied",s[46].i==s[13])},d(D){D&&m(e),v=!1,w()}}}function _u(s){let e,t,i,l,a,r,o="≡",n,d,h,u,g,p,v,w,y,D,L,T,A="Overview",E,x,W,X,U=s[11]&&Ka(s);function J(M,N){if(M[7])return mu;if(M[9])return vu}let Z=J(s),O=Z&&Z(s),j=Oe(Object.entries(Ur)),V=[];for(let M=0;M<j.length;M+=1)V[M]=Qa(Wa(s,j,M));let z=s[14]==!1&&Za(s);return{c(){e=_("div"),t=_("div"),i=_("input"),l=k(),a=_("div"),r=_("div"),r.textContent=o,n=k(),U&&U.c(),d=k(),h=_("div"),u=ee(`Export\r
            `),g=_("a"),p=k(),v=_("div"),w=ee(`Load\r
            `),y=_("input"),D=k(),O&&O.c(),L=k(),T=_("div"),T.textContent=A,E=k();for(let M=0;M<V.length;M+=1)V[M].c();x=k(),z&&z.c(),this.h()},l(M){e=b(M,"DIV",{class:!0});var N=C(e);t=b(N,"DIV",{class:!0});var G=C(t);i=b(G,"INPUT",{class:!0,placeholder:!0}),l=I(G),a=b(G,"DIV",{class:!0});var se=C(a);r=b(se,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(r)!=="svelte-edkqep"&&(r.textContent=o),n=I(se),U&&U.l(se),se.forEach(m),d=I(G),h=b(G,"DIV",{class:!0,title:!0});var oe=C(h);u=te(oe,`Export\r
            `),g=b(oe,"A",{download:!0,target:!0,rel:!0,style:!0}),C(g).forEach(m),oe.forEach(m),p=I(G),v=b(G,"DIV",{class:!0,title:!0});var re=C(v);w=te(re,`Load\r
            `),y=b(re,"INPUT",{style:!0,type:!0,accept:!0}),re.forEach(m),G.forEach(m),D=I(N),O&&O.l(N),L=I(N),T=b(N,"DIV",{class:!0,"data-svelte-h":!0}),Y(T)!=="svelte-jc27zg"&&(T.textContent=A),E=I(N);for(let be=0;be<V.length;be+=1)V[be].l(N);x=I(N),z&&z.l(N),N.forEach(m),this.h()},h(){f(i,"class","profile-name profile-name-input svelte-iyvwtm"),f(i,"placeholder","Name your profile"),R(i,"profile-name-invalid",s[3]),f(r,"class","profile-btn-symbol svelte-iyvwtm"),ae(r,"font-size","1.8rem"),f(a,"class","profile-btn profile-select svelte-iyvwtm"),R(a,"profile-select-active",s[11]),f(g,"download",""),f(g,"target","_blank"),f(g,"rel","noopener noreferrer"),ae(g,"display","none"),f(h,"class","profile-btn profile-export svelte-iyvwtm"),f(h,"title","Export profile file to disk"),ae(y,"display","none"),f(y,"type","file"),f(y,"accept",".roads"),f(v,"class","profile-btn profile-export svelte-iyvwtm"),f(v,"title","Load profile file from disk"),f(t,"class","profile-selection svelte-iyvwtm"),f(T,"class","setting-section-header"),f(e,"class","settings-list")},m(M,N){P(M,e,N),c(e,t),c(t,i),Ys(i,s[0]),c(t,l),c(t,a),c(a,r),c(a,n),U&&U.m(a,null),s[32](a),c(t,d),c(t,h),c(h,u),c(h,g),s[33](g),c(t,p),c(t,v),c(v,w),c(v,y),s[34](y),c(e,D),O&&O.m(e,null),c(e,L),c(e,T),c(e,E);for(let G=0;G<V.length;G+=1)V[G]&&V[G].m(e,null);c(e,x),z&&z.m(e,null),W||(X=[B(i,"focus",s[23]),B(i,"blur",s[16]),B(i,"keydown",bu),B(i,"input",s[15]),B(i,"input",s[27]),B(a,"click",s[17]),B(a,"mouseenter",s[30]),B(a,"mouseleave",s[31]),B(h,"click",s[19]),B(y,"change",s[21]),B(v,"click",s[20])],W=!0)},p(M,N){if(N[0]&1&&i.value!==M[0]&&Ys(i,M[0]),N[0]&8&&R(i,"profile-name-invalid",M[3]),M[11]?U?U.p(M,N):(U=Ka(M),U.c(),U.m(a,null)):U&&(U.d(1),U=null),N[0]&2048&&R(a,"profile-select-active",M[11]),Z===(Z=J(M))&&O?O.p(M,N):(O&&O.d(1),O=Z&&Z(M),O&&(O.c(),O.m(e,L))),N[0]&4){j=Oe(Object.entries(Ur));let G;for(G=0;G<j.length;G+=1){const se=Wa(M,j,G);V[G]?V[G].p(se,N):(V[G]=Qa(se),V[G].c(),V[G].m(e,x))}for(;G<V.length;G+=1)V[G].d(1);V.length=j.length}M[14]==!1?z?z.p(M,N):(z=Za(M),z.c(),z.m(e,null)):z&&(z.d(1),z=null)},i:me,o:me,d(M){M&&m(e),U&&U.d(),s[32](null),s[33](null),s[34](null),O&&O.d(),yt(V,M),z&&z.d(),W=!1,lt(X)}}}const bu=s=>{s.code=="Enter"&&s.target.blur()};function wu(s,e,t){let i;ke(s,si,$=>t(14,i=$));let l=[],a={};const r=()=>{let $=[qe.name];for(let ge in Mi)$.push(ge);t(1,l=$)};let o=qe.name,n=!1,d,h,u=null,g=qe.name,p=!1,v="What",w=null,y=!1;ot(()=>{const $=ge=>{t(2,a=qe.getCopy()),ge!==o&&(t(0,o=ge),g=ge)};return Xi.saveCurrentProgress(),r(),qe.addListener("name",$),Ds.addListener("any",L),window.addEventListener("mouseup",J),()=>{qe.removeListener("name",$),Ds.removeListener("any",L),window.removeEventListener("mouseup",J)}});let D=[];function L(){let $=Ds.history,ge=[],Ce=Object.keys($),je=0;for(let He of Ce){let ct=Object.keys($[He]);for(let ze of ct){let ht=Object.keys($[He][ze]);for(let ut of ht)ge.push({i:je++,key:Ol[He]+" - "+Vl[ze]+" - "+ut,dist:ed($[He][ze][ut].startNode*10),hash:Bs(He,ze,ut,$[He][ze][ut].startNode)})}}t(10,D=ge)}const T=()=>(t(3,n=o.length<=0||o in Mi),n),A=()=>{T()?qe.set("name",g,!1,!0):qe.set("name",o),r(),G()};let E=!1;const x=()=>{t(11,E=!E)},W=($,ge)=>{$.stopPropagation(),$.preventDefault(),X(ge)},X=$=>{t(11,E=!1);let ge=$===void 0;if($!=qe.name){if(Xi.storeCurrentProfile(),ge){let Ce=l.length+1;do $="Profile "+Ce,Ce++;while(l.indexOf($)>=0)}Xi.loadStoredProfile($),r()}};let U=!1;const J=$=>{U||t(11,E=!1)};function Z($){{let ge="data:text/json;charset=utf-8,"+encodeURIComponent(Xi.getSaveFile());d.setAttribute("href",ge),d.setAttribute("download",o+".roads"),d.click()}}function O(){h.click()}function j($){let ge=$.target.files[0],Ce=new FileReader;Ce.onload=je=>{try{V(JSON.parse(je.target.result))}catch(He){console.error("Failed to load profile"),console.error(He),t(9,y=!0)}},Ce.readAsText(ge)}function V($){if(!$.profile||!$.profile.name||!$.settings||!$.version)throw new Error("Invalid file structure");let ge=$.profile.name;l.indexOf(ge)>=0?(t(8,v=ge),t(7,p=!0),w=$):(t(26,Mi[ge]=$,Mi),X(ge))}let z=-1;function M($,ge,Ce){t(13,z=ge),navigator.clipboard.writeText(Ce)}function N(){Le.lockKeys("profile")}function G(){Le.unlockKeys("profile")}function se(){if(!p)return;let $=w.profile.name;t(26,Mi[$]=w,Mi),$!==qe.name&&Xi.storeCurrentProfile(),Xi.loadStoredProfile($),r(),oe()}function oe(){t(7,p=!1),t(8,v=null),w=null,t(9,y=!1)}function re(){o=this.value,t(0,o)}const be=($,ge)=>W(ge,$),we=$=>W($,void 0),he=()=>t(12,U=!0),Q=()=>t(12,U=!1);function le($){St[$?"unshift":"push"](()=>{u=$,t(6,u)})}function de($){St[$?"unshift":"push"](()=>{d=$,t(4,d)})}function K($){St[$?"unshift":"push"](()=>{h=$,t(5,h)})}const ce=($,ge)=>M(ge,$.i,$.hash);return s.$$.update=()=>{s.$$.dirty[0]&67108865&&t(3,n=o.length<=0||o in Mi)},[o,l,a,n,d,h,u,p,v,y,D,E,U,z,i,T,A,x,W,Z,O,j,M,N,se,oe,Mi,re,be,we,he,Q,le,de,K,ce]}class yu extends Xe{constructor(e){super(),Qe(this,e,wu,_u,Ke,{},null,[-1,-1])}}function $a(s,e,t){const i=s.slice();return i[14]=e[t][0],i[15]=e[t][1],i}function Su(s){let e;return{c(){e=ee("reset")},l(t){e=te(t,"reset")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function Du(s){let e;return{c(){e=ee("confirm")},l(t){e=te(t,"confirm")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function eo(s){let e,t="+",i,l;function a(...r){return s[8](s[14],...r)}return{c(){e=_("div"),e.textContent=t,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-14ayu74"&&(e.textContent=t),this.h()},h(){f(e,"class","map-element-delete")},m(r,o){P(r,e,o),i||(l=B(e,"click",a),i=!0)},p(r,o){s=r},d(r){r&&m(e),i=!1,l()}}}function to(s){let e=(s[14]==s[0]?"Click a mouse button":so(s[15]))+"",t;return{c(){t=ee(e)},l(i){t=te(i,e)},m(i,l){P(i,t,l)},p(i,l){l&5&&e!==(e=(i[14]==i[0]?"Click a mouse button":so(i[15]))+"")&&_e(t,e)},d(i){i&&m(t)}}}function io(s){let e,t,i=vs[s[14]]+"",l,a,r,o,n,d,h,u,g=s[15]!==null&&s[0]!=s[14]&&eo(s),p=(s[15]!==null||s[0]==s[14])&&to(s);function v(){return s[9](s[14])}function w(){return s[10](s[14])}return{c(){e=_("div"),t=_("div"),l=ee(i),a=k(),r=_("div"),o=_("div"),g&&g.c(),n=k(),p&&p.c(),d=k(),this.h()},l(y){e=b(y,"DIV",{class:!0});var D=C(e);t=b(D,"DIV",{class:!0});var L=C(t);l=te(L,i),L.forEach(m),a=I(D),r=b(D,"DIV",{class:!0});var T=C(r);o=b(T,"DIV",{class:!0});var A=C(o);g&&g.l(A),n=I(A),p&&p.l(A),A.forEach(m),T.forEach(m),d=I(D),D.forEach(m),this.h()},h(){f(t,"class","setting-label"),f(o,"class","map-element"),R(o,"map-element-mapping",s[14]==s[0]),f(r,"class","setting-element"),f(e,"class","setting-row")},m(y,D){P(y,e,D),c(e,t),c(t,l),c(e,a),c(e,r),c(r,o),g&&g.m(o,null),c(o,n),p&&p.m(o,null),c(e,d),h||(u=[B(r,"mousedown",v),B(r,"click",w)],h=!0)},p(y,D){s=y,D&4&&i!==(i=vs[s[14]]+"")&&_e(l,i),s[15]!==null&&s[0]!=s[14]?g?g.p(s,D):(g=eo(s),g.c(),g.m(o,n)):g&&(g.d(1),g=null),s[15]!==null||s[0]==s[14]?p?p.p(s,D):(p=to(s),p.c(),p.m(o,null)):p&&(p.d(1),p=null),D&5&&R(o,"map-element-mapping",s[14]==s[0])},d(y){y&&m(e),g&&g.d(),p&&p.d(),h=!1,lt(u)}}}function Lu(s){let e,t,i,l,a,r,o;function n(p,v){return p[1]?Du:Su}let d=n(s),h=d(s),u=Oe(Object.entries(s[2])),g=[];for(let p=0;p<u.length;p+=1)g[p]=io($a(s,u,p));return{c(){e=_("div"),t=_("div"),i=ee(`Mapping\r
        `),l=_("div"),h.c(),a=k();for(let p=0;p<g.length;p+=1)g[p].c();this.h()},l(p){e=b(p,"DIV",{class:!0,style:!0});var v=C(e);t=b(v,"DIV",{class:!0});var w=C(t);i=te(w,`Mapping\r
        `),l=b(w,"DIV",{class:!0});var y=C(l);h.l(y),y.forEach(m),w.forEach(m),a=I(v);for(let D=0;D<g.length;D+=1)g[D].l(v);v.forEach(m),this.h()},h(){f(l,"class","setting-section-header-reset"),f(t,"class","setting-section-header"),f(e,"class","settings-list"),ae(e,"padding-top","1rem")},m(p,v){P(p,e,v),c(e,t),c(t,i),c(t,l),h.m(l,null),c(e,a);for(let w=0;w<g.length;w+=1)g[w]&&g[w].m(e,null);r||(o=B(l,"click",s[7]),r=!0)},p(p,[v]){if(d!==(d=n(p))&&(h.d(1),h=d(p),h&&(h.c(),h.m(l,null))),v&61){u=Oe(Object.entries(p[2]));let w;for(w=0;w<u.length;w+=1){const y=$a(p,u,w);g[w]?g[w].p(y,v):(g[w]=io(y),g[w].c(),g[w].m(e,null))}for(;w<g.length;w+=1)g[w].d(1);g.length=u.length}},i:me,o:me,d(p){p&&m(e),h.d(),yt(g,p),r=!1,o()}}}function so(s){return s===null?null:s==0?"Left click":s==1?"Middle click":s==2?"Right click":"Button "+s}function Cu(s,e,t){let i=null;function l(y){if(i!=null){for(let D in st.mapping)st.mapping[D]==y.button&&(st.mapping[D]=null);st.set("mapping",{...st.mapping,[i]:y.button}),t(0,i=null),y.preventDefault(),y.stopPropagation()}}let a=!1;function r(y){i!=null?a=!0:a=!1}function o(y){if(!a){if(i==y){t(0,i=null),window.removeEventListener("mousedown",l);return}i==null&&window.addEventListener("mousedown",l,{once:!0}),t(0,i=y)}}function n(y){st.set("mapping",{...st.mapping,[y]:null})}let d=!1;function h(){d?(st.set("mapping",{...td}),t(1,d=!1)):t(1,d=!0)}let u=st.mapping;return ot(()=>(st.addListener("mapping",y=>{t(2,u=y)}),()=>{window.removeEventListener("mousedown",l)})),[i,d,u,r,o,n,h,()=>h(),(y,D)=>{n(y),D.stopPropagation()},y=>r(),y=>o(y)]}class ku extends Xe{constructor(e){super(),Qe(this,e,Cu,Lu,Ke,{})}}function lo(s){let e,t,i,l="HOME",a,r,o,n="GAMEPLAY",d,h,u="GRAPHICS",g,p,v="CONTROLS",w,y,D="AUDIO",L,T,A="PROFILE",E,x,W,X,U,J,Z,O,j="COPY DEBUG LOG",V,z,M,N="CLOSE",G,se,oe,re;const be=[Tu,Au,Eu,Mu,Iu],we=[];function he(Q,le){return Q[7]==0?0:Q[7]==1?1:Q[7]==2?2:Q[7]==3?3:Q[7]==4?4:-1}return~(X=he(s))&&(U=we[X]=be[X](s)),{c(){e=_("div"),t=_("div"),i=_("div"),a=ee(l),r=k(),o=_("div"),o.textContent=n,d=k(),h=_("div"),h.textContent=u,g=k(),p=_("div"),p.textContent=v,w=k(),y=_("div"),y.textContent=D,L=k(),T=_("div"),T.textContent=A,E=k(),x=_("div"),W=_("div"),U&&U.c(),J=k(),Z=_("div"),O=_("div"),O.textContent=j,V=k(),z=k(),M=_("div"),M.textContent=N,this.h()},l(Q){e=b(Q,"DIV",{id:!0,class:!0});var le=C(e);t=b(le,"DIV",{id:!0,class:!0});var de=C(t);i=b(de,"DIV",{class:!0,style:!0});var K=C(i);a=te(K,l),K.forEach(m),r=I(de),o=b(de,"DIV",{class:!0,"data-svelte-h":!0}),Y(o)!=="svelte-d9155r"&&(o.textContent=n),d=I(de),h=b(de,"DIV",{class:!0,"data-svelte-h":!0}),Y(h)!=="svelte-1gh8wl0"&&(h.textContent=u),g=I(de),p=b(de,"DIV",{class:!0,"data-svelte-h":!0}),Y(p)!=="svelte-1t0y255"&&(p.textContent=v),w=I(de),y=b(de,"DIV",{class:!0,"data-svelte-h":!0}),Y(y)!=="svelte-95vled"&&(y.textContent=D),L=I(de),T=b(de,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(T)!=="svelte-1i1kut5"&&(T.textContent=A),de.forEach(m),E=I(le),x=b(le,"DIV",{id:!0,class:!0});var ce=C(x);W=b(ce,"DIV",{id:!0,class:!0});var $=C(W);U&&U.l($),$.forEach(m),ce.forEach(m),J=I(le),Z=b(le,"DIV",{id:!0,class:!0});var ge=C(Z);O=b(ge,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(O)!=="svelte-19upzay"&&(O.textContent=j),V=I(ge),z=I(ge),M=b(ge,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(M)!=="svelte-172h0kq"&&(M.textContent=N),ge.forEach(m),le.forEach(m),this.h()},h(){f(i,"class","settings-header svelte-1vatkls"),ae(i,"flex-basis","20%"),f(o,"class","settings-header svelte-1vatkls"),R(o,"settings-selected",s[7]==0),f(h,"class","settings-header svelte-1vatkls"),R(h,"settings-selected",s[7]==1),f(p,"class","settings-header svelte-1vatkls"),R(p,"settings-selected",s[7]==2),f(y,"class","settings-header svelte-1vatkls"),R(y,"settings-selected",s[7]==3),f(T,"class","settings-header svelte-1vatkls"),ae(T,"flex-basis","20%"),ae(T,"text-align","right"),R(T,"settings-selected",s[7]==4),f(t,"id","ui-settings-header"),f(t,"class","svelte-1vatkls"),R(t,"ui-settings-hidden",s[12]),f(W,"id","ui-settings-body-content"),f(W,"class","svelte-1vatkls"),f(x,"id","ui-settings-body"),f(x,"class","svelte-1vatkls"),R(x,"ui-settings-hidden",s[12]),f(O,"class","ui-btn ui-btn-active"),ae(O,"background","none"),ae(O,"border-color","var(--sr-primary-50)"),ae(O,"color","var(--sr-primary)"),ae(O,"line-height","1rem"),ae(O,"font-size","0.8rem"),f(M,"class","ui-btn ui-btn-active"),ae(M,"line-height","1rem"),ae(M,"font-size","0.8rem"),f(Z,"id","ui-settings-footer"),f(Z,"class","svelte-1vatkls"),R(Z,"ui-settings-hidden",s[12]),f(e,"id","ui-settings"),f(e,"class","svelte-1vatkls")},m(Q,le){P(Q,e,le),c(e,t),c(t,i),c(i,a),c(t,r),c(t,o),c(t,d),c(t,h),c(t,g),c(t,p),c(t,w),c(t,y),c(t,L),c(t,T),c(e,E),c(e,x),c(x,W),~X&&we[X].m(W,null),s[28](x),c(e,J),c(e,Z),c(Z,O),c(Z,V),c(Z,z),c(Z,M),se=!0,oe||(re=[B(i,"click",s[19]),B(o,"click",s[20]),B(h,"click",s[21]),B(p,"click",s[22]),B(y,"click",s[23]),B(T,"click",s[24]),B(x,"scrollend",s[15]),B(O,"click",s[16]),B(M,"click",function(){zl(s[2])&&s[2].apply(this,arguments)}),B(e,"mouseenter",s[29]),B(e,"mouseleave",s[30])],oe=!0)},p(Q,le){s=Q,(!se||le[0]&128)&&R(o,"settings-selected",s[7]==0),(!se||le[0]&128)&&R(h,"settings-selected",s[7]==1),(!se||le[0]&128)&&R(p,"settings-selected",s[7]==2),(!se||le[0]&128)&&R(y,"settings-selected",s[7]==3),(!se||le[0]&128)&&R(T,"settings-selected",s[7]==4),(!se||le[0]&4096)&&R(t,"ui-settings-hidden",s[12]);let de=X;X=he(s),X===de?~X&&we[X].p(s,le):(U&&(Fe(),ie(we[de],1,1,()=>{we[de]=null}),Ge()),~X?(U=we[X],U?U.p(s,le):(U=we[X]=be[X](s),U.c()),q(U,1),U.m(W,null)):U=null),(!se||le[0]&4096)&&R(x,"ui-settings-hidden",s[12]),(!se||le[0]&4096)&&R(Z,"ui-settings-hidden",s[12])},i(Q){se||(q(U),Q&&Ci(()=>{se&&(G||(G=ii(e,Tt,{duration:100},!0)),G.run(1))}),se=!0)},o(Q){ie(U),Q&&(G||(G=ii(e,Tt,{duration:100},!1)),G.run(0)),se=!1},d(Q){Q&&m(e),~X&&we[X].d(),s[28](null),Q&&G&&G.end(),oe=!1,lt(re)}}}function Iu(s){let e,t;return e=new yu({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Mu(s){let e,t;return e=new is({props:{liveSetting:_s,settingsMeta:id}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Eu(s){let e,t,i,l;const a=[Nu,Pu],r=[];function o(n,d){return n[13]?0:1}return e=o(s),t=r[e]=a[e](s),{c(){t.c(),i=De()},l(n){t.l(n),i=De()},m(n,d){r[e].m(n,d),P(n,i,d),l=!0},p(n,d){let h=e;e=o(n),e===h?r[e].p(n,d):(Fe(),ie(r[h],1,1,()=>{r[h]=null}),Ge(),t=r[e],t?t.p(n,d):(t=r[e]=a[e](n),t.c()),q(t,1),t.m(i.parentNode,i))},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),r[e].d(n)}}}function Au(s){let e,t,i,l;function a(n,d){return Ou}let o=a()(s);return i=new is({props:{liveSetting:We,settingsMeta:sd}}),{c(){e=_("div"),o.c(),t=k(),Ne(i.$$.fragment),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);o.l(d),d.forEach(m),t=I(n),xe(i.$$.fragment,n),this.h()},h(){f(e,"class","settings-blurb svelte-1vatkls")},m(n,d){P(n,e,d),o.m(e,null),P(n,t,d),Re(i,n,d),l=!0},p:me,i(n){l||(q(i.$$.fragment,n),l=!0)},o(n){ie(i.$$.fragment,n),l=!1},d(n){n&&(m(e),m(t)),o.d(),Ue(i,n)}}}function Tu(s){let e,t;return e=new is({props:{liveSetting:ne,settingsMeta:ld}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Pu(s){let e,t,i="Keyboard",l,a,r="Mouse",o,n,d="Controller",h,u,g,p,v,w,y;const D=[Uu,Ru,xu],L=[];function T(A,E){return A[8]==0?0:A[8]==1?1:2}return u=T(s),g=L[u]=D[u](s),{c(){e=_("div"),t=_("div"),t.textContent=i,l=k(),a=_("div"),a.textContent=r,o=k(),n=_("div"),n.textContent=d,h=k(),g.c(),p=De(),this.h()},l(A){e=b(A,"DIV",{class:!0});var E=C(e);t=b(E,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-ugcogi"&&(t.textContent=i),l=I(E),a=b(E,"DIV",{class:!0,"data-svelte-h":!0}),Y(a)!=="svelte-1c4vzu2"&&(a.textContent=r),o=I(E),n=b(E,"DIV",{class:!0,"data-svelte-h":!0}),Y(n)!=="svelte-14igtfd"&&(n.textContent=d),E.forEach(m),h=I(A),g.l(A),p=De(),this.h()},h(){f(t,"class","settings-tab svelte-1vatkls"),R(t,"tab-selected",s[8]==0),f(a,"class","settings-tab svelte-1vatkls"),R(a,"tab-selected",s[8]==1),f(n,"class","settings-tab svelte-1vatkls"),R(n,"tab-selected",s[8]==2),f(e,"class","settings-tabs svelte-1vatkls")},m(A,E){P(A,e,E),c(e,t),c(e,l),c(e,a),c(e,o),c(e,n),P(A,h,E),L[u].m(A,E),P(A,p,E),v=!0,w||(y=[B(t,"click",s[25]),B(a,"click",s[26]),B(n,"click",s[27])],w=!0)},p(A,E){(!v||E[0]&256)&&R(t,"tab-selected",A[8]==0),(!v||E[0]&256)&&R(a,"tab-selected",A[8]==1),(!v||E[0]&256)&&R(n,"tab-selected",A[8]==2);let x=u;u=T(A),u!==x&&(Fe(),ie(L[x],1,1,()=>{L[x]=null}),Ge(),g=L[u],g||(g=L[u]=D[u](A),g.c()),q(g,1),g.m(p.parentNode,p))},i(A){v||(q(g),v=!0)},o(A){ie(g),v=!1},d(A){A&&(m(e),m(h),m(p)),L[u].d(A),w=!1,lt(y)}}}function Nu(s){let e,t;return e=new is({props:{liveSetting:Ai,settingsMeta:md}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function xu(s){let e,t,i,l;return e=new is({props:{liveSetting:wt,settingsMeta:xd}}),i=new uu({}),{c(){Ne(e.$$.fragment),t=k(),Ne(i.$$.fragment)},l(a){xe(e.$$.fragment,a),t=I(a),xe(i.$$.fragment,a)},m(a,r){Re(e,a,r),P(a,t,r),Re(i,a,r),l=!0},i(a){l||(q(e.$$.fragment,a),q(i.$$.fragment,a),l=!0)},o(a){ie(e.$$.fragment,a),ie(i.$$.fragment,a),l=!1},d(a){a&&m(t),Ue(e,a),Ue(i,a)}}}function Ru(s){let e,t,i,l;return e=new is({props:{liveSetting:st,settingsMeta:rd}}),i=new ku({}),{c(){Ne(e.$$.fragment),t=k(),Ne(i.$$.fragment)},l(a){xe(e.$$.fragment,a),t=I(a),xe(i.$$.fragment,a)},m(a,r){Re(e,a,r),P(a,t,r),Re(i,a,r),l=!0},i(a){l||(q(e.$$.fragment,a),q(i.$$.fragment,a),l=!0)},o(a){ie(e.$$.fragment,a),ie(i.$$.fragment,a),l=!1},d(a){a&&m(t),Ue(e,a),Ue(i,a)}}}function Uu(s){let e,t,i,l;return e=new is({props:{liveSetting:ei,settingsMeta:Rd}}),i=new lu({}),{c(){Ne(e.$$.fragment),t=k(),Ne(i.$$.fragment)},l(a){xe(e.$$.fragment,a),t=I(a),xe(i.$$.fragment,a)},m(a,r){Re(e,a,r),P(a,t,r),Re(i,a,r),l=!0},i(a){l||(q(e.$$.fragment,a),q(i.$$.fragment,a),l=!0)},o(a){ie(e.$$.fragment,a),ie(i.$$.fragment,a),l=!1},d(a){a&&m(t),Ue(e,a),Ue(i,a)}}}function Ou(s){let e;return{c(){e=ee("For good performance, ensure that your browser has hardware acceleration enabled")},l(t){e=te(t,"For good performance, ensure that your browser has hardware acceleration enabled")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function ro(s){let e,t,i,l,a,r,o,n,d,h,u=s[0]&&ao(s),g=!s[9]&&!s[13]&&!Pl&&oo(s);return l=new $f({props:{onHasFocus:s[36]}}),{c(){u&&u.c(),e=k(),t=_("div"),g&&g.c(),i=k(),Ne(l.$$.fragment),a=k(),r=_("img"),this.h()},l(p){u&&u.l(p),e=I(p),t=b(p,"DIV",{id:!0,class:!0});var v=C(t);g&&g.l(v),i=I(v),xe(l.$$.fragment,v),a=I(v),r=b(v,"IMG",{class:!0,src:!0}),v.forEach(m),this.h()},h(){f(r,"class","ui-settings-bar-icon svelte-1vatkls"),Ut(r.src,o="/img/ico_settings.svg")||f(r,"src",o),R(r,"ui-settings-bar-icon-prompt",s[0]),f(t,"id","ui-settings-bar"),f(t,"class","svelte-1vatkls")},m(p,v){u&&u.m(p,v),P(p,e,v),P(p,t,v),g&&g.m(t,null),c(t,i),Re(l,t,null),c(t,a),c(t,r),n=!0,d||(h=[B(r,"click",s[37]),B(t,"mouseenter",s[38]),B(t,"mouseleave",s[39])],d=!0)},p(p,v){p[0]?u?(u.p(p,v),v[0]&1&&q(u,1)):(u=ao(p),u.c(),q(u,1),u.m(e.parentNode,e)):u&&(Fe(),ie(u,1,1,()=>{u=null}),Ge()),!p[9]&&!p[13]&&!Pl?g?g.p(p,v):(g=oo(p),g.c(),g.m(t,i)):g&&(g.d(1),g=null);const w={};v[0]&512&&(w.onHasFocus=p[36]),l.$set(w),(!n||v[0]&1)&&R(r,"ui-settings-bar-icon-prompt",p[0])},i(p){n||(q(u),q(l.$$.fragment,p),n=!0)},o(p){ie(u),ie(l.$$.fragment,p),n=!1},d(p){p&&(m(e),m(t)),u&&u.d(p),g&&g.d(),Ue(l),d=!1,lt(h)}}}function ao(s){let e,t='<span style="font-weight: 600">Low framerate?</span> <br/> <span style="font-size: 0.9rem">Adjust graphics settings here</span>',i,l,a,r;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(o){e=b(o,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-e8bk2z"&&(e.innerHTML=t),this.h()},h(){f(e,"class","ui-settings-bar-prompt svelte-1vatkls")},m(o,n){P(o,e,n),l=!0,a||(r=B(e,"click",s[31]),a=!0)},p:me,i(o){l||(o&&Ci(()=>{l&&(i||(i=ii(e,Tt,{delay:0,duration:500},!0)),i.run(1))}),l=!0)},o(o){o&&(i||(i=ii(e,Tt,{delay:0,duration:500},!1)),i.run(0)),l=!1},d(o){o&&m(e),o&&i&&i.end(),a=!1,r()}}}function oo(s){let e,t,i,l,a,r,o,n=s[17]&&s[11]&&no(s),d=!s[11]&&ho();return{c(){n&&n.c(),e=k(),t=_("a"),d&&d.c(),i=k(),l=_("img"),this.h()},l(h){n&&n.l(h),e=I(h),t=b(h,"A",{id:!0,target:!0,rel:!0,href:!0,alt:!0,class:!0});var u=C(t);d&&d.l(u),i=I(u),l=b(u,"IMG",{id:!0,src:!0,alt:!0,class:!0}),u.forEach(m),this.h()},h(){f(l,"id","ui-settings-steam-icon"),Ut(l.src,a="/img/icon_steam_white.svg")||f(l,"src",a),f(l,"alt",""),f(l,"class","svelte-1vatkls"),f(t,"id","ui-settings-steam"),f(t,"target","_blank"),f(t,"rel","noopener noreferrer"),f(t,"href","https://store.steampowered.com/app/3431300/Slow_Roads/"),f(t,"alt",""),f(t,"class","svelte-1vatkls")},m(h,u){n&&n.m(h,u),P(h,e,u),P(h,t,u),d&&d.m(t,null),c(t,i),c(t,l),r||(o=B(t,"mouseup",s[35]),r=!0)},p(h,u){h[17]&&h[11]?n?n.p(h,u):(n=no(h),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null),h[11]?d&&(d.d(1),d=null):d||(d=ho(),d.c(),d.m(t,i))},d(h){h&&(m(e),m(t)),n&&n.d(h),d&&d.d(),r=!1,o()}}}function no(s){let e,t,i,l,a,r,o=!s[10]&&co();return{c(){e=_("a"),o&&o.c(),t=k(),i=_("img"),this.h()},l(n){e=b(n,"A",{id:!0,style:!0,target:!0,rel:!0,href:!0,alt:!0,class:!0});var d=C(e);o&&o.l(d),t=I(d),i=b(d,"IMG",{id:!0,src:!0,alt:!0,class:!0}),d.forEach(m),this.h()},h(){f(i,"id","ui-settings-steam-icon"),Ut(i.src,l="/img/icon_itch_white.svg")||f(i,"src",l),f(i,"alt",""),f(i,"class","svelte-1vatkls"),f(e,"id","ui-settings-steam"),ae(e,"margin-right","1rem"),f(e,"target","_blank"),f(e,"rel","noopener noreferrer"),f(e,"href","https://topographinteractive.itch.io/slow-roads"),f(e,"alt",""),f(e,"class","svelte-1vatkls")},m(n,d){P(n,e,d),o&&o.m(e,null),c(e,t),c(e,i),a||(r=[B(e,"mouseenter",s[32]),B(e,"mouseleave",s[33]),B(e,"mouseup",s[34])],a=!0)},p(n,d){n[10]?o&&(o.d(1),o=null):o||(o=co(),o.c(),o.m(e,t))},d(n){n&&m(e),o&&o.d(),a=!1,lt(r)}}}function co(s){let e;return{c(){e=ee("WEB EDITION")},l(t){e=te(t,"WEB EDITION")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function ho(s){let e;return{c(){e=ee("STEAM VERSION")},l(t){e=te(t,"STEAM VERSION")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function Vu(s){let e,t,i,l=s[1]&&lo(s),a=s[5]&&!s[14]&&ro(s);return{c(){l&&l.c(),e=k(),a&&a.c(),t=De()},l(r){l&&l.l(r),e=I(r),a&&a.l(r),t=De()},m(r,o){l&&l.m(r,o),P(r,e,o),a&&a.m(r,o),P(r,t,o),i=!0},p(r,o){r[1]?l?(l.p(r,o),o[0]&2&&q(l,1)):(l=lo(r),l.c(),q(l,1),l.m(e.parentNode,e)):l&&(Fe(),ie(l,1,1,()=>{l=null}),Ge()),r[5]&&!r[14]?a?(a.p(r,o),o[0]&16416&&q(a,1)):(a=ro(r),a.c(),q(a,1),a.m(t.parentNode,t)):a&&(Fe(),ie(a,1,1,()=>{a=null}),Ge())},i(r){i||(q(l),q(a),i=!0)},o(r){ie(l),ie(a),i=!1},d(r){r&&(m(e),m(t)),l&&l.d(r),a&&a.d(r)}}}function Hu(s,e,t){let i,l,a;ke(s,Qi,K=>t(12,i=K)),ke(s,si,K=>t(13,l=K)),ke(s,bs,K=>t(14,a=K));let{showSettings:r=!1}=e,{showPrompt:o=!1}=e,{closeSettings:n=()=>{}}=e,{openSettings:d=()=>{}}=e,{onShowSplash:h=K=>{}}=e,{showBar:u=!0}=e,g,p=0;function v(K){t(18,p=K.target.scrollTop)}let w=0,y=pe.hasGamepadInput?2:st.useMouse?1:0,D=!1;const L=()=>{navigator.clipboard.writeText("```\n"+Di.get()+"\n```"),console.log("Copied log to clipboard - paste & send in discord!")};let T=qe.totalVisits>10,A=!1,E=!1;const x=()=>{t(10,A=tt.hasSeenItch),tt.hasSeenSteam,t(11,E=tt.hasSeenSteam2),tt.hasSeenDemo};ot(()=>(tt.addListener("any",x),()=>{tt.removeListener("any",x)}));const W=K=>{h(K)},X=()=>{t(7,w=0)},U=()=>{t(7,w=1)},J=()=>{t(7,w=2)},Z=()=>{t(7,w=3)},O=()=>{t(7,w=4)},j=()=>{t(8,y=0)},V=()=>{t(8,y=1)},z=()=>{t(8,y=2)};function M(K){St[K?"unshift":"push"](()=>{g=K,t(6,g),t(18,p)})}const N=()=>{pe.lockMouse(),Le.lockScroll("settings")},G=()=>{pe.unlockMouse(!1),Le.unlockScroll("settings")},se=()=>{t(0,o=!1),t(7,w=0)},oe=()=>{t(10,A=!1)},re=()=>{t(10,A=tt.hasSeenItch)},be=()=>{tt.set("hasSeenItch",!0)},we=()=>{tt.set("hasSeenSteam2",!0)},he=K=>{t(9,D=K)},Q=()=>{r?n():d()},le=()=>pe.lockMouse(),de=()=>pe.unlockMouse(!1);return s.$$set=K=>{"showSettings"in K&&t(1,r=K.showSettings),"showPrompt"in K&&t(0,o=K.showPrompt),"closeSettings"in K&&t(2,n=K.closeSettings),"openSettings"in K&&t(3,d=K.openSettings),"onShowSplash"in K&&t(4,h=K.onShowSplash),"showBar"in K&&t(5,u=K.showBar)},s.$$.update=()=>{s.$$.dirty[0]&262208&&g&&t(6,g.scrollTop=p,g),s.$$.dirty[0]&1&&o==!0&&t(7,w=1)},[o,r,n,d,h,u,g,w,y,D,A,E,i,l,a,v,L,T,p,W,X,U,J,Z,O,j,V,z,M,N,G,se,oe,re,be,we,he,Q,le,de]}class zu extends Xe{constructor(e){super(),Qe(this,e,Hu,Vu,Ke,{showSettings:1,showPrompt:0,closeSettings:2,openSettings:3,onShowSplash:4,showBar:5},null,[-1,-1])}}function fo(s,e,t){const i=s.slice();return i[18]=e[t][0],i[19]=e[t][1],i}function uo(s,e,t){const i=s.slice();return i[18]=e[t][0],i[19]=e[t][1],i}function vo(s){let e,t,i=s[18]+"",l,a,r=s[19]+"",o;return{c(){e=_("div"),t=_("div"),l=ee(i),a=_("div"),o=ee(r),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);t=b(d,"DIV",{class:!0});var h=C(t);l=te(h,i),h.forEach(m),a=b(d,"DIV",{class:!0});var u=C(a);o=te(u,r),u.forEach(m),d.forEach(m),this.h()},h(){f(t,"class","debug-label svelte-1yramsp"),f(a,"class","debug-val svelte-1yramsp"),f(e,"class","debug-row svelte-1yramsp")},m(n,d){P(n,e,d),c(e,t),c(t,l),c(e,a),c(a,o)},p(n,d){d&65536&&i!==(i=n[18]+"")&&_e(l,i),d&65536&&r!==(r=n[19]+"")&&_e(o,r)},d(n){n&&m(e)}}}function mo(s){let e,t,i=s[18]+"",l,a,r=(s[19].toFixed?s[19].toFixed(2):s[19])+"",o;return{c(){e=_("div"),t=_("div"),l=ee(i),a=_("div"),o=ee(r),this.h()},l(n){e=b(n,"DIV",{class:!0});var d=C(e);t=b(d,"DIV",{class:!0});var h=C(t);l=te(h,i),h.forEach(m),a=b(d,"DIV",{class:!0});var u=C(a);o=te(u,r),u.forEach(m),d.forEach(m),this.h()},h(){f(t,"class","debug-label svelte-1yramsp"),f(a,"class","debug-val svelte-1yramsp"),f(e,"class","debug-row svelte-1yramsp")},m(n,d){P(n,e,d),c(e,t),c(t,l),c(e,a),c(a,o)},p(n,d){d&131072&&i!==(i=n[18]+"")&&_e(l,i),d&131072&&r!==(r=(n[19].toFixed?n[19].toFixed(2):n[19])+"")&&_e(o,r)},d(n){n&&m(e)}}}function Fu(s){let e,t,i,l="hash",a,r,o,n,d,h="pos",u,g,p,v,w,y="tile",D,L,T,A,E,x="cell",W,X,U,J,Z="midline",O,j,V,z="vehicle index",M,N=s[4].i+"",G,se,oe,re,be="head",we,he=s[5].i+"",Q,le,de,K,ce="tail",$,ge=s[6].i+"",Ce,je,He,ct="performance",ze,ht,ut,Ot="view dist",Bt,ye,Be,Vt,Pt,ui="detail",Ht,li,wi,rt,_t,bt="sim speed",pt,zt,qt,yi,nt,it,dt="fps",Ze,Dt,vt,Lt,$t,ri="draw calls",ai,ft,ki,Wt,Xt,ue="triangles",mt,Ps,el,Vi,Hi,rr="geometries",ss,Ns,tl,zi,ar="queue",il,Fi,Gi,or="jobs",ls,xs,sl,ji,Bi,nr="priority jobs",rs,Rs,ll,qi,dr="scene",rl,Us,Wi,cr="vehicle",al,Os,Si,hr="Press F4 to hide this panel",as=Oe(Object.entries(s[16])),Nt=[];for(let Me=0;Me<as.length;Me+=1)Nt[Me]=vo(uo(s,as,Me));let os=Oe(Object.entries(s[17])),xt=[];for(let Me=0;Me<os.length;Me+=1)xt[Me]=mo(fo(s,os,Me));return{c(){e=_("div"),t=_("div"),i=_("div"),i.textContent=l,a=_("div"),r=ee(s[0]),o=k(),n=_("div"),d=_("div"),d.textContent=h,u=_("div"),g=ee(s[1]),p=k(),v=_("div"),w=_("div"),w.textContent=y,D=_("div"),L=ee(s[2]),T=k(),A=_("div"),E=_("div"),E.textContent=x,W=_("div"),X=ee(s[3]),U=k(),J=_("div"),J.textContent=Z,O=k(),j=_("div"),V=_("div"),V.textContent=z,M=_("div"),G=ee(N),se=k(),oe=_("div"),re=_("div"),re.textContent=be,we=_("div"),Q=ee(he),le=k(),de=_("div"),K=_("div"),K.textContent=ce,$=_("div"),Ce=ee(ge),je=k(),He=_("div"),He.textContent=ct,ze=k(),ht=_("div"),ut=_("div"),ut.textContent=Ot,Bt=_("div"),ye=ee(s[7]),Be=k(),Vt=_("div"),Pt=_("div"),Pt.textContent=ui,Ht=_("div"),li=ee(s[8]),wi=k(),rt=_("div"),_t=_("div"),_t.textContent=bt,pt=_("div"),zt=ee(s[9]),qt=ee("x"),yi=k(),nt=_("div"),it=_("div"),it.textContent=dt,Ze=_("div"),Dt=ee(s[10]),vt=k(),Lt=_("div"),$t=_("div"),$t.textContent=ri,ai=_("div"),ft=ee(s[11]),ki=k(),Wt=_("div"),Xt=_("div"),Xt.textContent=ue,mt=_("div"),Ps=ee(s[12]),el=k(),Vi=_("div"),Hi=_("div"),Hi.textContent=rr,ss=_("div"),Ns=ee(s[13]),tl=k(),zi=_("div"),zi.textContent=ar,il=k(),Fi=_("div"),Gi=_("div"),Gi.textContent=or,ls=_("div"),xs=ee(s[14]),sl=k(),ji=_("div"),Bi=_("div"),Bi.textContent=nr,rs=_("div"),Rs=ee(s[15]),ll=k(),qi=_("div"),qi.textContent=dr,rl=k();for(let Me=0;Me<Nt.length;Me+=1)Nt[Me].c();Us=k(),Wi=_("div"),Wi.textContent=cr,al=k();for(let Me=0;Me<xt.length;Me+=1)xt[Me].c();Os=k(),Si=_("div"),Si.textContent=hr,this.h()},l(Me){e=b(Me,"DIV",{class:!0});var ve=C(e);t=b(ve,"DIV",{class:!0});var Pe=C(t);i=b(Pe,"DIV",{class:!0,"data-svelte-h":!0}),Y(i)!=="svelte-1wk88r1"&&(i.textContent=l),a=b(Pe,"DIV",{class:!0});var Ii=C(a);r=te(Ii,s[0]),Ii.forEach(m),Pe.forEach(m),o=I(ve),n=b(ve,"DIV",{class:!0});var ol=C(n);d=b(ol,"DIV",{class:!0,"data-svelte-h":!0}),Y(d)!=="svelte-1g3ewex"&&(d.textContent=h),u=b(ol,"DIV",{class:!0});var fr=C(u);g=te(fr,s[1]),fr.forEach(m),ol.forEach(m),p=I(ve),v=b(ve,"DIV",{class:!0});var nl=C(v);w=b(nl,"DIV",{class:!0,"data-svelte-h":!0}),Y(w)!=="svelte-1jksrql"&&(w.textContent=y),D=b(nl,"DIV",{class:!0});var ur=C(D);L=te(ur,s[2]),ur.forEach(m),nl.forEach(m),T=I(ve),A=b(ve,"DIV",{class:!0});var dl=C(A);E=b(dl,"DIV",{class:!0,"data-svelte-h":!0}),Y(E)!=="svelte-l9fhq9"&&(E.textContent=x),W=b(dl,"DIV",{class:!0});var vr=C(W);X=te(vr,s[3]),vr.forEach(m),dl.forEach(m),U=I(ve),J=b(ve,"DIV",{class:!0,"data-svelte-h":!0}),Y(J)!=="svelte-1fe9op8"&&(J.textContent=Z),O=I(ve),j=b(ve,"DIV",{class:!0});var cl=C(j);V=b(cl,"DIV",{class:!0,"data-svelte-h":!0}),Y(V)!=="svelte-nhrrjr"&&(V.textContent=z),M=b(cl,"DIV",{class:!0});var mr=C(M);G=te(mr,N),mr.forEach(m),cl.forEach(m),se=I(ve),oe=b(ve,"DIV",{class:!0});var hl=C(oe);re=b(hl,"DIV",{class:!0,"data-svelte-h":!0}),Y(re)!=="svelte-19s95zn"&&(re.textContent=be),we=b(hl,"DIV",{class:!0});var gr=C(we);Q=te(gr,he),gr.forEach(m),hl.forEach(m),le=I(ve),de=b(ve,"DIV",{class:!0});var fl=C(de);K=b(fl,"DIV",{class:!0,"data-svelte-h":!0}),Y(K)!=="svelte-145fhfv"&&(K.textContent=ce),$=b(fl,"DIV",{class:!0});var pr=C($);Ce=te(pr,ge),pr.forEach(m),fl.forEach(m),je=I(ve),He=b(ve,"DIV",{class:!0,"data-svelte-h":!0}),Y(He)!=="svelte-m5yv1e"&&(He.textContent=ct),ze=I(ve),ht=b(ve,"DIV",{class:!0});var ul=C(ht);ut=b(ul,"DIV",{class:!0,"data-svelte-h":!0}),Y(ut)!=="svelte-pok5e0"&&(ut.textContent=Ot),Bt=b(ul,"DIV",{class:!0});var _r=C(Bt);ye=te(_r,s[7]),_r.forEach(m),ul.forEach(m),Be=I(ve),Vt=b(ve,"DIV",{class:!0});var vl=C(Vt);Pt=b(vl,"DIV",{class:!0,"data-svelte-h":!0}),Y(Pt)!=="svelte-1e1xn7y"&&(Pt.textContent=ui),Ht=b(vl,"DIV",{class:!0});var br=C(Ht);li=te(br,s[8]),br.forEach(m),vl.forEach(m),wi=I(ve),rt=b(ve,"DIV",{class:!0});var ml=C(rt);_t=b(ml,"DIV",{class:!0,"data-svelte-h":!0}),Y(_t)!=="svelte-zjyrxb"&&(_t.textContent=bt),pt=b(ml,"DIV",{class:!0});var gl=C(pt);zt=te(gl,s[9]),qt=te(gl,"x"),gl.forEach(m),ml.forEach(m),yi=I(ve),nt=b(ve,"DIV",{class:!0});var pl=C(nt);it=b(pl,"DIV",{class:!0,"data-svelte-h":!0}),Y(it)!=="svelte-1r6mdog"&&(it.textContent=dt),Ze=b(pl,"DIV",{class:!0});var wr=C(Ze);Dt=te(wr,s[10]),wr.forEach(m),pl.forEach(m),vt=I(ve),Lt=b(ve,"DIV",{class:!0});var _l=C(Lt);$t=b(_l,"DIV",{class:!0,"data-svelte-h":!0}),Y($t)!=="svelte-1a9hcos"&&($t.textContent=ri),ai=b(_l,"DIV",{class:!0});var yr=C(ai);ft=te(yr,s[11]),yr.forEach(m),_l.forEach(m),ki=I(ve),Wt=b(ve,"DIV",{class:!0});var bl=C(Wt);Xt=b(bl,"DIV",{class:!0,"data-svelte-h":!0}),Y(Xt)!=="svelte-1l1j0g6"&&(Xt.textContent=ue),mt=b(bl,"DIV",{class:!0});var Sr=C(mt);Ps=te(Sr,s[12]),Sr.forEach(m),bl.forEach(m),el=I(ve),Vi=b(ve,"DIV",{class:!0});var wl=C(Vi);Hi=b(wl,"DIV",{class:!0,"data-svelte-h":!0}),Y(Hi)!=="svelte-13w33n5"&&(Hi.textContent=rr),ss=b(wl,"DIV",{class:!0});var Dr=C(ss);Ns=te(Dr,s[13]),Dr.forEach(m),wl.forEach(m),tl=I(ve),zi=b(ve,"DIV",{class:!0,"data-svelte-h":!0}),Y(zi)!=="svelte-1gkc7zn"&&(zi.textContent=ar),il=I(ve),Fi=b(ve,"DIV",{class:!0});var yl=C(Fi);Gi=b(yl,"DIV",{class:!0,"data-svelte-h":!0}),Y(Gi)!=="svelte-veharl"&&(Gi.textContent=or),ls=b(yl,"DIV",{class:!0});var Lr=C(ls);xs=te(Lr,s[14]),Lr.forEach(m),yl.forEach(m),sl=I(ve),ji=b(ve,"DIV",{class:!0});var Sl=C(ji);Bi=b(Sl,"DIV",{class:!0,"data-svelte-h":!0}),Y(Bi)!=="svelte-1fnad0n"&&(Bi.textContent=nr),rs=b(Sl,"DIV",{class:!0});var Cr=C(rs);Rs=te(Cr,s[15]),Cr.forEach(m),Sl.forEach(m),ll=I(ve),qi=b(ve,"DIV",{class:!0,"data-svelte-h":!0}),Y(qi)!=="svelte-7gmbxc"&&(qi.textContent=dr),rl=I(ve);for(let Yi=0;Yi<Nt.length;Yi+=1)Nt[Yi].l(ve);Us=I(ve),Wi=b(ve,"DIV",{class:!0,"data-svelte-h":!0}),Y(Wi)!=="svelte-zzbumo"&&(Wi.textContent=cr),al=I(ve);for(let Yi=0;Yi<xt.length;Yi+=1)xt[Yi].l(ve);Os=I(ve),Si=b(ve,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(Si)!=="svelte-19369qr"&&(Si.textContent=hr),ve.forEach(m),this.h()},h(){f(i,"class","debug-label svelte-1yramsp"),f(a,"class","debug-val svelte-1yramsp"),f(t,"class","debug-row svelte-1yramsp"),f(d,"class","debug-label svelte-1yramsp"),f(u,"class","debug-val svelte-1yramsp"),f(n,"class","debug-row svelte-1yramsp"),f(w,"class","debug-label svelte-1yramsp"),f(D,"class","debug-val svelte-1yramsp"),f(v,"class","debug-row svelte-1yramsp"),f(E,"class","debug-label svelte-1yramsp"),f(W,"class","debug-val svelte-1yramsp"),f(A,"class","debug-row svelte-1yramsp"),f(J,"class","debug-section svelte-1yramsp"),f(V,"class","debug-label svelte-1yramsp"),f(M,"class","debug-val svelte-1yramsp"),f(j,"class","debug-row svelte-1yramsp"),f(re,"class","debug-label svelte-1yramsp"),f(we,"class","debug-val svelte-1yramsp"),f(oe,"class","debug-row svelte-1yramsp"),f(K,"class","debug-label svelte-1yramsp"),f($,"class","debug-val svelte-1yramsp"),f(de,"class","debug-row svelte-1yramsp"),f(He,"class","debug-section svelte-1yramsp"),f(ut,"class","debug-label svelte-1yramsp"),f(Bt,"class","debug-val svelte-1yramsp"),f(ht,"class","debug-row svelte-1yramsp"),f(Pt,"class","debug-label svelte-1yramsp"),f(Ht,"class","debug-val svelte-1yramsp"),f(Vt,"class","debug-row svelte-1yramsp"),f(_t,"class","debug-label svelte-1yramsp"),f(pt,"class","debug-val svelte-1yramsp"),f(rt,"class","debug-row svelte-1yramsp"),f(it,"class","debug-label svelte-1yramsp"),f(Ze,"class","debug-val svelte-1yramsp"),f(nt,"class","debug-row svelte-1yramsp"),f($t,"class","debug-label svelte-1yramsp"),f(ai,"class","debug-val svelte-1yramsp"),f(Lt,"class","debug-row svelte-1yramsp"),f(Xt,"class","debug-label svelte-1yramsp"),f(mt,"class","debug-val svelte-1yramsp"),f(Wt,"class","debug-row svelte-1yramsp"),f(Hi,"class","debug-label svelte-1yramsp"),f(ss,"class","debug-val svelte-1yramsp"),f(Vi,"class","debug-row svelte-1yramsp"),f(zi,"class","debug-section svelte-1yramsp"),f(Gi,"class","debug-label svelte-1yramsp"),f(ls,"class","debug-val svelte-1yramsp"),f(Fi,"class","debug-row svelte-1yramsp"),f(Bi,"class","debug-label svelte-1yramsp"),f(rs,"class","debug-val svelte-1yramsp"),f(ji,"class","debug-row svelte-1yramsp"),f(qi,"class","debug-section svelte-1yramsp"),f(Wi,"class","debug-section svelte-1yramsp"),f(Si,"class","debug-row debug-label svelte-1yramsp"),ae(Si,"font-style","italic"),ae(Si,"margin-top","1rem"),f(e,"class","debug-cont svelte-1yramsp")},m(Me,ve){P(Me,e,ve),c(e,t),c(t,i),c(t,a),c(a,r),c(e,o),c(e,n),c(n,d),c(n,u),c(u,g),c(e,p),c(e,v),c(v,w),c(v,D),c(D,L),c(e,T),c(e,A),c(A,E),c(A,W),c(W,X),c(e,U),c(e,J),c(e,O),c(e,j),c(j,V),c(j,M),c(M,G),c(e,se),c(e,oe),c(oe,re),c(oe,we),c(we,Q),c(e,le),c(e,de),c(de,K),c(de,$),c($,Ce),c(e,je),c(e,He),c(e,ze),c(e,ht),c(ht,ut),c(ht,Bt),c(Bt,ye),c(e,Be),c(e,Vt),c(Vt,Pt),c(Vt,Ht),c(Ht,li),c(e,wi),c(e,rt),c(rt,_t),c(rt,pt),c(pt,zt),c(pt,qt),c(e,yi),c(e,nt),c(nt,it),c(nt,Ze),c(Ze,Dt),c(e,vt),c(e,Lt),c(Lt,$t),c(Lt,ai),c(ai,ft),c(e,ki),c(e,Wt),c(Wt,Xt),c(Wt,mt),c(mt,Ps),c(e,el),c(e,Vi),c(Vi,Hi),c(Vi,ss),c(ss,Ns),c(e,tl),c(e,zi),c(e,il),c(e,Fi),c(Fi,Gi),c(Fi,ls),c(ls,xs),c(e,sl),c(e,ji),c(ji,Bi),c(ji,rs),c(rs,Rs),c(e,ll),c(e,qi),c(e,rl);for(let Pe=0;Pe<Nt.length;Pe+=1)Nt[Pe]&&Nt[Pe].m(e,null);c(e,Us),c(e,Wi),c(e,al);for(let Pe=0;Pe<xt.length;Pe+=1)xt[Pe]&&xt[Pe].m(e,null);c(e,Os),c(e,Si)},p(Me,[ve]){if(ve&1&&_e(r,Me[0]),ve&2&&_e(g,Me[1]),ve&4&&_e(L,Me[2]),ve&8&&_e(X,Me[3]),ve&16&&N!==(N=Me[4].i+"")&&_e(G,N),ve&32&&he!==(he=Me[5].i+"")&&_e(Q,he),ve&64&&ge!==(ge=Me[6].i+"")&&_e(Ce,ge),ve&128&&_e(ye,Me[7]),ve&256&&_e(li,Me[8]),ve&512&&_e(zt,Me[9]),ve&1024&&_e(Dt,Me[10]),ve&2048&&_e(ft,Me[11]),ve&4096&&_e(Ps,Me[12]),ve&8192&&_e(Ns,Me[13]),ve&16384&&_e(xs,Me[14]),ve&32768&&_e(Rs,Me[15]),ve&65536){as=Oe(Object.entries(Me[16]));let Pe;for(Pe=0;Pe<as.length;Pe+=1){const Ii=uo(Me,as,Pe);Nt[Pe]?Nt[Pe].p(Ii,ve):(Nt[Pe]=vo(Ii),Nt[Pe].c(),Nt[Pe].m(e,Us))}for(;Pe<Nt.length;Pe+=1)Nt[Pe].d(1);Nt.length=as.length}if(ve&131072){os=Oe(Object.entries(Me[17]));let Pe;for(Pe=0;Pe<os.length;Pe+=1){const Ii=fo(Me,os,Pe);xt[Pe]?xt[Pe].p(Ii,ve):(xt[Pe]=mo(Ii),xt[Pe].c(),xt[Pe].m(e,Os))}for(;Pe<xt.length;Pe+=1)xt[Pe].d(1);xt.length=os.length}},i:me,o:me,d(Me){Me&&m(e),yt(Nt,Me),yt(xt,Me)}}}function Gu(s,e,t){let i,l,a,r,o,n,d,h,u,g,p,v,w,y,D,L,T,A;return ke(s,on,E=>t(0,i=E)),ke(s,ln,E=>t(1,l=E)),ke(s,rn,E=>t(2,a=E)),ke(s,an,E=>t(3,r=E)),ke(s,Xl,E=>t(4,o=E)),ke(s,sn,E=>t(5,n=E)),ke(s,tn,E=>t(6,d=E)),ke(s,nn,E=>t(7,h=E)),ke(s,dn,E=>t(8,u=E)),ke(s,ad,E=>t(9,g=E)),ke(s,Kl,E=>t(10,p=E)),ke(s,Jo,E=>t(11,v=E)),ke(s,$o,E=>t(12,w=E)),ke(s,en,E=>t(13,y=E)),ke(s,Ql,E=>t(14,D=E)),ke(s,Tl,E=>t(15,L=E)),ke(s,od,E=>t(16,T=E)),ke(s,nd,E=>t(17,A=E)),[i,l,a,r,o,n,d,h,u,g,p,v,w,y,D,L,T,A]}class ju extends Xe{constructor(e){super(),Qe(this,e,Gu,Fu,Ke,{})}}function Bu(s){let e,t,i,l,a;return{c(){e=_("div"),t=Vs("svg"),i=Vs("g"),l=Vs("polyline"),a=Vs("circle"),this.h()},l(r){e=b(r,"DIV",{id:!0,style:!0,class:!0});var o=C(e);t=Hs(o,"svg",{viewBox:!0,width:!0,height:!0});var n=C(t);i=Hs(n,"g",{transform:!0});var d=C(i);l=Hs(d,"polyline",{style:!0,points:!0,transform:!0,stroke:!0,"stroke-width":!0,"stroke-linecap":!0,fill:!0}),C(l).forEach(m),a=Hs(d,"circle",{fill:!0,r:!0}),C(a).forEach(m),d.forEach(m),n.forEach(m),o.forEach(m),this.h()},h(){ae(l,"filter","drop-shadow( 0px 0px 6px var(--sr-white) )"),f(l,"points",""),f(l,"transform","translate(0 0)"),f(l,"stroke","var(--sr-white)"),f(l,"stroke-width",10),f(l,"stroke-linecap","round"),f(l,"fill","none"),f(a,"fill","var(--sr-primary)"),f(a,"r","2"),f(i,"transform","translate(80 96) scale(-0.5 -0.5)"),f(t,"viewBox","0 0 160 160"),f(t,"width","100%"),f(t,"height","100%"),f(e,"id","upcoming-container"),ae(e,"opacity",s[1]?"1":"0"),f(e,"class","svelte-1wl5x4o"),R(e,"upcoming-top",s[0]==1),R(e,"upcoming-bottom",s[0]==0)},m(r,o){P(r,e,o),c(e,t),c(t,i),c(i,l),s[5](l),c(i,a),s[6](a),s[7](t)},p(r,[o]){o&2&&ae(e,"opacity",r[1]?"1":"0"),o&1&&R(e,"upcoming-top",r[0]==1),o&1&&R(e,"upcoming-bottom",r[0]==0)},i:me,o:me,d(r){r&&m(e),s[5](null),s[6](null),s[7](null)}}}const El=16,ns=16;function qu(s,e,t){let{position:i=1}=e,l=!0,a,r,o,n;const d=1/ns;class h{constructor(D,L,T,A){F(this,"svg");F(this,"lineDOM");F(this,"underlineDOM");F(this,"points");F(this,"origin",{x:0,z:0});F(this,"seenIndex",0);F(this,"loadedNode",null);F(this,"baseA");F(this,"subNode",0);F(this,"angles",[]);F(this,"pos",{x:0,y:0});F(this,"ticking",!1);F(this,"onLoadProgressBound",this.onLoadProgress.bind(this));F(this,"lerp");F(this,"i");F(this,"l");F(this,"l1");F(this,"p");F(this,"pA");F(this,"tA");F(this,"transform");F(this,"progressCounter",0);F(this,"tickTimer",0);F(this,"onTickBound",this.tick.bind(this));this.svg=D,this.underlineDOM=L,this.lineDOM=T,this.points=this.lineDOM.points,this.circleDOM=A,this.loadedNode=Ee.vehicleNode,this.seenIndex=Ee.vehicleNode.i,this.baseA=Ee.vehicleNode.a,this.angles.push(this.baseA),this.pA=this.baseA,this.pos.x=this.loadedNode.p.x,this.pos.y=this.loadedNode.p.z,fi.addListener(this.onLoadProgressBound),this.onLoadProgress(fi.value)}onLoadProgress(D){D<1&&this.ticking?(Je.removeSlowListener(this.onTickBound),this.ticking=!1):this.ticking||(Je.addSlowListener(this.onTickBound),this.ticking=!0)}makePoint(D,L){let T=this.svg.createSVGPoint();return T.x=D,T.y=L,T}destroy(){Je.removeSlowListener(this.onTickBound),fi.removeListener(this.onLoadProgressBound)}tick(){if(this.lerp=Math.floor(Ud(H.position.x,H.position.z,Ee.vehicleNode)*ns),!(this.loadedNode.i==Ee.vehicleNode.i+El&&this.lerp<=this.subNode)){for(;this.loadedNode.i<Ee.vehicleNode.i+El;){for(this.i=this.subNode;this.i<ns;this.i++)this.l=this.i/ns,this.l1=1-this.l,this.p=this.makePoint(this.loadedNode.p.x*this.l1+this.loadedNode.next.p.x*this.l,this.loadedNode.p.z*this.l1+this.loadedNode.next.p.z*this.l),this.points.appendItem(this.p),this.baseA-=this.loadedNode.next.da*d,this.angles.push(this.baseA);this.loadedNode=this.loadedNode.next,this.progressCounter++,this.progressCounter>100&&Math.abs(this.loadedNode.a-this.baseA)<.1&&(this.baseA=this.loadedNode.a,this.progressCounter=0),this.subNode=0}for(this.i=this.subNode;this.i<this.lerp;this.i++)this.l=this.i/ns,this.l1=1-this.l,this.p=this.makePoint(this.loadedNode.p.x*this.l1+this.loadedNode.next.p.x*this.l,this.loadedNode.p.z*this.l1+this.loadedNode.next.p.z*this.l),this.points.appendItem(this.p),this.baseA-=this.loadedNode.next.da*d,this.angles.push(this.baseA);for(this.subNode=this.lerp;this.points.length>El*ns;)this.points.removeItem(0),this.angles.shift(),this.pos=this.points.getItem(0)}this.pA=this.pA*.95+this.angles[0]*.05,this.transform="rotate("+(90-this.pA*180/Math.PI)+")",this.transform+=" translate("+this.pos.x*-1+" "+this.pos.y*-1+")",this.lineDOM.setAttribute("transform",this.transform),this.circleDOM.setAttribute("cx",this.pos.x),this.circleDOM.setAttribute("cy",this.pos.y),this.circleDOM.setAttribute("transform",this.transform)}}function u(){t(1,l=ne.showUpcomingRoad==Ir.ALWAYS||ne.showUpcomingRoad==Ir.MANUAL&&!Gt.value)}let g=null;ot(()=>(g||(g=new h(a,r,o,n)),ne.addListener("showUpcomingRoad",u),Gt.addListener(u),()=>{g&&g.destroy(),ne.removeListener("showUpcomingRoad",u),Gt.addListener(u)}));function p(y){St[y?"unshift":"push"](()=>{o=y,t(3,o)})}function v(y){St[y?"unshift":"push"](()=>{n=y,t(4,n)})}function w(y){St[y?"unshift":"push"](()=>{a=y,t(2,a)})}return s.$$set=y=>{"position"in y&&t(0,i=y.position)},[i,l,a,o,n,p,v,w]}class Wu extends Xe{constructor(e){super(),Qe(this,e,qu,Bu,Ke,{position:0})}}function go(s){let e,t,i,l,a,r=s[1]==!1&&po(s),o=s[0]==Te.UTurn&&yo(),n=s[0]==Te.Onward&&So();return{c(){e=_("div"),r&&r.c(),t=k(),o&&o.c(),i=k(),n&&n.c(),this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);r&&r.l(h),t=I(h),o&&o.l(h),i=I(h),n&&n.l(h),h.forEach(m),this.h()},h(){f(e,"class","prompt-main svelte-1bwut3z")},m(d,h){P(d,e,h),r&&r.m(e,null),c(e,t),o&&o.m(e,null),c(e,i),n&&n.m(e,null),a=!0},p(d,h){d[1]==!1?r?r.p(d,h):(r=po(d),r.c(),r.m(e,t)):r&&(r.d(1),r=null),d[0]==Te.UTurn?o||(o=yo(),o.c(),o.m(e,i)):o&&(o.d(1),o=null),d[0]==Te.Onward?n||(n=So(),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i(d){a||(d&&Ci(()=>{a&&(l||(l=ii(e,Tt,{duration:500},!0)),l.run(1))}),a=!0)},o(d){d&&(l||(l=ii(e,Tt,{duration:500},!1)),l.run(0)),a=!1},d(d){d&&m(e),r&&r.d(),o&&o.d(),n&&n.d(),d&&l&&l.end()}}}function po(s){let e,t,i,l=s[0]==Te.Intro&&_o(s),a=s[0]==Te.Reset&&bo(),r=s[0]==Te.Boost&&wo();return{c(){l&&l.c(),e=k(),a&&a.c(),t=k(),r&&r.c(),i=De()},l(o){l&&l.l(o),e=I(o),a&&a.l(o),t=I(o),r&&r.l(o),i=De()},m(o,n){l&&l.m(o,n),P(o,e,n),a&&a.m(o,n),P(o,t,n),r&&r.m(o,n),P(o,i,n)},p(o,n){o[0]==Te.Intro?l||(l=_o(o),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null),o[0]==Te.Reset?a||(a=bo(),a.c(),a.m(t.parentNode,t)):a&&(a.d(1),a=null),o[0]==Te.Boost?r||(r=wo(),r.c(),r.m(i.parentNode,i)):r&&(r.d(1),r=null)},d(o){o&&(m(e),m(t),m(i)),l&&l.d(o),a&&a.d(o),r&&r.d(o)}}}function _o(s){let e,t,i='<div class="prompt-intro-key-group svelte-1bwut3z" style="margin-top: -5.5rem; margin-bottom: 0.2rem"><div class="prompt-indicator prompt-key svelte-1bwut3z">W</div></div> <div class="prompt-intro-key-group svelte-1bwut3z" style="gap: 0.2rem"><div class="prompt-indicator prompt-key svelte-1bwut3z">A</div> <div class="prompt-indicator prompt-key svelte-1bwut3z">S</div> <div class="prompt-indicator prompt-key svelte-1bwut3z">D</div></div> <div class="prompt-label svelte-1bwut3z">Drive</div>',l,a,r,o='<div class="prompt-intro-key-group svelte-1bwut3z"><div class="prompt-indicator prompt-key svelte-1bwut3z">Q</div> <div class="prompt-indicator prompt-key svelte-1bwut3z">E</div></div> <div class="prompt-label svelte-1bwut3z">Change scene</div>';function n(u,g){return Yu}let h=n()(s);return{c(){e=_("div"),t=_("div"),t.innerHTML=i,l=k(),h.c(),a=k(),r=_("div"),r.innerHTML=o,this.h()},l(u){e=b(u,"DIV",{class:!0});var g=C(e);t=b(g,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-1bhx1mg"&&(t.innerHTML=i),l=I(g),h.l(g),a=I(g),r=b(g,"DIV",{class:!0,"data-svelte-h":!0}),Y(r)!=="svelte-ipq03a"&&(r.innerHTML=o),g.forEach(m),this.h()},h(){f(t,"class","prompt-intro-group svelte-1bwut3z"),f(r,"class","prompt-intro-group svelte-1bwut3z"),f(e,"class","prompt-intro svelte-1bwut3z")},m(u,g){P(u,e,g),c(e,t),c(e,l),h.m(e,null),c(e,a),c(e,r)},d(u){u&&m(e),h.d()}}}function Yu(s){let e,t='<div class="prompt-indicator prompt-key svelte-1bwut3z">F</div> <div class="prompt-label svelte-1bwut3z">Autodrive</div>';return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-14wluom"&&(e.innerHTML=t),this.h()},h(){f(e,"class","prompt-intro-group svelte-1bwut3z")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function bo(s){let e,t="R",i,l,a="Return to the road";return{c(){e=_("div"),e.textContent=t,i=k(),l=_("div"),l.textContent=a,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-10ltmgr"&&(e.textContent=t),i=I(r),l=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-191j6e8"&&(l.textContent=a),this.h()},h(){f(e,"class","prompt-indicator prompt-key svelte-1bwut3z"),f(l,"class","prompt-label svelte-1bwut3z")},m(r,o){P(r,e,o),P(r,i,o),P(r,l,o)},d(r){r&&(m(e),m(i),m(l))}}}function wo(s){let e,t="Shift",i,l,a="Hold to boost";return{c(){e=_("div"),e.textContent=t,i=k(),l=_("div"),l.textContent=a,this.h()},l(r){e=b(r,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1io7xvc"&&(e.textContent=t),i=I(r),l=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-x75hd1"&&(l.textContent=a),this.h()},h(){f(e,"class","prompt-indicator prompt-key svelte-1bwut3z"),ae(e,"max-width","100%"),f(l,"class","prompt-label svelte-1bwut3z")},m(r,o){P(r,e,o),P(r,i,o),P(r,l,o)},d(r){r&&(m(e),m(i),m(l))}}}function yo(s){let e,t='<img class="prompt-icon-img svelte-1bwut3z" alt="" src="/img/ico_uturn.svg"/>',i,l,a="Turn back";return{c(){e=_("div"),e.innerHTML=t,i=k(),l=_("div"),l.textContent=a,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1d3i2xq"&&(e.innerHTML=t),i=I(r),l=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-138exdi"&&(l.textContent=a),this.h()},h(){f(e,"class","prompt-indicator prompt-icon svelte-1bwut3z"),f(l,"class","prompt-label svelte-1bwut3z")},m(r,o){P(r,e,o),P(r,i,o),P(r,l,o)},d(r){r&&(m(e),m(i),m(l))}}}function So(s){let e,t='<img class="prompt-icon-img svelte-1bwut3z" alt="" src="/img/ico_onwards.svg"/>',i,l,a="Ever onward";return{c(){e=_("div"),e.innerHTML=t,i=k(),l=_("div"),l.textContent=a,this.h()},l(r){e=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1jx2teq"&&(e.innerHTML=t),i=I(r),l=b(r,"DIV",{class:!0,"data-svelte-h":!0}),Y(l)!=="svelte-miq92b"&&(l.textContent=a),this.h()},h(){f(e,"class","prompt-indicator prompt-icon svelte-1bwut3z"),f(l,"class","prompt-label svelte-1bwut3z")},m(r,o){P(r,e,o),P(r,i,o),P(r,l,o)},d(r){r&&(m(e),m(i),m(l))}}}function Ku(s){let e,t=s[0]>Te.None&&go(s);return{c(){t&&t.c(),e=De()},l(i){t&&t.l(i),e=De()},m(i,l){t&&t.m(i,l),P(i,e,l)},p(i,[l]){i[0]>Te.None?t?(t.p(i,l),l&1&&q(t,1)):(t=go(i),t.c(),q(t,1),t.m(e.parentNode,e)):t&&(Fe(),ie(t,1,1,()=>{t=null}),Ge())},i(i){q(t)},o(i){ie(t)},d(i){i&&m(e),t&&t.d(i)}}}function Xu(s,e,t){let i;ke(s,si,a=>t(1,i=a));let l=Te.None;return ot(()=>{function a(r){t(0,l=r)}return $e.addListener(a),()=>{$e.removeListener(a)}}),[l,i]}class Qu extends Xe{constructor(e){super(),Qe(this,e,Xu,Ku,Ke,{})}}function Zu(s){let e,t=`<br class="svelte-nq8k2y"/>
                        The live event has now ended and leaderboards are disabled.<br class="svelte-nq8k2y"/><br class="svelte-nq8k2y"/>
                        Join the Discord server to be notified of the next one!`;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1r85705"&&(e.innerHTML=t),this.h()},h(){f(e,"class","splash-minititle svelte-nq8k2y")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function Do(s){let e,t,i;return{c(){e=_("div"),t=k(),i=_("div"),this.h()},l(l){e=b(l,"DIV",{id:!0,class:!0}),C(e).forEach(m),t=I(l),i=b(l,"DIV",{id:!0,class:!0}),C(i).forEach(m),this.h()},h(){f(e,"id","splash-bg-overlay"),f(e,"class","svelte-nq8k2y"),f(i,"id","splash-bg"),f(i,"class","svelte-nq8k2y")},m(l,a){P(l,e,a),P(l,t,a),P(l,i,a)},d(l){l&&(m(e),m(t),m(i))}}}function Ju(s){let e,t,i,l,a,r,o,n,d,h,u="Driftmas 2025",g,p,v,w=s[6]?"continue":"begin",y,D,L,T,A,E,x,W,X,U,J="CC BY-NC-ND 4.0 International License",Z,O,j='from <a class="splash-smallprint-link svelte-nq8k2y" href="https://topograph.io" target="_blank" rel="noopener noreferrer">topograph.io</a> © 2025',V,z,M=`<a target="_blank" rel="noopener noreferrer" href="https://discord.gg/TNf9bBrZmR" alt="" class="splash-main-button svelte-nq8k2y"><img src="/img/icon_discord_white.svg" alt="" class="splash-main-button-icon svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                    Join the Discord</a> <a href="#about" class="splash-main-button svelte-nq8k2y" style="padding-top: 2rem;"><span style="font-size: 1.5rem" class="svelte-nq8k2y">Rules &amp; Prizes</span> <br class="svelte-nq8k2y"/> <span style="font-size: 2rem" class="svelte-nq8k2y">▾</span></a> <a target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/3431300/Slow_Roads/" alt="" class="splash-main-button svelte-nq8k2y"><img src="/img/icon_steam_white.svg" alt="" class="splash-main-button-icon svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                    Wishlist on Steam</a>`,N,G,se=`<div class="splash-body-section svelte-nq8k2y" style="background: var(--sr-black);"><div class="splash-body-wrapper svelte-nq8k2y" style="margin: 5rem 0"><div class="splash-blurb-corner-tl svelte-nq8k2y"></div> <div class="splash-blurb-corner-tr svelte-nq8k2y"></div> <div class="splash-blurb svelte-nq8k2y"><strong class="svelte-nq8k2y">Driftmas</strong> is the annual Slow Roads winter rally event. Compete to set the fastest time on the extra-slippery 5km track for a chance to win prizes and immortalisation in the game!</div> <div class="splash-blurb-corner-bl svelte-nq8k2y"></div> <div class="splash-blurb-corner-br svelte-nq8k2y"></div></div></div> <div class="splash-body-section svelte-nq8k2y" style="background: var(--sr-black-50)"><div class="splash-body-wrapper svelte-nq8k2y"><div class="splash-body-header svelte-nq8k2y">The event is now over!</div> <div class="splash-body-text svelte-nq8k2y">Congratulations to the winners! This year&#39;s event was by far the biggest, with <strong class="svelte-nq8k2y">over 3,800</strong> taking part, completing <strong class="svelte-nq8k2y">over 8,500</strong> runs, and making <strong class="svelte-nq8k2y">over 75,000</strong> attempts. Thanks to all for taking part!
                        <br class="svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                        The server will remain active for the rest of January, at which point this page will be retired to an offline version.
                        <br class="svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                        More community events are planned for the future - make sure you join the Discord server to be notified and take part!
                        <br class="svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                        You can try the previous events here:
                        <br class="svelte-nq8k2y"/> <br class="svelte-nq8k2y"/>
                         - <a class="splash-body-link svelte-nq8k2y" href="https://driftmas24.slowroads.io">Driftmas 2024</a><br class="svelte-nq8k2y"/>
                         - <a class="splash-body-link svelte-nq8k2y" href="https://driftmas23.slowroads.io">Driftmas 2023</a><br class="svelte-nq8k2y"/>
                         - <a class="splash-body-link svelte-nq8k2y" href="https://driftmas22.slowroads.io">Driftmas 2022</a><br class="svelte-nq8k2y"/></div></div></div> <div class="splash-body-section svelte-nq8k2y" style="background: var(--sr-black)"><div class="splash-body-wrapper svelte-nq8k2y" style="text-align: center; font-size: 1.1rem;"><div class="splash-body-header svelte-nq8k2y">Champions</div> <div class="splash-two-cols svelte-nq8k2y"><div class="splash-col svelte-nq8k2y"><div class="splash-body-text lb-header svelte-nq8k2y">GAMEPAD</div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #f5d442">- 1st Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">NIIOH</span><br class="svelte-nq8k2y"/>03:23:946</span></div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #cdd1d4">- 2nd Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">meehdrescherstudios</span><br class="svelte-nq8k2y"/>03:25:640</span></div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #e37c2d">- 3rd Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">mattsg</span><br class="svelte-nq8k2y"/>03:27:633</span></div></div> <div class="splash-col svelte-nq8k2y"><div class="splash-body-text lb-header svelte-nq8k2y">KEYBOARD + MOUSE</div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #f5d442">- 1st Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">drift__</span><br class="svelte-nq8k2y"/>03:25:274</span></div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #cdd1d4">- 2nd Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">AccountableMenace</span><br class="svelte-nq8k2y"/>03:27:321</span></div> <div class="splash-body-text svelte-nq8k2y"><div class="splash-prize svelte-nq8k2y" style="color: #e37c2d">- 3rd Place -</div> <span class="lb-time svelte-nq8k2y"><span class="lb-name svelte-nq8k2y">Ena</span><br class="svelte-nq8k2y"/>03:28:909</span></div></div></div> <br class="svelte-nq8k2y"/> <div class="splash-body-text svelte-nq8k2y" style="font-style: italic; font-size: 0.9rem;">Champions receive Discord Nitro and the top 20 receive keys for the Steam release of Slow Roads!</div></div></div> <div class="splash-body-section svelte-nq8k2y" style="background: var(--sr-black-50)"><div class="splash-body-wrapper svelte-nq8k2y"><div class="splash-body-header svelte-nq8k2y">Tips &amp; Tricks</div> <div class="splash-body-bullets svelte-nq8k2y"><div class="splash-body-bullet svelte-nq8k2y">Deep snow will drag your wheels - try to stay central in the road and avoid berms</div> <div class="splash-body-bullet svelte-nq8k2y">Try to drive slowly and steadily to minimise crashes</div> <div class="splash-body-bullet svelte-nq8k2y">Avoid braking while turning - brake early and accelerate through the corner</div> <div class="splash-body-bullet svelte-nq8k2y">Tap the handbrake to kick the rear out into a turn</div> <div class="splash-body-bullet svelte-nq8k2y">Combine the handbrake with regular braking to slow more quickly</div> <div class="splash-body-bullet svelte-nq8k2y">Braking early and steering around a corner is usually faster than skidding</div> <div class="splash-body-bullet svelte-nq8k2y">Don&#39;t forget you can tweak control settings to your liking</div> <div class="splash-body-bullet svelte-nq8k2y">Don&#39;t forget there is a boost button</div> <div class="splash-body-bullet svelte-nq8k2y">If you make a mistake, complete the run anyway; the best practice is through repetition of the whole route</div> <div class="splash-body-bullet svelte-nq8k2y">If you keep crashing, focus on completing entire runs slowly and carefully before gradually increasing speed</div> <div class="splash-body-bullet svelte-nq8k2y">Different camera angles or settings may feel easier to control - try a few alternatives</div> <div class="splash-body-bullet svelte-nq8k2y">Different weathers do not have different physics conditions but can affect visibility - see which you prefer (use Q and E to switch)</div> <div class="splash-body-bullet svelte-nq8k2y">Bored of the normal route? Add #samtfird to the end of the URL and refresh the page for an inverted route. You can also try #nosnow or #allsnow.</div></div></div></div>`,oe,re,be,we,he=Zu(),Q=!s[6]&&Do();return{c(){e=_("div"),t=_("div"),i=_("div"),l=_("canvas"),a=k(),r=_("div"),o=_("img"),d=k(),h=_("div"),h.textContent=u,g=k(),p=k(),v=_("div"),y=ee(w),D=k(),he&&he.c(),L=k(),T=_("div"),A=_("span"),E=ee(Jt),x=k(),W=_("br"),X=ee(`\r
                This work is licensed under a `),U=_("a"),U.textContent=J,Z=k(),O=_("div"),O.innerHTML=j,V=k(),z=_("div"),z.innerHTML=M,N=k(),G=_("div"),G.innerHTML=se,oe=k(),Q&&Q.c(),this.h()},l(le){e=b(le,"DIV",{id:!0,class:!0});var de=C(e);t=b(de,"DIV",{id:!0,class:!0});var K=C(t);i=b(K,"DIV",{id:!0,class:!0});var ce=C(i);l=b(ce,"CANVAS",{id:!0,class:!0}),C(l).forEach(m),a=I(ce),r=b(ce,"DIV",{id:!0,class:!0});var $=C(r);o=b($,"IMG",{class:!0,src:!0,alt:!0}),d=I($),h=b($,"DIV",{class:!0,"data-svelte-h":!0}),Y(h)!=="svelte-fudtz6"&&(h.textContent=u),g=I($),p=I($),v=b($,"DIV",{id:!0,class:!0});var ge=C(v);y=te(ge,w),ge.forEach(m),D=I($),he&&he.l($),$.forEach(m),L=I(ce),T=b(ce,"DIV",{class:!0});var Ce=C(T);A=b(Ce,"SPAN",{class:!0});var je=C(A);E=te(je,Jt),je.forEach(m),x=I(Ce),W=b(Ce,"BR",{class:!0}),X=te(Ce,`\r
                This work is licensed under a `),U=b(Ce,"A",{rel:!0,class:!0,href:!0,target:!0,"data-svelte-h":!0}),Y(U)!=="svelte-u8p6bq"&&(U.textContent=J),Ce.forEach(m),Z=I(ce),O=b(ce,"DIV",{class:!0,"data-svelte-h":!0}),Y(O)!=="svelte-1078k7q"&&(O.innerHTML=j),V=I(ce),z=b(ce,"DIV",{class:!0,"data-svelte-h":!0}),Y(z)!=="svelte-k9wub"&&(z.innerHTML=M),ce.forEach(m),N=I(K),G=b(K,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),Y(G)!=="svelte-1cn4vpt"&&(G.innerHTML=se),oe=I(K),Q&&Q.l(K),K.forEach(m),de.forEach(m),this.h()},h(){f(l,"id","splash-canvas"),f(l,"class","svelte-nq8k2y"),f(o,"class","splash-logo svelte-nq8k2y"),Ut(o.src,n="/img/logo-stacked-white.svg")||f(o,"src",n),f(o,"alt",""),f(h,"class","splash-subtitle svelte-nq8k2y"),f(v,"id","splash-begin"),f(v,"class","svelte-nq8k2y"),R(v,"dm-disabled",!s[4]),f(r,"id","splash-title"),f(r,"class","svelte-nq8k2y"),f(A,"class","splash-smallprint-link svelte-nq8k2y"),f(W,"class","svelte-nq8k2y"),f(U,"rel","license noopener noreferrer"),f(U,"class","splash-smallprint-link svelte-nq8k2y"),f(U,"href","http://creativecommons.org/licenses/by-nc-nd/4.0/"),f(U,"target","_blank"),f(T,"class","splash-smallprint splash-lr svelte-nq8k2y"),f(O,"class","splash-smallprint splash-ll svelte-nq8k2y"),f(z,"class","splash-main-buttons svelte-nq8k2y"),f(i,"id","splash-main"),f(i,"class","svelte-nq8k2y"),f(G,"id","about"),f(G,"class","svelte-nq8k2y"),f(t,"id",re=s[5]?"splash-dynamic":"splash-fixed"),f(t,"class","svelte-nq8k2y"),f(e,"id","splash"),f(e,"class","svelte-nq8k2y")},m(le,de){P(le,e,de),c(e,t),c(t,i),c(i,l),s[7](l),c(i,a),c(i,r),c(r,o),c(r,d),c(r,h),c(r,g),c(r,p),c(r,v),c(v,y),s[9](v),c(r,D),he&&he.m(r,null),c(i,L),c(i,T),c(T,A),c(A,E),c(T,x),c(T,W),c(T,X),c(T,U),c(i,Z),c(i,O),c(i,V),c(i,z),c(t,N),c(t,G),c(t,oe),Q&&Q.m(t,null),be||(we=[B(v,"touchstart",s[10],{passive:!0}),B(v,"click",s[11])],be=!0)},p(le,[de]){de&64&&w!==(w=le[6]?"continue":"begin")&&_e(y,w),de&16&&R(v,"dm-disabled",!le[4]),le[6]?Q&&(Q.d(1),Q=null):Q||(Q=Do(),Q.c(),Q.m(t,null)),de&32&&re!==(re=le[5]?"splash-dynamic":"splash-fixed")&&f(t,"id",re)},i:me,o:me,d(le){le&&m(e),s[7](null),s[9](null),he&&he.d(),Q&&Q.d(),be=!1,lt(we)}}}function $u(s,e,t){let i,l;ke(s,si,D=>t(5,i=D)),ke(s,Ts,D=>t(6,l=D));let{toggleSplash:a=()=>{}}=e,r,o="Player",n,d=!0;function h(D){D.code=="Enter"&&r.click()}let u;ot(()=>{window.addEventListener("keydown",h),t(3,n.width=window.innerWidth,n),t(3,n.height=window.innerHeight,n);let D=window.innerWidth,L=window.innerHeight;u=n.getContext("2d"),u.globalAlpha=.8,u.globalCompositeOperation="lighter",u.fillStyle="white";const T=()=>{t(3,n.width=window.innerWidth,n),t(3,n.height=window.innerHeight,n),D=window.innerWidth,L=window.innerHeight};window.addEventListener("resize",T);let A=[],E=.5,x=.04+E*.06,W=.1+E*.3;for(let Z=0;Z<20+E*230;Z++)A.push({x:Math.random()*D,y:Math.random()*L,s:.5+Math.random()*4,t:Math.random()*Math.PI});let X=Date.now(),U;const J=()=>{if(!n)return;U=requestAnimationFrame(()=>J());let Z=Date.now()-X;X=Date.now(),u.clearRect(0,0,n.width,n.height);for(let O of A)O.y+=Z*O.s*x,O.x+=Z*O.s*Math.sin(O.t*O.s)*(W/10)+Z*W,O.t+=Z*.001,O.y>n.height&&(O.y-=n.height),O.x>n.width&&(O.x-=n.width),u.fillStyle="#fffb",u.beginPath(),u.arc(O.x,O.y,O.s,0,Math.PI*2),u.fill()};return J(),()=>{window.removeEventListener("keydown",h),cancelAnimationFrame(U),window.removeEventListener("resize",T)}});function g(D){St[D?"unshift":"push"](()=>{n=D,t(3,n)})}function p(){o=this.value,t(1,o)}function v(D){St[D?"unshift":"push"](()=>{r=D,t(2,r)})}const w=()=>{ne.set("touchscreen",!0)},y=()=>{d&&a()};return s.$$set=D=>{"toggleSplash"in D&&t(0,a=D.toggleSplash)},s.$$.update=()=>{s.$$.dirty&2&&(t(4,d=(o==null?void 0:o.length)>1),Od.set("username",o),localStorage.setItem("username",o))},[a,o,r,n,d,i,l,g,p,v,w,y]}class ev extends Xe{constructor(e){super(),Qe(this,e,$u,Ju,Ke,{toggleSplash:0})}}function Lo(s,e,t){const i=s.slice();return i[13]=e[t],i}function Co(s){let e,t="Progress is saved automatically";return{c(){e=_("span"),e.textContent=t,this.h()},l(i){e=b(i,"SPAN",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-f6s17h"&&(e.textContent=t),this.h()},h(){f(e,"class","splash-quit-msg svelte-bt03iy")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function ko(s){let e,t="Failed to initialise - please ensure your system supports WebGL2";return{c(){e=_("div"),e.textContent=t,this.h()},l(i){e=b(i,"DIV",{id:!0,class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-jv3955"&&(e.textContent=t),this.h()},h(){f(e,"id","splash-error"),f(e,"class","svelte-bt03iy")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function tv(s){let e,t,i,l,a,r,o,n,d,h,u="See full details",g,p,v=Oe(s[3]),w=[];for(let y=0;y<v.length;y+=1)w[y]=Io(Lo(s,v,y));return{c(){e=_("div"),t=ee("New version - "),i=ee(Jt),l=k(),a=_("hr"),r=k();for(let y=0;y<w.length;y+=1)w[y].c();o=k(),n=_("hr"),d=k(),h=_("div"),h.textContent=u,this.h()},l(y){e=b(y,"DIV",{class:!0});var D=C(e);t=te(D,"New version - "),i=te(D,Jt),l=I(D),a=b(D,"HR",{class:!0}),r=I(D);for(let L=0;L<w.length;L+=1)w[L].l(D);o=I(D),n=b(D,"HR",{class:!0}),d=I(D),h=b(D,"DIV",{class:!0,"data-svelte-h":!0}),Y(h)!=="svelte-5v1n0f"&&(h.textContent=u),D.forEach(m),this.h()},h(){f(a,"class","svelte-bt03iy"),f(n,"class","svelte-bt03iy"),f(h,"class","splash-version-see-more svelte-bt03iy"),f(e,"class","splash-new-version svelte-bt03iy")},m(y,D){P(y,e,D),c(e,t),c(e,i),c(e,l),c(e,a),c(e,r);for(let L=0;L<w.length;L+=1)w[L]&&w[L].m(e,null);c(e,o),c(e,n),c(e,d),c(e,h),g||(p=B(h,"click",s[8]),g=!0)},p(y,D){if(D&8){v=Oe(y[3]);let L;for(L=0;L<v.length;L+=1){const T=Lo(y,v,L);w[L]?w[L].p(T,D):(w[L]=Io(T),w[L].c(),w[L].m(e,o))}for(;L<w.length;L+=1)w[L].d(1);w.length=v.length}},d(y){y&&m(e),yt(w,y),g=!1,p()}}}function Io(s){let e,t=s[13]+"",i;return{c(){e=_("div"),i=ee(t),this.h()},l(l){e=b(l,"DIV",{class:!0});var a=C(e);i=te(a,t),a.forEach(m),this.h()},h(){f(e,"class","splash-version-change svelte-bt03iy")},m(l,a){P(l,e,a),c(e,i)},p(l,a){a&8&&t!==(t=l[13]+"")&&_e(i,t)},d(l){l&&m(e)}}}function iv(s){let e,t;return e=new Pn({props:{showChangelog:s[2],onShowChangelog:s[9]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l&4&&(a.showChangelog=i[2]),l&4&&(a.onShowChangelog=i[9]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function sv(s){let e,t,i=`<img src="/img/icon_discord.svg" alt="" class="splash-main-button-icon svelte-bt03iy"/> <br/>
                    Join the Discord`,l,a,r=`<img src="/img/icon_steam.svg" alt="" class="splash-main-button-icon svelte-bt03iy"/> <br/>
                    Wishlist the Steam edition`,o,n;return{c(){e=_("div"),t=_("div"),t.innerHTML=i,l=k(),a=_("div"),a.innerHTML=r,this.h()},l(d){e=b(d,"DIV",{class:!0});var h=C(e);t=b(h,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-x64jut"&&(t.innerHTML=i),l=I(h),a=b(h,"DIV",{class:!0,"data-svelte-h":!0}),Y(a)!=="svelte-3mnzb7"&&(a.innerHTML=r),h.forEach(m),this.h()},h(){f(t,"class","splash-main-button svelte-bt03iy"),f(a,"class","splash-main-button svelte-bt03iy"),f(e,"class","splash-main-buttons svelte-bt03iy")},m(d,h){P(d,e,h),c(e,t),c(e,l),c(e,a),o||(n=[B(t,"click",s[10]),B(a,"click",s[11])],o=!0)},p:me,d(d){d&&m(e),o=!1,lt(n)}}}function Mo(s){let e,t,i;return{c(){e=_("div"),t=k(),i=_("div"),this.h()},l(l){e=b(l,"DIV",{id:!0,class:!0}),C(e).forEach(m),t=I(l),i=b(l,"DIV",{id:!0,class:!0}),C(i).forEach(m),this.h()},h(){f(e,"id","splash-bg-overlay"),f(e,"class","svelte-bt03iy"),f(i,"id","splash-bg"),f(i,"class","svelte-bt03iy")},m(l,a){P(l,e,a),P(l,t,a),P(l,i,a)},d(l){l&&(m(e),m(t),m(i))}}}function lv(s){let e,t,i,l,a,r,o,n,d="web edition",h,u,g,p=s[4]?"continue":"begin",v,w,y,D="quit",L,T,A,E,x,W,X,U,J,Z,O,j=`from <strong>topograph.io</strong> © 2026 	
                <span style="margin: 0 0.5rem;">·</span>
                All rights reserved`,V,z,M,N,G,se=s[4]&&Co(),oe=s[1]&&ko(),re=!ti&&Ri&&tv(s),be=!ti&&iv(s),we=!ti&&sv(s),he=!s[4]&&Mo();return{c(){e=_("div"),t=_("div"),i=_("div"),l=_("div"),a=_("img"),o=k(),n=_("div"),n.textContent=d,h=k(),u=_("div"),g=_("div"),v=ee(p),w=k(),y=_("div"),y.textContent=D,L=k(),se&&se.c(),T=k(),oe&&oe.c(),A=k(),E=_("div"),x=_("span"),W=ee("Version "),X=ee(Jt),U=k(),re&&re.c(),J=k(),be&&be.c(),Z=k(),O=_("div"),O.innerHTML=j,V=k(),we&&we.c(),z=k(),he&&he.c(),this.h()},l(Q){e=b(Q,"DIV",{id:!0,class:!0});var le=C(e);t=b(le,"DIV",{id:!0,class:!0});var de=C(t);i=b(de,"DIV",{id:!0,class:!0});var K=C(i);l=b(K,"DIV",{id:!0,class:!0});var ce=C(l);a=b(ce,"IMG",{class:!0,src:!0,alt:!0}),o=I(ce),n=b(ce,"DIV",{class:!0,"data-svelte-h":!0}),Y(n)!=="svelte-szn3l"&&(n.textContent=d),h=I(ce),u=b(ce,"DIV",{class:!0});var $=C(u);g=b($,"DIV",{class:!0});var ge=C(g);v=te(ge,p),ge.forEach(m),w=I($),y=b($,"DIV",{class:!0,"data-svelte-h":!0}),Y(y)!=="svelte-1i9wxa8"&&(y.textContent=D),L=I($),se&&se.l($),T=I($),oe&&oe.l($),$.forEach(m),ce.forEach(m),A=I(K),E=b(K,"DIV",{class:!0});var Ce=C(E);x=b(Ce,"SPAN",{class:!0,tabindex:!0});var je=C(x);W=te(je,"Version "),X=te(je,Jt),je.forEach(m),Ce.forEach(m),U=I(K),re&&re.l(K),J=I(K),be&&be.l(K),Z=I(K),O=b(K,"DIV",{class:!0,"data-svelte-h":!0}),Y(O)!=="svelte-1p526yl"&&(O.innerHTML=j),V=I(K),we&&we.l(K),K.forEach(m),z=I(de),he&&he.l(de),de.forEach(m),le.forEach(m),this.h()},h(){f(a,"class","splash-logo svelte-bt03iy"),Ut(a.src,r="/img/logo-stacked.svg")||f(a,"src",r),f(a,"alt",""),f(n,"class","splash-subtitle svelte-bt03iy"),f(g,"class","splash-btn svelte-bt03iy"),f(y,"class","splash-btn splash-btn-outline svelte-bt03iy"),f(u,"class","splash-btns svelte-bt03iy"),f(l,"id","splash-title"),f(l,"class","svelte-bt03iy"),f(x,"class","splash-smallprint-link svelte-bt03iy"),f(x,"tabindex",-1),f(E,"class","splash-smallprint splash-lr svelte-bt03iy"),f(O,"class","splash-smallprint splash-ll svelte-bt03iy"),f(i,"id","splash-main"),f(i,"class","svelte-bt03iy"),f(t,"id","splash-fixed"),f(t,"class","svelte-bt03iy"),f(e,"id","splash"),f(e,"class","svelte-bt03iy")},m(Q,le){P(Q,e,le),c(e,t),c(t,i),c(i,l),c(l,a),c(l,o),c(l,n),c(l,h),c(l,u),c(u,g),c(g,v),c(u,w),c(u,y),c(u,L),se&&se.m(u,null),c(u,T),oe&&oe.m(u,null),c(i,A),c(i,E),c(E,x),c(x,W),c(x,X),c(i,U),re&&re.m(i,null),c(i,J),be&&be.m(i,null),c(i,Z),c(i,O),c(i,V),we&&we.m(i,null),c(t,z),he&&he.m(t,null),M=!0,N||(G=[B(g,"click",function(){zl(s[0])&&s[0].apply(this,arguments)}),B(y,"click",s[5]),B(x,"click",s[7])],N=!0)},p(Q,[le]){s=Q,(!M||le&16)&&p!==(p=s[4]?"continue":"begin")&&_e(v,p),s[4]?se||(se=Co(),se.c(),se.m(u,T)):se&&(se.d(1),se=null),s[1]?oe||(oe=ko(),oe.c(),oe.m(u,null)):oe&&(oe.d(1),oe=null),!ti&&Ri&&re.p(s,le),ti||be.p(s,le),ti||we.p(s,le),s[4]?he&&(he.d(1),he=null):he||(he=Mo(),he.c(),he.m(t,null))},i(Q){M||(q(be),M=!0)},o(Q){ie(be),M=!1},d(Q){Q&&m(e),se&&se.d(),oe&&oe.d(),re&&re.d(),be&&be.d(),we&&we.d(),he&&he.d(),N=!1,lt(G)}}}function rv(s,e,t){let i;ke(s,Ts,y=>t(4,i=y));let{toggleSplash:l=()=>{}}=e,{webglError:a=!1}=e;const r=()=>{window.api?(console.log("Quitting"),window.api.quit()):console.log("No API to quit! Please press Ctrl+W to exit")};let o=!1,n=[],d=Ri&&Xs[2]==Jt[2];for(let y of $l)if(pn(y.version,Xs)>0)y.quickChanges&&(Jt[4]==0||d)&&n.push(...y.quickChanges);else break;n.length>12&&(n=n.slice(0,12)),ot(()=>{const y=D=>{D.code=="Enter"&&l()};return window.addEventListener("keydown",y),()=>{window.removeEventListener("keydown",y)}});const h=y=>{window.api&&window.api.openExternal(y)},u=()=>t(2,o=!o),g=()=>t(2,o=!o),p=y=>t(2,o=y),v=()=>h("https://discord.gg/TNf9bBrZmR"),w=()=>h("https://store.steampowered.com/app/3431300/Slow_Roads/");return s.$$set=y=>{"toggleSplash"in y&&t(0,l=y.toggleSplash),"webglError"in y&&t(1,a=y.webglError)},[l,a,o,n,i,r,h,u,g,p,v,w]}class av extends Xe{constructor(e){super(),Qe(this,e,rv,lv,Ke,{toggleSplash:0,webglError:1})}}function Eo(s){let e,t,i,l,a;return{c(){e=_("div"),t=_("div"),i=_("div"),l=k(),a=_("div"),this.h()},l(r){e=b(r,"DIV",{class:!0,style:!0});var o=C(e);t=b(o,"DIV",{class:!0,style:!0});var n=C(t);i=b(n,"DIV",{class:!0}),C(i).forEach(m),n.forEach(m),l=I(o),a=b(o,"DIV",{class:!0}),C(a).forEach(m),o.forEach(m),this.h()},h(){f(i,"class","ui-mouse-marker svelte-1mw879"),f(t,"class","ui-mouse-marker-container svelte-1mw879"),ae(t,"transform","translateX("+s[1]+"%)"),f(a,"class","ui-mouse-center svelte-1mw879"),f(e,"class","ui-mouse svelte-1mw879"),ae(e,"width",s[0]*100+"%")},m(r,o){P(r,e,o),c(e,t),c(t,i),c(e,l),c(e,a)},p(r,o){o&2&&ae(t,"transform","translateX("+r[1]+"%)"),o&1&&ae(e,"width",r[0]*100+"%")},d(r){r&&m(e)}}}function ov(s){let e,t,i="RESET",l,a,r=s[2]&&!s[3]&&Eo(s);return{c(){r&&r.c(),e=k(),t=_("div"),t.textContent=i,this.h()},l(o){r&&r.l(o),e=I(o),t=b(o,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-xx5os6"&&(t.textContent=i),this.h()},h(){f(t,"class","ui-mouse-reset svelte-1mw879"),R(t,"ui-mouse-reset-interior",s[3])},m(o,n){r&&r.m(o,n),P(o,e,n),P(o,t,n),l||(a=B(t,"click",s[4]),l=!0)},p(o,[n]){o[2]&&!o[3]?r?r.p(o,n):(r=Eo(o),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),n&8&&R(t,"ui-mouse-reset-interior",o[3])},i:me,o:me,d(o){o&&(m(e),m(t)),r&&r.d(o),l=!1,a()}}}function nv(s,e,t){let i;ke(s,wn,u=>t(3,i=u));let l=0;function a(u){t(0,l=u)}let r=0;function o(u){t(1,r=100-(u+1)/2*100)}let n=!1;function d(u){t(2,n=u)}return ot(()=>(st.addListener("steerBarWidth",a),st.addListener("currentSteer",o),st.addListener("showSteerIndicator",d),()=>{st.removeListener("steerBarWidth",a),st.removeListener("currentSteer",o),st.removeListener("showSteerIndicator",d)})),[l,r,n,i,()=>pe.resetByMouse()]}class dv extends Xe{constructor(e){super(),Qe(this,e,nv,ov,Ke,{})}}function Ao(s){let e,t="<",i,l;return{c(){e=_("div"),e.textContent=t,this.h()},l(a){e=b(a,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(e)!=="svelte-140lecd"&&(e.textContent=t),this.h()},h(){f(e,"class","dash-autodrive-mode-arrow svelte-itei5"),ae(e,"left","-0.5rem")},m(a,r){P(a,e,r),i||(l=B(e,"click",s[6]),i=!0)},p:me,d(a){a&&m(e),i=!1,l()}}}function To(s){let e,t=">",i,l;return{c(){e=_("div"),e.textContent=t,this.h()},l(a){e=b(a,"DIV",{class:!0,style:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1dqn5zw"&&(e.textContent=t),this.h()},h(){f(e,"class","dash-autodrive-mode-arrow svelte-itei5"),ae(e,"right","-0.5rem")},m(a,r){P(a,e,r),i||(l=B(e,"click",s[7]),i=!0)},p:me,d(a){a&&m(e),i=!1,l()}}}function cv(s){let e,t,i,l,a,r,o,n,d,h,u,g=s[2]&&s[0]&&Ao(s),p=s[2]&&s[0]&&To(s);return{c(){e=_("div"),g&&g.c(),t=k(),i=_("div"),l=k(),a=_("div"),r=ee(s[1]),o=k(),n=_("div"),d=k(),p&&p.c(),this.h()},l(v){e=b(v,"DIV",{id:!0,class:!0});var w=C(e);g&&g.l(w),t=I(w),i=b(w,"DIV",{class:!0,style:!0}),C(i).forEach(m),l=I(w),a=b(w,"DIV",{class:!0});var y=C(a);r=te(y,s[1]),y.forEach(m),o=I(w),n=b(w,"DIV",{class:!0,style:!0}),C(n).forEach(m),d=I(w),p&&p.l(w),w.forEach(m),this.h()},h(){f(i,"class","dash-autodrive-bracket svelte-itei5"),ae(i,"border-right","none"),R(i,"dash-autodrive-bracket-active",s[0]),f(a,"class","dash-autodrive-text svelte-itei5"),f(n,"class","dash-autodrive-bracket svelte-itei5"),ae(n,"border-left","none"),R(n,"dash-autodrive-bracket-active",s[0]),f(e,"id","dash-autodrive"),f(e,"class","svelte-itei5"),R(e,"dash-autodrive-active",s[0])},m(v,w){P(v,e,w),g&&g.m(e,null),c(e,t),c(e,i),c(e,l),c(e,a),c(a,r),c(e,o),c(e,n),c(e,d),p&&p.m(e,null),h||(u=[B(e,"click",s[8]),B(e,"mouseenter",s[3]),B(e,"mouseleave",s[4])],h=!0)},p(v,[w]){v[2]&&v[0]?g?g.p(v,w):(g=Ao(v),g.c(),g.m(e,t)):g&&(g.d(1),g=null),w&1&&R(i,"dash-autodrive-bracket-active",v[0]),w&2&&_e(r,v[1]),w&1&&R(n,"dash-autodrive-bracket-active",v[0]),v[2]&&v[0]?p?p.p(v,w):(p=To(v),p.c(),p.m(e,null)):p&&(p.d(1),p=null),w&1&&R(e,"dash-autodrive-active",v[0])},i:me,o:me,d(v){v&&m(e),g&&g.d(),p&&p.d(),h=!1,lt(u)}}}function hv(s,e,t){let i=!1,l="AUTODRIVE",a=!1;function r(v){t(0,i=v)}function o(v){v==$i.FULL?t(1,l="AUTODRIVE"):v==$i.SPEED?t(1,l="AUTOSPEED"):v==$i.STEER&&t(1,l="AUTOSTEER")}function n(){t(2,a=!0)}function d(){t(2,a=!1)}function h(v){let y=ne.autodriveMode+v;y<0?y=2:y>2&&(y=0),ne.set("autodriveMode",y)}return ot(()=>(Gt.addListener(r),ne.addListener("autodriveMode",o),()=>{Gt.removeListener(r),ne.removeListener("autodriveMode",o)})),[i,l,a,n,d,h,v=>{v.preventDefault(),v.stopPropagation(),h(-1)},v=>{v.preventDefault(),v.stopPropagation(),h(1)},()=>Gt.set(!i)]}class Un extends Xe{constructor(e){super(),Qe(this,e,hv,cv,Ke,{})}}function Po(s){let e,t,i,l;const a=[vv,uv,fv],r=[];function o(n,d){return 2}return e=o(),t=r[e]=a[e](s),{c(){t.c(),i=De()},l(n){t.l(n),i=De()},m(n,d){r[e].m(n,d),P(n,i,d),l=!0},p(n,d){t.p(n,d)},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),r[e].d(n)}}}function fv(s){let e,t;return e=new ef({props:{toggleSplash:s[53],webglError:s[5]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&32785&&(a.toggleSplash=i[53]),l[0]&32&&(a.webglError=i[5]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function uv(s){let e,t;return e=new ev({props:{toggleSplash:s[52]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&1&&(a.toggleSplash=i[52]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function vv(s){let e,t;return e=new av({props:{toggleSplash:s[51],webglError:s[5]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&32785&&(a.toggleSplash=i[51]),l[0]&32&&(a.webglError=i[5]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function No(s){let e,t,i,l="Low Performance Detected",a,r,o,n="Dismiss",d,h;function u(v,w){return mv}let p=u()(s);return{c(){e=_("div"),t=_("div"),i=_("div"),i.textContent=l,a=k(),p.c(),r=k(),o=_("div"),o.textContent=n,this.h()},l(v){e=b(v,"DIV",{class:!0});var w=C(e);t=b(w,"DIV",{class:!0});var y=C(t);i=b(y,"DIV",{class:!0,"data-svelte-h":!0}),Y(i)!=="svelte-13a2ixe"&&(i.textContent=l),a=I(y),p.l(y),r=I(y),o=b(y,"DIV",{class:!0,"data-svelte-h":!0}),Y(o)!=="svelte-6a9fjy"&&(o.textContent=n),y.forEach(m),w.forEach(m),this.h()},h(){f(i,"class","hwa-title svelte-bgj4yc"),f(o,"class","hwa-dismiss svelte-bgj4yc"),f(t,"class","hwa-main svelte-bgj4yc"),f(e,"class","hwa-container svelte-bgj4yc")},m(v,w){P(v,e,w),c(e,t),c(t,i),c(t,a),p.m(t,null),c(t,r),c(t,o),d||(h=B(o,"click",s[47]),d=!0)},p:me,d(v){v&&m(e),p.d(),d=!1,h()}}}function mv(s){let e,t='Make sure you have <span style="font-weight: 600">hardware acceleration</span> enabled in your browser and OS settings, then restart your browser.';return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-1tdhr9z"&&(e.innerHTML=t),this.h()},h(){f(e,"class","hwa-body svelte-bgj4yc")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function gv(s){let e,t="PAUSED",i,l;return{c(){e=_("div"),e.textContent=t,this.h()},l(a){e=b(a,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-fhlkwc"&&(e.textContent=t),this.h()},h(){f(e,"class","paused svelte-bgj4yc")},m(a,r){P(a,e,r),l=!0},p:me,i(a){l||(a&&Ci(()=>{l&&(i||(i=ii(e,Tt,{duration:100},!0)),i.run(1))}),l=!0)},o(a){a&&(i||(i=ii(e,Tt,{duration:100},!1)),i.run(0)),l=!1},d(a){a&&m(e),a&&i&&i.end()}}}function pv(s){let e,t,i="Error",l,a,r,o=s[28].type+"",n,d,h,u=s[28].msg+"",g,p,v,w,y,D="Reload",L,T,A,E,x,W="COPY LOG",X,U;function J(V,z){return _v}let O=J()(s),j=s[29]==!1&&xo(s);return{c(){e=_("div"),t=_("div"),t.textContent=i,l=k(),a=_("div"),r=_("div"),n=ee(o),d=k(),h=_("div"),g=ee(u),p=k(),v=_("div"),w=ee(`Sorry, something went wrong - please try reloading.
                    
                    
                    `),y=_("div"),y.textContent=D,L=k(),O.c(),T=k(),A=_("div"),j&&j.c(),E=k(),x=_("div"),x.textContent=W,this.h()},l(V){e=b(V,"DIV",{class:!0});var z=C(e);t=b(z,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-et9hky"&&(t.textContent=i),l=I(z),a=b(z,"DIV",{class:!0});var M=C(a);r=b(M,"DIV",{class:!0});var N=C(r);n=te(N,o),N.forEach(m),d=I(M),h=b(M,"DIV",{class:!0});var G=C(h);g=te(G,u),G.forEach(m),M.forEach(m),p=I(z),v=b(z,"DIV",{class:!0});var se=C(v);w=te(se,`Sorry, something went wrong - please try reloading.
                    
                    
                    `),y=b(se,"DIV",{class:!0,"data-svelte-h":!0}),Y(y)!=="svelte-tpxv7y"&&(y.textContent=D),L=I(se),O.l(se),se.forEach(m),T=I(z),A=b(z,"DIV",{class:!0});var oe=C(A);j&&j.l(oe),E=I(oe),x=b(oe,"DIV",{class:!0,"data-svelte-h":!0}),Y(x)!=="svelte-131fhbm"&&(x.textContent=W),oe.forEach(m),z.forEach(m),this.h()},h(){f(t,"class","error-title svelte-bgj4yc"),f(r,"class","error-type svelte-bgj4yc"),f(h,"class","error-msg svelte-bgj4yc"),f(a,"class","error-display svelte-bgj4yc"),f(y,"class","ui-btn ui-btn-active error-reload svelte-bgj4yc"),f(v,"class","error-watdo svelte-bgj4yc"),f(x,"class","error-log-copy svelte-bgj4yc"),f(A,"class","error-log svelte-bgj4yc"),f(e,"class","error svelte-bgj4yc"),R(e,"error-touch",s[29])},m(V,z){P(V,e,z),c(e,t),c(e,l),c(e,a),c(a,r),c(r,n),c(a,d),c(a,h),c(h,g),c(e,p),c(e,v),c(v,w),c(v,y),c(v,L),O.m(v,null),c(e,T),c(e,A),j&&j.m(A,null),c(A,E),c(A,x),X||(U=[B(y,"click",s[48]),B(x,"click",s[55])],X=!0)},p(V,z){z[0]&268435456&&o!==(o=V[28].type+"")&&_e(n,o),z[0]&268435456&&u!==(u=V[28].msg+"")&&_e(g,u),O.p(V,z),V[29]==!1?j?j.p(V,z):(j=xo(V),j.c(),j.m(A,E)):j&&(j.d(1),j=null),z[0]&536870912&&R(e,"error-touch",V[29])},i:me,o:me,d(V){V&&m(e),O.d(),j&&j.d(),X=!1,lt(U)}}}function _v(s){let e,t,i="click here",l,a,r;return{c(){e=ee("If this keeps happening, "),t=_("a"),t.textContent=i,l=ee(" to try a different seed."),this.h()},l(o){e=te(o,"If this keeps happening, "),t=b(o,"A",{href:!0,class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-9g2e47"&&(t.textContent=i),l=te(o," to try a different seed."),this.h()},h(){f(t,"href","#"),f(t,"class","ui-link svelte-bgj4yc")},m(o,n){P(o,e,n),P(o,t,n),P(o,l,n),a||(r=B(t,"click",s[54]),a=!0)},p:me,d(o){o&&(m(e),m(t),m(l)),a=!1,r()}}}function xo(s){let e,t=s[28].log+"",i;return{c(){e=_("pre"),i=ee(t),this.h()},l(l){e=b(l,"PRE",{id:!0,class:!0});var a=C(e);i=te(a,t),a.forEach(m),this.h()},h(){f(e,"id","error-log-content"),f(e,"class","svelte-bgj4yc")},m(l,a){P(l,e,a),c(e,i)},p(l,a){a[0]&268435456&&t!==(t=l[28].log+"")&&_e(i,t)},d(l){l&&m(e)}}}function Ro(s){let e,t;return e=new ju({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function bv(s){let e,t=`<span style="font-size: 1.25rem">UNLICENSED EMBED</span> <br/>
                Play the original ad-free on <a class="ui-mb-a svelte-bgj4yc" href="https://slowroads.io">slowroads.io</a>`;return{c(){e=_("div"),e.innerHTML=t,this.h()},l(i){e=b(i,"DIV",{class:!0,"data-svelte-h":!0}),Y(e)!=="svelte-hmosml"&&(e.innerHTML=t),this.h()},h(){f(e,"class","ui-mb svelte-bgj4yc")},m(i,l){P(i,e,l)},d(i){i&&m(e)}}}function wv(s){let e,t,i,l,a,r,o,n,d,h,u;e=new Qu({});let g=s[26]&&Uo(),p=Sv(s),v=s[9]&&Vo(s),w=s[15]&&Ho(s);const y=[kv,Cv],D=[];function L(A,E){return A[37]==!1||A[27]?0:A[29]==!0?1:-1}~(o=L(s))&&(n=D[o]=y[o](s));let T=(s[29]||s[8]==1)&&qo();return{c(){Ne(e.$$.fragment),t=k(),g&&g.c(),i=k(),p&&p.c(),l=k(),v&&v.c(),a=k(),w&&w.c(),r=k(),n&&n.c(),d=k(),T&&T.c(),h=De()},l(A){xe(e.$$.fragment,A),t=I(A),g&&g.l(A),i=I(A),p&&p.l(A),l=I(A),v&&v.l(A),a=I(A),w&&w.l(A),r=I(A),n&&n.l(A),d=I(A),T&&T.l(A),h=De()},m(A,E){Re(e,A,E),P(A,t,E),g&&g.m(A,E),P(A,i,E),p&&p.m(A,E),P(A,l,E),v&&v.m(A,E),P(A,a,E),w&&w.m(A,E),P(A,r,E),~o&&D[o].m(A,E),P(A,d,E),T&&T.m(A,E),P(A,h,E),u=!0},p(A,E){A[26]?g?E[0]&67108864&&q(g,1):(g=Uo(),g.c(),q(g,1),g.m(i.parentNode,i)):g&&(Fe(),ie(g,1,1,()=>{g=null}),Ge()),p.p(A,E),A[9]?v?v.p(A,E):(v=Vo(A),v.c(),v.m(a.parentNode,a)):v&&(v.d(1),v=null),A[15]?w?(w.p(A,E),E[0]&32768&&q(w,1)):(w=Ho(A),w.c(),q(w,1),w.m(r.parentNode,r)):w&&(Fe(),ie(w,1,1,()=>{w=null}),Ge());let x=o;o=L(A),o===x?~o&&D[o].p(A,E):(n&&(Fe(),ie(D[x],1,1,()=>{D[x]=null}),Ge()),~o?(n=D[o],n?n.p(A,E):(n=D[o]=y[o](A),n.c()),q(n,1),n.m(d.parentNode,d)):n=null),A[29]||A[8]==1?T||(T=qo(),T.c(),T.m(h.parentNode,h)):T&&(T.d(1),T=null)},i(A){u||(q(e.$$.fragment,A),q(g),q(p),q(w),q(n),u=!0)},o(A){ie(e.$$.fragment,A),ie(g),ie(p),ie(w),ie(n),u=!1},d(A){A&&(m(t),m(i),m(l),m(a),m(r),m(d),m(h)),Ue(e,A),g&&g.d(A),p&&p.d(A),v&&v.d(A),w&&w.d(A),~o&&D[o].d(A),T&&T.d(A)}}}function yv(s){let e,t,i,l,a=s[30]&&Wo(s);return{c(){e=_("div"),a&&a.c(),this.h()},l(r){e=b(r,"DIV",{class:!0});var o=C(e);a&&a.l(o),o.forEach(m),this.h()},h(){f(e,"class","load-bar svelte-bgj4yc"),R(e,"load-bar-init",s[7])},m(r,o){P(r,e,o),a&&a.m(e,null),l=!0},p(r,o){r[30]?a?a.p(r,o):(a=Wo(r),a.c(),a.m(e,null)):a&&(a.d(1),a=null),(!l||o[0]&128)&&R(e,"load-bar-init",r[7])},i(r){l||(r&&Ci(()=>{l&&(i&&i.end(1),t=jl(e,Tt,{duration:100}),t.start())}),l=!0)},o(r){t&&t.invalidate(),r&&(i=Bl(e,Tt,{delay:100,duration:300})),l=!1},d(r){r&&m(e),a&&a.d(),r&&i&&i.end()}}}function Uo(s){let e,t;return e=new dv({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Sv(s){let e,t,i=s[13]==1&&Oo(s);return{c(){i&&i.c(),e=De()},l(l){i&&i.l(l),e=De()},m(l,a){i&&i.m(l,a),P(l,e,a),t=!0},p(l,a){l[13]==1?i?(i.p(l,a),a[0]&8192&&q(i,1)):(i=Oo(l),i.c(),q(i,1),i.m(e.parentNode,e)):i&&(Fe(),ie(i,1,1,()=>{i=null}),Ge())},i(l){t||(q(i),t=!0)},o(l){ie(i),t=!1},d(l){l&&m(e),i&&i.d(l)}}}function Oo(s){let e,t,i,l,a,r;return t=new xf({props:{showConfig:s[9],openConfig:s[60],closeConfig:s[61]}}),{c(){e=_("div"),Ne(t.$$.fragment),l=k(),a=De()},l(o){e=b(o,"DIV",{});var n=C(e);xe(t.$$.fragment,n),n.forEach(m),l=I(o),a=De()},m(o,n){P(o,e,n),Re(t,e,null),P(o,l,n),P(o,a,n),r=!0},p(o,n){const d={};n[0]&512&&(d.showConfig=o[9]),n[0]&512&&(d.openConfig=o[60]),n[0]&512&&(d.closeConfig=o[61]),t.$set(d)},i(o){r||(q(t.$$.fragment,o),o&&Ci(()=>{r&&(i||(i=ii(e,Tt,{duration:100},!0)),i.run(1))}),r=!0)},o(o){ie(t.$$.fragment,o),o&&(i||(i=ii(e,Tt,{duration:100},!1)),i.run(0)),r=!1},d(o){o&&(m(e),m(l),m(a)),Ue(t),o&&i&&i.end()}}}function Vo(s){let e,t,i;return{c(){e=_("div"),this.h()},l(l){e=b(l,"DIV",{id:!0,class:!0}),C(e).forEach(m),this.h()},h(){f(e,"id","config-close"),f(e,"class","svelte-bgj4yc")},m(l,a){P(l,e,a),t||(i=B(e,"click",s[62]),t=!0)},p:me,d(l){l&&m(e),t=!1,i()}}}function Ho(s){let e,t,i,l;const a=[Lv,Dv],r=[];function o(n,d){return 0}return e=o(),t=r[e]=a[e](s),{c(){t.c(),i=De()},l(n){t.l(n),i=De()},m(n,d){r[e].m(n,d),P(n,i,d),l=!0},p(n,d){t.p(n,d)},i(n){l||(q(t),l=!0)},o(n){ie(t),l=!1},d(n){n&&m(i),r[e].d(n)}}}function Dv(s){let e,t;return e=new lf({props:{enabled:!s[9]&&!s[1]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&514&&(a.enabled=!i[9]&&!i[1]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Lv(s){let e,t;return e=new of({props:{enabled:!s[9]&&!s[1]}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&514&&(a.enabled=!i[9]&&!i[1]),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Cv(s){let e,t;return e=new Un({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p:me,i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function kv(s){let e,t,i,l,a,r,o,n,d,h=(s[41]*s[21]).toFixed(1)+"",u,g,p,v,w,y,D,L=(s[42]*s[22]).toFixed(1)+"",T,A,E,x,W,X,U,J=s[38]&&zo(),Z=s[39]&&Fo(),O=s[37]==!1&&Go(s),j=Iv(),V=s[29]==!1&&jo(s),z=s[40]&&!s[29]&&Bo();return{c(){e=_("div"),J&&J.c(),t=k(),Z&&Z.c(),i=k(),O&&O.c(),l=k(),j&&j.c(),a=k(),r=_("div"),V&&V.c(),o=k(),n=_("div"),z&&z.c(),d=k(),u=ee(h),g=k(),p=_("div"),v=ee(s[23]),w=k(),y=_("div"),D=_("div"),T=ee(L),A=k(),E=_("div"),x=ee(s[24]),W=k(),X=_("div"),this.h()},l(M){e=b(M,"DIV",{class:!0});var N=C(e);J&&J.l(N),t=I(N),Z&&Z.l(N),N.forEach(m),i=I(M),O&&O.l(M),l=I(M),j&&j.l(M),a=I(M),r=b(M,"DIV",{class:!0});var G=C(r);V&&V.l(G),o=I(G),n=b(G,"DIV",{class:!0});var se=C(n);z&&z.l(se),d=I(se),u=te(se,h),se.forEach(m),g=I(G),p=b(G,"DIV",{class:!0});var oe=C(p);v=te(oe,s[23]),oe.forEach(m),G.forEach(m),w=I(M),y=b(M,"DIV",{class:!0});var re=C(y);D=b(re,"DIV",{class:!0});var be=C(D);T=te(be,L),be.forEach(m),A=I(re),E=b(re,"DIV",{class:!0});var we=C(E);x=te(we,s[24]),we.forEach(m),re.forEach(m),W=I(M),X=b(M,"DIV",{class:!0}),C(X).forEach(m),this.h()},h(){f(e,"class","dash-icons svelte-bgj4yc"),R(e,"dash-icons-bottom",s[8]!=1),R(e,"dash-icons-top",s[29]||s[8]==1),f(n,"class","stat-value svelte-bgj4yc"),f(p,"class","stat-unit svelte-bgj4yc"),f(r,"class","stat speed svelte-bgj4yc"),R(r,"speed-touch",s[29]),R(r,"stat-bottom",s[8]!=1),R(r,"stat-top",s[29]||s[8]==1),f(D,"class","stat-value svelte-bgj4yc"),f(E,"class","stat-unit svelte-bgj4yc"),f(y,"class","stat distance svelte-bgj4yc"),R(y,"distance-touch",s[29]),R(y,"stat-bottom",s[8]==0),R(y,"stat-top",s[29]),f(X,"class","stat-underlay svelte-bgj4yc"),R(X,"underlay-top",s[29]||s[8]==1)},m(M,N){P(M,e,N),J&&J.m(e,null),c(e,t),Z&&Z.m(e,null),P(M,i,N),O&&O.m(M,N),P(M,l,N),j&&j.m(M,N),P(M,a,N),P(M,r,N),V&&V.m(r,null),c(r,o),c(r,n),z&&z.m(n,null),c(n,d),c(n,u),c(r,g),c(r,p),c(p,v),P(M,w,N),P(M,y,N),c(y,D),c(D,T),c(y,A),c(y,E),c(E,x),P(M,W,N),P(M,X,N),U=!0},p(M,N){M[38]?J?N[1]&128&&q(J,1):(J=zo(),J.c(),q(J,1),J.m(e,t)):J&&(Fe(),ie(J,1,1,()=>{J=null}),Ge()),M[39]?Z?N[1]&256&&q(Z,1):(Z=Fo(),Z.c(),q(Z,1),Z.m(e,null)):Z&&(Fe(),ie(Z,1,1,()=>{Z=null}),Ge()),(!U||N[0]&256)&&R(e,"dash-icons-bottom",M[8]!=1),(!U||N[0]&536871168)&&R(e,"dash-icons-top",M[29]||M[8]==1),M[37]==!1?O?(O.p(M,N),N[1]&64&&q(O,1)):(O=Go(M),O.c(),q(O,1),O.m(l.parentNode,l)):O&&(Fe(),ie(O,1,1,()=>{O=null}),Ge()),M[29]==!1?V?V.p(M,N):(V=jo(M),V.c(),V.m(r,o)):V&&(V.d(1),V=null),M[40]&&!M[29]?z?N[0]&536870912|N[1]&512&&q(z,1):(z=Bo(),z.c(),q(z,1),z.m(n,d)):z&&(Fe(),ie(z,1,1,()=>{z=null}),Ge()),(!U||N[0]&2097152|N[1]&1024)&&h!==(h=(M[41]*M[21]).toFixed(1)+"")&&_e(u,h),(!U||N[0]&8388608)&&_e(v,M[23]),(!U||N[0]&536870912)&&R(r,"speed-touch",M[29]),(!U||N[0]&256)&&R(r,"stat-bottom",M[8]!=1),(!U||N[0]&536871168)&&R(r,"stat-top",M[29]||M[8]==1),(!U||N[0]&4194304|N[1]&2048)&&L!==(L=(M[42]*M[22]).toFixed(1)+"")&&_e(T,L),(!U||N[0]&16777216)&&_e(x,M[24]),(!U||N[0]&536870912)&&R(y,"distance-touch",M[29]),(!U||N[0]&256)&&R(y,"stat-bottom",M[8]==0),(!U||N[0]&536870912)&&R(y,"stat-top",M[29]),(!U||N[0]&536871168)&&R(X,"underlay-top",M[29]||M[8]==1)},i(M){U||(q(J),q(Z),q(O),q(j),q(z),U=!0)},o(M){ie(J),ie(Z),ie(O),ie(j),ie(z),U=!1},d(M){M&&(m(e),m(i),m(l),m(a),m(r),m(w),m(y),m(W),m(X)),J&&J.d(),Z&&Z.d(),O&&O.d(M),j&&j.d(M),V&&V.d(),z&&z.d()}}}function zo(s){let e,t,i,l,a;return{c(){e=_("img"),this.h()},l(r){e=b(r,"IMG",{class:!0,style:!0,src:!0}),this.h()},h(){f(e,"class","dash-icon svelte-bgj4yc"),ae(e,"right","3rem"),Ut(e.src,t="/img/ico_steer_lock.svg")||f(e,"src",t)},m(r,o){P(r,e,o),a=!0},i(r){a||(r&&Ci(()=>{a&&(l&&l.end(1),i=jl(e,Tt,{duration:100}),i.start())}),a=!0)},o(r){i&&i.invalidate(),r&&(l=Bl(e,Tt,{duration:400})),a=!1},d(r){r&&m(e),r&&l&&l.end()}}}function Fo(s){let e,t,i,l;return{c(){e=_("img"),this.h()},l(a){e=b(a,"IMG",{class:!0,style:!0,src:!0}),this.h()},h(){f(e,"class","dash-icon svelte-bgj4yc"),ae(e,"right","0rem"),Ut(e.src,t="/img/ico_brake.svg")||f(e,"src",t)},m(a,r){P(a,e,r),l=!0},i(a){l||(a&&Ci(()=>{l&&(i||(i=ii(e,Tt,{duration:200},!0)),i.run(1))}),l=!0)},o(a){a&&(i||(i=ii(e,Tt,{duration:200},!1)),i.run(0)),l=!1},d(a){a&&m(e),a&&i&&i.end()}}}function Go(s){let e,t;return e=new Wu({props:{position:s[29]?1:0}}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},p(i,l){const a={};l[0]&536870912&&(a.position=i[29]?1:0),e.$set(a)},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function Iv(s){let e,t;return e=new Un({}),{c(){Ne(e.$$.fragment)},l(i){xe(e.$$.fragment,i)},m(i,l){Re(e,i,l),t=!0},i(i){t||(q(e.$$.fragment,i),t=!0)},o(i){ie(e.$$.fragment,i),t=!1},d(i){Ue(e,i)}}}function jo(s){let e,t,i,l,a,r,o="▲",n,d,h,u,g="▼",p,v,w,y="▲",D,L,T,A,E="▼",x,W;return{c(){e=_("div"),t=_("img"),l=k(),a=_("div"),r=_("div"),r.textContent=o,n=k(),d=ee(s[19]),h=k(),u=_("div"),u.textContent=g,p=k(),v=_("div"),w=_("div"),w.textContent=y,D=k(),L=ee(s[18]),T=k(),A=_("div"),A.textContent=E,this.h()},l(X){e=b(X,"DIV",{class:!0});var U=C(e);t=b(U,"IMG",{class:!0,alt:!0,src:!0}),l=I(U),a=b(U,"DIV",{class:!0});var J=C(a);r=b(J,"DIV",{class:!0,"data-svelte-h":!0}),Y(r)!=="svelte-178mwg7"&&(r.textContent=o),n=I(J),d=te(J,s[19]),h=I(J),u=b(J,"DIV",{class:!0,"data-svelte-h":!0}),Y(u)!=="svelte-1kexe0n"&&(u.textContent=g),J.forEach(m),p=I(U),v=b(U,"DIV",{class:!0});var Z=C(v);w=b(Z,"DIV",{class:!0,"data-svelte-h":!0}),Y(w)!=="svelte-1nsidbo"&&(w.textContent=y),D=I(Z),L=te(Z,s[18]),T=I(Z),A=b(Z,"DIV",{class:!0,"data-svelte-h":!0}),Y(A)!=="svelte-uwpd61"&&(A.textContent=E),Z.forEach(m),U.forEach(m),this.h()},h(){f(t,"class","sc-icon svelte-bgj4yc"),f(t,"alt",""),Ut(t.src,i=s[17]?"/img/ico_lock_closed.svg":"/img/ico_lock_open.svg")||f(t,"src",i),R(t,"sc-icon-active",s[17]),f(r,"class","sc-arrow sc-arrow-up svelte-bgj4yc"),R(r,"sc-hidden",!s[20]),f(u,"class","sc-arrow sc-arrow-down svelte-bgj4yc"),R(u,"sc-hidden",!s[20]),f(a,"class","sc-val svelte-bgj4yc"),R(a,"sc-hidden",!s[17]),f(w,"class","sc-arrow sc-arrow-up svelte-bgj4yc"),f(A,"class","sc-arrow sc-arrow-down svelte-bgj4yc"),f(v,"class","sc-label svelte-bgj4yc"),R(v,"sc-hidden",!s[20]||!s[17]),f(e,"class","sc-main svelte-bgj4yc")},m(X,U){P(X,e,U),c(e,t),c(e,l),c(e,a),c(a,r),c(a,n),c(a,d),c(a,h),c(a,u),c(e,p),c(e,v),c(v,w),c(v,D),c(v,L),c(v,T),c(v,A),x||(W=[B(t,"click",s[45]),B(r,"click",Zl),B(u,"click",Jl),B(w,"click",s[63]),B(A,"click",s[64]),B(e,"mouseenter",s[65]),B(e,"mouseleave",s[66])],x=!0)},p(X,U){U[0]&131072&&!Ut(t.src,i=X[17]?"/img/ico_lock_closed.svg":"/img/ico_lock_open.svg")&&f(t,"src",i),U[0]&131072&&R(t,"sc-icon-active",X[17]),U[0]&1048576&&R(r,"sc-hidden",!X[20]),U[0]&524288&&_e(d,X[19]),U[0]&1048576&&R(u,"sc-hidden",!X[20]),U[0]&131072&&R(a,"sc-hidden",!X[17]),U[0]&262144&&_e(L,X[18]),U[0]&1179648&&R(v,"sc-hidden",!X[20]||!X[17])},d(X){X&&m(e),x=!1,lt(W)}}}function Bo(s){let e,t,i,l,a;return{c(){e=_("img"),this.h()},l(r){e=b(r,"IMG",{class:!0,src:!0}),this.h()},h(){f(e,"class","stat-icon svelte-bgj4yc"),Ut(e.src,t="/img/ico_boost.svg")||f(e,"src",t)},m(r,o){P(r,e,o),a=!0},i(r){a||(r&&Ci(()=>{a&&(l&&l.end(1),i=jl(e,Tt,{duration:100}),i.start())}),a=!0)},o(r){i&&i.invalidate(),r&&(l=Bl(e,Tt,{duration:400})),a=!1},d(r){r&&m(e),r&&l&&l.end()}}}function qo(s){let e;return{c(){e=_("div"),this.h()},l(t){e=b(t,"DIV",{class:!0}),C(e).forEach(m),this.h()},h(){f(e,"class","menu-underlay svelte-bgj4yc")},m(t,i){P(t,e,i)},d(t){t&&m(e)}}}function Wo(s){let e,t,i="LOADING",l,a,r,o,n,d=(s[14]??"")+"",h;return{c(){e=_("div"),t=_("div"),t.textContent=i,l=k(),a=_("div"),r=_("div"),o=k(),n=_("div"),h=ee(d),this.h()},l(u){e=b(u,"DIV",{class:!0});var g=C(e);t=b(g,"DIV",{class:!0,"data-svelte-h":!0}),Y(t)!=="svelte-1mn9znm"&&(t.textContent=i),l=I(g),a=b(g,"DIV",{class:!0});var p=C(a);r=b(p,"DIV",{class:!0,style:!0}),C(r).forEach(m),p.forEach(m),o=I(g),n=b(g,"DIV",{class:!0});var v=C(n);h=te(v,d),v.forEach(m),g.forEach(m),this.h()},h(){f(t,"class","load-bar-prog svelte-bgj4yc"),f(r,"class","load-bar-bar-fill svelte-bgj4yc"),ae(r,"width",s[13]*100+"%"),f(a,"class","load-bar-bar svelte-bgj4yc"),f(n,"class","load-bar-stage svelte-bgj4yc"),f(e,"class","load-bar-main svelte-bgj4yc")},m(u,g){P(u,e,g),c(e,t),c(e,l),c(e,a),c(a,r),c(e,o),c(e,n),c(n,h)},p(u,g){g[0]&8192&&ae(r,"width",u[13]*100+"%"),g[0]&16384&&d!==(d=(u[14]??"")+"")&&_e(h,d)},d(u){u&&m(e)}}}function Mv(s){let e,t,i,l,a,r,o,n,d,h,u,g,p,v,w,y,D,L,T,A,E=s[0]&&Po(s),x=s[11]&&No(s);const W=[pv,gv],X=[];function U(M,N){return M[28]?0:M[25]&&!M[1]?1:-1}~(a=U(s))&&(r=X[a]=W[a](s));let J=s[12]&&Ro(),Z=s[44]&&bv();h=new zu({props:{showSettings:s[1],showPrompt:s[10],openSettings:s[56],closeSettings:s[57],showBar:s[6],onShowSplash:s[58]}});let O=un;const j=[yv,wv],V=[];function z(M,N){return M[13]<1?0:M[6]&&!M[25]&&!M[1]&&!M[2]?1:-1}return~(p=z(s))&&(v=V[p]=j[p](s)),{c(){E&&E.c(),e=k(),x&&x.c(),t=k(),i=_("div"),l=_("div"),r&&r.c(),o=k(),J&&J.c(),n=k(),Z&&Z.c(),d=k(),Ne(h.$$.fragment),u=k(),g=k(),v&&v.c(),y=k(),D=_("canvas"),this.h()},l(M){E&&E.l(M),e=I(M),x&&x.l(M),t=I(M),i=b(M,"DIV",{id:!0,tabindex:!0,autofocus:!0,class:!0});var N=C(i);l=b(N,"DIV",{id:!0,class:!0});var G=C(l);r&&r.l(G),o=I(G),J&&J.l(G),n=I(G),Z&&Z.l(G),d=I(G),xe(h.$$.fragment,G),u=I(G),g=I(G),v&&v.l(G),G.forEach(m),y=I(N),D=b(N,"CANVAS",{class:!0}),C(D).forEach(m),N.forEach(m),this.h()},h(){f(l,"id",w=s[15]?"ui-dynamic":"ui-fixed"),f(l,"class","svelte-bgj4yc"),f(D,"class","svelte-bgj4yc"),R(D,"canvas-paused",s[25]||s[1]||s[2]),f(i,"id","main"),f(i,"tabindex",-1),f(i,"autofocus",""),f(i,"class","svelte-bgj4yc")},m(M,N){E&&E.m(M,N),P(M,e,N),x&&x.m(M,N),P(M,t,N),P(M,i,N),c(i,l),~a&&X[a].m(l,null),c(l,o),J&&J.m(l,null),c(l,n),Z&&Z.m(l,null),c(l,d),Re(h,l,null),c(l,u),c(l,g),~p&&V[p].m(l,null),s[67](l),c(i,y),c(i,D),s[68](D),s[69](i),L=!0,i.focus(),T||(A=B(i,"contextmenu",Ev),T=!0)},p(M,N){M[0]?E?(E.p(M,N),N[0]&1&&q(E,1)):(E=Po(M),E.c(),q(E,1),E.m(e.parentNode,e)):E&&(Fe(),ie(E,1,1,()=>{E=null}),Ge()),M[11]?x?x.p(M,N):(x=No(M),x.c(),x.m(t.parentNode,t)):x&&(x.d(1),x=null);let G=a;a=U(M),a===G?~a&&X[a].p(M,N):(r&&(Fe(),ie(X[G],1,1,()=>{X[G]=null}),Ge()),~a?(r=X[a],r?r.p(M,N):(r=X[a]=W[a](M),r.c()),q(r,1),r.m(l,o)):r=null),M[12]?J?N[0]&4096&&q(J,1):(J=Ro(),J.c(),q(J,1),J.m(l,n)):J&&(Fe(),ie(J,1,1,()=>{J=null}),Ge());const se={};N[0]&2&&(se.showSettings=M[1]),N[0]&1024&&(se.showPrompt=M[10]),N[0]&2&&(se.openSettings=M[56]),N[0]&2&&(se.closeSettings=M[57]),N[0]&64&&(se.showBar=M[6]),h.$set(se);let oe=p;p=z(M),p===oe?~p&&V[p].p(M,N):(v&&(Fe(),ie(V[oe],1,1,()=>{V[oe]=null}),Ge()),~p?(v=V[p],v?v.p(M,N):(v=V[p]=j[p](M),v.c()),q(v,1),v.m(l,null)):v=null),(!L||N[0]&32768&&w!==(w=M[15]?"ui-dynamic":"ui-fixed"))&&f(l,"id",w),(!L||N[0]&33554438)&&R(D,"canvas-paused",M[25]||M[1]||M[2])},i(M){L||(q(E),q(r),q(J),q(h.$$.fragment,M),q(O),q(v),L=!0)},o(M){ie(E),ie(r),ie(J),ie(h.$$.fragment,M),ie(O),ie(v),L=!1},d(M){M&&(m(e),m(t),m(i)),E&&E.d(M),x&&x.d(M),~a&&X[a].d(),J&&J.d(),Z&&Z.d(),Ue(h),~p&&V[p].d(),s[67](null),s[68](null),s[69](null),T=!1,A()}}}const Ev=s=>{s.stopPropagation(),s.preventDefault()};function Av(s,e,t){let i,l,a,r,o,n,d,h,u,g,p,v,w,y,D,L;ke(s,Qi,ue=>t(50,i=ue)),ke(s,An,ue=>t(28,l=ue)),ke(s,si,ue=>t(29,a=ue)),ke(s,Ts,ue=>t(30,r=ue)),ke(s,on,ue=>t(31,o=ue)),ke(s,nn,ue=>t(32,n=ue)),ke(s,dn,ue=>t(33,d=ue)),ke(s,Xl,ue=>t(34,h=ue)),ke(s,Ql,ue=>t(35,u=ue)),ke(s,Kl,ue=>t(36,g=ue)),ke(s,wn,ue=>t(37,p=ue)),ke(s,gn,ue=>t(38,v=ue)),ke(s,mn,ue=>t(39,w=ue)),ke(s,vn,ue=>t(40,y=ue)),ke(s,xl,ue=>t(41,D=ue)),ke(s,Rl,ue=>t(42,L=ue));const T=["KILOMETERS PER HOUR","MILES PER HOUR"],A=["KILOMETERS","MILES"],E=Tn(),x=window.self!==window.top;let W=!1,X=!0,U=i,J=!0,Z=ne.hudPosition,O=!1,j=!1,V=!1,z=!1,M=!1,N=ne.showDebug,G=0,se="",oe=Ks.value,re,be,we,he,Q=null,le=!0,de="CRUISE",K=80,ce=!1;function $(){t(17,le=Ye.speedControl),le&&(t(18,de=Ye.speedControlMode==Nl.Cruise?"CRUISE":"MAX"),t(19,K=Math.round(Math.round(Ye.speedControlTarget*ut/5)*5)))}function ge(){Ye.set("speedControl",!Ye.speedControl)}function Ce(ue){Ye.set("speedControlMode",(Ye.speedControlMode+ue+2)%2)}let je=0,He=()=>{Q.onMount(re,be,we),be.focus(),he=new ResizeObserver(mt=>{Q.setSize(be.offsetWidth,be.offsetHeight)}),he.observe(be),Le.addListener("Escape",()=>{M?(t(2,M=!1),Je.resume()):U&&Be?Qi.set(!U):!j&&Be?Je.resume():t(1,j=!j)}),Le.addListener(ei.mapping.ToggleDebug,()=>{ne.set("showDebug",!ne.showDebug)});const ue=mt=>{si.set(mt)};ne.addListener("touchscreen",ue),ne.addListener("showDebug",mt=>{t(12,N=mt)}),ne.addListener("hideUI",mt=>{t(6,X=!mt)}),ne.addListener("hudPosition",mt=>{t(8,Z=mt)}),Ye.addListener("speedControl",$),Ye.addListener("speedControlMode",$),Ye.addListener("speedControlTarget",$),xi.addListener(mt=>{mt!=je&&($(),ue(ne.touchscreen),t(12,N=ne.showDebug),t(6,X=!ne.hideUI),t(8,Z=ne.hudPosition),je=mt)}),tt.hasSeenSettings||(cs.addListener("fps",mt=>{mt&&!tt.hasSeenSettings&&t(10,V=!0)}),cs.addListener("hwa",mt=>{mt&&!tt.hasSeenHWAWarning&&t(11,z=!0)}))};function ct(ue){t(13,G=ue),ue>=1&&t(7,J=!1)}function ze(ue){t(14,se=ue)}let ht=1,ut=1,Ot=T[0],Bt=A[0];function ye(ue){t(21,ht=Al[ne.units]),t(22,ut=dd[ne.units]),t(23,Ot=T[ne.units]),t(24,Bt=A[ne.units]),$()}let Be=!1;function Vt(ue){t(25,Be=ue)}let Pt=!1;function ui(ue){t(26,Pt=ue)}function Ht(ue){ue&&t(11,z=!0)}let li=!1;function wi(ue){t(27,li=ue)}ot(()=>(Q&&He(),fi.addListener(ct),Or.addListener(ze),ne.addListener("units",ye),ne.addListener("showInteriorHud",wi),Je.addStateListener(Vt),st.addListener("useMouse",ui),Ks.addListener(ue=>t(15,oe=ue)),cs.addListener("hwa",Ht),()=>{fi.removeListener(ct),Or.removeListener(ze),ne.removeListener("units",ye),ne.removeListener("showInteriorHud",wi),st.removeListener("useMouse",ui),cs.removeListener("hwa",Ht),Je.removeStateListener(Vt),Je.destroy()})),zn(()=>{Q&&(Q.onDestroy(),he.disconnect())});function rt(){t(11,z=!1),Je.unlock()}function _t(){location.reload()}const bt=ue=>{U&&oe&&be.requestFullscreen&&be.requestFullscreen(),Qi.set(!U)},pt=ue=>{hs.init(),Qi.set(!U)},zt=ue=>{U&&oe&&be.requestFullscreen&&be.requestFullscreen(),Qi.set(!U)},qt=()=>{Xi.forceNewSeed(),_t()},yi=ue=>{navigator.clipboard.writeText("```\n"+document.getElementById("error-log-content").innerHTML+"\n```")},nt=()=>t(1,j=!0),it=()=>t(1,j=!1),dt=ue=>{Qi.set(!0),document.fullscreenElement&&document.exitFullscreen()},Ze=ue=>t(2,M=ue),Dt=()=>t(9,O=!0),vt=()=>t(9,O=!1),Lt=()=>t(9,O=!1),$t=()=>Ce(1),ri=()=>Ce(-1),ai=()=>{t(20,ce=!0)},ft=()=>{t(20,ce=!1)};function ki(ue){St[ue?"unshift":"push"](()=>{we=ue,t(16,we)})}function Wt(ue){St[ue?"unshift":"push"](()=>{re=ue,t(3,re)})}function Xt(ue){St[ue?"unshift":"push"](()=>{be=ue,t(4,be)})}return s.$$.update=()=>{if(s.$$.dirty[1]&524288&&t(0,U=i),s.$$.dirty[0]&2&&j&&(tt.set("hasSeenSettings",!0),t(10,V=!1),Je.pause(),Le.setMouseEnabled(!1)),s.$$.dirty[0]&2&&(j||(Je.resume(),Le.setMouseEnabled(!0))),s.$$.dirty[0]&4&&M&&(Je.pause(),Le.setMouseEnabled(!1)),s.$$.dirty[0]&4&&(M||(Je.resume(),Le.setMouseEnabled(!0))),s.$$.dirty[0]&25|s.$$.dirty[1]&262144&&!U&&!Q)try{t(49,Q=new Th),re&&be&&He()}catch{console.log("Failed to initialise game"),t(5,W=!0),t(0,U=!0)}},[U,j,M,re,be,W,X,J,Z,O,V,z,N,G,se,oe,we,le,de,K,ce,ht,ut,Ot,Bt,Be,Pt,li,l,a,r,o,n,d,h,u,g,p,v,w,y,D,L,E,x,ge,Ce,rt,_t,Q,i,bt,pt,zt,qt,yi,nt,it,dt,Ze,Dt,vt,Lt,$t,ri,ai,ft,ki,Wt,Xt]}class Fv extends Xe{constructor(e){super(),Qe(this,e,Av,Mv,Ke,{},null,[-1,-1,-1])}}export{Fv as component};
