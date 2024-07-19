<?php
    include_once("../../../conecta.php");

    $email = $_GET['email'];
    $valor = $_GET['valor'];
    $prazo = $_GET['prazo'];

    $parcelas = (($valor*0.19)+$valor) / $prazo;

    $sql = "UPDATE `clientes` SET `valor`='".$valor."',`prazo`='".$prazo."',`parcelas`='".$parcelas."' WHERE email = '".$email."'";

    $executar = $conexao->prepare($sql);
    if($executar->execute()){
        header('Location: ../../../final/index.html?email='.$email.'&valor='.$valor.'&prazo='.$prazo.'&parcelas='.$parcelas);
    }
?>  


