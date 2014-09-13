package calc3d;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;

import java.io.*;
import java.net.URL;
import java.util.Properties;
import java.util.ResourceBundle;
import javafx.fxml.Initializable;

public class Controller implements Initializable {

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
    // TODO
        Settings set3d = new Settings();
        f_cost.setText(""+set3d.getFilament_cost());
        f_weight.setText(""+set3d.getFilament_weight());
        e_cost.setText(""+set3d.getElectricity_cost());
        e_watts.setText("" + set3d.getElectricity_watts());
    }
    @FXML
    private TextField f_cost;
    @FXML
    private TextField f_weight;
    @FXML
    private TextField e_cost;
    @FXML
    private TextField e_watts;
    @FXML
    private TextField obj_weight;
    @FXML
    private TextField obj_time;
    @FXML
    private TextField result;


    @FXML
    private void calculate(ActionEvent event){
        Operations obj = new Operations();
        float weight=0;
        float time=0;
        try {
            weight = Float.parseFloat(obj_weight.getText());
            time = Float.parseFloat(obj_time.getText());
        } catch (NumberFormatException e){
            System.out.println("Error: Number Format");
        }
        System.out.println(""+obj.weightCost(weight, time));
        result.setText(""+obj.weightCost(weight, time));
    }
    @FXML
    private void update(ActionEvent event){
        Settings set3d = new Settings();
        try {
            set3d.setFilament_cost(Float.parseFloat(f_cost.getText()));
            set3d.setFilament_weight(Float.parseFloat(f_weight.getText()));
            set3d.setElectricity_cost(Float.parseFloat(e_cost.getText()));
            set3d.setElectricity_watts(Float.parseFloat(e_watts.getText()));
            set3d.setData();
            System.out.println("Successful Update: calc3d.config modfied");
        }catch (NumberFormatException e){
            System.out.println("Error: Number Format");
        }

    }
}
class Operations {
    Settings set3d = new Settings();

    public float weightCost(float grams, float time){
        float cost = set3d.getFilament_cost();
        float filament_weight = set3d.getFilament_weight();
        float electricity_cost = set3d.getElectricity_cost();
        float electricity_watts = set3d.getElectricity_watts();

        float costGram = cost / filament_weight;
        float costWatt = (electricity_cost/1000)*electricity_watts*time;
        float x = costGram*grams+costWatt;
        return x;
    }

}
class Settings {


    private float filament_cost;
    private float filament_weight;
    private float filament_diameter;
    private String filament_type;
    private float  electricity_cost;
    private float  electricity_watts;
    private String currency;

    public Settings() {
        checkFile();
        loadData();

    }
    //Este metodo checa si el archivo ya existe, sino se va al metodo que crea el archivo.
    private void checkFile(){
        Properties prop = new Properties();
        OutputStream output = null;
        File calcProp = new File("calc3d.config");
        if(!calcProp.exists()) {
            try {
                System.out.println("capos.properties doesn't exists!");
                System.out.println("Creating File");

                output = new FileOutputStream(calcProp);

                // set the properties value
                prop.setProperty("filament_cost", "30.00");
                prop.setProperty("filament_weight", "1.00");
                prop.setProperty("filament_diameter", "0.35");
                prop.setProperty("filament_type", "pla");
                prop.setProperty("electricity_cost", "1.00");
                prop.setProperty("electricity_watts", "360");
                prop.setProperty("currency", "dollars");

                // save properties to project root folder
                prop.store(output, null);

            } catch (IOException io) {
                io.printStackTrace();
            } finally {
                if (output != null) {
                    try {
                        output.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

            }
        }
    }
    private void loadData(){
        Properties prop = new Properties();

        try{
            prop.load(new FileInputStream("calc3d.config"));
        }catch(Exception e){
            System.out.println("file not found.");
            e.printStackTrace();
        }
        try{
            filament_cost = Float.parseFloat(prop.getProperty("filament_cost"));
            filament_weight = Float.parseFloat(prop.getProperty("filament_weight"));
            filament_diameter = Float.parseFloat(prop.getProperty("filament_diameter"));
            electricity_cost = Float.parseFloat(prop.getProperty("electricity_cost"));
            electricity_watts = Float.parseFloat(prop.getProperty("electricity_watts"));
        } catch (NumberFormatException e){
            System.out.println("Error Config Numbers");
        }

        filament_type = prop.getProperty("filament_type");
        currency = prop.getProperty("currency");
    }
    public void setData(){
        FileOutputStream out = null;
        Properties prop = new Properties();

        try{
            out = new FileOutputStream("calc3d.config");
        }catch(Exception e){
            System.out.println("file not found.");
            e.printStackTrace();
        }
        prop.setProperty("filament_cost",(""+filament_cost));
        prop.setProperty("filament_weight",(""+filament_weight));
        prop.setProperty("filament_diameter",(""+filament_diameter));
        prop.setProperty("filament_type",(""+filament_type));
        prop.setProperty("electricity_cost",(""+electricity_cost));
        prop.setProperty("electricity_watts",(""+electricity_watts));
        try{
            prop.store(out, null);
            out.close();
        }catch(Exception e){
            System.out.println("file not found.");
            e.printStackTrace();
        }
    }

    public void setFilament_cost(float filament_cost) {
        this.filament_cost = filament_cost;
    }

    public void setFilament_weight(float filament_weight) {
        this.filament_weight = filament_weight;
    }

    public void setFilament_diameter(float filament_diameter) {
        this.filament_diameter = filament_diameter;
    }

    public void setFilament_type(String filament_type) {
        this.filament_type = filament_type;
    }

    public void setElectricity_cost(float electricity_cost) {
        this.electricity_cost = electricity_cost;
    }

    public void setElectricity_watts(float electricity_watts) {
        this.electricity_watts = electricity_watts;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public float getElectricity_watts() {
        return electricity_watts;
    }

    public float getFilament_cost() {
        return filament_cost;
    }

    public float getFilament_weight() {
        return filament_weight;
    }

    public float getFilament_diameter() {
        return filament_diameter;
    }

    public String getFilament_type() {
        return filament_type;
    }

    public float getElectricity_cost() {
        return electricity_cost;
    }

    public String getCurrency() {
        return currency;
    }
}
