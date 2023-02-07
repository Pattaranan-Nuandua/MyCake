
    /*$CN=mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"Wearable-2023");

    $EncodedData = file_get_contents('php://input');
    $DecodeData = json_decode($EncodeData,true);
    
    $Email=$DecodeData['Email'];
    $Username=$DecodeData['Username'];
    $Password=$DecodeData['Password'];
    $Name=$DecodeData['Name'];
    $Surname=$DecodeData['Surname'];
    $Weight=$DecodeData['Weight'];
    $High=$DecodeData['High'];
    $Age=$DecodeData['Age'];
    $Gender=$DecodeData['Gender'];
    $Details=$DecodeData['Details'];
    

    $IQ="insert into sighup(Email,Username,Password,Name,Surname,Weight,High,Age,Gender,Details) values('$Email','$Username','$Password','$Name','$Surname','$Weight','$High','$Age','$Gender','$Details')";

    $R = mysqli_query($CN,$IQ);
    if($R)
    {
        $Message="registered successfully";
    }
    else
    {
        $Message="Server Error.. Please try letter";
    }

    $Response[]=array("Message"=>$Message);
    echo json_encode($Response);*/
<?php
    require './conn.php';
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Medthods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');

    class Authenticate{
        private static $dbHealper;
        
        private static $SQL;
        private static $stmt;
        private static $row;
        private static $response;

        private static $encodedData;
        private static $decodedData;

        private static $Message;
        private static $Email;
        private static $Username;
        private static $Password;
        private static $Name;
        private static $Surname;
        private static $Weight;
        private static $High;
        private static $Age;
        private static $Gender;
        private static $Details;
        private static $uuid;
    }
        public function __construct(){
            self::$dbHelper = new DatabaseHelper;
            self::$dbHealper::init();

            self::$encodedData = file_get_contents("php://input");
            self::$decodedData = json_decode(self::$decodedData,true);

            if(self::$decodedData['Type'] == 'Login'){
                self::Authenticate(self::$dbHealper::$conn);
            }else if(self::$decodedData['Type'] == 'Register'){
                self::create(self::$dbHealper::$conn);
            }
        }
        public static function Authenticate($conn){
            //authenticte a user
            if($conn){
                self::$Username = isset(self::$decodedData) ? self::$decodedData['Username'] : "";
                self::$Passoword = isset(self::$decodedData) ? self::$decodedData['Password'] : "";

                try{

                    self::$SQL ='SELECT * FROM sighup WHERE Username=?';
                    self::$stmt = $conn->prepare(self::$SQL);
                    self::$stmt ->bindValue(1,self::$Username,PDO::PPARAM_STR);
                    self::$stmt -> execute();

                    self::$row[] = self::$stmt->fetch();

                    if(isset(self::$row['UUID'])){
                        if(password_verify(self::$Passoword, self::$row['Password'])){
                            self::$Message = "Authenticated";
                            self::$response[] = array('Meassage' => self::$Message,'Name' => self::$row['Name'],'UUID'=> self::$row['UUID']'Token'=> self::Generate_Token{});
                        }
                        else{
                            self::$Message = "Authenticated";
                            self::$response[] = array('Meassage' => self::$Message);
                        }
                    }
                    else{
                        self::$Message = "Account Not Found";
                        self::$response[] = array('Meassage' => self::$Message);
                    }
                }catch(Exception $ex){
                    self::$Message = "Cloud not authenticate";
                }
            }
            else{
                self::$Message = "Cloud not finalize";
                self::$response[] = array('Meassage' => self::$Message);
        }
        public static function create($conn){
            if($conn){
                self::$Email = isset(self::$decodedData) ? self::$decodedData['Email'] : "";
                self::$Username = isset(self::$decodedData) ? self::$decodedData['Username'] : "";
                self::$Passoword = isset(self::$decodedData) ? password_hash($decodedData['Password'],PASSWORD_ARGON2ID) : "";
                self::$Name = isset(self::$decodedData) ? self::$decodedData['Name'] : "";
                self::$Surname = isset(self::$decodedData) ? self::$decodedData['Surname'] : "";
                self::$Weight = isset(self::$decodedData) ? self::$decodedData['Weight'] : "";
                self::$High = isset(self::$decodedData) ? self::$decodedData['High'] : "";
                self::$Age = isset(self::$decodedData) ? self::$decodedData['Age'] : "";
                self::$Gender = isset(self::$decodedData) ? self::$decodedData['Gender'] : "";
                self::$Details = isset(self::$decodedData) ? self::$decodedData['Details'] : "";
                self::$uuid = self::uuidv4();

                try{
                    if(self::Check_User_Exists($conn,self::$Username)){
                        self::$Message = "User alrady exists";
                        self::$response[] = array("Meassage" => self::$Message);
                    } 
                    else{
                        self::$SQL="INSERT INTO sighup (Email,Username,Password,Name,Surname,Weight,High,Age,Genser,Details,UUID) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                    self::$stmt = $conn->prepare(self::$SQL);
                    self::$stmt ->bindValue(1,self::$Email,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(2,self::$Username,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(3,self::$Password,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(4,self::$Name,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(5,self::$Surname,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(6,self::$Weight,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(7,self::$High,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(8,self::$Age,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(9,self::$Gender,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(10,self::$Details,PDO::PPARAM_STR);
                    self::$stmt ->bindValue(11,self::$uuid,PDO::PPARAM_STR);
                    self::$stmt -> execute();

                    self::$Message = "Register";
                    self::$response[] = array("Meassage" => self::$Message);
                    }
                }catch(Exception $ex){
                    self::$Message = "Could not create account";
                    self::$response[] = array("Meassage" => self::$Message);
                }
            }
            echo json_encode(self::$response);
        }
        public static function Check_User_Exists($conn,$Username){
            if($conn){
                try{
                    self::$SQL="";
                    self::$stmt = $conn->prepare(self::$SQL);
                    self::$stmt ->bindValue(1,$Username,PDO::PPARAM_STR);
                    self::$stmt -> execute();

                    self::$row[] = self::&stmt->fetch();
                    if(isset(self::$row['UUID'])){
                        reurn true;
                    }
                }catch(Exception $ex){
                    return false;
                }
            }
            return false;
        }

        private static function Generate_Token(){
            $token = openssl_random_pseudo_bytes(16);
            $token = bin2hex($token);
            return $token;
        }
        private static function uuidv4(){
            return sprintf('%40x%40x-%40x-%40x-%40x%40x',
            mt_rand(0,0xffff),mt_rand(0,0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0,0x0fff) | 0x4000,
            mt_rand(0,0x3fff) | 0x8000,
            mt_rand(0,0xffff),mt_rand(0,0xffff),mt_rand(0,0xffff)
        );
    }
}
$auth = new Authenticate();
