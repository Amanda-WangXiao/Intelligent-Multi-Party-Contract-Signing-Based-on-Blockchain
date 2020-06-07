pragma solidity ^0.5.16;
contract AggregateSignature {
  uint p=23;//a big prime number
  uint fai_p;
  uint g=5;//a random multiplication generator

  bytes32 x1;//private key
  bytes32 x2;
  bytes32 x3;
  
  uint y1;//public key
  uint y2;
  uint y3;

  uint k1;
  uint k2;
  uint k3;
  
  string message="BlockChainAggregateSignature";
  
  uint s1;//to be caculated
  uint s2;
  uint s3;

  
//----------------------------------------------------------------------------------------  

//----------------------------------------------------------------------------------------  

  constructor()public{
  fai_p=p-1;

  }
  
//----------------------------------------------------------------------------------------  

    function make_privatekey(uint num) public pure returns(bytes32){
    uint random=num;
    uint a=random%100;
    bytes32 privatekey=keccak256(abi.encodePacked(a));
    return privatekey;
}
//----------------------------------------------------------------------------------------  

  function public_private_key1 (bytes32 privatekey) public returns(bytes32){
  x1=privatekey;
  y1=mulmod(g**uint(x1), 1, p);
  return x1;
  }
  
  function r1_Generate () public returns(uint){
  k1=1;
  uint r1=mulmod(g**k1, 1, p);
  return r1;
  }

  
  function s1_Generate (uint r_2,uint r_3) public returns(uint){
   uint r_1=r1_Generate();
   uint r1=r_1;
   uint r2=r_2;
   uint r3=r_3;
   uint R=mulmod(r1**r1, 1, p)*mulmod(r2**r2, 1, p)*mulmod(r3**r3, 1, p);
   bytes32 hashmsg=keccak256(abi.encodePacked(message));// the message to be conveyed
   uint hashnum=uint(hashmsg);
   s1=(R+hashnum)*(uint(x1))-mulmod(r1,k1,fai_p);
   return s1;
  }
//----------------------------------------------------------------------------------------  

  function public_private_key2 (bytes32 privatekey) public returns(bytes32){
  x2=privatekey;
  y2=mulmod(g**uint(x2), 1, p);
  return x2;
  }
  
  function r2_Generate () public returns(uint){
  k2=3;
  uint r2=mulmod(g**k2, 1, p);
  return r2;
  }

  function s2_Generate (uint r_1,uint r_3) public returns(uint){
   uint r_2=r2_Generate();
   uint r1=r_1;
   uint r2=r_2;
   uint r3=r_3;
   uint R=mulmod(r1**r1, 1, p)*mulmod(r2**r2, 1, p)*mulmod(r3**r3, 1, p);
   bytes32 hashmsg=keccak256(abi.encodePacked(message));// the message to be conveyed
   uint hashnum=uint(hashmsg);
   s2=(R+hashnum)*(uint(x2))-mulmod(r2,k2,fai_p);
   return s2;
  }
//----------------------------------------------------------------------------------------  

  function public_private_key3 (bytes32 privatekey) public returns(bytes32){
  x3=privatekey;
  y3=mulmod(g**uint(x3), 1, p);
  return x3;
  }
  
  function r3_Generate () public returns(uint){
  k3=5;
  uint r3=mulmod(g**k3, 1, p);
  return r3;
  }
  
  function s3_Generate (uint r_1,uint r_2) public returns(uint){
   uint r_3=r3_Generate();
   uint r1=r_1;
   uint r2=r_2;
   uint r3=r_3;
   uint R=mulmod(r1**r1, 1, p)*mulmod(r2**r2, 1, p)*mulmod(r3**r3, 1, p);
   bytes32 hashmsg=keccak256(abi.encodePacked(message));// the message to be conveyed
   uint hashnum=uint(hashmsg);
   s3=(R+hashnum)*(uint(x3))-mulmod(r3,k3,fai_p);
   return s3;
  }
//----------------------------------------------------------------------------------------  
  
  function Uc_SignVerify () public returns(bool,bool,bool){
 
  uint r1=r1_Generate();
  uint r2=r2_Generate();
  uint r3=r3_Generate();
  uint R=mulmod(r1**r1, 1, p)*mulmod(r2**r2, 1, p)*mulmod(r3**r3, 1, p);
  bool flag1;
  bool flag2;
  bool flag3;
   bytes32 hashmsg=keccak256(abi.encodePacked(message));// the message to be conveyed
   uint hashnum=uint(hashmsg);
  if((r1**r1)*(g**s1)==mulmod(y1**(hashnum+R),1,p)) flag1=true;
  if((r2**r2)*(g**s2)==mulmod(y2**(hashnum+R),1,p)) flag2=true;
  if((r3**r3)*(g**s3)==mulmod(y3**(hashnum+R),1,p)) flag3=true;
  return (flag1,flag2,flag3);
  }
  
 
//----------------------------------------------------------------------------------------  

  function Uc_MutiSignGenerate (uint s_1,uint s_2,uint s_3) public view returns(uint){
  uint S;//MutiSignature
  S=mulmod((s_1+s_2+s_3), 1, fai_p);
  return S;
  }
  
  function Uv_MutiSignVerify (uint S) public  returns(bool){
  uint r1=r1_Generate();
  uint r2=r2_Generate();
  uint r3=r3_Generate();
   bytes32 hashmsg=keccak256(abi.encodePacked(message));// the message to be conveyed
   uint hashnum=uint(hashmsg);
  uint R=mulmod(r1**r1, 1, p)*mulmod(r2**r2, 1, p)*mulmod(r3**r3, 1, p);
  bool Mutiflag;
  uint a=R*(g**S);
  uint b=(y1**(hashnum+R))*(y2**(hashnum+R))*(y3**(hashnum+R));
  if(a==b) Mutiflag=true;
  else Mutiflag=false;
  return Mutiflag;
  }

//----------------------------------------------------------------------------------------  
  
  function Uc_Blind_MutiSignGenerate (uint s_1,uint s_2,uint s_3) public view returns(uint){
  uint S;//BlindMutiSignature
  S=mulmod((s_1+s_2+s_3), 1, fai_p);
  return S;
  }
  
  
//----------------------------------------------------------------------------------------  
  function hash(uint a) public pure returns(bytes32){
  bytes32 hash_a=keccak256(abi.encodePacked(a));
  return hash_a;
  }
  
}

