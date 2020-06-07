import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/AggregateSignature.json";


const App = {
    web3: null,
    account: null,
    meta: null,

    start: async function() {
      const { web3 } = this;
      
      try {
        // get contract instance
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = metaCoinArtifact.networks[networkId];
        this.meta = new web3.eth.Contract(
          metaCoinArtifact.abi,
          deployedNetwork.address,
        );

        // get accounts
        const accounts = await web3.eth.getAccounts();
        this.account = accounts[0];

        this.refreshBalance();
      } catch (error) {
        console.error("Could not connect to contract or chain.");
      }
    },




  Random: function(){
  return Math.round(Math.random()*(100-1)+1);
},

  InfoCheck: function(){
    var info = document.getElementById("info").value;
    if(info=="") alert("请输入合同信息！");
    else alert("输入成功");

},





  SingleSignatureGenerate1: async function() {                  //单一用户进行签名

    
   
   
    this.sign_flag1="已签名";    
    this.verify_flag1="通过验证";
    this.ctr_1=1;
    
    const info="BlockChainAggregateSignature";
    const random_num1=this.Random();
    const privatekey1=await this.meta.methods.make_privatekey(random_num1).call();
    const address1=document.getElementById("address1");//地址
    address1.innerHTML='0x'+privatekey1.substr(24,20)+"<br>"+privatekey1.substr(44,20);
    const signcontent1=document.getElementById("signcontent1");//(m,ri)
    const r1_temp=await this.meta.methods.r1_Generate().call();//r1
    const r1=await this.meta.methods.hash(r1_temp).call();
    signcontent1.innerHTML="( "+info+" , "+"<br>"+r1.substr(0,32)+"<br>"+r1.substr(32,32)+" )";

    
    const status1=document.getElementById("status1");//发送状态
    status1.innerHTML="发送至Uc中...";
    var t1 = window.setTimeout(function() {
    document.getElementById("status1").innerHTML="发送完成"
    },500);
    
  },
  
  
   SingleSignatureGenerate2: async function() {                  //单一用户进行签名
  
  
      
      this.sign_flag2="已签名";    
      this.verify_flag2="通过验证";
      this.ctr_2=1;
      const info="BlockChainAggregateSignature";
      const random_num2=this.Random();
      const privatekey2=await this.meta.methods.make_privatekey(random_num2).call();
      const address2=document.getElementById("address2");//地址
      address2.innerHTML='0x'+privatekey2.substr(24,20)+"<br>"+privatekey2.substr(44,20);

      const signcontent2=document.getElementById("signcontent2");//(m,ri)
      const r2_temp=await this.meta.methods.r2_Generate().call();//r2
      const r2=await this.meta.methods.hash(r2_temp).call();
      signcontent2.innerHTML="( "+info+" , "+"<br>"+r2.substr(0,32)+"<br>"+r2.substr(32,32)+" )";
    
      const status2=document.getElementById("status2");//发送状态
      status2.innerHTML="发送至Uc中...";
      var t2 = window.setTimeout(function() {
      document.getElementById("status2").innerHTML="发送完成"
      },500);
      
    },
    
   SingleSignatureGenerate3: async function() {                  //单一用户进行签名
   
   
      this.sign_flag3="已签名";    
      this.verify_flag3="通过验证";
      this.ctr_3=1;
      const info="BlockChainAggregateSignature";
      const random_num3=this.Random();
      const privatekey3=await this.meta.methods.make_privatekey(random_num3).call();//公私钥生成
      const address3=document.getElementById("address3");//地址
      address3.innerHTML='0x'+privatekey3.substr(24,20)+"<br>"+privatekey3.substr(44,20);

      const signcontent3=document.getElementById("signcontent3");//(m,ri)
      const r3_temp=await this.meta.methods.r3_Generate().call();//r3
      const r3=await this.meta.methods.hash(r3_temp).call();
      signcontent3.innerHTML="( "+info+" , "+"<br>"+r3.substr(0,32)+"<br>"+r3.substr(32,32)+" )";
     
      const status3=document.getElementById("status3");//发送状态
      status3.innerHTML="发送至Uc中...";
      var t3 = window.setTimeout(function() {
      document.getElementById("status3").innerHTML="发送完成"
      },500);
      
    },
  


  WhetherSingleSignature: async function() {                   //每个用户是否签名?
    const whethersign1=document.getElementById("ifsign1");
    whethersign1.innerHTML= this.sign_flag1;
    
    const whethersign2=document.getElementById("ifsign2");
    whethersign2.innerHTML = this.sign_flag2;
    
    const whethersign3=document.getElementById("ifsign3");
    whethersign3.innerHTML = this.sign_flag3;
  },
  
  
  SingleSignatureVerify: async function() {                  //单一用户签名验证
  
   const verify1=document.getElementById("verify1");
   verify1.innerHTML = this.verify_flag1;
   const verify2=document.getElementById("verify2");
   verify2.innerHTML = this.verify_flag2;
   const verify3=document.getElementById("verify3");
   verify3.innerHTML = this.verify_flag3;

   this.ctr_MutiGen=1;
    },
    
    
  MutiSignatureGenerate: async function() {                  //生成聚合签名
        const MutiSign=document.getElementById("MutiSign");
       
        
        
        const r1=await this.meta.methods.r1_Generate().call();//r1
        const r2=await this.meta.methods.r2_Generate().call();//r2
        const r3=await this.meta.methods.r3_Generate().call();//r3
        
       
        
        var s1=await this.meta.methods.s1_Generate(r2,r3).call();
        var s2=await this.meta.methods.s2_Generate(r1,r3).call();
        var s3=await this.meta.methods.s3_Generate(r1,r2).call();

        var value_temp=await this.meta.methods.Uc_MutiSignGenerate(s1,s2,s3).call();
        var value=await this.meta.methods.hash(value_temp).call();
        
        if(this.ctr_MutiGen!=1||this.ctr_1!=1||this.ctr_2!=1||this.ctr_3!=1) alert("请先完成之前的步骤！");
        else {
          MutiSign.innerHTML = value;
          this.ctr_MutiVer=1;
        }

      },
      
      
      
  MutiSignatureVerify: async function() {                  //聚合签名验证
        const MutiSignatureVerify=document.getElementById("MutiVerify");
         if(this.ctr_MutiVer!=1) alert("请先完成之前的步骤！");
          else MutiSignatureVerify.innerHTML =  "通过验证";

        },


  Blind_MutiSignatureGenerate: async function() {                  //生成聚合签名

              const s_1=document.getElementById("test1").innerText;//!!!!!
              const s_2=document.getElementById("test2").innerText;//!!!!!
              const s_3=document.getElementById("test2").innerText;//!!!!!
              
              const Blind_MutiSign=document.getElementById("Blind_MutiSign");
              var value_temp=await this.meta.methods.Uc_Blind_MutiSignGenerate(s_1,s_2,s_3).call();
            //  var value=await this.meta.methods.hash(value_temp).call();
              Blind_MutiSign.innerHTML = value_temp;

            },



  };

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
