(function(t){function e(e){for(var r,o,c=e[0],s=e[1],l=e[2],f=0,u=[];f<c.length;f++)o=c[f],i[o]&&u.push(i[o][0]),i[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);p&&p(e);while(u.length)u.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],r=!0,c=1;c<a.length;c++){var s=a[c];0!==i[s]&&(r=!1)}r&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var r={},i={app:0},n=[];function o(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=r,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(a,r,function(e){return t[e]}.bind(null,r));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var p=s;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"059e":function(t,e,a){},"0c91":function(t,e,a){"use strict";var r=a("059e"),i=a.n(r);i.a},"19aa":function(t,e,a){},"456f":function(t,e,a){"use strict";var r=a("dca7"),i=a.n(r);i.a},5612:function(t,e,a){"use strict";var r=a("19aa"),i=a.n(r);i.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Sidebar"),a("div",{attrs:{id:"wrapper"}},[a("router-view")],1)],1)},n=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("aside",{ref:"sidebar"},[a("div",{ref:"linkContainer",attrs:{id:"flex"}},[a("router-link",{attrs:{to:"/about"}},[t._v("About")]),a("router-link",{attrs:{to:"/projects"}},[t._v("Projects")]),a("router-link",{attrs:{to:"/contact"}},[t._v("Contact")])],1)])])},c=[],s=a("2346"),l=new s["a"]({paused:!0}),p={mounted:function(){l.fromTo(this.$refs.sidebar,1,{width:0,opacity:0},{width:40,opacity:1},0).staggerFromTo(this.$refs.linkContainer.children,1.5,{opacity:0},{opacity:1,stagger:.5}).delay(.5).play()}},f=p,u=(a("0c91"),a("2877")),y=Object(u["a"])(f,o,c,!1,null,"1d4923be",null),d=y.exports,h={components:{Sidebar:d}},m=h,v=(a("f636"),Object(u["a"])(m,i,n,!1,null,"65b05f88",null)),b=v.exports,g=a("8c4f"),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{ref:"headerTop",staticClass:"header",attrs:{id:"top"}},[t._v("Cameron")]),a("h1",{ref:"headerBottom",staticClass:"header",attrs:{id:"bottom"}},[t._v("Cuff")]),a("div",{attrs:{id:"center"}},[a("div",{ref:"textWrapper"},t._l(t.landingText.split(" "),function(e,r){return a("span",{key:r},[t._v("\n        "+t._s(e)+"\n      ")])}),0)])])},_=[],w=1.5,x=new s["a"]({paused:!0}),C=new s["a"]({paused:!0}),T={data:function(){return{landingText:"Hello, welcome to my portfolio."}},beforeRouteLeave:function(t,e,a){C.staggerTo(this.$refs.textWrapper.children,1,{y:20,opacity:0,stagger:-.2},0).to(this.$refs.headerTop,1,{y:-70,opacity:0},0).to(this.$refs.headerBottom,1,{y:70,opacity:0},0).eventCallback("onComplete",a).play(),x.clear()},mounted:function(){C.clear(),x.fromTo(this.$refs.headerTop,w,{y:-110,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.headerBottom,w,{y:110,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.textWrapper.children[0],1,{y:-20,opacity:0},{y:0,opacity:1},w-.5).staggerFromTo(Array.prototype.slice.call(this.$refs.textWrapper.children,1),.5,{y:-10,opacity:0},{y:0,opacity:1,stagger:.2},2).delay(.5).play()}},$=T,j=(a("5612"),Object(u["a"])($,k,_,!1,null,"6adc2884",null)),P=j.exports,E=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"about"}},[r("h1",{ref:"header"},[t._v("About")]),r("div",{ref:"linkContainer",attrs:{id:"link-container"}},[r("router-link",{staticClass:"link",attrs:{to:"/",tag:"p"}},[t._v("Home")])],1),r("div",{attrs:{id:"center"}},[r("div",{ref:"image",attrs:{id:"image-placeholder"}},[r("img",{attrs:{src:a("92ef"),alt:""}})]),r("p",{ref:"aboutText"},[t._v("\n      Hey there, my name is Cameron Cuff. I'm a Junior studying Computer\n      Science at the University of Central Florida. I enjoy programming in\n      Java, Python, and Javascript and I'm currently learning React, Vue,\n      Typescript, and a bit of Flask for backend tasks. In my free time, I\n      love to play piano and clarinet.\n    ")])])])},O=[],F=a("2e20"),R=new s["a"]({paused:!0}),M=new s["a"]({paused:!0}),S={beforeRouteLeave:function(t,e,a){var r=1;R.clear(),M.to(this.$refs.header,r,{y:100,opacity:0},0).to(this.$refs.aboutText,r,{x:-40,opacity:0},0).to(this.$refs.image,r,{x:40,opacity:0},0).to(this.$refs.linkContainer,r,{y:-40,opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){M.clear(),R.fromTo(this.$refs.aboutText,2,{opacity:0,y:50},{opacity:1,y:0},0).fromTo(this.$refs.image,2,{opacity:0,y:-50},{opacity:1,y:0},0).fromTo(this.$refs.header,2,{opacity:0,y:143},{opacity:1,y:22},.5).fromTo(this.$refs.linkContainer,2,{opacity:0,x:-50},{opacity:1,x:0},1.5).to(this.$refs.linkContainer,1.5,{width:"100%",ease:F["c"].easeInOut},2).play()}},A=S,I=(a("456f"),Object(u["a"])(A,E,O,!1,null,"1437cca8",null)),L=I.exports,V=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"projects"}},[a("div",{ref:"homeLink"},[a("router-link",{staticClass:"router-link",attrs:{to:"/",tag:"p"}},[t._v("Home")])],1),a("section",{ref:"motionPy",staticClass:"flex",attrs:{id:"motion-py"}},[t._m(0)]),a("section",{ref:"ucfParking"},[t._m(1)]),a("section",{ref:"tweetTracker"},[t._m(2)])])},J=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex"},[a("div",[a("h1",[t._v("MotionPy")]),a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/MotionPy"}},[t._v("View Code")])])]),a("p",{staticClass:"description"},[t._v("\n        A motion detection system using a Raspberry Pi 3, camera module, breadboard, some paper\n        clips and a top-of-the-line cardboard box. A Python server (surprise surprise, it's Flask again)\n        running on the Raspberry Pi sends an Android app, written in Java and Kotlin, a notification\n        and a picture when movement is detected. Images are saved online using Firebase database.\n      ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",attrs:{id:"ucf-parking"}},[a("p",{staticClass:"description"},[t._v("\n        A website along with an api that tracks how full each parking garage is.\n        Every hour, a scrapper scraps UCF's parking site and saves it to a MongoDB database.\n        The backend was created using Python (Flask, again) and the frontend, Vue.js.\n      ")]),a("div",[a("h1",[t._v("UCFParking")]),a("div",{staticClass:"link-wrapper"},[a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/UCFParking-Web"}},[t._v("View Code")])]),a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://ucfparking.herokuapp.com/"}},[t._v("View Site")])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",attrs:{id:"tweet-tracker"}},[a("div",[a("h1",[t._v("Tweet-Tracker")]),a("div",{staticClass:"link-wrapper"},[a("p",{staticClass:"link tweet-tracker-link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/Tweet-Tracker"}},[t._v("View Code")])]),a("p",{staticClass:"link tweet-tracker-link"},[a("a",{attrs:{target:"_blank",href:"https://tweeter-tracker.herokuapp.com/"}},[t._v("View Site")])])])]),a("p",{staticClass:"description"},[t._v("\n        A website to track the occurrences of a given keyword on Twitter in real time.\n        This project was built using Python (Flask) with web sockets as a backend,\n        and React.js with Redux on the frontend.\n      ")])])}],W=new s["a"]({paused:!0}),H=new s["a"]({paused:!0}),B={beforeRouteLeave:function(t,e,a){W.clear(),H.to(this.$refs.homeLink,1.5,{y:-70,opacity:0},0).to(this.$refs.motionPy,1.5,{y:-70,opacity:0},0).to(this.$refs.ucfParking,1.5,{x:70,opacity:0},0).to(this.$refs.tweetTracker,1.5,{y:70,opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){H.clear(),W.fromTo(this.$refs.homeLink,2,{y:-70,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.motionPy,2,{x:70,opacity:0},{x:0,opacity:1},0).fromTo(this.$refs.ucfParking,2,{y:70,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.tweetTracker,2,{x:-70,opacity:0},{x:0,opacity:1},0).delay(.5).play()}},U=B,G=(a("efbd"),Object(u["a"])(U,V,J,!1,null,"708714e7",null)),D=G.exports,K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"contact"}},[a("div",{ref:"linkContainer",attrs:{id:"link-container"}},[a("router-link",{attrs:{to:"/",tag:"span"}},[t._v("Home")])],1),a("div",{ref:"imgContainer",attrs:{id:"container"}},[t._m(0),t._m(1),t._m(2),t._m(3)])])},q=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff"}},[r("img",{attrs:{src:a("917e"),alt:"Github",title:"Github"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{attrs:{href:"mailto:dev.ctcuff@gmail.com"}},[r("img",{attrs:{src:a("7711"),alt:"Email",title:"Email"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{attrs:{href:"https://www.linkedin.com/in/cameron-cuff-126405161/",target:"_blank"}},[r("img",{attrs:{src:a("d84c"),alt:"linkedin",title:"linkedin"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("a",{attrs:{href:"../cuff_resume.pdf",target:"_blank"}},[r("img",{attrs:{src:a("c8ae"),alt:"Resume",title:"Resume"}})])}],z=(a("ac6a"),new s["a"]({paused:!0})),N=new s["a"]({paused:!0}),Q={data:function(){return{linkChildren:[],isMobile:window.innerWidth<=500}},beforeRouteLeave:function(t,e,a){var r=this.linkChildren,i=this.isMobile;z.clear(),N.fromTo(this.$refs.linkContainer,2,{y:0,opacity:1},{y:-40,opacity:0},0),i?N.fromTo(r[0],2,{y:0,opacity:1},{y:-70,opacity:0},0).fromTo(r[1],2,{x:0,opacity:1},{x:-70,opacity:0},0).fromTo(r[2],2,{x:0,opacity:1},{x:70,opacity:0},0).fromTo(r[3],2,{y:0,opacity:1},{y:70,opacity:0},0):N.fromTo(r[0],2,{x:0,opacity:1},{x:-70,opacity:0},0).fromTo(r[1],2,{y:0,opacity:1},{y:-70,opacity:0},0).fromTo(r[2],2,{y:0,opacity:1},{y:70,opacity:0},0).fromTo(r[3],2,{x:0,opacity:1},{x:70,opacity:0},0),N.to(this.$refs.linkContainer,1.5,{y:-40,opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){var t=this.linkChildren,e=this.isMobile;N.clear(),Array.prototype.forEach.call(this.$refs.imgContainer.children,function(e){t.push(e.firstElementChild)}),e?z.fromTo(this.$refs.linkContainer,2,{y:-40,opacity:0},{y:0,opacity:1},0).fromTo(t[0],2,{y:-70,opacity:0},{y:0,opacity:1},0).fromTo(t[1],2,{x:-70,opacity:0},{x:0,opacity:1},.4).fromTo(t[2],2,{x:70,opacity:0},{x:0,opacity:1},.8).fromTo(t[3],2,{y:70,opacity:0},{y:0,opacity:1},1.2):z.fromTo(this.$refs.linkContainer,2,{y:-40,opacity:0},{y:0,opacity:1},0).fromTo(t[0],2,{x:-70,opacity:0},{x:0,opacity:1},0).fromTo(t[1],2,{y:-70,opacity:0},{y:0,opacity:1},.4).fromTo(t[2],2,{y:70,opacity:0},{y:0,opacity:1},.8).fromTo(t[3],2,{x:70,opacity:0},{x:0,opacity:1},1.2),z.delay(.5).play()}},X=Q,Y=(a("ccac"),Object(u["a"])(X,K,q,!1,null,"48176b66",null)),Z=Y.exports;r["a"].use(g["a"]);var tt=new g["a"]({routes:[{path:"/",component:P},{path:"/about",component:L},{path:"/projects",component:D},{path:"/contact",component:Z}]}),et=a("9ce6");a("b751"),et["a"];r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(b)},router:tt}).$mount("#app")},6294:function(t,e,a){},7711:function(t,e,a){t.exports=a.p+"img/email.ca821b14.svg"},"917e":function(t,e,a){t.exports=a.p+"img/github.76d344f0.svg"},"92ef":function(t,e,a){t.exports=a.p+"img/avatar.8b496b54.jpg"},"9da6":function(t,e,a){},b751:function(t,e,a){},c8ae:function(t,e,a){t.exports=a.p+"img/resume.27c242bb.svg"},ccac:function(t,e,a){"use strict";var r=a("e452"),i=a.n(r);i.a},d84c:function(t,e,a){t.exports=a.p+"img/linked-in.1fe3be0e.svg"},dca7:function(t,e,a){},e452:function(t,e,a){},efbd:function(t,e,a){"use strict";var r=a("6294"),i=a.n(r);i.a},f636:function(t,e,a){"use strict";var r=a("9da6"),i=a.n(r);i.a}});