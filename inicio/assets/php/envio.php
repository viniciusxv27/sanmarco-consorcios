<?php
    include_once("../../../conecta.php");

    if(isset($_POST['submit'])){
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $celular = $_POST['celular'];
        $endereco = $_POST['endereco'];

        $confirmar = $conexao->prepare("SELECT * FROM clientes WHERE email = ?");
        $confirmar->bind_param("s", $email);
        $confirmar->execute();
        $confirmar->store_result();
        $confirmar_count = $confirmar->num_rows;
        
        if($confirmar_count == 0){
            $inserir = $conexao->prepare("INSERT INTO clientes (nome, email, celular, endereco) VALUES ('".$nome."', '".$email."', '".$celular."', '".$endereco."')");
            
        } else {
            $inserir = $conexao->prepare("UPDATE `clientes` SET `nome`='".$nome."',`celular`='".$celular."',`endereco`='".$endereco."' WHERE email ='".$email."'");
        }
        
        if($inserir->execute()){
            header('Location: ../../../valor/index.html?email='.$email);
        }
    }
?>
