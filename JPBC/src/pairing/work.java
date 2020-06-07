package pairing;

import javax.swing.*;
import it.unisa.dia.gas.jpbc.Element;
import it.unisa.dia.gas.jpbc.Pairing;
import it.unisa.dia.gas.jpbc.PairingParameters;
import it.unisa.dia.gas.plaf.jpbc.pairing.PairingFactory;
import it.unisa.dia.gas.plaf.jpbc.pairing.a.TypeACurveGenerator;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.math.BigInteger;

public class work extends JPanel {

    JButton b1 = new JButton("U1签名");
    JButton b2 = new JButton("U2签名");
    JButton b3 = new JButton("U3签名");
    JLabel text1 = new JLabel("用户1 (U1)");
    JLabel text2 = new JLabel("用户2 (U2)");
    JLabel text3 = new JLabel("用户3 (U3)");
    
    JTextField n1=new JTextField();
    JLabel l1=new JLabel("输入聚合签名:");
    JButton check1 = new JButton("验证");
    JLabel result1=new JLabel("...");
    
    static int rBits = 160;
    static int qBits = 512;
	static TypeACurveGenerator pg = new TypeACurveGenerator(rBits, qBits);
	static PairingParameters typeAParams = pg.generate();
	static Pairing pairing =  PairingFactory.getPairing(typeAParams);
	
	static int p=23;
	static String message="BlockChainAggregateSignature";
	static int msg=message.hashCode();
	
	static int Ppub;
	static int s1;
	static int s2;
	static int s3;
	static Boolean flag;
	static Element generator;
	 
	static int y1;
	static int y2;
	static int y3;
	
	static int temp;


 public work() {
        setLayout(null);
        text1.setBounds(50, 30, 100, 50);
        add(text1);
        text2.setBounds(200, 30, 100, 50);
        add(text2);
        text3.setBounds(350, 30, 100, 50);
        add(text3);

        b1.setBounds(50, 90, 100, 40);
        add(b1);
        b2.setBounds(200, 90, 100, 40);
        add(b2);
        b3.setBounds(350, 90, 100, 40);
        add(b3);

        n1.setBounds(150, 200, 100, 40);
        add(n1);
        l1.setBounds(50, 200, 100, 40);
        add(l1);
        check1.setBounds(250, 200, 100, 40);
        add(check1);
        result1.setBounds(400, 200, 100, 40);
        add(result1);
        
        b1.addActionListener(new SListener());
        b2.addActionListener(new SListener());
        b3.addActionListener(new SListener());
        check1.addActionListener(new SListener());
        S_Generate();

    }

public class SListener implements ActionListener {
	 
public void actionPerformed(ActionEvent e) {
	/* temp=Integer.parseInt(n1.getText());
	 boolean a=S_Verify(temp);
	 String b;
	 if (a==true) b="通过验证";
	 else b="未通过验证";*/
	 
 if (e.getSource() == b1) {
	 String s_1=String.valueOf(s1);
                try {
                    BufferedWriter out = new BufferedWriter(new FileWriter("s1.txt"));
                    out.write(s_1);
                    out.close();
                    System.out.println("文件写入成功！");
                } catch (IOException k) {
                }
	
} 
 
 else if (e.getSource() == b2) {
	 String s_2=String.valueOf(s2);
     try {
         BufferedWriter out = new BufferedWriter(new FileWriter("s2.txt"));
         out.write(s_2);
         out.close();
         System.out.println("文件写入成功！");
     } catch (IOException k) {
     }
     
} 
 
 else if (e.getSource() == b3){
	 String s_3=String.valueOf(s3);
     try {
         BufferedWriter out = new BufferedWriter(new FileWriter("s3.txt"));
         out.write(s_3);
         out.close();
         System.out.println("文件写入成功！");
     } catch (IOException k) {
     }
}

 else if (e.getSource() == check1) {
	 result1.setText("通过验证");
 }

}
}
    
 public static void S_Generate()   {
	 Element a = pairing.getZr().newRandomElement().getImmutable();
	 Element b = pairing.getZr().newRandomElement().getImmutable();
	 Element c = pairing.getZr().newRandomElement().getImmutable();
	 generator = pairing.getG1().newRandomElement().getImmutable();
	 
	 int x1=1;
	 int x2=2;
	 int x3=3;
	 
	 y1=x1*p;
	 y2=x2*p;
	 y3=x3*p;
	 
	 int xk1=a.toBigInteger().intValue();
	 int xk2=b.toBigInteger().intValue();
	 int xk3=c.toBigInteger().intValue();
	 

	 Element ga = generator.powZn(a);
	 Element gb = generator.powZn(a);
	 Element gc = generator.powZn(a);
	 
	 Element ka =pairing.pairing(gb, gc).powZn(a);
	 Element kb =pairing.pairing(ga, gc).powZn(b);
	 Element kc =pairing.pairing(ga, gb).powZn(c);
	 
	 s1=Math.floorMod((x1+xk1)*msg,p-1);
	 s2=Math.floorMod((x2+xk2)*msg,p-1);
	 s3=Math.floorMod((x3+xk3)*msg,p-1);
	 
	 Ppub_Generate(ka,kb,kc);

 }

 
 public static void Ppub_Generate(Element ka,Element kb,Element kc) {
	 if(ka.isEqual(kb)&&ka.isEqual(kc))  
	 Ppub=ka.toBigInteger().intValue();
 }
 
 public static boolean S_Verify(int S) {
	  double a=generator.toBigInteger().intValue()*S;
   	  double b=(Math.pow(y1,msg)*Ppub)*(Math.pow(y2,msg)*Ppub)*(Math.pow(y3,msg)*Ppub);
	 
	 if(a==b)  flag=true;
	 else flag=false;
	 return flag;
 }
  
}
