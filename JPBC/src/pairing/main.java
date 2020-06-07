package pairing;
import javax.swing.JFrame;
public class main {
 public static void main(String[] args) {
        JFrame f=new JFrame("基于聚合签名的区块链合同签署系统");
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.add(new work());
        f.setSize(500, 300);
        f.setVisible(true);
    }
}
