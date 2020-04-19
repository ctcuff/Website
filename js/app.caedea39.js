(function(t){function e(e){for(var i,n,s=e[0],c=e[1],l=e[2],p=0,u=[];p<s.length;p++)n=s[p],r[n]&&u.push(r[n][0]),r[n]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);f&&f(e);while(u.length)u.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],i=!0,s=1;s<a.length;s++){var c=a[s];0!==r[c]&&(i=!1)}i&&(o.splice(e--,1),t=n(n.s=a[0]))}return t}var i={},r={app:0},o=[];function n(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=i,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(a,i,function(e){return t[e]}.bind(null,i));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var f=c;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var i=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Sidebar"),a("div",{attrs:{id:"wrapper"}},[a("router-view")],1)],1)},o=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",{ref:"sidebar"},[a("div",{ref:"linkContainer",attrs:{id:"flex"}},[a("router-link",{attrs:{to:"/about"}},[t._v("About")]),a("router-link",{attrs:{to:"/projects"}},[t._v("Projects")]),a("router-link",{attrs:{to:"/contact"}},[t._v("Contact")])],1)])},s=[],c=a("2346"),l=new c["a"]({paused:!0}),f={mounted:function(){l.fromTo(this.$refs.sidebar,1,{width:0,opacity:0},{width:40,opacity:1},0).staggerFromTo(this.$refs.linkContainer.children,1.5,{opacity:0},{opacity:1,stagger:.5}).delay(.5).play()}},p=f,u=(a("d847"),a("2877")),d=Object(u["a"])(p,n,s,!1,null,"25492316",null),y=d.exports,h={components:{Sidebar:y}},m=h,v=(a("f636"),Object(u["a"])(m,r,o,!1,null,"65b05f88",null)),b=v.exports,g=a("8c4f"),k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{ref:"headerTop",staticClass:"header",attrs:{id:"top"}},[t._v("Cameron")]),a("h1",{ref:"headerBottom",staticClass:"header",attrs:{id:"bottom"}},[t._v("Cuff")]),a("div",{attrs:{id:"center"}},[a("div",{ref:"textWrapper"},t._l(t.landingText.split(" "),(function(e,i){return a("span",{key:i},[t._v("\n        "+t._s(e)+"\n      ")])})),0)])])},_=[],w=1.5,C=new c["a"]({paused:!0}),x=new c["a"]({paused:!0}),T={data:function(){return{landingText:"Hello, welcome to my portfolio."}},beforeRouteLeave:function(t,e,a){x.staggerTo(this.$refs.textWrapper.children,1,{y:20,opacity:0,stagger:-.2},0).to(this.$refs.headerTop,1,{y:-70,opacity:0},0).to(this.$refs.headerBottom,1,{y:70,opacity:0},0).eventCallback("onComplete",a).play(),C.clear()},mounted:function(){x.clear(),C.fromTo(this.$refs.headerTop,w,{y:-110,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.headerBottom,w,{y:110,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.textWrapper.children[0],1,{y:-20,opacity:0},{y:0,opacity:1},w-.5).staggerFromTo(Array.prototype.slice.call(this.$refs.textWrapper.children,1),.5,{y:-10,opacity:0},{y:0,opacity:1,stagger:.2},2).delay(.5).play()}},$=T,j=(a("9f10"),Object(u["a"])($,k,_,!1,null,"24741921",null)),P=j.exports,E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"about"}},[i("h1",{ref:"header"},[t._v("About")]),i("div",{ref:"linkContainer",attrs:{id:"link-container"}},[i("router-link",{staticClass:"link",attrs:{to:"/",tag:"p"}},[t._v("Home")])],1),i("div",{attrs:{id:"center"}},[i("div",{ref:"image",attrs:{id:"image-placeholder"}},[i("img",{attrs:{src:a("92ef"),alt:"profile image"}})]),i("p",{ref:"aboutText"},[t._v("\n      Hey there, my name is Cameron Cuff. I'm a Junior studying Computer\n      Science at the University of Central Florida. I originally started at\n      the University of North Florida in 2017 majoring in music performance,\n      but I decided to take a risk and change my major to computer science.\n      After finding out that I actually enjoyed it, I decided to transfer to\n      UCF in the fall of 2018. I currently work as a Web Applications Developer\n      for the\n      "),i("a",{attrs:{href:"https://techrangers.cdl.ucf.edu/about.html",target:"_blank"}},[t._v("\n        Center for Distributed Learning at UCF\n      ")]),t._v(".\n      I enjoy programming in Java, Python, and Javascript and I'm learning\n      about React, Vue, and Go for backend tasks. In my free time,\n      I love to play piano and clarinet.\n    ")])])])},O=[],L=a("2e20"),F=a("58f1"),I=a.n(F),A=new c["a"]({paused:!0}),R=new c["a"]({paused:!0}),S={beforeRouteLeave:function(t,e,a){var i=1;A.clear(),R.to(this.$refs.header,i,{y:100,opacity:0},0).to(this.$refs.aboutText,i,{x:-40,opacity:0},0).to(this.$refs.image,i,{x:40,opacity:0},0).to(this.$refs.linkContainer,i,{y:-40,opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){I.a.init(this.$refs.image,{speed:1e3,gyroscope:!0}),R.clear(),A.fromTo(this.$refs.aboutText,2,{opacity:0,y:50},{opacity:1,y:0},0).fromTo(this.$refs.image,2,{opacity:0,y:-50},{opacity:1,y:0},0).fromTo(this.$refs.header,2,{opacity:0,y:143},{opacity:1,y:22},.5).fromTo(this.$refs.linkContainer,2,{opacity:0,x:-50},{opacity:1,x:0},1.5).to(this.$refs.linkContainer,1.5,{width:"100%",ease:L["c"].easeInOut},2).play()}},V=S,M=(a("9cd6"),Object(u["a"])(V,E,O,!1,null,"1f99ba1a",null)),W=M.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"projects"}},[a("div",{ref:"homeLink"},[a("router-link",{staticClass:"router-link",attrs:{to:"/",tag:"p"}},[t._v("Home")])],1),a("section",{ref:"motionPy",staticClass:"flex",attrs:{id:"motion-py"}},[t._m(0)]),a("section",{ref:"ucfParking"},[t._m(1)]),a("section",{ref:"tweetTracker"},[t._m(2)]),a("section",{ref:"livecode"},[t._m(3)]),a("a",{ref:"portfolioLink",staticClass:"router-link",attrs:{href:"https://github.com/ctcuff/ctcuff.github.io",target:"_blank"}},[t._v("\n    View code for this site\n  ")])])},J=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex"},[a("div",[a("h1",[t._v("MotionPy")]),a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/MotionPy"}},[t._v("View Code")])])]),a("p",{staticClass:"description"},[t._v("\n        A motion detection system using a Raspberry Pi 3, camera module, breadboard, some paper\n        clips and a top-of-the-line cardboard box. A Python server (surprise surprise, it's Flask again)\n        running on the Raspberry Pi sends an Android app, written in Java and Kotlin, a notification\n        and a picture when movement is detected. Images are saved online using Firebase database.\n      ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",attrs:{id:"ucf-parking"}},[a("p",{staticClass:"description"},[t._v("\n        A website along with an api that tracks how full each parking garage is.\n        Every hour, a scraper scrapes UCF's parking site and saves it to a MongoDB database.\n        The backend was created using Python (Flask, again) and the frontend, Vue.js.\n      ")]),a("div",[a("h1",[t._v("UCFParking")]),a("div",{staticClass:"link-wrapper"},[a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/UCFParking-Web"}},[t._v("View Code")])]),a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://ucfgarages.com/"}},[t._v("View Site")])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",attrs:{id:"tweet-tracker"}},[a("div",[a("h1",[t._v("Tweet-Tracker")]),a("div",{staticClass:"link-wrapper"},[a("p",{staticClass:"link tweet-tracker-link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/Tweet-Tracker"}},[t._v("View Code")])]),a("p",{staticClass:"link tweet-tracker-link"},[a("a",{attrs:{target:"_blank",href:"https://tweeter-tracker.herokuapp.com/"}},[t._v("View Site")])])])]),a("p",{staticClass:"description"},[t._v("\n        A website to track the occurrences of a given keyword on Twitter in real time.\n        This project was built using Python (Flask) with web sockets as a backend,\n        and React.js with Redux on the frontend.\n      ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex",attrs:{id:"livecode"}},[a("p",{staticClass:"description"},[t._v("\n        Why code by yourself when you can do it with other people? LiveCode is a website that lets\n        multiple users connect to another user's workspace and edit code together. The backend\n        is hosted using Firebase and the front-end was built using Vue.js.\n      ")]),a("div",[a("h1",[t._v("LiveCode")]),a("div",{staticClass:"link-wrapper"},[a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff/LiveCode"}},[t._v("View Code")])]),a("p",{staticClass:"link"},[a("a",{attrs:{target:"_blank",href:"https://ctcuff.github.io/LiveCode"}},[t._v("View Site")])])])])])}],H=new c["a"]({paused:!0}),B=new c["a"]({paused:!0}),D={beforeRouteLeave:function(t,e,a){H.clear(),B.to(this.$refs.homeLink,1.5,{y:-70,opacity:0},0).to(this.$refs.motionPy,1.5,{y:-70,opacity:0},0).to(this.$refs.ucfParking,1.5,{x:70,opacity:0},0).to(this.$refs.tweetTracker,1.5,{y:-70,opacity:0},0).to(this.$refs.livecode,1.5,{y:70,opacity:0},0).to(this.$refs.portfolioLink,1.5,{opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){B.clear(),H.fromTo(this.$refs.homeLink,2,{y:-70,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.motionPy,2,{x:70,opacity:0},{x:0,opacity:1},0).fromTo(this.$refs.ucfParking,2,{y:70,opacity:0},{y:0,opacity:1},0).fromTo(this.$refs.tweetTracker,2,{x:-70,opacity:0},{x:0,opacity:1},0).fromTo(this.$refs.livecode,2,{x:70,opacity:0},{x:0,opacity:1},0).fromTo(this.$refs.portfolioLink,2,{opacity:0},{opacity:1},0).delay(.5).play()}},G=D,K=(a("c082"),Object(u["a"])(G,U,J,!1,null,"4beda632",null)),N=K.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"contact"}},[a("div",{ref:"linkContainer",attrs:{id:"link-container"}},[a("router-link",{attrs:{to:"/",tag:"span"}},[t._v("Home")])],1),a("div",{ref:"imgContainer",attrs:{id:"container"}},[t._m(0),t._m(1),t._m(2),t._m(3)])])},z=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{attrs:{target:"_blank",href:"https://github.com/ctcuff"}},[i("img",{attrs:{src:a("917e"),alt:"Github",title:"Github"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{attrs:{href:"mailto:dev.ctcuff@gmail.com"}},[i("img",{attrs:{src:a("7711"),alt:"Email",title:"Email"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{attrs:{href:"https://www.linkedin.com/in/cameron-cuff-126405161/",target:"_blank"}},[i("img",{attrs:{src:a("d84c"),alt:"linkedin",title:"linkedin"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("a",{attrs:{href:"../cuff_resume.pdf",target:"_blank"}},[i("img",{attrs:{src:a("c8ae"),alt:"Resume",title:"Resume"}})])}],Q=(a("ac6a"),new c["a"]({paused:!0})),X=new c["a"]({paused:!0}),Y={data:function(){return{linkChildren:[],isMobile:window.innerWidth<=500}},beforeRouteLeave:function(t,e,a){var i=this.linkChildren,r=this.isMobile;Q.clear(),X.fromTo(this.$refs.linkContainer,2,{y:0,opacity:1},{y:-40,opacity:0},0),r?X.fromTo(i[0],2,{y:0,opacity:1},{y:-70,opacity:0},0).fromTo(i[1],2,{x:0,opacity:1},{x:-70,opacity:0},0).fromTo(i[2],2,{x:0,opacity:1},{x:70,opacity:0},0).fromTo(i[3],2,{y:0,opacity:1},{y:70,opacity:0},0):X.fromTo(i[0],2,{x:0,opacity:1},{x:-70,opacity:0},0).fromTo(i[1],2,{y:0,opacity:1},{y:-70,opacity:0},0).fromTo(i[2],2,{y:0,opacity:1},{y:70,opacity:0},0).fromTo(i[3],2,{x:0,opacity:1},{x:70,opacity:0},0),X.to(this.$refs.linkContainer,1.5,{y:-40,opacity:0},0).eventCallback("onComplete",a).play()},mounted:function(){var t=this.linkChildren,e=this.isMobile;X.clear(),Array.prototype.forEach.call(this.$refs.imgContainer.children,(function(e){t.push(e.firstElementChild)})),e?Q.fromTo(this.$refs.linkContainer,2,{y:-40,opacity:0},{y:0,opacity:1},0).fromTo(t[0],2,{y:-70,opacity:0},{y:0,opacity:1},0).fromTo(t[1],2,{x:-70,opacity:0},{x:0,opacity:1},.4).fromTo(t[2],2,{x:70,opacity:0},{x:0,opacity:1},.8).fromTo(t[3],2,{y:70,opacity:0},{y:0,opacity:1},1.2):Q.fromTo(this.$refs.linkContainer,2,{y:-40,opacity:0},{y:0,opacity:1},0).fromTo(t[0],2,{x:-70,opacity:0},{x:0,opacity:1},0).fromTo(t[1],2,{y:-70,opacity:0},{y:0,opacity:1},.4).fromTo(t[2],2,{y:70,opacity:0},{y:0,opacity:1},.8).fromTo(t[3],2,{x:70,opacity:0},{x:0,opacity:1},1.2),Q.delay(.5).play()}},Z=Y,tt=(a("6a66"),Object(u["a"])(Z,q,z,!1,null,"9fea26ac",null)),et=tt.exports;i["a"].use(g["a"]);var at=new g["a"]({routes:[{path:"/",component:P},{path:"/about",component:W},{path:"/projects",component:N},{path:"/contact",component:et}]}),it=a("9ce6");a("b751"),it["a"];i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(b)},router:at}).$mount("#app")},"68c3":function(t,e,a){},"6a66":function(t,e,a){"use strict";var i=a("6f57"),r=a.n(i);r.a},"6f57":function(t,e,a){},7711:function(t,e,a){t.exports=a.p+"img/email.ca821b14.svg"},"81ed":function(t,e,a){},"917e":function(t,e,a){t.exports=a.p+"img/github.76d344f0.svg"},"92ef":function(t,e,a){t.exports=a.p+"img/avatar.8b496b54.jpg"},"9cd6":function(t,e,a){"use strict";var i=a("81ed"),r=a.n(i);r.a},"9da6":function(t,e,a){},"9f10":function(t,e,a){"use strict";var i=a("eccf"),r=a.n(i);r.a},b751:function(t,e,a){},c082:function(t,e,a){"use strict";var i=a("68c3"),r=a.n(i);r.a},c1bd:function(t,e,a){},c8ae:function(t,e,a){t.exports=a.p+"img/resume.27c242bb.svg"},d847:function(t,e,a){"use strict";var i=a("c1bd"),r=a.n(i);r.a},d84c:function(t,e,a){t.exports=a.p+"img/linked-in.1fe3be0e.svg"},eccf:function(t,e,a){},f636:function(t,e,a){"use strict";var i=a("9da6"),r=a.n(i);r.a}});