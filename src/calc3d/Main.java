package calc3d;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.IOException;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("calc3d.fxml"));
        primaryStage.setTitle("Calc3D");
        primaryStage.setScene(new Scene(root, 300, 480));
        primaryStage.setResizable(false);
        primaryStage.setMaxWidth(300);
        primaryStage.setMaxHeight(480);
        primaryStage.setMinWidth(300);
        primaryStage.setMinHeight(480);
        try {
            primaryStage.getIcons().add(new Image("/res/icons/logo/logo-64x64.png"));
        } catch (Exception e){
            System.out.println("Icon Error");
        }
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
