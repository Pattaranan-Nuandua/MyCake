<?php
session_start();
        if(isset($_POST['username'])){
				//connection
                  include("connection.php");
				//รับค่า user & password
                  $username = $_POST['username'];
                  $uassword = md5($_POST['password']);
				//query 
                  $sql="SELECT * FROM users Where username='".$username."' and password='".$password."' ";
 
                  $result = mysqli_query($con,$sql);
				
                  if(mysqli_num_rows($result)==1){
 
                      $row = mysqli_fetch_array($result);
 
                      $_SESSION["UserID"] = $row["ID"];
                      $_SESSION["User"] = $row["Firstname"]." ".$row["Lastname"];
                      $_SESSION["Userlevel"] = $row["Userlevel"];
 
                      if($_SESSION["Userlevel"]=="A"){ //ถ้าเป็น admin ให้กระโดดไปหน้า admin_page.php
 
                        Header("Location: admin_page.php");
 
                      }
 
                      if ($_SESSION["Userlevel"]=="M"){  //ถ้าเป็น member ให้กระโดดไปหน้า user_page.php
 
                        Header("Location: user_page.php");
 
                      }
 
                  }else{
                    echo "<script>";
                        echo "alert(\" user หรือ  password ไม่ถูกต้อง\");"; 
                        echo "window.history.back()";
                    echo "</script>";
 
                  }
 
        }else{
 
 
             Header("Location: form.php"); //user & password incorrect back to login again
 
        }
?>