"use strict";(self["webpackChunkvendisc_front"]=self["webpackChunkvendisc_front"]||[]).push([[85],{5085:function(t,a,s){s.r(a),s.d(a,{default:function(){return d}});var e=function(){var t=this,a=t._self._c;return a("div",{staticClass:"user"},[a("div",{staticClass:"container"},[a("div",{staticClass:"user-panel"},[a("div",{staticClass:"back"},[a("router-link",{attrs:{to:"/"}},[a("box-icon",{attrs:{name:"arrow-back"}})],1)],1),a("h1",{staticClass:"title mb"},[t._v(" Welcome "),a("b",[t._v(t._s(t.nickname))])]),a("div",{staticClass:"flex mb"},[a("WaveBall",{staticClass:"wave-ball",attrs:{rate:Number(t.$store.getters.capacityRatio),bSize:120,fontSize:"1.6rem",waveColor:"#71eabe",fontColor:"#02B875"}})],1),a("div",{staticClass:"flex mb"},[t._v(" Capacity Ratio:   "),a("div",[t._v(t._s(t.calculateSize(t.$store.state.file.usedCapacity))+" / "+t._s(t.calculateSize(t.$store.getters.capacity)))])]),a("vs-button",{staticClass:"mb",attrs:{block:"",border:"",color:"",loading:t.loading},on:{click:function(a){return t.logout()}}},[t._v(" Logout ")]),a("div",{staticClass:"new"},[t._v(" Change Password? "),a("router-link",{attrs:{to:"/pwd"}},[t._v("Click Here")])],1)],1)])])},i=[],o=(s(7658),s(3822)),l=s(1399),c={data:()=>({loading:!1}),computed:{...(0,o.rn)({nickname:t=>t.user.info?.uname})},methods:{calculateSize:l.M,async logout(){try{this.loading=!0,await this.$store.dispatch("userLogout"),this.$router.push("/login")}catch(t){console.log(t)}finally{this.loading=!1}}}},r=c,n=s(1001),u=(0,n.Z)(r,e,i,!1,null,"2cdedf11",null),d=u.exports}}]);
//# sourceMappingURL=85.700006c0.js.map