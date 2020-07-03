# Dapp: A Multi-Party Contract Signing System
Graduation Design
  
With the development of Internet Technology and the change of people's life pattern, the informative and efficient office mode is becoming more and more popular. Traditional contract signing always requires a trusted third party to provide supervision, and each signatory party cannot avoid the harm caused by the third party's disclosure of contract information for profit. Meanwhile, the ultimate depositor has to save the contract and the signatures of all signatories, which is easy to cause a waste of storage resources.
  
The Multi-Party Contract Signing System proposed and designed in this paper takes advantage of the characteristics of Blockchain itself: Blockchain has a consensus algorithm mechanism that enables decentralized nodes to establish trust, so it functions as a trusted third party, thus eliminating the potential unfairness brought by the third party. At the same time, the system can generate aggregate signatures based on discrete logarithms, so that the final depositor only needs to store the contract and a aggregate signature, which reduces the huge demand for storage space. In addition, the fact that it is almost impossible to modify Blockchain after it is written makes it impossible for signatories to back out.
  
On the other hand, in addition to fulfilling the original requirements, this design proposes a multi-party contract signing system with blindness for the application requirements of high privacy. Compared with the first version of the system (Fair  Signing System), this system (Privacy Signing System) focuses more on the protection of users' privacy. The Privacy Signing System blind the contract message and the user's identity based on the mixed key, which can meet the contract signing requirements of some signatories who need anonymity. Compared with the fairness and traceability emphasized in the first version, this version lays more emphasis on the privacy and confidentiality of user information, meeting the requirements of different users for the contract signing system.
  
随着互联网技术的发展与人们生活模式的改变，信息化、高效率的办公方式越来越受到青睐。传统的合同签署总是需要一个可信第三方提供监督，各签署方无法避免第三方为牟利而泄露合同信息带来的危害；并且最终保存者不得不保存合同以及所有签署方的签名，这又容易造成存储资源浪费。
  
本论文中提出并设计的区块链多方合同签署系统，利用了区块链本身的特性：区块链拥有可以令分散节点建立起信任的共识算法机制，因此其在功能上就相当于一个可信第三方，这样就消除了第三方带来的潜在不公平；同时，该系统又可以基于离散对数生成聚合签名，这样最终保存者仅需存储合约及一个聚合签名即可，这减少了对于存储空间的巨大需求。此外，由于区块链写入后几乎不可能修改的特性，也杜绝了签署方反悔的可能。
  
另一方面，本设计除了完成原有要求，针对高隐私性应用需求，提出了一种带有盲化的多方合同签署系统。该系统（隐私性签署系统）相比初版系统（公平性签署系统），更加侧重用户的隐私保护。隐私性签署系统基于混密钥的方式对合同消息与用户身份进行了盲化，这样可以满足一部分签署方需要匿名的合同签署需求。相比初版系统强调的公平性、可追溯性，该版本更加强调用户信息的隐私性、保密性，满足了不同用户对于合同签署系统的要求。
  
# Environment  
macOS Catalina 10.15.5  
Truffle v5.1.20  
Solidity v0.5.17  
npm v6.14.4  


